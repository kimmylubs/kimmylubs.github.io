let map;
let countries = [];
let countryColors = {};

// Create the map
map = L.map("map").setView([0, 0], 2);

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>",
  subdomains: ["a", "b", "c"],
}).addTo(map);

// Load country boundaries from GeoJSON file
fetch("countries.geojson")
 .then(response => response.json())
 .then(data => {
    // Create a feature for each country
    data.features.forEach(feature => {
      const country = L.geoJSON(feature, {
        style: feature => {
          const countryName = feature.properties.name;
          const color = countryColors[countryName] || "#ffffff"; // Default color if not set
          return {
            fillColor: color,
            strokeColor: "#000",
            strokeWeight: 1,
          };
        },
      });
      countries.push(country);
      map.addLayer(country);
    });

    // Populate the country dropdown
    const countrySelector = document.getElementById("country-selector");
    countries.forEach(country => {
      const option = document.createElement("option");
      option.text = country.feature.properties.name;
      option.value = country.feature.properties.name;
      countrySelector.appendChild(option);
    });

    // Add event listener to apply color changes
    document.getElementById("apply-color").addEventListener("click", () => {
      const selectedCountry = countrySelector.value;
      const newColor = document.getElementById("color-picker").value;
      countryColors[selectedCountry] = newColor;
      countries.forEach(country => {
        if (country.feature.properties.name === selectedCountry) {
          country.setStyle({
            fillColor: newColor,
          });
        }
      });
    });
  });