(function () {
  const LINKS = [
    { href: '/',            label: 'Home' },
    { href: '/allergens/',  label: 'Allergens' },
    { href: '/calculator/', label: 'Calculator' },
    { href: '/unix/',       label: 'Unix' },
    { href: '/bucketlist/', label: 'Travel' },
    { href: '/games/',      label: 'Games' },
    { href: '/storybook/',  label: 'Storybook' },
    { href: '/guestbook/',  label: 'Guestbook' },

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
