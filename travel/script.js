console.log("shop page script loaded!");

let map;
let countries = [];
let countryColors = {}; // Store country-color associations

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: 0, lng: 0 },
    mapTypeId: "terrain",
  });

  // Load country boundaries from GeoJSON file
  const response = await fetch("countries.geojson");
  const data = await response.json();

  // Create a feature for each country
  data.features.forEach((feature) => {
    const country = new google.maps.Data.Feature({
      geometry: new google.maps.Data.Point(feature.geometry.coordinates),
      properties: {
        name: feature.properties.name,
      },
    });
    countries.push(country);
  });

  // Add the features to the map
  const dataLayer = new google.maps.DataLayer({
    map: map,
    features: countries,
  });

  // Style the features based on their properties
  dataLayer.setStyle((feature) => {
    const countryName = feature.getProperty("name");
    const color = countryColors[countryName] || "#ffffff"; // Default color if not set
    return {
      fillColor: color,
      strokeColor: "#000",
      strokeWeight: 1,
    };
  });

  // Populate the country dropdown
  const countrySelector = document.getElementById("country-selector");
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.text = country.getProperty("name");
    option.value = country.getProperty("name");
    countrySelector.appendChild(option);
  });

  // Add event listener to apply color changes
  document.getElementById("apply-color").addEventListener("click", () => {
    const selectedCountry = countrySelector.value;
    const newColor = document.getElementById("color-picker").value;
    countryColors[selectedCountry] = newColor;
    dataLayer.setStyle((feature) => {
      const countryName = feature.getProperty("name");
      const color = countryColors[countryName] || "#ffffff"; // Default color if not set
      return {
        fillColor: color,
        strokeColor: "#000",
        strokeWeight: 1,
      };
    });
  });
}