// Run: node yelp/seed-data.js
// Fetches Yelp profile page, extracts reviews, geocodes, saves to yelp/data.json

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const YELP_USER_ID = 'FKPUeSBvXP5vde2FSJOGow';
const OUT_FILE = path.join(__dirname, 'data.json');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function geocode(query) {
  try {
    const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: query, format: 'json', limit: 1 },
      headers: { 'User-Agent': 'kimmylubs-portfolio/1.0' },
      timeout: 8000,
    });
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (e) { console.warn(`  geocode failed: ${e.message}`); }
  return null;
}

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

async function main() {
  // Load existing data if any
  let existing = [];
  if (fs.existsSync(OUT_FILE)) {
    try { existing = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')); }
    catch {}
  }
  const existingIds = new Set(existing.map(r => r.id));

  // Try to fetch from Yelp
  let newReviews = [];
  try {
    const { data } = await axios.get(
      `https://www.yelp.com/user_details?userid=${YELP_USER_ID}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 20000
      }
    );

    const state = extractApolloState(data);
    if (!state) { console.log('No Apollo state found — Yelp may be blocking this request.'); }
    else {
      const keys = Object.keys(state).filter(k => k.startsWith('Review:'));
      newReviews = keys
        .map(rk => {
          const r = state[rk];
          const biz = r.business?.__ref ? state[r.business.__ref] : null;
          const locRef = biz?.location?.__ref;
          const loc = locRef ? state[locRef] : null;
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
            date,
            address,
            city: addr.city || '',
            lat: null, lng: null,
            url: biz?.alias ? `https://www.yelp.com/biz/${biz.alias}` : '',
          };
        })
        .filter(r => r.id && !existingIds.has(r.id));
    }
  } catch (e) {
    console.log('Yelp fetch error:', e.message);
  }

  console.log(`Found ${newReviews.length} new reviews to geocode`);

  // Geocode new reviews
  for (let i = 0; i < newReviews.length; i++) {
    const r = newReviews[i];
    if (r.address) {
      process.stdout.write(`  Geocoding "${r.name}" (${r.address})...`);
      const coords = await geocode(r.address);
      if (coords) { r.lat = coords.lat; r.lng = coords.lng; process.stdout.write(' ✓\n'); }
      else process.stdout.write(' ✗\n');
      await sleep(1200);
    }
  }

  const all = [...newReviews, ...existing];
  fs.writeFileSync(OUT_FILE, JSON.stringify(all, null, 2));
  console.log(`\nSaved ${all.length} reviews to yelp/data.json`);
  console.log('(Run again any time to pick up new reviews from your profile page)');
}

main().catch(e => console.error(e.message));
