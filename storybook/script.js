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
        text:  'Bert the pavement artist drew\nthe most wonderful chalk pictures.\n\nWith one magical leap — SPLASH —\nthey were inside!\n\nDancing penguins!\nCarousel horses!\nA whole world in the pavement!',
      },
      {
        scene: 's-chimney-sweep',
        char:  '🎩',
        text:  '"Step in time!\nStep in time!"\n\nThe chimney sweeps danced\nacross every rooftop in London,\nsoot-covered and laughing,\nwhile the whole city sparkled\nfar below.',
      },
      {
        scene: 's-poppins-farewell',
        char:  '🌂',
        text:  'The wind changed.\n\nMary Poppins quietly packed her bag,\ngave the children one last look,\nand floated up into the sky.\n\nSome magic doesn\'t stay forever.\n\nBut it never truly leaves. ♡',
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
  charEl.textContent = page.char;
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
