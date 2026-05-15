import { itemList } from './allergenList.js';
import { ProductList } from './productList.js';

function render(ul, items, query) {
  const filtered = (query.trim()
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : items).slice().sort((a, b) => a.localeCompare(b));
  ul.innerHTML = filtered.length
    ? filtered.map(i => `<li>${i}</li>`).join('')
    : '<li class="result-hint">No results.</li>';
}

window.toggle = function(id) {
  document.getElementById(id).classList.toggle('open');
};

const allergenSearch = document.getElementById('allergen-search');
const allergenResults = document.getElementById('allergen-results');
const productSearch   = document.getElementById('product-search');
const productResults  = document.getElementById('product-results');

document.getElementById('allergen-count').textContent = itemList.length;
document.getElementById('product-count').textContent  = ProductList.length;

allergenSearch.addEventListener('input', () => render(allergenResults, itemList, allergenSearch.value));
productSearch.addEventListener('input',  () => render(productResults,  ProductList, productSearch.value));

// populate when opened
document.getElementById('allergen-section').addEventListener('click', function onFirst() {
  render(allergenResults, itemList, '');
  this.removeEventListener('click', onFirst);
});
document.getElementById('product-section').addEventListener('click', function onFirst() {
  render(productResults, ProductList, '');
  this.removeEventListener('click', onFirst);
});
