const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];

const app = express();
const PORT = 3000;
const YELP_USER_ID = 'FKPUeSBvXP5vde2FSJOGow';
const YELP_DATA = path.join(__dirname, 'yelp', 'data.json');

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname)));

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function geocode(query) {
  try {
    const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: query, format: 'json', limit: 1 },
      headers: { 'User-Agent': 'kimmylubs-portfolio/1.0 (personal project)' },
      timeout: 8000,
    });
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (e) { console.warn(`geocode failed for "${query}"`); }
  return null;
}

// ── Apollo state extractor ─────────────────────────────────────────────────
function extractApolloState(html) {
  const $ = cheerio.load(html);
  let state = null;
  $('script').each((_, el) => {
    const raw = $(el).html() || '';
    if (!raw.includes('react_apollo_state')) return;
    const decoded = raw
      .replace(/&quot;/g, '"').replace(/&amp;/g, '&')
      .replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const idx = decoded.indexOf('react_apollo_state = {');
    if (idx < 0) return;
    const jsonPart = decoded.slice(idx + 'react_apollo_state = '.length);
    let depth = 0, end = 0;
    for (let ci = 0; ci < jsonPart.length; ci++) {
      if (jsonPart[ci] === '{') depth++;
      else if (jsonPart[ci] === '}') { depth--; if (depth === 0) { end = ci + 1; break; } }
    }
    try { state = JSON.parse(jsonPart.slice(0, end)); } catch {}
  });
  return state;
}

