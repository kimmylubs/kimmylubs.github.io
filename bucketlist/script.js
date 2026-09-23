// Country borders: Natural Earth 1:50m, public domain. See map-data.md.
const map = L.map('map', {
  minZoom: 2,
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
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Unable to load ${url}`);
        return response.json();
      })
    );
    const visited = new Set(visitedCodes);
    const available = new Set(countries.features.map(f => f.properties.code));
    if (visitedCodes.some(code => !available.has(code))) throw new Error('Missing country borders');
    L.geoJSON(countries, {
      style: feature => ({
        color: visited.has(feature.properties.code) ? '#7952ac' : '#c5c6d0',
        weight: visited.has(feature.properties.code) ? 1.1 : 0.7,
        fillColor: visited.has(feature.properties.code) ? '#a681ce' : '#faf9fc',
        fillOpacity: 1,
      }),
      onEachFeature(feature, layer) {
        const isVisited = visited.has(feature.properties.code);
        const label = document.createElement('span');
        label.textContent = `${feature.properties.name} · ${isVisited ? 'Visited' : 'Not yet visited'}`;
        layer.bindTooltip(label, { sticky: true, className: 'country-tooltip' });
        layer.on('mouseover', () => layer.setStyle({ weight: 2, color: '#573581' }));
        layer.on('mouseout', () => layer.setStyle({ weight: isVisited ? 1.1 : 0.7, color: isVisited ? '#7952ac' : '#c5c6d0' }));
        layer.on('click', () => layer.openTooltip());
      },
    }).addTo(map);
    document.getElementById('country-count').textContent = visited.size;
    status.textContent = 'Scroll to zoom · Hover to explore';
  } catch (error) {
    document.getElementById('country-count').textContent = 'Your';
    status.textContent = 'The map could not load. Please refresh to try again.';
    console.error(error);
  }
}
loadMap();

document.querySelector('[data-tab="traveled"]').addEventListener('click', () => {
  requestAnimationFrame(() => map.invalidateSize());
});
window.addEventListener('resize', () => map.invalidateSize());
