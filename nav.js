(function () {
  const LINKS = [
    { href: '/',            label: 'Home' },
    { href: '/2048/',       label: '2048' },
    { href: '/allergens/',  label: 'Allergens' },
    { href: '/bucketlist/', label: 'Traveled' },
    { href: '/calculator/', label: 'Calculator' },
    { href: '/cooking/',    label: 'Cooking' },
    { href: '/flappy/',     label: 'Flappy Rabbit' },
    // { href: '/fragments/',  label: 'Fragments' },
    // { href: '/kaling/',     label: 'Kaling' },
    { href: '/memory/',     label: 'Memory' },
    { href: '/pet/',        label: 'Pet' },
    { href: '/shop/',       label: 'Shop' },
    { href: '/travel/',     label: 'Travels' },
    { href: '/unix/',       label: 'Unix' },
    // { href: '/yelp/',       label: 'Yelp' },
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
