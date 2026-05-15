const DEFAULT_YEAR_COLORS = {
  study: '#8a5cf6',
  '2023': '#e45a84',
  '2024': '#f59e0b',
  '2025': '#22c55e',
  '2026': '#06b6d4',
  other: '#9ca3af',
};

const COLOR_POOL = [
  '#e45a84','#f59e0b','#22c55e','#06b6d4','#8a5cf6',
  '#f97316','#84cc16','#14b8a6','#a855f7','#ec4899',
];

const STORAGE_KEY = 'bucketlist_pins';
const YEARS_KEY = 'bucketlist_years';

const DEFAULT_YEARS = [
  { value: 'study', label: 'Study Abroad' },
  { value: '2023',  label: '2023' },
  { value: '2024',  label: '2024' },
  { value: '2025',  label: '2025' },
  { value: '2026',  label: '2026' },
];

const EDIT_MODE = new URLSearchParams(location.search).has('edit');

let yearOptions = [];

function loadYearOptions() {
  const raw = localStorage.getItem(YEARS_KEY);
  try { yearOptions = raw ? JSON.parse(raw) : [...DEFAULT_YEARS]; }
  catch { yearOptions = [...DEFAULT_YEARS]; }
}

function colorForYear(year) {
  if (DEFAULT_YEAR_COLORS[year]) return DEFAULT_YEAR_COLORS[year];
  const idx = Math.abs(
    year.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  ) % COLOR_POOL.length;
  return COLOR_POOL[idx];
}

function renderFilterButtons() {
  const container = document.getElementById('bl-filter');
  container.innerHTML =
    `<button class="filter-btn${currentFilter === 'all' ? ' active' : ''}" data-filter="all" onclick="setFilter('all')">All</button>` +
    yearOptions.map(y =>
      `<button class="filter-btn${currentFilter === y.value ? ' active' : ''}" data-filter="${y.value}" onclick="setFilter('${y.value}')">${y.label}</button>`
    ).join('');
}

let pins = [];
let markers = {};
let activeId = null;
let currentFilter = 'all';

// ── Map ──────────────────────────────────────────────────────────────────
const map = L.map('map', { worldCopyJump: true }).setView([20, 15], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

map.on('click', () => deselectPin());

map.whenReady(() => {
  setTimeout(() => map.zoomIn(1, { animate: true }), 600);
});

// ── Persistence ──────────────────────────────────────────────────────────
function save() {
  if (!EDIT_MODE) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
  fetch('/api/bucketlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pins)
  }).catch(() => {});
}

function loadPins() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length > 0) {
        pins = saved;
        return;
      }
    } catch {}
  }

  fetch('/api/bucketlist')
    .then(r => r.json())
    .then(saved => {
      pins = (Array.isArray(saved) && saved.length > 0) ? saved : [...window.INITIAL_PLACES];
      save();
      renderAll();
    })
    .catch(() => {
      pins = [...window.INITIAL_PLACES];
      save();
      renderAll();
    });
}

// ── Year editor ──────────────────────────────────────────────────────────
function renderYearSelect() {
  const sel = document.getElementById('year-select');
  if (!sel) return;
  sel.innerHTML = yearOptions.map(y =>
    `<option value="${y.value}">${y.label}</option>`
  ).join('');
}

function renderYearEditor() {
  const list = document.getElementById('year-editor-list');
  if (!list) return;
  list.innerHTML = yearOptions.map(y => `
    <div class="year-editor-row">
      <div class="year-editor-dot" style="background:${colorForYear(y.value)}"></div>
      <span>${y.label}</span>
      <button onclick="window.removeYearOption('${y.value}')">×</button>
    </div>`
  ).join('');
}

window.toggleYearEditor = function() {
  const el = document.getElementById('year-editor');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display !== 'none') renderYearEditor();
};

window.addYearOption = function() {
  const input = document.getElementById('year-new-input');
  const label = input.value.trim();
  if (!label) return;
  const value = label.toLowerCase().replace(/\s+/g, '_');
  if (yearOptions.find(y => y.value === value)) return;
  yearOptions.push({ value, label });
  localStorage.setItem(YEARS_KEY, JSON.stringify(yearOptions));
  renderYearSelect();
  renderYearEditor();
  renderFilterButtons();
  input.value = '';
};

