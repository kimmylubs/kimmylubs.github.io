(function () {
  const LINKS = [
    { href: '/',            label: 'Home' },
    { href: '/tools/',      label: 'Tools' },
    { href: '/games/',      label: 'Games' },
    { href: '/guestbook/',  label: 'Guestbook' },
    { href: '/storybook/',  label: 'Storybook' },
    { href: '/study/',      label: 'Study' },
    { href: '/bucketlist/', label: 'Travel' },
  ];

  const path = location.pathname;

  const nav = document.createElement('nav');
  nav.innerHTML = '<ul>' + LINKS.map(({ href, label }) => {
    const active = href === '/'
      ? (path === '/' || path === '/index.html')
      : path.startsWith(href);
    return `<li><a href="${href}"${active ? ' class="active"' : ''}>${label}</a></li>`;
  }).join('') + '</ul>';

  document.body.insertBefore(nav, document.body.firstChild);
})();
