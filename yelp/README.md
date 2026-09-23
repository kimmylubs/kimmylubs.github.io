# Visited places map

This page shows businesses from Kimberly's published Yelp review list. `data.json` contains the 882 places collected across all 89 review pages on September 23, 2026. Drafts, photos-only activities, and other users' reviews are excluded. The public profile review count was 882, matching the imported total; all business URLs were unique.

## Map locations

Places are grouped into city areas, with neighborhood names preserved on each place. `areaLat` and `areaLng` are city-center coordinates from OpenStreetMap Nominatim, not business addresses. NYC boroughs are combined as New York City; local municipalities elsewhere remain separate. A city's marker count is the number of businesses in that group. Nearby city pins combine at low zoom levels and separate as users zoom in.

Some records also contain independently observed `lat` / `lng` from Yelp's visible business map. These are retained as source information; the current map deliberately uses city centers consistently. Santolla is grouped with Puerto Natales based on its displayed Yelp business map location, despite the profile card saying Punta Arenas.

## Updating

Update `data.json` with published business names, original location labels, Yelp URLs, normalized `area` names, and geocoded `areaLat` / `areaLng`. Keep the same city coordinates for every place in a group. Preserve the distinction between city centers and business locations. The old `import.html` imports review-format records for the local server; it does not prepare this grouped map format.

The map is static and works on GitHub Pages without the Node server. No Yelp credentials or API keys are included. Data provenance is recorded in `data-source.json`.

Location data © OpenStreetMap contributors, ODbL: https://www.openstreetmap.org/copyright

## NYC

`/yelp/nyc/` shows the 419 NYC businesses in 70 neighborhood-area groups, with borough filtering. Coordinates represent neighborhood areas, not exact business addresses. Broader original location labels remain explicitly unspecified. NYC data provenance is in `nyc/data-source.json`.

## NYC to go

`/yelp/nyctogo/` contains all 82 businesses in the Want to go collection as of September 23, 2026. There are 68 business-map locations and 14 explicitly labeled approximate area locations. The list is a static snapshot, with its source linked on the map. Bookmarks stay separate from visited places. Business addresses and borough filters support finding a next stop.
