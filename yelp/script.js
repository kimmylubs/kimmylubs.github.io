const map = L.map('map').setView([37.7749, -122.4194], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(map);

const markers = [];
let activeItem = null;

function starsHtml(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  for (let i = full + (half ? 1 : 0); i < 5; i++) s += '☆';
  return `<span class="stars-${Math.round(rating)}" title="${rating} stars">${s}</span>`;
}

function renderReview(review, index) {
  const li = document.createElement('li');
  li.className = 'review-item';
  li.dataset.index = index;
  li.innerHTML = `
    <div class="review-item-name">${review.name}</div>
    <div class="review-item-meta">
      <span class="review-item-stars">${starsHtml(review.rating)}</span>
      <span class="review-item-city">${review.city || review.address || ''}</span>
    </div>`;
  li.addEventListener('click', () => selectReview(index));
  return li;
}

function selectReview(index) {
  const review = window._reviews[index];
  if (!review) return;

  if (activeItem !== null) {
    document.querySelectorAll('.review-item')[activeItem]?.classList.remove('active');
    markers[activeItem]?.getElement()?.classList.remove('active');
  }
  activeItem = index;
  document.querySelectorAll('.review-item')[index]?.classList.add('active');
  document.querySelectorAll('.review-item')[index]?.scrollIntoView({ block: 'nearest' });
  markers[index]?.getElement()?.classList.add('active');

  if (review.lat && review.lng) {
    map.flyTo([review.lat, review.lng], 15, { duration: 0.8 });
  }

  document.getElementById('detail-stars').innerHTML = starsHtml(review.rating);
  document.getElementById('detail-name').textContent = review.name;
  document.getElementById('detail-address').textContent = review.address || '';
  document.getElementById('detail-date').textContent = review.date || '';
  document.getElementById('detail-text').textContent = review.text || '';
  const link = document.getElementById('detail-link');
  if (review.url) { link.href = review.url; link.style.display = ''; }
  else { link.style.display = 'none'; }
  document.getElementById('detail-panel').style.display = '';
}

function closeDetail() {
  document.getElementById('detail-panel').style.display = 'none';
  if (activeItem !== null) {
    document.querySelectorAll('.review-item')[activeItem]?.classList.remove('active');
    markers[activeItem]?.getElement()?.classList.remove('active');
    activeItem = null;
  }
}

function buildMarkerIcon() {
  return L.divIcon({ className: 'yelp-marker', iconSize: [18, 18], iconAnchor: [9, 9] });
}

function renderMap(reviews) {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;

  const bounds = [];
  reviews.forEach((review, i) => {
    if (!review.lat || !review.lng) return;
    const m = L.marker([review.lat, review.lng], { icon: buildMarkerIcon() })
      .addTo(map)
      .bindTooltip(review.name, { permanent: false, direction: 'top', offset: [0, -8] });
    m.on('click', () => selectReview(i));
    markers[i] = m;
    bounds.push([review.lat, review.lng]);
  });

  if (bounds.length > 1) map.fitBounds(bounds, { padding: [40, 40] });
  else if (bounds.length === 1) map.setView(bounds[0], 14);
}

async function loadReviews() {
  document.getElementById('loading').style.display = '';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('review-list').innerHTML = '';

  try {
    const res = await fetch('/api/yelp-reviews');
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const reviews = await res.json();

    window._reviews = reviews;
    document.getElementById('loading').style.display = 'none';
    document.getElementById('review-count').textContent = reviews.length;

    const list = document.getElementById('review-list');
    reviews.forEach((r, i) => list.appendChild(renderReview(r, i)));
    renderMap(reviews);
  } catch (err) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-state').style.display = '';
    const isNoData = err.message.includes('503') || err.message.includes('No saved');
    document.getElementById('error-msg').textContent = isNoData
      ? 'Yelp blocks automated scraping. Use the import page to extract your reviews while logged in:'
      : `Error: ${err.message}`;
  }
}

async function rescrape() {
  const btn = document.getElementById('refresh-btn');
  btn.style.pointerEvents = 'none';
  btn.textContent = '…';
  try {
    await fetch('/api/yelp-reviews', { method: 'DELETE' });
    await loadReviews();
  } finally {
    btn.style.pointerEvents = '';
    btn.textContent = '↻';
  }
}

loadReviews();
