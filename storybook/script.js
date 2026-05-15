const BOOKS = [
  {
    id: 'dumbo',
    title: 'Dumbo',
    emoji: '🐘',
    coverColor: '#c8e6ff',
    spineColor:  '#7fb8e8',
    pages: [
      {
        scene: 's-circus-night',
        char:  '🎪',
        text:  'Once upon a time,\nat a magical travelling circus,\na very special baby was born. 🌟',
      },
      {
        scene: 's-soft-morning',
        char:  '🐘',
        text:  'His name was Jumbo Jr.\n\nBut everyone called him\n\nDumbo.',
      },
      {
        scene: 's-warm-circus',
        char:  '👂',
        text:  'Dumbo had the biggest ears\nanyone had ever seen.\n\nThe other elephants laughed at him.\n\nBut not everyone did.',
      },
      {
        scene: 's-meadow-night',
        char:  '🐭',
        text:  'Timothy Q. Mouse\nwas Dumbo\'s best friend.\n\nHe believed in Dumbo\nmore than anyone else\nin the whole circus.',
      },
      {
        scene: 's-twilight-magic',
        char:  '🪶',
        text:  'Timothy gave Dumbo\na magic feather for luck.\n\n"Hold this," he said,\n"and you can do anything."',
      },
      {
        scene: 's-open-sky',
        char:  '✨',
        text:  'Dumbo leapt from the tower...\n\nand instead of falling...\n\nhe FLEW! 🐘💨\n\nThe whole crowd gasped.',
      },
      {
        scene: 's-golden-sunrise',
        char:  '🌟',
        text:  'He didn\'t need the feather.\n\nHe never did.\n\nThe magic was inside him\nall along.',
      },
      {
        scene: 's-warm-glow',
        char:  '💙',
        text:  'And the lesson Dumbo taught us?\n\nWhat makes you different...\n\nmakes you extraordinary.\n\nThe End. 🎪',
      },
    ],
  },

  {
    id: 'mochi',
    title: 'Mochi the Bunny',
    emoji: '🐰',
    coverColor: '#ffd6e8',
    spineColor:  '#f4a0b5',
    pages: [
      {
        scene: 's-cozy-indoor',
        char:  '🐰',
        text:  'This is Mochi.\n\nShe is very fluffy.\nShe is very round.\nShe is perfect.',
      },
      {
        scene: 's-little-house',
        char:  '🏠',
        text:  'Mochi\'s favourite hobby\nis sitting in her little house\nand judging everyone quietly.',
      },
      {
        scene: 's-summer-garden',
        char:  '🥕',
        text:  'She loves food.\n\nEspecially things\nshe probably shouldn\'t eat.',
      },
      {
        scene: 's-moonlit',
        char:  '💤',
        text:  'Mochi sleeps a LOT.\n\nLike, a lot a lot.\n\nShe has important dreams\nto attend to.',
      },
      {
        scene: 's-cozy-indoor',
        char:  '💕',
        text:  'At the end of every day,\nMochi hops into your arms.\n\nAnd everything\nis okay.\n\nThe End. 🌸',
      },
    ],
  },

  {
    id: 'foods',
    title: 'My Happy Foods',
    emoji: '🍓',
    coverColor: '#ffe0b2',
    spineColor:  '#ffb347',
    pages: [
      {
        scene: 's-summer-garden',
        char:  '🍽️',
        text:  'Some foods\njust make everything better.\n\nThis is a book\nabout those foods.',
      },
      {
        scene: 's-summer-garden',
        char:  '🍓',
        text:  'Strawberries in summer.\n\nCold and sweet and perfect.\n\nThe best thing\nthe world ever made.',
      },
      {
        scene: 's-rainy-window',
        char:  '🍜',
        text:  'Ramen on a rainy day.\n\nSteamy, rich, and warm.\n\nThe second best thing\nthe world ever made.',
      },
      {
        scene: 's-matcha-cafe',
        char:  '🍵',
        text:  'Matcha. Everything.\n\nAlways.\n\nForever.\n\nNo further questions.',
      },
      {
        scene: 's-bakery',
        char:  '🎂',
        text:  'And cake.\n\nAlways, always,\nalways save room\nfor cake.\n\nThe End. 🍰',
      },
    ],
  },

  {
    id: 'poppins',
    title: 'Mary Poppins',
    emoji: '🌂',
    coverColor: '#E3F2FD',
    spineColor:  '#1565C0',
    pages: [
      {
        scene: 's-poppins-arrive',
        char:  '🌂',
        text:  'On the windiest day Cherry Tree Lane\nhad ever seen, something extraordinary\nblow in.\n\nA nanny.\nWith a magic carpet bag.\nAnd a talking parrot umbrella.',
      },
      {
        scene: 's-banks-home',
        char:  '🏠',
        text:  'Jane and Michael Banks had chased away\nevery nanny in London.\n\nBut this one looked down her nose, sniffed,\nand announced she was\n\npractically perfect in every way.',
      },
      {
        scene: 's-sugar-spoon',
        char:  '🥄',
        text:  '"A spoonful of sugar\nhelps the medicine go down!"\n\nWith Mary Poppins, cleaning your room\nwas an adventure.\n\nTidying up was practically magic.\nBecause it was.',
      },
      {
        scene: 's-chalk-world',
        char:  '🎠',
        text:  'Bert drew the most wonderful\nchalk pictures on the pavement.\n\nWith one magical leap — SPLASH —\nthey were inside!\n\nDancing penguins! Carousel horses!\nA whole world in the pavement!',
      },
      {
        scene: 's-chimney-sweep',
        char:  '🎩',
        text:  '"Step in time!\nStep in time!"\n\nThe chimney sweeps danced\nacross every rooftop in London,\nsoot-covered and laughing,\nwhile the whole city sparkled\nfar below.',
      },
      {
        scene: 's-poppins-farewell',
        char:  '🌂',
        text:  'The wind changed.\n\nMary Poppins packed her bag,\ngave the children one last look,\nand floated into the sky.\n\nSome magic doesn\'t stay.\nBut it never truly leaves. ♡',
      },
    ],
  },

  {
    id: 'bloop',
    title: 'Bloop & the Grumpy Dragon',
    emoji: '🐲',
    coverColor: '#FFF9C4',
    spineColor:  '#FF5722',
    pages: [
      {
        scene: 's-toon-field',
        svg: `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="252" rx="45" ry="8" fill="#00000030"/><ellipse cx="110" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 42 158 C 25 148 15 162 22 178" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="20" cy="181" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 178 148 C 195 130 212 118 220 98" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="222" cy="95" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="90" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(-10 90 242)"/><ellipse cx="130" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(10 130 242)"/><circle cx="88" cy="148" r="28" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="132" cy="148" r="28" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="93" cy="154" r="14" fill="#0D47A1"/><circle cx="137" cy="154" r="14" fill="#0D47A1"/><circle cx="97" cy="147" r="6" fill="white"/><circle cx="141" cy="147" r="6" fill="white"/><path d="M 84 178 Q 110 198 136 178" fill="none" stroke="#0D47A1" stroke-width="4" stroke-linecap="round"/><ellipse cx="72" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/><ellipse cx="148" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/></svg>`,
        text: 'This is Bloop.\n\nBloop was a very round,\nvery blue, and very curious\nlittle blob.\n\nOne day, he decided to go\non an adventure.',
      },
      {
        scene: 's-toon-cave',
        svg: `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="252" rx="45" ry="8" fill="#00000030"/><ellipse cx="110" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 42 148 C 22 125 12 105 8 82" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="6" cy="79" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 178 148 C 198 125 208 105 212 82" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="214" cy="79" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="90" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="130" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><circle cx="88" cy="146" r="30" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="132" cy="146" r="30" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="88" cy="146" r="9" fill="#0D47A1"/><circle cx="132" cy="146" r="9" fill="#0D47A1"/><circle cx="91" cy="141" r="4" fill="white"/><circle cx="135" cy="141" r="4" fill="white"/><ellipse cx="110" cy="186" rx="15" ry="18" fill="white" stroke="#0D47A1" stroke-width="4"/><path d="M 186 115 C 193 107 197 99 194 93 C 191 87 184 88 182 94 C 180 100 183 111 186 115 Z" fill="#81D4FA" stroke="#0D47A1" stroke-width="2"/></svg>`,
        text: 'He found a cave.\n\nA very dark,\nvery smoky,\nvery suspicious cave.\n\n"Hmm," said Bloop.\n\n(He went in anyway.)',
      },
      {
        scene: 's-toon-volcano',
        svg: `<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg"><ellipse cx="140" cy="272" rx="55" ry="8" fill="#00000030"/><ellipse cx="140" cy="185" rx="80" ry="72" fill="#66BB6A" stroke="#1B5E20" stroke-width="5"/><ellipse cx="140" cy="195" rx="50" ry="45" fill="#C8E6C9" stroke="#1B5E20" stroke-width="3"/><path d="M 65 155 C 30 130 15 100 28 72 C 42 45 68 58 75 82 C 82 106 76 138 65 155 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><path d="M 215 155 C 250 130 265 100 252 72 C 238 45 212 58 205 82 C 198 106 204 138 215 155 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><rect x="115" y="102" width="50" height="38" rx="20" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="140" cy="90" rx="56" ry="50" fill="#66BB6A" stroke="#1B5E20" stroke-width="5"/><polygon points="118,44 124,22 130,44" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="133,40 140,16 147,40" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="150,44 156,22 162,44" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><ellipse cx="140" cy="102" rx="30" ry="22" fill="#A5D6A7" stroke="#1B5E20" stroke-width="4"/><ellipse cx="130" cy="105" rx="5" ry="4" fill="#1B5E20"/><ellipse cx="150" cy="105" rx="5" ry="4" fill="#1B5E20"/><circle cx="116" cy="74" r="19" fill="white" stroke="#1B5E20" stroke-width="4"/><circle cx="164" cy="74" r="19" fill="white" stroke="#1B5E20" stroke-width="4"/><line x1="98" y1="57" x2="130" y2="65" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><line x1="150" y1="65" x2="182" y2="57" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="78" r="11" fill="#1B5E20"/><circle cx="160" cy="78" r="11" fill="#1B5E20"/><circle cx="124" cy="73" r="4" fill="white"/><circle cx="164" cy="73" r="4" fill="white"/><path d="M 118 117 Q 140 107 162 117" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 65 172 C 75 158 110 152 140 156 C 170 152 205 158 215 172" fill="none" stroke="#1B5E20" stroke-width="7" stroke-linecap="round"/><ellipse cx="108" cy="252" rx="28" ry="16" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="172" cy="252" rx="28" ry="16" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><path d="M 215 215 C 248 225 265 240 258 258" fill="none" stroke="#1B5E20" stroke-width="6" stroke-linecap="round"/><polygon points="256,260 270,250 268,270" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/></svg>`,
        text: 'Inside lived GRUM.\n\nThe grumpiest dragon\nin the whole land.\n\nGrum had not smiled\nin THREE HUNDRED YEARS.\n\n"GO AWAY," said Grum.',
      },
      {
        scene: 's-toon-cozy',
        svg: `<svg viewBox="0 0 240 270" xmlns="http://www.w3.org/2000/svg"><ellipse cx="120" cy="262" rx="45" ry="8" fill="#00000030"/><ellipse cx="120" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 52 162 C 35 172 28 184 30 197" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="29" cy="200" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 188 148 C 208 136 226 128 240 118" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="242" cy="116" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><circle cx="248" cy="104" r="20" fill="#8D5524" stroke="#4E342E" stroke-width="4"/><circle cx="248" cy="104" r="10" fill="#A0522D" stroke="#4E342E" stroke-width="2"/><circle cx="241" cy="97" r="3.5" fill="#3E2723"/><circle cx="255" cy="100" r="3.5" fill="#3E2723"/><circle cx="243" cy="111" r="3.5" fill="#3E2723"/><ellipse cx="98" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(-8 98 242)"/><ellipse cx="142" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(8 142 242)"/><circle cx="96" cy="150" r="27" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="142" cy="150" r="27" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="102" cy="148" r="13" fill="#0D47A1"/><circle cx="147" cy="148" r="13" fill="#0D47A1"/><circle cx="106" cy="143" r="5" fill="white"/><circle cx="151" cy="143" r="5" fill="white"/><path d="M 90 178 Q 118 198 146 178" fill="none" stroke="#0D47A1" stroke-width="4" stroke-linecap="round"/><ellipse cx="78" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/><ellipse cx="154" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/></svg>`,
        text: 'Bloop was not scared.\n\nBloop reached into his bag\nand pulled out a cookie.\n\n"Have you tried..."\nsaid Bloop,\n"...a snack?"',
      },
      {
        scene: 's-toon-sunset',
        svg: `<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg"><ellipse cx="88" cy="272" rx="38" ry="7" fill="#00000025"/><ellipse cx="232" cy="272" rx="52" ry="7" fill="#00000025"/><ellipse cx="88" cy="178" rx="56" ry="64" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 36 162 C 20 172 14 184 16 196" stroke="#0D47A1" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="15" cy="199" r="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3"/><path d="M 140 152 C 160 140 178 140 190 148" stroke="#0D47A1" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="192" cy="150" r="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3"/><ellipse cx="72" cy="236" rx="18" ry="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3" transform="rotate(-8 72 236)"/><ellipse cx="106" cy="236" rx="18" ry="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3" transform="rotate(8 106 236)"/><circle cx="72" cy="161" r="22" fill="white" stroke="#0D47A1" stroke-width="3"/><circle cx="106" cy="161" r="22" fill="white" stroke="#0D47A1" stroke-width="3"/><circle cx="76" cy="165" r="11" fill="#0D47A1"/><circle cx="110" cy="165" r="11" fill="#0D47A1"/><circle cx="79" cy="160" r="4" fill="white"/><circle cx="113" cy="160" r="4" fill="white"/><path d="M 68 184 Q 88 198 110 184" fill="none" stroke="#0D47A1" stroke-width="3" stroke-linecap="round"/><ellipse cx="58" cy="180" rx="10" ry="7" fill="#FF80AB" opacity="0.5"/><ellipse cx="118" cy="180" rx="10" ry="7" fill="#FF80AB" opacity="0.5"/><ellipse cx="232" cy="186" rx="72" ry="66" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="232" cy="196" rx="44" ry="41" fill="#C8E6C9" stroke="#1B5E20" stroke-width="3"/><path d="M 164 156 C 130 132 116 104 128 76 C 142 49 168 60 172 84 C 178 108 172 138 164 156 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><path d="M 300 156 C 334 132 348 104 336 76 C 322 49 296 60 292 84 C 286 108 292 138 300 156 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><rect x="210" y="114" width="44" height="36" rx="18" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="232" cy="100" rx="48" ry="44" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><polygon points="214,60 220,40 226,60" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="226,57 232,36 238,57" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="238,60 244,40 250,60" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><ellipse cx="232" cy="110" rx="26" ry="19" fill="#A5D6A7" stroke="#1B5E20" stroke-width="3"/><ellipse cx="224" cy="113" rx="4" ry="3" fill="#1B5E20"/><ellipse cx="240" cy="113" rx="4" ry="3" fill="#1B5E20"/><path d="M 194 86 Q 210 74 226 86" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 238 86 Q 254 74 270 86" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 204 120 Q 232 136 260 120" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><ellipse cx="182" cy="104" rx="12" ry="8" fill="#EF9A9A" opacity="0.5"/><ellipse cx="282" cy="104" rx="12" ry="8" fill="#EF9A9A" opacity="0.5"/><ellipse cx="200" cy="248" rx="25" ry="14" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><ellipse cx="264" cy="248" rx="25" ry="14" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><path d="M 300 214 C 328 224 342 238 336 254" fill="none" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><polygon points="334,256 346,246 345,264" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><path d="M 158 166 C 140 154 122 152 110 160" stroke="#1B5E20" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`,
        text: 'Grum had never\nhad a snack before.\n\nHe tried one.\nThen two.\nThen approximately\none thousand.\n\nAnd just like that —\nGrum smiled. 🍪',
      },
    ],
  },
];