function resolveReviews(state) {
  return Object.keys(state)
    .filter(k => k.startsWith('Review:'))
    .map(rk => {
      const r = state[rk];
      const biz = r.business?.__ref ? state[r.business.__ref] : null;
      const loc = biz?.location?.__ref ? state[biz.location.__ref] : null;
      const addr = loc?.address || {};
      const address = [addr.addressLine1, addr.city, addr.regionCode].filter(Boolean).join(', ');
      const dateStr = r.createdAt?.localDateTimeForBusiness || '';
      const date = dateStr
        ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : '';
      return {
        id: r.encid,
        name: biz?.name || 'Unknown',
        alias: biz?.alias || '',
        rating: r.rating,
        text: (r.text?.full || '').replace(/&#x27;/g, "'").replace(/&amp;/g, '&'),
        date, address, city: addr.city || '', lat: null, lng: null,
        url: biz?.alias ? `https://www.yelp.com/biz/${biz.alias}` : '',
        categories: (biz?.categories || []).map(c => c?.localizedTitle || '').filter(Boolean),
      };
    });
}

// ── Find review objects anywhere in a JSON tree ───────────────────────────
function findReviewsInJson(obj, seen, dest, depth = 0) {
  if (depth > 8 || !obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(item => findReviewsInJson(item, seen, dest, depth + 1));
    return;
  }
  const hasRating = typeof obj.rating === 'number' && obj.rating >= 1 && obj.rating <= 5;
  const textVal = typeof obj.text === 'string' ? obj.text : (obj.text?.full || '');
  const hasBiz = obj.business || obj.businessName;
  if (hasRating && (textVal || hasBiz)) {
    const id = obj.id || obj.encid || obj.reviewId || '';
    if (id && !seen.has(id)) {
      seen.add(id);
      const biz = obj.business || {};
      const loc = biz.location || {};
      const address = [loc.address1 || loc.addressLine1, loc.city, loc.state || loc.regionCode].filter(Boolean).join(', ');
      const rawDate = obj.createdAt?.localDateTimeForBusiness || obj.createdAt || obj.date || '';
      let date = '';
      try { if (rawDate) date = new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); } catch {}
      dest.push({
        id, rating: obj.rating,
        name: biz.name || obj.businessName || 'Unknown',
        alias: biz.alias || '',
        text: textVal.replace(/&#x27;/g, "'").replace(/&amp;/g, '&'),
        date, address, city: loc.city || '',
        lat: loc.latitude || null, lng: loc.longitude || null,
        url: biz.alias ? `https://www.yelp.com/biz/${biz.alias}` : '',
        categories: (biz.categories || []).map(c => c?.localizedTitle || '').filter(Boolean),
      });
    }
    return;
  }
  Object.values(obj).forEach(val => findReviewsInJson(val, seen, dest, depth + 1));
}

// ── Puppeteer scraper — intercepts live GraphQL calls instead of parsing HTML ──
async function scrapeWithPuppeteer() {
  const executablePath = CHROME_PATHS.find(p => fs.existsSync(p));
  if (!executablePath) throw new Error('Chrome not found. Install Google Chrome.');

  console.log('  Launching Chrome at:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,900',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const allReviews = [];
    const seenIds = new Set();

    // Capture reviews from every JSON response Yelp makes (GraphQL, REST, whatever)
    page.on('response', async (response) => {
      const ct = response.headers()['content-type'] || '';
      if (!ct.includes('json')) return;
      try {
        const json = await response.json();
        findReviewsInJson(json, seenIds, allReviews);
      } catch {}
    });

    const url = `https://www.yelp.com/user_details?userid=${YELP_USER_ID}`;
    console.log(`  Navigating to: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    } catch {
      // networkidle2 can time out — continue anyway
    }
    await sleep(3000);

    // Also try Apollo state as a bonus source
    let state = await page.evaluate(() => {
      try { return window.yelp?.react_apollo_state || null; } catch { return null; }
    });
    if (!state) {
      const html = await page.content();
      if (html.toLowerCase().includes('captcha')) {
        console.log('  CAPTCHA detected');
        return allReviews;
      }
      state = extractApolloState(html);
    }
    if (state) {
      resolveReviews(state).forEach(r => {
        if (r.id && !seenIds.has(r.id)) { seenIds.add(r.id); allReviews.push(r); }
      });
    }
    console.log(`  After page load: ${allReviews.length} reviews`);

    // Scroll to trigger infinite-scroll loading
    let prevCount = 0;
    let noNewStreak = 0;
    while (noNewStreak < 3) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(2500);
      if (allReviews.length === prevCount) noNewStreak++;
      else noNewStreak = 0;
      prevCount = allReviews.length;
      console.log(`  Reviews: ${allReviews.length}  (no-new streak: ${noNewStreak})`);
    }

    return allReviews;
  } finally {
    await browser.close();
  }
}

async function tryYelpScrape() {
  // First try axios (fast, may be blocked)
  try {
    const { data } = await axios.get(
      `https://www.yelp.com/user_details?userid=${YELP_USER_ID}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 15000
      }
    );
    if (!data.includes('captcha') && !data.includes('CAPTCHA')) {
      const state = extractApolloState(data);
      if (state) {
        const reviews = resolveReviews(state);
        if (reviews.length > 0) return reviews;
      }
    }
  } catch {}

  // Fall back to real Chrome
  console.log('  axios blocked, trying puppeteer...');
  return scrapeWithPuppeteer();
}

// ── Yelp Reviews API ───────────────────────────────────────────────────────
// DELETE clears the cache so the next GET triggers a fresh scrape
app.delete('/api/yelp-reviews', (req, res) => {
  try { if (fs.existsSync(YELP_DATA)) fs.unlinkSync(YELP_DATA); } catch {}
  res.json({ ok: true });
});

