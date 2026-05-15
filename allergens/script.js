function render(ul, items, query) {
  const filtered = (query.trim()
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : [...items]
  ).sort((a, b) => a.localeCompare(b));
  ul.innerHTML = filtered.length
    ? filtered.map(i => `<li>${i}</li>`).join('')
    : '<li class="result-hint">No results.</li>';
}

function setupSection(sectionId, toggleId, searchId, resultsId, data) {
  const section = document.getElementById(sectionId);
  const toggle  = document.getElementById(toggleId);
  const search  = document.getElementById(searchId);
  const results = document.getElementById(resultsId);

  toggle.addEventListener('click', () => {
    section.classList.toggle('open');
    if (section.classList.contains('open') && !results.children.length) {
      render(results, data, '');
    }
  });

  search.addEventListener('input', () => render(results, data, search.value));
}

document.getElementById('allergen-count').textContent = window.itemList.length;
document.getElementById('product-count').textContent  = window.ProductList.length;

setupSection('allergen-section', 'allergen-toggle', 'allergen-search', 'allergen-results', window.itemList);
setupSection('product-section',  'product-toggle',  'product-search',  'product-results',  window.ProductList);
