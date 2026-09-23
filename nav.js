(function () {
  const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/bucketlist/', label: 'Visited Countries' },
    { href: '/yelp/', label: 'Yelp · Worldwide' },
    { href: '/yelp/nyc/', label: 'NYC · Visited' },
    { href: '/yelp/nyctogo/', label: 'NYC · To Go' },
    { href: '/travel/', label: 'Travel Guides' },
    { href: '/tools/', label: 'Tools' },
    { href: '/unix/', label: 'Unix' },
    { href: '/calculator/', label: 'Calculator' },
    { href: '/allergens/', label: 'Allergens' },
    { href: '/cooking/', label: 'Cooking' },
    { href: '/games/', label: 'Games' },
    { href: '/2048/', label: '2048' },
    { href: '/flappy/', label: 'Flappy Rabbit' },
    { href: '/memory/', label: 'Memory Match' },
    { href: '/pet/', label: 'Pet' },
    { href: '/kaling/', label: 'Kaling' },
    { href: '/study/', label: 'Study' },
    { href: '/storybook/', label: 'Storybook' },
    { href: '/fragments/', label: 'Fragments' },
    { href: '/guestbook/', label: 'Guestbook' },
    { href: '/shop/', label: 'Shop' },
  ];

  const path = location.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML = '<ul>' + LINKS.map(({ href, label }) => {
    const active = path === href;
    return `<li><a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`;
  }).join('') + '</ul>';

  const style = document.createElement('style');
  style.textContent = `
    .site-nav { flex-shrink: 0; }
    .site-nav a { white-space: nowrap; }
    @media (max-width: 700px) {
      .site-nav { padding: 6px 8px; }
      .site-nav ul { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; }
      .site-nav li { flex-shrink: 0; }
      .site-nav a { padding: 10px 12px; font-size: 13px; }
    }
  `;
  document.head.appendChild(style);
  document.body.insertBefore(nav, document.body.firstChild);
})();