window.removeYearOption = function(value) {
  yearOptions = yearOptions.filter(y => y.value !== value);
  localStorage.setItem(YEARS_KEY, JSON.stringify(yearOptions));
  renderYearSelect();
  renderYearEditor();
  renderFilterButtons();
};

// ── Autocomplete ─────────────────────────────────────────────────────────
const addInput = document.getElementById('add-input');
const ghostEl  = document.getElementById('input-ghost');
const dropdown = document.getElementById('ac-dropdown');
let selectedSuggestion = null;
let acTimeout = null;

function updateGhost(typed, suffix) {
  if (!ghostEl) return;
  ghostEl.innerHTML = typed
    ? `<span class="ghost-matched">${typed}</span><span class="ghost-suffix">${suffix}</span>`
    : '';
}

function hideDropdown() {
  if (!dropdown) return;
  dropdown.style.display = 'none';
  dropdown.innerHTML = '';
}

function renderDropdown(items) {
  if (!dropdown) return;
  dropdown.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'ac-item';
    li.textContent = item.display_name || item.name;
    li.addEventListener('mousedown', e => { e.preventDefault(); selectSuggestion(item); });
    dropdown.appendChild(li);
  });
  dropdown.style.display = 'block';
}

function selectSuggestion(item) {
  if (!addInput) return;
  addInput.value = (item.name || item.display_name.split(',')[0]).trim();
  selectedSuggestion = item;
  updateGhost('', '');
  hideDropdown();
}