// ── State ──────────────────────────────────────────────────────────────────
let activeBook = null;
let pageIdx    = 0;
let turning    = false;

// ── Elements ───────────────────────────────────────────────────────────────
const shelfList  = document.getElementById('shelf-list');
const bookCover  = document.getElementById('book-cover');
const bookOpen   = document.getElementById('book-open');
const sbEmpty    = document.getElementById('sb-empty');
const coverEmoji = document.getElementById('cover-emoji');
const coverTitle = document.getElementById('cover-title');
const prevBtn    = document.getElementById('prev-btn');
const nextBtn    = document.getElementById('next-btn');
const spread     = document.getElementById('book-spread');
const leftPage   = document.getElementById('left-page');
const pageTextEl = document.getElementById('page-text');
const pageNumEl  = document.getElementById('page-num');

// ── Build shelf ────────────────────────────────────────────────────────────
BOOKS.forEach(book => {
  const btn = document.createElement('div');
  btn.className = 'shelf-book';
  btn.dataset.id = book.id;
  btn.style.setProperty('--book-color', book.coverColor);
  btn.style.setProperty('--book-spine', book.spineColor);
  btn.innerHTML = `<span class="shelf-book-emoji">${book.emoji}</span><span class="shelf-book-label">${book.title}</span>`;
  btn.addEventListener('click', () => openCover(book));
  shelfList.appendChild(btn);
});

