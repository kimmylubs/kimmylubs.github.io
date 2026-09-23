const TOGO_MODE = document.body.dataset.mapScope === 'nyctogo';
const NYC_MODE = TOGO_MODE || document.body.dataset.mapScope === 'nyc';
const placeStatus = TOGO_MODE ? 'saved' : 'visited';
const areaLabel = TOGO_MODE ? 'location' : NYC_MODE ? 'neighborhood' : 'city area';
const map = L.map('map', {
  minZoom: NYC_MODE ? 9 : 1, zoomSnap: 0.25, maxZoom: 17,
  zoomControl: false, worldCopyJump: !NYC_MODE,
  ...(NYC_MODE ? { maxBounds: [[40.45,-74.3],[40.95,-73.65]], maxBoundsViscosity: 1 } : {}),
}).setView(NYC_MODE ? [40.72,-73.96] : [30,-25], NYC_MODE ? 10 : 2);
L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19, noWrap: true,
}).addTo(map);
const pinLayer = L.layerGroup().addTo(map);
const search = document.getElementById('place-search');
const boroughFilter = document.getElementById('borough-filter');
const panel = document.getElementById('place-panel');
const message = document.getElementById('map-message');
let areas = [], visibleAreas = [], allPlaces = [], activeArea = null;

function closePanel() { panel.hidden = true; activeArea = null; }
function showArea(area) {
  activeArea = area.name;
  document.getElementById('panel-title').textContent = area.name;
  document.getElementById('panel-count').textContent = `${area.places.length} ${placeStatus} ${area.places.length === 1 ? 'place' : 'places'} · ${TOGO_MODE ? 'From my Want to go collection' : 'From my published Yelp reviews'}`;
  const list = document.getElementById('place-list');
  list.replaceChildren();
  [...area.places].sort((a,b) => a.name.localeCompare(b.name)).forEach(place => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = `${place.name} ↗`;
    link.href = place.url;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    const location = document.createElement('small');
    location.textContent = place.address || place.city;
    li.append(link,location); list.append(li);
  });
  panel.hidden = false;
  document.getElementById('close-panel').focus({ preventScroll: true });
}
function fitAreas() {
  if (visibleAreas.length) map.fitBounds(visibleAreas.map(a => [a.lat,a.lng]), { padding: [55,55], maxZoom: NYC_MODE ? 13 : 10 });
}
function renderPins() {
  pinLayer.clearLayers();
  // Merge overlapping city pins in screen space; zooming reveals individual cities.
  const clusters = [];
  visibleAreas.forEach(area => {
    const point = map.latLngToLayerPoint([area.lat,area.lng]);
    let cluster = clusters.find(c => c.point.distanceTo(point) < 55);
    if (!cluster) { cluster = { point, areas: [], lat: area.lat, lng: area.lng, count: 0 }; clusters.push(cluster); }
    cluster.areas.push(area); cluster.count += area.places.length;
  });
  clusters.forEach(cluster => {
    const combined = cluster.areas.length > 1;
    const title = combined ? `${cluster.count} ${placeStatus} places across ${cluster.areas.length} ${TOGO_MODE ? 'locations' : NYC_MODE ? 'neighborhoods' : 'cities'}. Zoom in.` : `${cluster.areas[0].name}: ${cluster.count} ${placeStatus} ${cluster.count === 1 ? 'place' : 'places'}`;
    const marker = L.marker([cluster.lat,cluster.lng], {
      title, alt: title,
      icon: L.divIcon({ className: `place-pin${combined ? ' cluster' : ''}${TOGO_MODE && cluster.areas.some(a => a.places.some(p => p.locationAccuracy === 'area')) ? ' approximate' : ''}`, html: `<span>${cluster.count}</span>`, iconSize: combined ? [48,48] : [42,42], iconAnchor: combined ? [24,24] : [21,21] }),
    }).addTo(pinLayer);
    const tooltip = document.createElement('span'); tooltip.textContent = title;
    marker.bindTooltip(tooltip);
    marker.getElement()?.setAttribute('aria-label', title);
    marker.on('click', () => {
      if (combined && map.getZoom() >= 16) { showArea({name: 'Nearby places', places: cluster.areas.flatMap(a => a.places)}); }
      else if (combined) { closePanel(); map.fitBounds(cluster.areas.map(a => [a.lat,a.lng]), { padding: [60,60], maxZoom: Math.min(map.getZoom()+3,17) }); }
      else showArea(cluster.areas[0]);
    });
  });
}
function filterPlaces() {
  const query = search.value.trim().toLocaleLowerCase();
  visibleAreas = areas.map(area => ({ ...area, places: area.places.filter(p => (!boroughFilter || boroughFilter.value === 'all' || p.borough === boroughFilter.value) && `${p.name} ${p.city} ${p.address || ""} ${area.name}`.toLocaleLowerCase().includes(query)) })).filter(a => a.places.length);
  const count = visibleAreas.reduce((total,a) => total+a.places.length,0);
  document.getElementById('map-stats').textContent = `${count.toLocaleString()} ${placeStatus} ${count === 1 ? 'place' : 'places'} · ${visibleAreas.length} ${areaLabel}${visibleAreas.length === 1 ? '' : 's'} · From Yelp`;
  message.hidden = count > 0;
  message.textContent = query ? 'No places match that search. Try a city or business name.' : 'No places match this filter.';
  closePanel(); renderPins();
  if (query || boroughFilter) fitAreas();
}
async function loadPlaces() {
  try {
    const response = await fetch(`${TOGO_MODE ? '/yelp/nyctogo/' : NYC_MODE ? '/yelp/nyc/' : '/yelp/'}data.json?v=nyctogo-20260923`, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Places could not load');
    allPlaces = await response.json();
    const grouped = new Map();
    allPlaces.forEach(place => {
      if (NYC_MODE && place.cityArea !== 'New York City, NY') throw new Error('Non-NYC place in NYC data');
      if (!Number.isFinite(place.areaLat) || !Number.isFinite(place.areaLng) || !/^https:\/\/www\.yelp\.com\/biz\//.test(place.url)) throw new Error('Invalid place location');
      if (!grouped.has(place.area)) grouped.set(place.area,{ name:place.area,lat:place.areaLat,lng:place.areaLng,places:[] });
      grouped.get(place.area).places.push(place);
    });
    areas = [...grouped.values()];
    filterPlaces(); fitAreas();
  } catch (error) {
    document.getElementById('map-stats').textContent = 'Places unavailable';
    message.textContent = 'The map data could not load. Refresh to try again.'; message.hidden = false;
    console.error(error);
  }
}
let searchTimer;
search.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer=setTimeout(filterPlaces,200); });
document.getElementById('show-all').addEventListener('click', () => { clearTimeout(searchTimer); search.value=''; if (boroughFilter) boroughFilter.value='all'; filterPlaces(); fitAreas(); });
document.getElementById('close-panel').addEventListener('click',closePanel);
document.addEventListener('keydown',e => { if(e.key === 'Escape') closePanel(); });
map.on('zoomend',renderPins);
loadPlaces();

if (boroughFilter) boroughFilter.addEventListener('change', filterPlaces);
