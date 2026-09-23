// Loaded only on opted-in pages; Unix and Tools keep their existing behavior.
const siteNav = document.querySelector('body > nav');
if (siteNav) {
  siteNav.setAttribute('aria-label', 'Main navigation');
  const sectionTabs = document.querySelector('body > .section-tabs');
  const observer = new ResizeObserver(() => {
    document.documentElement.style.setProperty('--site-nav-height', `${siteNav.offsetHeight + (sectionTabs?.offsetHeight || 0)}px`);
  });
  observer.observe(siteNav);
  if (sectionTabs) observer.observe(sectionTabs);
}