// ── Show cover ─────────────────────────────────────────────────────────────
function openCover(book) {
  activeBook = book;
  pageIdx    = 0;

  document.querySelectorAll('.shelf-book').forEach(b =>
    b.classList.toggle('active', b.dataset.id === book.id)
  );

  bookCover.style.setProperty('--cover-color', book.coverColor);
  bookCover.style.setProperty('--spine-color', book.spineColor);
  coverEmoji.textContent = book.emoji;
  coverTitle.textContent = book.title;

  sbEmpty.classList.add('hidden');
  bookOpen.classList.add('hidden');
  bookCover.classList.remove('hidden');
  bookCover.style.animation = 'none';
  requestAnimationFrame(() => { bookCover.style.animation = ''; });
}

document.getElementById('cover-open-btn').addEventListener('click', () => {
  if (!activeBook) return;
  showPage(0, false);
  bookCover.classList.add('hidden');
  bookOpen.classList.remove('hidden');
});

bookCover.addEventListener('click', e => {
  if (e.target.id !== 'cover-open-btn') {
    document.getElementById('cover-open-btn').click();
  }
});

// ── Render page ────────────────────────────────────────────────────────────
const ALL_SCENES = [
  's-circus-night','s-soft-morning','s-warm-circus','s-meadow-night',
  's-twilight-magic','s-open-sky','s-golden-sunrise','s-warm-glow',
  's-cozy-indoor','s-little-house','s-moonlit',
  's-summer-garden','s-rainy-window','s-matcha-cafe','s-bakery',
  's-poppins-arrive','s-banks-home','s-sugar-spoon',
  's-chalk-world','s-chimney-sweep','s-poppins-farewell',
  's-toon-field','s-toon-cave','s-toon-volcano','s-toon-cozy','s-toon-sunset',
];

