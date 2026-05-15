// Pre-loaded places. Each has: id, name, lat, lng, year, region
window.INITIAL_PLACES = [
  // Study Abroad
  { id: 'kr-seoul',     name: 'Seoul, South Korea',    lat: 37.5665,  lng: 126.9780,  year: 'study', region: 'ASIA' },

  // 2023 – Asia
  { id: 'jp-tokyo',     name: 'Tokyo, Japan',           lat: 35.6762,  lng: 139.6503,  year: '2023',  region: 'ASIA' },
  { id: 'jp-osaka',     name: 'Osaka, Japan',           lat: 34.6937,  lng: 135.5023,  year: '2023',  region: 'ASIA' },
  { id: 'jp-kyoto',     name: 'Kyoto, Japan',           lat: 35.0116,  lng: 135.7681,  year: '2023',  region: 'ASIA' },

  // 2023 – Europe
  { id: 'uk-london',    name: 'London, UK',             lat: 51.5074,  lng: -0.1278,   year: '2023',  region: 'EU' },
  { id: 'fr-paris',     name: 'Paris, France',          lat: 48.8566,  lng: 2.3522,    year: '2023',  region: 'EU' },
  { id: 'nl-amsterdam', name: 'Amsterdam, Netherlands', lat: 52.3676,  lng: 4.9041,    year: '2023',  region: 'EU' },
  { id: 'is-reykjavik', name: 'Reykjavik, Iceland',     lat: 64.1355,  lng: -21.8954,  year: '2023',  region: 'EU' },

  // 2024 – Asia
  { id: 'ph-manila',    name: 'Manila, Philippines',    lat: 14.5995,  lng: 120.9842,  year: '2024',  region: 'ASIA' },
  { id: 'ph-boracay',   name: 'Boracay, Philippines',   lat: 11.9674,  lng: 121.9248,  year: '2024',  region: 'ASIA' },
  { id: 'sg',           name: 'Singapore',              lat: 1.3521,   lng: 103.8198,  year: '2024',  region: 'ASIA' },
  { id: 'my-kl',        name: 'Kuala Lumpur, Malaysia', lat: 3.1390,   lng: 101.6869,  year: '2024',  region: 'ASIA' },
  { id: 'vn-hcmc',      name: 'Ho Chi Minh City, Vietnam', lat: 10.8231, lng: 106.6297, year: '2024', region: 'ASIA' },
  { id: 'th-bangkok',   name: 'Bangkok, Thailand',      lat: 13.7563,  lng: 100.5018,  year: '2024',  region: 'ASIA' },
  { id: 'kh-pp',        name: 'Phnom Penh, Cambodia',   lat: 11.5564,  lng: 104.9282,  year: '2024',  region: 'ASIA' },

  // 2024 – Oceania
  { id: 'au-melb',      name: 'Melbourne, Australia',   lat: -37.8136, lng: 144.9631,  year: '2024',  region: 'OCEANIA' },
  { id: 'nz-auckland',  name: 'Auckland, New Zealand',  lat: -36.8509, lng: 174.7645,  year: '2024',  region: 'OCEANIA' },

  // 2024 – North America
  { id: 'ca-toronto',   name: 'Toronto, Canada',        lat: 43.6532,  lng: -79.3832,  year: '2024',  region: 'NA' },

  // 2024 – Europe
  { id: 'ie-dublin',    name: 'Dublin, Ireland',        lat: 53.3498,  lng: -6.2603,   year: '2024',  region: 'EU' },
  { id: 'be-brussels',  name: 'Brussels, Belgium',      lat: 50.8503,  lng: 4.3517,    year: '2024',  region: 'EU' },
  { id: 'lu',           name: 'Luxembourg',             lat: 49.6117,  lng: 6.1319,    year: '2024',  region: 'EU' },
  { id: 'ch-zurich',    name: 'Zurich, Switzerland',    lat: 47.3769,  lng: 8.5417,    year: '2024',  region: 'EU' },
  { id: 'de-munich',    name: 'Munich, Germany',        lat: 48.1351,  lng: 11.5820,   year: '2024',  region: 'EU' },
  { id: 'at-vienna',    name: 'Vienna, Austria',        lat: 48.2082,  lng: 16.3738,   year: '2024',  region: 'EU' },

  // 2025 – Europe (Balkans tour)
  { id: 'gr-athens',    name: 'Athens, Greece',         lat: 37.9838,  lng: 23.7275,   year: '2025',  region: 'EU' },
  { id: 'al-tirana',    name: 'Tirana, Albania',        lat: 41.3275,  lng: 19.8187,   year: '2025',  region: 'EU' },
  { id: 'xk-pristina',  name: 'Pristina, Kosovo',       lat: 42.6629,  lng: 21.1655,   year: '2025',  region: 'EU' },
  { id: 'xk-prizren',   name: 'Prizren, Kosovo',        lat: 42.2150,  lng: 20.7404,   year: '2025',  region: 'EU' },
  { id: 'mk-ohrid',     name: 'Ohrid, N. Macedonia',    lat: 41.1165,  lng: 20.8012,   year: '2025',  region: 'EU' },
  { id: 'mk-stnaum',    name: 'St. Naum, N. Macedonia', lat: 40.9166,  lng: 20.7468,   year: '2025',  region: 'EU' },
  { id: 'me-budva',     name: 'Budva, Montenegro',      lat: 42.2875,  lng: 18.8406,   year: '2025',  region: 'EU' },
  { id: 'me-stefan',    name: 'Sveti Stefan, Montenegro', lat: 42.2532, lng: 18.8942,   year: '2025',  region: 'EU' },
  { id: 'ba-sarajevo',  name: 'Sarajevo, Bosnia',       lat: 43.8564,  lng: 18.4131,   year: '2025',  region: 'EU' },
  { id: 'cz-prague',    name: 'Prague, Czechia',        lat: 50.0755,  lng: 14.4378,   year: '2025',  region: 'EU' },
  { id: 'sk-brat',      name: 'Bratislava, Slovakia',   lat: 48.1486,  lng: 17.1077,   year: '2025',  region: 'EU' },
  { id: 'hu-budapest',  name: 'Budapest, Hungary',      lat: 47.4979,  lng: 19.0402,   year: '2025',  region: 'EU' },
  { id: 'si-lj',        name: 'Ljubljana, Slovenia',    lat: 46.0569,  lng: 14.5058,   year: '2025',  region: 'EU' },
  { id: 'hr-zagreb',    name: 'Zagreb, Croatia',        lat: 45.8150,  lng: 15.9819,   year: '2025',  region: 'EU' },
  { id: 'mt-valletta',  name: 'Valletta, Malta',        lat: 35.8989,  lng: 14.5145,   year: '2025',  region: 'EU' },

  // 2026 – Europe
  { id: 'uk-leeds',     name: 'Leeds, UK',              lat: 53.8008,  lng: -1.5491,   year: '2026',  region: 'EU' },
  { id: 'uk-hull',      name: 'Hull, UK',               lat: 53.7457,  lng: -0.3367,   year: '2026',  region: 'EU' },
  { id: 'nl-amsterdam-26', name: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041,  year: '2026',  region: 'EU' },
];
