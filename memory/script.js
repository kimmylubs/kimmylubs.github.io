const EMOJIS = ['🌸', '🦋', '🍓', '🌈', '🍦', '⭐', '🐰', '🍄', '🌙', '🌻', '🎀', '🍩', '🌺', '🐱', '🍀', '💎', '🎵', '🌷', '🐸', '🍋', '🦄'];

let flipped = [];
let matched = 0;
let moves = 0;
let seconds = 0;
let timerHandle = null;
let canFlip = true;
let started = false;

const boardEl   = document.getElementById('board');
const movesEl   = document.getElementById('moves');
const timerEl   = document.getElementById('timer');
const winOverlay = document.getElementById('win-overlay');
const winStats  = document.getElementById('win-stats');
const winStars  = document.getElementById('win-stars');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerHandle);
  timerHandle = setInterval(() => { timerEl.textContent = fmt(++seconds); }, 1000);
}

function stopTimer() { clearInterval(timerHandle); }

function stars(m) {
  if (m <= 28) return '⭐⭐⭐';
  if (m <= 38) return '⭐⭐✧';
  return '⭐✧✧';
}

function initGame() {
  boardEl.innerHTML = '';
  flipped = [];
  matched = 0;
  moves = 0;
  seconds = 0;
  canFlip = true;
  started = false;
  movesEl.textContent = '0';
  timerEl.textContent = '0:00';
  winOverlay.classList.add('hidden');
  stopTimer();

  shuffle([...EMOJIS, ...EMOJIS]).forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">${emoji}</div>
      </div>`;
    card.addEventListener('click', () => flip(card));
    boardEl.appendChild(card);
  });
}

function flip(card) {
  if (!canFlip) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flipped.length >= 2) return;

  if (!started) { started = true; startTimer(); }

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length < 2) return;

  movesEl.textContent = ++moves;
  canFlip = false;

  const [a, b] = flipped;
  if (a.dataset.emoji === b.dataset.emoji) {
    setTimeout(() => {
      a.classList.add('matched');
      b.classList.add('matched');
      flipped = [];
      canFlip = true;
      if (++matched === EMOJIS.length) { stopTimer(); showWin(); }
    }, 380);
  } else {
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flipped = [];
      canFlip = true;
    }, 1000);
  }
}

function showWin() {
  winStars.textContent = stars(moves);
  winStats.textContent = `${moves} moves · ${fmt(seconds)}`;
  winOverlay.classList.remove('hidden');
}

document.getElementById('restart-btn').addEventListener('click', initGame);
document.getElementById('win-restart').addEventListener('click', initGame);

initGame();
