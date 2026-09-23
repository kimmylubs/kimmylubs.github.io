# Publishing reviews

The public map reads `data.json`, so it works on GitHub Pages without a running Node server. The file starts empty because no saved reviews were present. No sample reviews are presented as real ones.

To populate it, run the local server and use `/yelp/import.html` with your exported reviews. The existing importer saves them to `yelp/data.json`. Review that file, then commit and publish it with the website. The public refresh button only reloads saved data; it never deletes reviews or triggers scraping.
