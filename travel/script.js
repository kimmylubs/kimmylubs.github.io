console.log('runnin');
const countries = [
  { name: "Afghanistan", code: "AFG", d: "M 10 20 L 30 40 L 50 60 L 70 80 Z" },
  { name: "Albania", code: "ALB", d: "M 15 25 L 35 45 L 55 65 L 75 85 Z" },
  // Add all countries here, with their corresponding d attribute values
];

const map = document.getElementById("map");
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
map.appendChild(svg);

countries.forEach((country) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", country.d); // Use the d attribute value from the country object
  path.setAttribute("fill", "#ccc"); // default color
  svg.appendChild(path);
});