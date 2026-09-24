import { prepareCountry, editUrl } from './publish.mjs?v=github-save-20260924';

// Country borders: Natural Earth 1:50m, public domain. See map-data.md.
const map = L.map('map', {
  minZoom: 0,
  zoomSnap: 0.25,
  maxZoom: 8,
  zoomControl: false,
  maxBounds: [[-65, -180], [85, 180]],
  maxBoundsViscosity: 1,
  attributionControl: true,
});
L.control.zoom({ position: 'bottomright' }).addTo(map);
map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com/">Natural Earth</a>');

function showWorld() {
  map.fitBounds([[-55, -170], [78, 180]], { padding: [15, 15] });
}
showWorld();

const WorldControl = L.Control.extend({
  options: { position: 'bottomright' },
  onAdd() {
    const button = L.DomUtil.create('button', 'world-button');
    button.type = 'button';
    button.textContent = 'Show world';
    button.setAttribute('aria-label', 'Reset map to world view');
    L.DomEvent.disableClickPropagation(button);
    L.DomEvent.on(button, 'click', showWorld);
    return button;
  },
});
new WorldControl().addTo(map);

async function loadMap() {
  const status = document.getElementById('map-status');
  try {
    const [countries, visitedCodes] = await Promise.all(
      ['countries.geojson', 'visited-countries.json'].map(async url => {
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Unable to load ${url}`);
        return response.json();
      })
    );
    const visited = new Set(visitedCodes);
    const available = new Set(countries.features.map(f => f.properties.code));
    if (visitedCodes.some(code => !available.has(code))) throw new Error('Missing country borders');
    const borders = L.geoJSON(countries, {
      style: feature => ({
        color: visited.has(feature.properties.code) ? '#7952ac' : '#c5c6d0',
        weight: visited.has(feature.properties.code) ? 1.1 : 0.7,
        fillColor: visited.has(feature.properties.code) ? '#a681ce' : '#faf9fc',
        fillOpacity: 1,
      }),
      onEachFeature(feature, layer) {
        const label = document.createElement('span');
        label.textContent = `${feature.properties.name} · ${visited.has(feature.properties.code) ? 'Visited' : 'Not yet visited'}`;
        layer.bindTooltip(label, { sticky: true, className: 'country-tooltip' });
        layer.on('mouseover', () => layer.setStyle({ weight: 2, color: '#573581' }));
        layer.on('mouseout', () => layer.setStyle({ weight: visited.has(feature.properties.code) ? 1.1 : 0.7, color: visited.has(feature.properties.code) ? '#7952ac' : '#c5c6d0' }));
        layer.on('click', () => layer.openTooltip());
      },
    }).addTo(map);
    const countryNames = new Map();
    countries.features.forEach(feature => {
      const { code, name } = feature.properties;
      if (!countryNames.has(code)) countryNames.set(code, name);
    });
    function renderCountries() {
      const list = document.getElementById('countries-list');
      list.replaceChildren();
      [...countryNames].filter(([code]) => visited.has(code)).sort((a, b) => a[1].localeCompare(b[1])).forEach(([code, name]) => {
        const item = document.createElement('li');
        const flag = document.createElement('span');
        flag.className = 'country-flag';
        flag.setAttribute('aria-hidden', 'true');
        flag.textContent = String.fromCodePoint(...[...code].map(letter => 127397 + letter.charCodeAt(0)));
        const label = document.createElement('span');
        label.textContent = name;
        item.append(flag, label);
        list.append(item);
      });
      document.getElementById('countries-summary').textContent = `${visited.size} countries, including home in the United States. Listed A–Z.`;
      document.getElementById('country-count').textContent = visited.size;
      borders.setStyle(feature => ({
        color: visited.has(feature.properties.code) ? '#7952ac' : '#c5c6d0',
        weight: visited.has(feature.properties.code) ? 1.1 : 0.7,
        fillColor: visited.has(feature.properties.code) ? '#a681ce' : '#faf9fc', fillOpacity: 1,
      }));
      borders.eachLayer(layer => {
        const label = document.createElement('span');
        label.textContent = `${layer.feature.properties.name} · ${visited.has(layer.feature.properties.code) ? 'Visited' : 'Not yet visited'}`;
        layer.setTooltipContent(label);
      });
    }
    renderCountries();
    status.textContent = 'Scroll to zoom · Hover to explore';
    const dialog = document.getElementById('country-editor');
    const picker = document.getElementById('country-picker');
    const form = document.getElementById('country-form');
    const message = document.getElementById('publish-status');
    const draft = document.getElementById('country-draft');
    const steps = document.getElementById('github-save-steps');
    document.getElementById('github-edit-link').href = editUrl;
    const submit = document.getElementById('publish-country');
    let busy = false;
    function refreshPicker() {
      picker.replaceChildren(new Option('Choose a country…', ''));
      [...countryNames].filter(([code]) => !visited.has(code)).sort((a,b) => a[1].localeCompare(b[1])).forEach(([code,name]) => picker.add(new Option(name,code)));
    }
    refreshPicker();
    document.querySelectorAll('[data-add-country]').forEach(button => {
      button.disabled = false;
      button.addEventListener('click', () => { dialog.showModal(); picker.focus(); });
    });
    document.getElementById('close-country-editor').addEventListener('click', () => dialog.close());
    picker.addEventListener('change', () => { steps.hidden = true; message.textContent = 'Prepare your update, then save it using your GitHub login.'; });
    document.getElementById('copy-country-list').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(draft.value);
        message.textContent = 'Copied! Open GitHub, replace the file contents with your copied list, review the changes, then click Commit changes.';
      } catch {
        draft.focus(); draft.select();
        message.textContent = 'Copy the selected text manually, then open GitHub to paste and save it.';
      }
    });
    dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy || !form.reportValidity()) return;
      busy = true;
      const code = picker.value;
      submit.disabled = picker.disabled = true;
      steps.hidden = true;
      document.getElementById('close-country-editor').disabled = true;
      message.textContent = 'Reading the latest country list…';
      try {
        const result = await prepareCountry(code, available);
        draft.value = result.content;
        steps.hidden = result.alreadyVisited;
        message.textContent = result.alreadyVisited
          ? `${countryNames.get(code)} is already saved on GitHub. Refresh the map after deployment finishes.`
          : `${countryNames.get(code)} is ready to add. It is not saved yet—complete the steps below on GitHub.`;
      } catch (error) {
        message.textContent = error instanceof TypeError ? 'Could not reach GitHub. Check your connection and try again.' : error.message;
      } finally {
        busy = false;
        submit.disabled = picker.disabled = false;
        document.getElementById('close-country-editor').disabled = false;
      }
    });
  } catch (error) {
    document.getElementById('country-count').textContent = 'Your';
    status.textContent = 'The map could not load. Please refresh to try again.';
    document.getElementById('countries-summary').textContent = 'Countries could not load. Please refresh to try again.';
    console.error(error);
  }
}
loadMap();

function showTravelPanel() {
  const hash = location.hash.slice(1);
  const selected = ['countries', 'itineraries'].includes(hash) || /^section\d+$/.test(hash)
    ? (/^section\d+$/.test(hash) ? 'itineraries' : hash) : 'traveled';
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === 'tab-' + selected);
  });
  if (selected === 'traveled') requestAnimationFrame(() => map.invalidateSize());
}
window.addEventListener('hashchange', showTravelPanel);
showTravelPanel();
window.addEventListener('resize', () => map.invalidateSize());
