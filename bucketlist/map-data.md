# Country map data

`visited-countries.json` contains the unique country codes from the existing travel list in `data.js`. Add or remove a two-letter country code here to change the filled countries. GB is the United Kingdom; XK is Kosovo. Cities and itinerary destinations do not appear on this map.

`countries.geojson` contains Natural Earth 1:50m Admin 0 country boundaries, with coordinates rounded to three decimals and properties reduced to country names and codes. Antarctica is omitted.

Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/

## Publishing from the UI

Use **Add country** on the map or Countries tab. Select an unvisited country and publish with a fine-grained GitHub token limited to this repository with Contents read/write. The token is sent only to the GitHub API, never persisted, and cleared after each publish attempt or closing the dialog. No automatic/background writes occur.

The publisher fetches the latest `main` file and SHA before adding a code; existing countries are preserved and conflicts require a retry. It updates the current map after a successful commit. Other visitors see the addition once GitHub Pages deploys. Already-published countries create no duplicate commit. Tests use mock responses and do not change real travel history.