if (addInput) {
  addInput.addEventListener('input', () => {
    const val = addInput.value;
    selectedSuggestion = null;
    updateGhost(val, '');
    clearTimeout(acTimeout);
    if (!val.trim()) { hideDropdown(); return; }
    acTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode-suggest?q=${encodeURIComponent(val)}`);
        const results = await res.json();
        if (results.length > 0) {
          const name = (results[0].name || results[0].display_name.split(',')[0]).trim();
          if (name.toLowerCase().startsWith(val.toLowerCase())) {
            updateGhost(val, name.slice(val.length));
          }
          renderDropdown(results);
        } else {
          hideDropdown();
        }
      } catch { hideDropdown(); }
    }, 300);
  });

  addInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.addPlace();
    } else if (e.key === 'Tab') {
      const suffix = ghostEl?.querySelector('.ghost-suffix')?.textContent;
      if (suffix) {
        e.preventDefault();
        addInput.value = addInput.value + suffix;
        updateGhost('', '');
        hideDropdown();
      }
    } else if (e.key === 'Escape') {
      hideDropdown();
      updateGhost('', '');
    }
  });

  addInput.addEventListener('blur', () => setTimeout(hideDropdown, 150));
}

// ── Add / Remove pins ────────────────────────────────────────────────────
window.addPlace = async function() {
  if (!addInput) return;
  const name = addInput.value.trim();
  if (!name) return;
  const year = document.getElementById('year-select')?.value || '2025';

  let lat = null, lng = null, region = '';
  if (selectedSuggestion) {
    lat = parseFloat(selectedSuggestion.lat);
    lng = parseFloat(selectedSuggestion.lon);
    const addr = selectedSuggestion.address || {};
    region = addr.country || addr.state || '';
    selectedSuggestion = null;
  } else {
    try {
      const res = await fetch(`/api/geocode-suggest?q=${encodeURIComponent(name)}`);
      const results = await res.json();
      if (results[0]) {
        lat = parseFloat(results[0].lat);
        lng = parseFloat(results[0].lon);
        const addr = results[0].address || {};
        region = addr.country || addr.state || '';
      }
    } catch {}
  }

  pins.push({ id: Date.now().toString(), name, year, lat, lng, region });
  renderAll();
  save();
  addInput.value = '';
  updateGhost('', '');
};

window.removePin = function(id) {
  if (activeId === id) deselectPin();
  pins = pins.filter(p => p.id !== id);
  renderAll();
  save();
};

// ── Rendering ────────────────────────────────────────────────────────────
function makeIcon(year, active = false) {
  const color = colorForYear(year);
  const size = active ? 20 : 14;
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 2px 8px ${color}88;transition:all 0.15s;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function renderAll() {
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  const list = document.getElementById('bl-list');
  list.innerHTML = '';

  const filtered = currentFilter === 'all' ? pins : pins.filter(p => p.year === currentFilter);
  filtered.sort((a, b) => {
    const ka = isNaN(parseInt(a.year)) ? -1 : parseInt(a.year);
    const kb = isNaN(parseInt(b.year)) ? -1 : parseInt(b.year);
    return kb - ka;
  });

  filtered.forEach(pin => {
    if (pin.lat && pin.lng) {
      const m = L.marker([pin.lat, pin.lng], { icon: makeIcon(pin.year, pin.id === activeId) }).addTo(map);
      m.bindTooltip(pin.name, { permanent: false, direction: 'top', offset: [0, -8] });
      m.on('click', () => selectPin(pin.id));
      markers[pin.id] = m;
    }

    const li = document.createElement('li');
    li.className = 'bl-item' + (pin.id === activeId ? ' active' : '');
    li.dataset.id = pin.id;
    const color = colorForYear(pin.year);
    li.innerHTML = `
      <div class="bl-dot" style="background:${color};"></div>
      <div class="bl-item-info">
        <div class="bl-item-name">${pin.name}</div>
        <div class="bl-item-meta">${pin.year === 'study' ? 'Study Abroad' : pin.year || ''} ${pin.region ? '· ' + pin.region : ''}</div>
      </div>
      ${EDIT_MODE ? `<button class="bl-delete" onclick="event.stopPropagation();window.removePin('${pin.id}')">×</button>` : ''}`;
    li.addEventListener('click', () => selectPin(pin.id));
    list.appendChild(li);
  });

  document.getElementById('bl-count').textContent = filtered.length;
}

let savedView = null;

function deselectPin() {
  if (activeId === null) return;
  markers[activeId]?.setIcon(makeIcon(pins.find(p => p.id === activeId)?.year));
  document.querySelector(`.bl-item[data-id="${activeId}"]`)?.classList.remove('active');
  activeId = null;
  if (savedView) {
    map.flyTo(savedView.center, savedView.zoom, { duration: 0.7 });
    savedView = null;
  }
}

function selectPin(id) {
  if (activeId === id) { deselectPin(); return; }

  const firstSelection = activeId === null;

  if (activeId !== null) {
    markers[activeId]?.setIcon(makeIcon(pins.find(p => p.id === activeId)?.year));
    document.querySelector(`.bl-item[data-id="${activeId}"]`)?.classList.remove('active');
  }

  activeId = id;
  const pin = pins.find(p => p.id === id);
  if (!pin) return;

  markers[id]?.setIcon(makeIcon(pin.year, true));
  document.querySelector(`.bl-item[data-id="${id}"]`)?.classList.add('active');
  document.querySelector(`.bl-item[data-id="${id}"]`)?.scrollIntoView({ block: 'nearest' });

  if (EDIT_MODE && addInput) {
    addInput.value = pin.name;
    updateGhost('', '');
  }

  if (pin.lat && pin.lng) {
    if (firstSelection) savedView = { center: map.getCenter(), zoom: map.getZoom() };
    map.flyTo([pin.lat, pin.lng], Math.max(map.getZoom(), 6), { duration: 0.7 });
  }
}

function setFilter(f) {
  currentFilter = f;
  renderFilterButtons();
  renderAll();
}

window.setFilter = setFilter;

// ── Init ──────────────────────────────────────────────────────────────────
loadYearOptions();
renderFilterButtons();
loadPins();
if (pins.length > 0) renderAll();

if (EDIT_MODE) {
  const form = document.getElementById('bl-add-form');
  if (form) form.style.display = '';
  renderYearSelect();
}
