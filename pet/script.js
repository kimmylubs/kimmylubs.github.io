const KEY = 'mochi_state';

function defaultState() {
  return { name: 'Mochi', fullness: 80, happiness: 70, born: Date.now(), lastUpdate: Date.now() };
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    return s ? { ...defaultState(), ...s } : defaultState();
  } catch { return defaultState(); }
}

function save(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

function applyDecay(s) {
  const mins = (Date.now() - s.lastUpdate) / 60000;
  return {
    ...s,
    fullness:  Math.max(0, s.fullness  - mins * 0.5),
    happiness: Math.max(0, s.happiness - mins * 0.3),
    lastUpdate: Date.now(),
  };
}

function petMsg(s) {
  if (s.fullness < 10) return 'please feed me... im dying...';
  if (s.fullness < 25) return "im so hungry ;__;";
  if (s.fullness < 45) return 'i could eat...';
  if (s.happiness > 75 && s.fullness > 65) return 'i love you!! ♡';
  if (s.happiness > 55) return 'this is nice :)';
  if (s.happiness < 25) return 'feeling a bit sad...';
  return 'hi there!';
}

function ageDays(s) {
  return Math.floor((Date.now() - s.born) / 86400000);
}

// DOM refs
const bunny  = document.getElementById('bunny');
const msgEl  = document.getElementById('pet-msg');
const nameEl = document.getElementById('pet-name-display');
const infoEl = document.getElementById('pet-info');
const barFood  = document.getElementById('bar-food');
const barHappy = document.getElementById('bar-happy');
const valFood  = document.getElementById('val-food');
const valHappy = document.getElementById('val-happy');
const renameRow   = document.getElementById('rename-row');
const renameInput = document.getElementById('rename-input');

let state = applyDecay(load());
save(state);

function render() {
  const { fullness, happiness, name } = state;

  nameEl.textContent = name;
  msgEl.textContent  = petMsg(state);
  barFood.style.width  = fullness  + '%';
  barHappy.style.width = happiness + '%';
  valFood.textContent  = Math.round(fullness);
  valHappy.textContent = Math.round(happiness);

  bunny.classList.remove('hungry', 'sad', 'sleeping', 'starving');
  if (fullness < 10)       bunny.classList.add('starving');
  else if (fullness < 30)  bunny.classList.add('hungry');
  else if (happiness < 30) bunny.classList.add('sad');

  const days = ageDays(state);
  infoEl.textContent = days === 0 ? 'born today ♡' : `age: ${days} day${days === 1 ? '' : 's'}`;
}

function feed() {
  state = applyDecay(state);
  state.fullness = Math.min(100, state.fullness + 30);
  save(state);
  render();
}

function play() {
  state = applyDecay(state);
  state.happiness = Math.min(100, state.happiness + 25);
  state.fullness  = Math.max(0, state.fullness - 5);
  save(state);
  render();
}

function sleep() {
  state = applyDecay(state);
  state.happiness = Math.min(100, state.happiness + 10);
  bunny.classList.add('sleeping');
  msgEl.textContent = '-ω- zzz';
  save(state);
  setTimeout(() => { bunny.classList.remove('sleeping'); render(); }, 3000);
}

document.getElementById('btn-feed').addEventListener('click', feed);
document.getElementById('btn-play').addEventListener('click', play);
document.getElementById('btn-sleep').addEventListener('click', sleep);

document.getElementById('rename-btn').addEventListener('click', () => {
  renameRow.classList.toggle('hidden');
  if (!renameRow.classList.contains('hidden')) {
    renameInput.value = state.name;
    renameInput.focus();
  }
});

document.getElementById('rename-save').addEventListener('click', () => {
  const v = renameInput.value.trim();
  if (v) { state.name = v; save(state); render(); }
  renameRow.classList.add('hidden');
});

renameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('rename-save').click();
});

// Decay update every 10s
setInterval(() => { state = applyDecay(state); save(state); render(); }, 10000);

render();
