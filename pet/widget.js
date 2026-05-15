(function () {
  const KEY = 'mochi_state';

  function defaultState() {
    return { name: 'Mochi', fullness: 80, happiness: 70, born: Date.now(), lastUpdate: Date.now() };
  }
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); return s ? { ...defaultState(), ...s } : defaultState(); }
    catch { return defaultState(); }
  }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
  function decay(s) {
    const mins = (Date.now() - s.lastUpdate) / 60000;
    return { ...s, fullness: Math.max(0, s.fullness - mins * 0.5), happiness: Math.max(0, s.happiness - mins * 0.3), lastUpdate: Date.now() };
  }
  function msg(s) {
    if (s.fullness < 10) return 'please feed me...';
    if (s.fullness < 25) return "i'm so hungry ;__;"
    if (s.fullness < 45) return 'i could eat...';
    if (s.happiness > 75 && s.fullness > 65) return 'i love you!! ♡';
    if (s.happiness > 55) return 'this is nice :)';
    return 'hi there!';
  }

  // Inject styles
  const css = document.createElement('style');
  css.textContent = `
  #mochi-home { display: flex; justify-content: center; margin-top: 1.4em; }
  #mochi-home #mochi-panel {
    position: relative; bottom: auto; right: auto; width: 268px;
    box-shadow: 0 6px 24px rgba(155,114,207,0.28);
  }
  #mochi-home .w-close { display: none; }
  #mochi-toggle {
    position: fixed; bottom: 24px; right: 24px; z-index: 9998;
    width: 58px; height: 58px; border-radius: 50%;
    background: linear-gradient(135deg, #c4b5f4, #9b72cf);
    border: none; cursor: pointer; font-size: 1.5rem;
    box-shadow: 0 4px 18px rgba(155,114,207,0.45);
    transition: transform 0.2s; display: flex; align-items: center; justify-content: center;
  }
  #mochi-toggle:hover { transform: scale(1.1); }
  #mochi-toggle.hungry { animation: w-wiggle 0.45s ease-in-out infinite alternate; }
  @keyframes w-wiggle { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
  #mochi-badge {
    position: absolute; top: -2px; right: -2px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #f9758a; border: 2px solid #ede9f8;
    display: none;
  }
  #mochi-toggle.hungry #mochi-badge { display: block; }
  #mochi-panel {
    position: fixed; bottom: 92px; right: 24px; z-index: 9998;
    width: 268px; background: rgba(255,255,255,0.97);
    border-radius: 18px; box-shadow: 0 8px 32px rgba(155,114,207,0.32);
    backdrop-filter: blur(10px); font-family: 'Nunito', sans-serif;
    transition: opacity 0.22s, transform 0.22s; transform-origin: bottom right;
  }
  #mochi-panel.hidden { opacity: 0; transform: scale(0.92) translateY(8px); pointer-events: none; }
  .w-header {
    background: linear-gradient(120deg, #c4b5f4, #b8a8e8);
    padding: 0.65em 1em; border-radius: 18px 18px 0 0;
    display: flex; justify-content: space-between; align-items: center;
    color: #3d2c6e; font-weight: 800; font-size: 0.95rem;
  }
  .w-close {
    background: none; border: none; cursor: pointer;
    font-size: 1rem; color: #3d2c6e; font-weight: 700;
    line-height: 1; padding: 0; box-shadow: none;
    transition: opacity 0.2s;
  }
  .w-close:hover { opacity: 0.6; transform: none; }
  .w-body { padding: 1em; }
  .w-bunny { display: flex; flex-direction: column; align-items: center; margin-bottom: 0.7em; animation: w-idle 2.4s ease-in-out infinite; }
  @keyframes w-idle { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  .w-bunny.hungry { animation: w-wiggle 0.45s ease-in-out infinite alternate; }
  .w-bunny.starving .w-eye { background: transparent !important; box-shadow: inset 0 0 0 2px #3d2c6e; transform: rotate(45deg); border-radius: 2px !important; }
  .w-ears { display: flex; gap: 18px; margin-bottom: -4px; }
  .w-ear { width: 15px; height: 32px; background: #fce4f0; border-radius: 50% 50% 35% 35%; display: flex; justify-content: center; padding-top: 5px; }
  .w-ear-in { width: 7px; height: 18px; background: #f4aecb; border-radius: 50%; }
  .w-head { width: 68px; height: 62px; background: #fff8fb; border-radius: 50%; box-shadow: 0 2px 10px rgba(155,114,207,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; gap: 3px; }
  .w-eyes { display: flex; gap: 15px; margin-top: 5px; }
  .w-eye { width: 9px; height: 9px; background: #3d2c6e; border-radius: 50%; transition: height 0.3s, border-radius 0.3s; }
  .w-bunny.sleeping .w-eye { height: 2px; border-radius: 1px; }
  .w-cheeks { display: flex; gap: 22px; position: absolute; top: 35px; }
  .w-cheek { width: 13px; height: 8px; background: rgba(255,150,180,0.36); border-radius: 50%; }
  .w-mouth { width: 16px; height: 8px; border-bottom: 2.5px solid #f4aecb; border-radius: 0 0 50% 50%; }
  .w-bunny.sad .w-mouth { border-bottom: none; border-top: 2.5px solid #f4aecb; border-radius: 50% 50% 0 0; margin-top: 6px; }
  .w-body-sh { width: 54px; height: 40px; background: #fff8fb; border-radius: 50%; margin-top: -8px; box-shadow: 0 2px 8px rgba(155,114,207,0.12); position: relative; }
  .w-tail { position: absolute; width: 13px; height: 13px; background: #fff; border-radius: 50%; right: -4px; top: 11px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
  .w-msg { text-align: center; color: #6b5b9e; font-size: 0.82rem; font-style: italic; margin: 0 0 0.75em; }
  .w-stats { margin-bottom: 0.8em; }
  .w-stat { display: flex; align-items: center; gap: 0.5em; font-size: 0.78rem; color: #3d2c6e; margin-bottom: 0.3em; }
  .w-stat-lbl { width: 56px; font-weight: 700; }
  .w-bar { flex: 1; height: 8px; background: #ede9f8; border-radius: 4px; overflow: hidden; }
  .w-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }
  .w-fill.food  { background: linear-gradient(90deg, #f4aecb, #f9758a); }
  .w-fill.happy { background: linear-gradient(90deg, #b8a8e8, #9b72cf); }
  .w-actions { display: flex; gap: 0.5em; }
  .w-actions button { flex: 1; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.8rem; padding: 0.4em 0.3em; border-radius: 12px; border: none; cursor: pointer; background: linear-gradient(135deg, #c4b5f4, #9b72cf); color: #fff; box-shadow: 0 2px 8px rgba(155,114,207,0.28); transition: transform 0.15s, opacity 0.15s; }
  .w-actions button:hover { transform: translateY(-1px); opacity: 0.88; }
  .w-pet-link { display: block; text-align: center; margin-top: 0.7em; font-size: 0.75rem; color: #9b72cf; text-decoration: none; font-weight: 700; }
  .w-pet-link:hover { text-decoration: underline; }
  `;
  document.head.appendChild(css);

  // DOM
  const toggle = document.createElement('button');
  toggle.id = 'mochi-toggle';
  toggle.title = 'Mochi';
  toggle.innerHTML = '🐰<div id="mochi-badge"></div>';

  const panel = document.createElement('div');
  panel.id = 'mochi-panel';
  panel.className = 'hidden';
  panel.innerHTML = `
    <div class="w-header">
      <span id="w-name">Mochi ♡</span>
      <button class="w-close" title="Close">—</button>
    </div>
    <div class="w-body">
      <div class="w-bunny" id="w-bunny">
        <div class="w-ears">
          <div class="w-ear"><div class="w-ear-in"></div></div>
          <div class="w-ear"><div class="w-ear-in"></div></div>
        </div>
        <div class="w-head">
          <div class="w-eyes"><div class="w-eye"></div><div class="w-eye"></div></div>
          <div class="w-cheeks"><div class="w-cheek"></div><div class="w-cheek"></div></div>
          <div class="w-mouth" id="w-mouth"></div>
        </div>
        <div class="w-body-sh"><div class="w-tail"></div></div>
      </div>
      <p class="w-msg" id="w-msg">hi there!</p>
      <div class="w-stats">
        <div class="w-stat"><span class="w-stat-lbl">🍎 Food</span><div class="w-bar"><div class="w-fill food" id="w-food"></div></div></div>
        <div class="w-stat"><span class="w-stat-lbl">✨ Happy</span><div class="w-bar"><div class="w-fill happy" id="w-happy"></div></div></div>
      </div>
      <div class="w-actions">
        <button id="w-feed">🍎 Feed</button>
        <button id="w-play">🎀 Play</button>
        <button id="w-sleep">💤 Sleep</button>
      </div>
      <a class="w-pet-link" href="/pet/">visit ${load().name || 'Mochi'} →</a>
    </div>`;

  const inlineEl = document.getElementById('mochi-home');
  const isInline = !!inlineEl;

  if (!isInline) document.body.appendChild(toggle);

  if (isInline) {
    panel.classList.remove('hidden');
    inlineEl.appendChild(panel);
  } else {
    document.body.appendChild(panel);
  }

  let state = decay(load());
  save(state);
  let open = false;

  function render() {
    const { name, fullness, happiness } = state;
    panel.querySelector('#w-name').textContent = name + ' ♡';
    panel.querySelector('.w-pet-link').textContent = `visit ${name} →`;
    panel.querySelector('#w-msg').textContent = msg(state);
    panel.querySelector('#w-food').style.width  = fullness  + '%';
    panel.querySelector('#w-happy').style.width = happiness + '%';

    const b = panel.querySelector('#w-bunny');
    b.classList.remove('hungry', 'sad', 'starving', 'sleeping');
    if (fullness < 10)       b.classList.add('starving');
    else if (fullness < 30)  b.classList.add('hungry');
    else if (happiness < 30) b.classList.add('sad');

    toggle.classList.toggle('hungry', fullness < 30);
  }

  if (!isInline) {
    toggle.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('hidden', !open);
      if (open) { state = decay(state); save(state); render(); }
    });

    panel.querySelector('.w-close').addEventListener('click', () => {
      open = false; panel.classList.add('hidden');
    });
  }

  panel.querySelector('#w-feed').addEventListener('click', () => {
    state = decay(state); state.fullness = Math.min(100, state.fullness + 30); save(state); render();
  });

  panel.querySelector('#w-play').addEventListener('click', () => {
    state = decay(state); state.happiness = Math.min(100, state.happiness + 25); state.fullness = Math.max(0, state.fullness - 5); save(state); render();
  });

  panel.querySelector('#w-sleep').addEventListener('click', () => {
    state = decay(state); state.happiness = Math.min(100, state.happiness + 10);
    const b = panel.querySelector('#w-bunny'); b.classList.add('sleeping');
    panel.querySelector('#w-msg').textContent = '-ω- zzz';
    save(state);
    setTimeout(() => { b.classList.remove('sleeping'); render(); }, 3000);
  });

  setInterval(() => { state = decay(state); save(state); if (open) render(); toggle.classList.toggle('hungry', state.fullness < 30); }, 10000);

  render();
})();