app.get('/api/yelp-reviews', async (req, res) => {
  // Primary: read from saved data.json (skip if ?force=true)
  if (!req.query.force && fs.existsSync(YELP_DATA)) {
    try {
      const saved = JSON.parse(fs.readFileSync(YELP_DATA, 'utf8'));
      if (saved.length > 0) return res.json(saved);
    } catch {}
  }

  // Fallback: try live scrape
  try {
    const reviews = await tryYelpScrape();
    if (reviews.length > 0) {
      // Geocode and save
      for (let i = 0; i < reviews.length; i++) {
        if (!reviews[i].lat && reviews[i].address) {
          const coords = await geocode(reviews[i].address);
          if (coords) { reviews[i].lat = coords.lat; reviews[i].lng = coords.lng; }
          await sleep(1200);
        }
      }
      fs.writeFileSync(YELP_DATA, JSON.stringify(reviews, null, 2));
      return res.json(reviews);
    }
  } catch (e) { console.error('Scrape error:', e.message); }

  res.status(503).json({
    error: 'No saved review data found.',
    hint: 'Use /yelp/import.html to import your reviews, or run: node yelp/seed-data.js'
  });
});

// Import reviews from browser bookmarklet export
app.post('/api/import-reviews', async (req, res) => {
  let incoming = req.body;
  if (!Array.isArray(incoming)) return res.status(400).json({ error: 'Expected JSON array' });

  // Merge with existing
  let existing = [];
  if (fs.existsSync(YELP_DATA)) {
    try { existing = JSON.parse(fs.readFileSync(YELP_DATA, 'utf8')); } catch {}
  }
  const existingIds = new Set(existing.map(r => r.id));
  const newOnes = incoming.filter(r => r.id && !existingIds.has(r.id));

  console.log(`Importing ${newOnes.length} new reviews (${incoming.length} total in file)...`);

  // Geocode new reviews that lack coordinates
  for (let i = 0; i < newOnes.length; i++) {
    const r = newOnes[i];
    if (!r.lat && r.address) {
      const coords = await geocode(r.address);
      if (coords) { r.lat = coords.lat; r.lng = coords.lng; }
      await sleep(1200);
    }
  }

  const merged = [...newOnes, ...existing];
  fs.writeFileSync(YELP_DATA, JSON.stringify(merged, null, 2));
  res.json({ ok: true, total: merged.length, added: newOnes.length });
});

// Single geocode
app.get('/api/geocode', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing q param' });
  const coords = await geocode(q);
  if (coords) res.json(coords);
  else res.status(404).json({ error: 'Not found' });
});

// Autocomplete suggestions for bucket list input
app.get('/api/geocode-suggest', async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);
  try {
    const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q, format: 'json', limit: 6, addressdetails: 1 },
      headers: { 'User-Agent': 'kimmylubs-portfolio/1.0' },
      timeout: 5000,
    });
    const results = data.map(r => {
      const addr = r.address || {};
      const city = addr.city || addr.town || addr.village || addr.county || r.display_name.split(',')[0].trim();
      const country = addr.country || '';
      const label = country ? `${city}, ${country}` : city;
      return { label, lat: parseFloat(r.lat), lng: parseFloat(r.lon) };
    }).filter((r, i, arr) => arr.findIndex(x => x.label === r.label) === i); // dedupe
    res.json(results);
  } catch { res.json([]); }
});

// Bucket list data persistence
const BUCKETLIST_FILE = path.join(__dirname, 'bucketlist', 'pins.json');

app.get('/api/bucketlist', (req, res) => {
  if (fs.existsSync(BUCKETLIST_FILE)) {
    try { return res.json(JSON.parse(fs.readFileSync(BUCKETLIST_FILE, 'utf8'))); } catch {}
  }
  res.json([]);
});

app.post('/api/bucketlist', (req, res) => {
  const pins = req.body;
  if (!Array.isArray(pins)) return res.status(400).json({ error: 'Expected array' });
  fs.writeFileSync(BUCKETLIST_FILE, JSON.stringify(pins, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`\n✦ Server running at http://localhost:${PORT}`);
  console.log(`  Home:        http://localhost:${PORT}`);
  console.log(`  Yelp:        http://localhost:${PORT}/yelp/`);
  console.log(`  Bucket List: http://localhost:${PORT}/bucketlist/`);
  console.log(`  Yelp Import: http://localhost:${PORT}/yelp/import.html\n`);
});
