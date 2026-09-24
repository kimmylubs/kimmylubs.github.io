# Country map data

`visited-countries.json` contains the unique country codes from the existing travel list in `data.js`. Add or remove a two-letter country code here to change the filled countries. GB is the United Kingdom; XK is Kosovo. Cities and itinerary destinations do not appear on this map.

`countries.geojson` contains Natural Earth 1:50m Admin 0 country boundaries, with coordinates rounded to three decimals and properties reduced to country names and codes. Antarctica is omitted.

Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/

## Publishing from the UI

Use **Add country**, choose a country, and prepare the update. The page reads the latest public country list from GitHub, adds the selected code, and offers a copy button and a link to GitHub's file editor. Replace the editor contents with the copied list, review the diff, then commit to main using your GitHub login. Prepare a fresh list if other edits may have happened in the meantime.

No credentials are requested or stored by the site, and it makes no write API calls. Preparing or copying a list does not change the map or claim a successful save. The public map updates when the GitHub commit is deployed. Already-published countries are detected before preparing a draft.