function applyScene(page) {
  ALL_SCENES.forEach(s => leftPage.classList.remove(s));
  leftPage.classList.add(page.scene);

  let charEl = leftPage.querySelector('.scene-char');
  if (!charEl) {
    charEl = document.createElement('div');
    charEl.className = 'scene-char';
    leftPage.appendChild(charEl);
  }
  if (page.svg) {
    charEl.innerHTML = page.svg;
  } else {
    charEl.textContent = page.char || '';
  }
}

function showPage(idx, animate = true) {
  if (!activeBook) return;
  const page = activeBook.pages[idx];

  const doRender = () => {
    spread.classList.remove('spread-fade-in');
    applyScene(page);
    pageTextEl.textContent = page.text;
    pageNumEl.textContent  = `${idx + 1} / ${activeBook.pages.length}`;

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === activeBook.pages.length - 1;

    if (animate) {
      spread.classList.add('spread-fade-in');
      spread.addEventListener('animationend', function onFadeIn(e) {
        if (e.animationName !== 'fade-in') return;
        spread.removeEventListener('animationend', onFadeIn);
        spread.classList.remove('spread-fade-in');
      });
    }
    turning = false;
  };

  if (animate) {
    turning = true;
    spread.classList.remove('spread-fade-in');
    spread.classList.add('spread-fade-out');
    spread.addEventListener('animationend', function onFadeOut(e) {
      if (e.animationName !== 'fade-out') return;
      spread.removeEventListener('animationend', onFadeOut);
      spread.classList.remove('spread-fade-out');
      doRender();
    });
  } else {
    doRender();
  }
}

// ── Navigation ─────────────────────────────────────────────────────────────
function goNext() {
  if (!activeBook || turning || pageIdx >= activeBook.pages.length - 1) return;
  pageIdx++;
  showPage(pageIdx);
}

function goPrev() {
  if (!activeBook || turning || pageIdx <= 0) return;
  pageIdx--;
  showPage(pageIdx);
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    if (!bookCover.classList.contains('hidden')) {
      document.getElementById('cover-open-btn').click();
    } else {
      goNext();
    }
  }
  if (e.key === 'ArrowLeft') goPrev();
});
