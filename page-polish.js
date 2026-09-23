// Loaded only on opted-in pages; Unix and Tools keep their existing behavior.
const siteNav = document.querySelector('body > nav');
if (siteNav) {
  siteNav.setAttribute('aria-label', 'Main navigation');
  siteNav.querySelector('a.active')?.setAttribute('aria-current', 'page');
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--site-nav-height', `${siteNav.offsetHeight}px`);
  }).observe(siteNav);
}
