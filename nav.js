(function () {
  const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/bucketlist/', label: 'Travel', pages: ['/bucketlist/', '/travel/'] },
    { href: '/yelp/', label: 'Yelp', pages: ['/yelp/', '/yelp/nyc/', '/yelp/nyctogo/'] },
    { href: '/tools/', label: 'Tools', pages: ['/tools/', '/unix/', '/calculator/', '/allergens/', '/study/'] },
    { href: '/games/', label: 'Games', pages: ['/games/', '/2048/', '/flappy/', '/cooking/', '/memory/'] },
    { href: '/kaling/', label: 'MapleStory', pages: ['/kaling/', '/fragments/'] },
    { href: '/storybook/', label: 'Storybook' },
    { href: '/guestbook/', label: 'Guestbook' },
  ];

  const path = location.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML = '<ul>' + LINKS.map(({ href, label, pages }) => {
    const active = pages ? pages.includes(path) : path === href;
    return `<li><a href="${href}"${active ? ` class="active" aria-current="${path === href ? 'page' : 'true'}"` : ''}>${label}</a></li>`;
  }).join('') + '</ul>';

  const style = document.createElement('style');
  style.textContent = `
    .site-nav { flex-shrink: 0; }
    .site-nav a { white-space: nowrap; }
    .section-tabs { display:flex; gap:6px; padding:10px 16px; background:#f8f5fc; border-bottom:1px solid #e4daed; overflow-x:auto; flex-shrink:0; }
    .section-tabs a { flex-shrink:0; border-radius:16px; padding:6px 14px; font-size:13px; font-weight:800; color:#77568f; background:#eee5f5; text-decoration:none; }
    .section-tabs a[aria-current="page"] { background:#795598; color:white; }
    .travel-tabs { overflow-x:auto; }
    .travel-tabs .travel-tab { flex-shrink:0; white-space:nowrap; text-decoration:none; }

    @media (max-width: 700px) {
      .site-nav { padding: 6px 8px; }
      .site-nav ul { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; }
      .site-nav li { flex-shrink: 0; }
      .site-nav a { padding: 10px 12px; font-size: 13px; }
    }
  `;
  document.head.appendChild(style);
  document.body.insertBefore(nav, document.body.firstChild);
  const toolPages = LINKS.find(link => link.href === '/tools/').pages;
  const gamePages = LINKS.find(link => link.href === '/games/').pages;
  const maplePages = LINKS.find(link => link.href === '/kaling/').pages;
  let tabs = null, sectionName = 'Travel';
  if (toolPages.includes(path)) {
    sectionName = 'Tools';
    tabs = [['/tools/', 'Tools'], ['/unix/', 'Unix'], ['/calculator/', 'Calculator'], ['/allergens/', 'Allergens'], ['/study/', 'Study']];
  } else if (gamePages.includes(path)) {
    sectionName = 'Games';
    tabs = [['/games/', 'Games'], ['/2048/', '2048'], ['/flappy/', 'Flappy Rabbit'], ['/cooking/', 'Cooking'], ['/memory/', 'Memory Match']];
  } else if (maplePages.includes(path)) {
    sectionName = 'MapleStory';
    tabs = [['/kaling/', 'Kaling'], ['/fragments/', 'Fragments']];
  } else if (path === '/travel/') {
    tabs = [['/bucketlist/', 'Travel Map'], ['/travel/', 'Travel Guides']];
  }
  if (tabs) {
    const section = document.createElement('div');
    section.className = 'section-tabs';
    section.setAttribute('role', 'navigation');
    section.setAttribute('aria-label', `${sectionName} pages`);
    section.innerHTML = tabs.map(([href, label]) => `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    nav.after(section);
  }
})();
