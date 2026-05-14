const axios = require('axios');
const cheerio = require('cheerio');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.yelp.com/',
};

function extractApolloState(html) {
  const $ = cheerio.load(html);
  let state = null;
  $('script').each((i, el) => {
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
    try { state = JSON.parse(jsonPart.slice(0, end)); } catch (e) { console.error('Parse:', e.message); }
  });
  return state;
}

function resolveReviews(state) {
  const reviewKeys = Object.keys(state).filter(k => k.startsWith('Review:'));
  const results = [];
  reviewKeys.forEach(rk => {
    const r = state[rk];
    const biz = r.business?.__ref ? state[r.business.__ref] : null;
    const loc = biz?.location?.__ref ? state[biz.location.__ref] : null;
    const dateStr = r.createdAt?.localDateTimeForBusiness || '';
    const date = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
    results.push({
      id: r.encid,
      name: biz?.name || 'Unknown',
      alias: biz?.alias,
      rating: r.rating,
      text: r.text?.full?.replace(/&#x27;/g, "'").replace(/&amp;/g, '&') || '',
      date,
      address: loc ? [loc.address1, loc.city, loc.state].filter(Boolean).join(', ') : '',
      city: loc?.city || '',
      lat: loc?.latitude || null,
      lng: loc?.longitude || null,
      url: biz?.alias ? `https://www.yelp.com/biz/${biz.alias}` : '',
      categories: biz?.categories?.map(c => c?.localizedTitle || c?.title || '').filter(Boolean) || [],
    });
  });
  return results;
}

async function run() {
  // Profile page shows most recent 5 reviews
  const { data } = await axios.get(
    `https://www.yelp.com/user_details?userid=FKPUeSBvXP5vde2FSJOGow`,
    { headers: HEADERS, timeout: 20000 }
  );

  const state = extractApolloState(data);
  if (!state) { console.log('No state found'); return; }

  console.log('Total state keys:', Object.keys(state).length);
  // Print ROOT_QUERY structure
  const rq = state['ROOT_QUERY'];
  if (rq) {
    console.log('ROOT_QUERY keys:', Object.keys(rq).join(', '));
  }

  const reviews = resolveReviews(state);
  console.log('\nResolved reviews:', reviews.length);
  reviews.forEach(r => {
    console.log(`  ${r.name} | ${r.rating}★ | ${r.city} | lat:${r.lat} | ${r.date}`);
  });

  // Check if LocationByCoords are stored
  const locKeys = Object.keys(state).filter(k => k.startsWith('BusinessLocation:'));
  if (locKeys.length > 0) {
    console.log('\nSample BusinessLocation:', JSON.stringify(state[locKeys[0]], null, 2));
  }
}

run().catch(e => console.error('Fatal:', e.message));
