// ── Recipe Data ────────────────────────────────────────────────────────────
const RECIPES = [
  {
    id: 'pizza', name: 'Pizza', emoji: '🍕',
    steps: [
      { game: 'knead',  instruction: 'Knead the pizza dough!',   emoji: '🫓', strokes: 8 },
      { game: 'pour',   instruction: 'Spread the tomato sauce!', emoji: '🍅', target: 0.62 },
      { game: 'season', instruction: 'Sprinkle on the cheese!',  emoji: '🧀', needed: 18 },
      { game: 'chop',   instruction: 'Chop the toppings!',       emojis: ['🫑','🍄','🫒','🧅'], needed: 4 },
      { game: 'flip',   instruction: 'Bake it to perfection!',   emoji: '🍕', greenWidth: 0.26 },
    ],
    result: '🍕', mamaMsg: 'Bellissimo! Best pizza in the world!'
  },
  {
    id: 'ramen', name: 'Ramen', emoji: '🍜',
    steps: [
      { game: 'stir',   instruction: 'Boil the rich broth!',    emoji: '🫕', revolutions: 4 },
      { game: 'chop',   instruction: 'Slice the chashu pork!',  emojis: ['🥩','🥚','🧅'], needed: 3 },
      { game: 'pour',   instruction: 'Ladle the hot broth!',    emoji: '🥣', target: 0.78 },
      { game: 'season', instruction: 'Add toppings and spice!', emoji: '🌶️', needed: 16 },
    ],
    result: '🍜', mamaMsg: 'Slurp slurp! Incredible ramen!'
  },
  {
    id: 'cake', name: 'Cake', emoji: '🎂',
    steps: [
      { game: 'stir',   instruction: 'Mix the batter!',           emoji: '🥣', revolutions: 5 },
      { game: 'pour',   instruction: 'Pour into the cake pan!',   emoji: '🧁', target: 0.70 },
      { game: 'flip',   instruction: 'Bake it just right!',       emoji: '🎂', greenWidth: 0.22 },
      { game: 'season', instruction: 'Decorate with sprinkles!',  emoji: '🎂', needed: 22 },
    ],
    result: '🎂', mamaMsg: 'Gorgeous! What a beautiful cake!'
  },
  {
    id: 'tacos', name: 'Tacos', emoji: '🌮',
    steps: [
      { game: 'chop',   instruction: 'Chop all the veggies!',   emojis: ['🍅','🧅','🌶️','🥑'], needed: 4 },
      { game: 'season', instruction: 'Season the meat well!',   emoji: '🥩', needed: 15 },
      { game: 'flip',   instruction: 'Cook the tortilla!',      emoji: '🫓', greenWidth: 0.3 },
      { game: 'pour',   instruction: 'Add salsa on top!',       emoji: '🍅', target: 0.52 },
    ],
    result: '🌮', mamaMsg: 'Olé! That taco is perfecto!'
  },
  {
    id: 'sushi', name: 'Sushi', emoji: '🍣',
    steps: [
      { game: 'stir',   instruction: 'Season the sushi rice!',  emoji: '🍚', revolutions: 3 },
      { game: 'knead',  instruction: 'Roll it tight!',          emoji: '🍙', strokes: 6 },
      { game: 'chop',   instruction: 'Slice the fish!',         emojis: ['🐟','🦐','🥑'], needed: 3 },
      { game: 'season', instruction: 'Add wasabi and ginger!',  emoji: '🫚', needed: 12 },
    ],
    result: '🍣', mamaMsg: 'Sugoi! A true sushi master!'
  },
  {
    id: 'cookies', name: 'Cookies', emoji: '🍪',
    steps: [
      { game: 'stir',   instruction: 'Cream the butter and sugar!', emoji: '🍯', revolutions: 4 },
      { game: 'knead',  instruction: 'Knead the cookie dough!',     emoji: '🫓', strokes: 6 },
      { game: 'chop',   instruction: 'Cut the cookie shapes!',      emojis: ['⭐','🌙','❤️','🌸'], needed: 4 },
      { game: 'flip',   instruction: 'Bake them golden brown!',     emoji: '🍪', greenWidth: 0.22 },
    ],
    result: '🍪', mamaMsg: 'Oishii! The best cookies ever!'
  },
];

// ── Game State ──────────────────────────────────────────────────────────────
const G = { recipe: null, stepIdx: 0, scores: [], cleanup: null };

// ── Screen helpers ──────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function mama(expr, msg) {
  const el = document.getElementById('mama-char');
  el.className = `mama-char ${expr}`;
  document.getElementById('mama-msg').textContent = msg;
}

const MAMA_LINES = [
  'You can do it!', 'Keep going!', 'Almost there!',
  'Great technique!', "That's the spirit!", 'Looking yummy!'
];

// ── Menu ────────────────────────────────────────────────────────────────────
function buildMenu() {
  const grid = document.getElementById('recipe-grid');
  grid.innerHTML = RECIPES.map(r => `
    <button class="recipe-card" data-id="${r.id}">
      <span class="recipe-emoji">${r.emoji}</span>
      <span class="recipe-name">${r.name}</span>
      <span class="recipe-steps">${r.steps.length} steps</span>
    </button>`).join('');

  grid.querySelectorAll('.recipe-card').forEach(card =>
    card.addEventListener('click', () =>
      startRecipe(RECIPES.find(r => r.id === card.dataset.id))
    )
  );
  showScreen('screen-menu');
}

// ── Game Controller ─────────────────────────────────────────────────────────
function startRecipe(recipe) {
  G.recipe = recipe;
  G.stepIdx = 0;
  G.scores = [];
  document.getElementById('game-recipe-name').textContent = recipe.name;
  showScreen('screen-game');
  runStep();
}

function runStep() {
  if (G.cleanup) { G.cleanup(); G.cleanup = null; }

  const step = G.recipe.steps[G.stepIdx];
  const total = G.recipe.steps.length;

  document.getElementById('step-counter').textContent = `Step ${G.stepIdx + 1} / ${total}`;
  document.getElementById('step-bar-fill').style.width = `${((G.stepIdx + 1) / total) * 100}%`;
  document.getElementById('step-instruction').textContent = step.instruction;

  const el = document.getElementById('game-area');
  el.innerHTML = '';

  mama('', MAMA_LINES[G.stepIdx % MAMA_LINES.length]);

  const fns = { chop: gameChop, stir: gameStir, pour: gamePour, season: gameSeason, flip: gameFlip, knead: gameKnead };
  G.cleanup = fns[step.game](el, step, onStepDone) || null;
}

function onStepDone(rawScore) {
  const score = Math.round(Math.max(0, Math.min(100, rawScore)));
  G.scores.push(score);
  if (G.cleanup) { G.cleanup(); G.cleanup = null; }

  const overlay = document.getElementById('reaction-overlay');
  const label   = document.getElementById('reaction-label');
  document.getElementById('reaction-score').textContent = score;

  let expr, text, mamaText;
  if (score >= 88) { expr = 'wonderful'; text = 'Wonderful!'; mamaText = 'Perfect! ★ Amazing!'; }
  else if (score >= 68) { expr = 'good'; text = 'Good!'; mamaText = 'Well done! Keep it up!'; }
  else if (score >= 48) { expr = 'ok'; text = 'OK!'; mamaText = "Not bad! You'll get it!"; }
  else { expr = 'bad'; text = 'Oh no...'; mamaText = 'Practice makes perfect!'; }

  label.textContent = text;
  label.className = `reaction-label ${expr}`;
  mama(expr === 'wonderful' ? 'wonderful' : expr === 'bad' ? 'worried' : '', mamaText);
  overlay.classList.remove('hidden');

  const advance = () => {
    overlay.classList.add('hidden');
    overlay.removeEventListener('click', advance);
    G.stepIdx++;
    G.stepIdx >= G.recipe.steps.length ? showResult() : runStep();
  };

  setTimeout(() => overlay.addEventListener('click', advance), 300);
  setTimeout(advance, 2200);
}

function showResult() {
  const avg = G.scores.reduce((a, b) => a + b, 0) / G.scores.length;
  const grade = avg >= 88 ? 'S' : avg >= 72 ? 'A' : avg >= 55 ? 'B' : 'C';

  document.getElementById('result-dish').textContent = G.recipe.result;
  document.getElementById('result-name').textContent = G.recipe.name;
  document.getElementById('result-grade').textContent = grade;
  document.getElementById('result-grade').className = `result-grade grade-${grade}`;
  document.getElementById('result-mama-msg').textContent = G.recipe.mamaMsg;

  document.getElementById('result-scores').innerHTML = G.recipe.steps.map((s, i) => `
    <div class="result-step">
      <span>${s.instruction}</span>
      <span class="result-step-score">${G.scores[i]}</span>
    </div>`).join('');

  mama('wonderful', G.recipe.mamaMsg);
  showScreen('screen-result');
}

document.getElementById('btn-again').addEventListener('click', () => startRecipe(G.recipe));
document.getElementById('btn-menu').addEventListener('click', buildMenu);

// ── Mini-game: CHOP ─────────────────────────────────────────────────────────
function gameChop(el, step, done) {
  const emojis = step.emojis || [step.emoji];
  const needed  = step.needed || emojis.length;
  let chopped   = 0;
  const t0      = Date.now();

  el.innerHTML = `
    <div class="cutting-board" id="chop-board">
      ${emojis.map((e, i) => `<div class="chop-item" data-i="${i}">${e}</div>`).join('')}
    </div>
    <p class="mg-hint">🔪 Click each ingredient to chop!</p>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="chop-bar" style="width:0%"></div></div>`;

  el.querySelectorAll('.chop-item').forEach(item => {
    let hits = 0;
    item.addEventListener('click', () => {
      if (item.classList.contains('chopped')) return;
      hits++;
      item.classList.add('chopping');
      setTimeout(() => item.classList.remove('chopping'), 200);
      if (hits >= 2) {
        item.classList.add('chopped');
        chopped++;
        document.getElementById('chop-bar').style.width = (chopped / needed * 100) + '%';
        if (chopped >= needed) {
          const elapsed = (Date.now() - t0) / 1000;
          setTimeout(() => done(Math.max(40, 100 - Math.max(0, elapsed - needed * 1.2) * 7)), 350);
        }
      }
    });
  });
}

// ── Mini-game: STIR ─────────────────────────────────────────────────────────
function gameStir(el, step, done) {
  const targetDist = (step.revolutions || 4) * 480;
  let dist = 0, last = null, dragging = false, raf = null, finished = false;

  el.innerHTML = `
    <canvas id="stir-canvas" width="260" height="260"></canvas>
    <p class="mg-hint">Hold & move in circles!</p>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="stir-bar" style="width:0%"></div></div>`;

  const canvas = document.getElementById('stir-canvas');
  const ctx    = canvas.getContext('2d');
  const trail  = [];

  function drawBowl() {
    ctx.clearRect(0, 0, 260, 260);
    // bowl body
    ctx.fillStyle = '#f5e6d3';
    ctx.beginPath(); ctx.ellipse(130, 185, 105, 68, 0, 0, Math.PI); ctx.fill();
    // bowl rim
    ctx.fillStyle = '#e8d5b0';
    ctx.beginPath(); ctx.ellipse(130, 165, 105, 36, 0, 0, Math.PI * 2); ctx.fill();
    // contents
    ctx.fillStyle = step.emoji?.includes('🍚') ? '#f0ece4' : step.emoji?.includes('🍯') ? '#fbbf24' : '#c8a97e';
    ctx.beginPath(); ctx.ellipse(130, 168, 95, 30, 0, 0, Math.PI * 2); ctx.fill();
  }

  function draw() {
    drawBowl();
    if (trail.length > 1) {
      ctx.strokeStyle = 'rgba(255,255,255,0.75)';
      ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(trail[0].x, trail[0].y);
      trail.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }

  function addPt(cx, cy) {
    const r = canvas.getBoundingClientRect();
    const x = cx - r.left, y = cy - r.top;
    if (last) {
      const d = Math.hypot(x - last.x, y - last.y);
      dist += d;
      trail.push({ x, y });
      if (trail.length > 45) trail.shift();
      const pct = Math.min(1, dist / targetDist);
      document.getElementById('stir-bar').style.width = (pct * 100) + '%';
      if (!finished && dist >= targetDist) {
        finished = true;
        setTimeout(() => done(100), 300);
      }
    }
    last = { x, y };
  }

  const onDown  = ()         => { dragging = true; last = null; };
  const onUp    = ()         => { dragging = false; last = null; };
  const onMove  = e          => { if (dragging) addPt(e.clientX, e.clientY); };
  const onTouch = e          => { e.preventDefault(); if (dragging && e.touches[0]) addPt(e.touches[0].clientX, e.touches[0].clientY); };

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('touchstart', onDown, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchend', onUp);
  canvas.addEventListener('touchmove', onTouch, { passive: false });

  draw();

  return () => {
    cancelAnimationFrame(raf);
    canvas.removeEventListener('mousedown', onDown);
    canvas.removeEventListener('touchstart', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchend', onUp);
    canvas.removeEventListener('touchmove', onTouch);
  };
}

// ── Mini-game: POUR ─────────────────────────────────────────────────────────
function gamePour(el, step, done) {
  const target = step.target || 0.65;
  let fill = 0, pouring = false, finished = false, raf = null;

  el.innerHTML = `
    <div class="pour-scene">
      <div class="pour-bottle" id="pour-bottle">${step.emoji}</div>
      <div class="pour-stream-col"><div class="pour-stream" id="pour-stream"></div></div>
      <div class="pour-bowl">
        <div class="pour-fill" id="pour-fill" style="height:0%"></div>
        <div class="pour-target-zone" id="pour-zone"></div>
      </div>
      <p class="pour-hint" id="pour-hint">Hold the ingredient to pour!</p>
    </div>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="pour-bar" style="width:0%"></div></div>`;

  // Set green zone
  const zoneEl = document.getElementById('pour-zone');
  zoneEl.style.bottom  = `${(target - 0.11) * 100}%`;
  zoneEl.style.height  = '22%';

  const bottle = document.getElementById('pour-bottle');
  const stream = document.getElementById('pour-stream');
  const fillEl = document.getElementById('pour-fill');
  const hint   = document.getElementById('pour-hint');

  function tick() {
    if (pouring && !finished) {
      fill = Math.min(1, fill + 0.004);
      fillEl.style.height = (fill * 100) + '%';
      document.getElementById('pour-bar').style.width = Math.min(100, fill / target * 100) + '%';
      if (fill >= 1) { finish(false); return; }
    }
    raf = requestAnimationFrame(tick);
  }

  function finish(released) {
    if (finished) return;
    finished = true;
    pouring = false;
    bottle.classList.remove('pouring');
    stream.style.height = '0';
    const diff = Math.abs(fill - target);
    const score = released && diff < 0.15
      ? Math.max(40, 100 - diff * 320)
      : Math.max(20, 50 - diff * 200);
    hint.textContent = diff < 0.06 ? 'Perfect! ✨' : diff < 0.14 ? 'Good enough!' : fill > target ? 'Too much! 😅' : 'A little more...';
    setTimeout(() => { cancelAnimationFrame(raf); done(score); }, 700);
  }

  const startPour = () => { if (finished) return; pouring = true; bottle.classList.add('pouring'); stream.style.height = '50px'; };
  const stopPour  = () => { if (!pouring || finished) return; pouring = false; bottle.classList.remove('pouring'); stream.style.height = '0'; finish(true); };

  bottle.addEventListener('mousedown', startPour);
  document.addEventListener('mouseup', stopPour);
  bottle.addEventListener('touchstart', startPour, { passive: true });
  document.addEventListener('touchend', stopPour);

  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    bottle.removeEventListener('mousedown', startPour);
    document.removeEventListener('mouseup', stopPour);
    bottle.removeEventListener('touchstart', startPour);
    document.removeEventListener('touchend', stopPour);
  };
}

// ── Mini-game: SEASON ───────────────────────────────────────────────────────
function gameSeason(el, step, done) {
  const needed = step.needed || 15;
  let count = 0, finished = false;

  el.innerHTML = `
    <p class="mg-hint">🧂 Tap all over to season!</p>
    <div class="season-food" id="season-food">
      <span class="season-base">${step.emoji}</span>
      <div class="season-dots" id="season-dots"></div>
    </div>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="season-bar" style="width:0%"></div></div>`;

  const food = document.getElementById('season-food');
  const dots = document.getElementById('season-dots');

  function addDot(cx, cy) {
    if (finished) return;
    const r = food.getBoundingClientRect();
    const x = ((cx - r.left) / r.width  * 100).toFixed(1);
    const y = ((cy - r.top)  / r.height * 100).toFixed(1);
    const d = document.createElement('div');
    d.className = 'season-dot';
    d.style.left = x + '%';
    d.style.top  = y + '%';
    dots.appendChild(d);
    count++;
    document.getElementById('season-bar').style.width = (count / needed * 100) + '%';
    if (count >= needed) {
      finished = true;
      setTimeout(() => done(100), 300);
    }
  }

  const onClick = e => addDot(e.clientX, e.clientY);
  const onTouch = e => { e.preventDefault(); [...e.touches].forEach(t => addDot(t.clientX, t.clientY)); };

  food.addEventListener('click', onClick);
  food.addEventListener('touchstart', onTouch, { passive: false });
  food.addEventListener('touchmove',  onTouch, { passive: false });

  return () => {
    food.removeEventListener('click', onClick);
    food.removeEventListener('touchstart', onTouch);
    food.removeEventListener('touchmove', onTouch);
  };
}

// ── Mini-game: FLIP ─────────────────────────────────────────────────────────
function gameFlip(el, step, done) {
  const gw = step.greenWidth || 0.25;
  const gStart = 0.5 - gw / 2, gEnd = 0.5 + gw / 2;
  let pos = 0, dir = 1, speed = 0.009, flipped = false, raf = null;

  el.innerHTML = `
    <div class="flip-scene" id="flip-scene">
      <div class="flip-pan" id="flip-pan">
        <span class="flip-food">${step.emoji}</span>
      </div>
      <div class="flip-gauge-wrap">
        <div class="flip-gauge">
          <div class="flip-green" style="left:${gStart*100}%;width:${gw*100}%"></div>
          <div class="flip-needle" id="flip-needle" style="left:0%"></div>
        </div>
        <div class="flip-labels"><span>Too early</span><span>Perfect!</span><span>Too late</span></div>
      </div>
      <p class="mg-hint">Click when the needle is in the green!</p>
    </div>`;

  const needle = document.getElementById('flip-needle');
  const pan    = document.getElementById('flip-pan');

  function tick() {
    if (flipped) return;
    pos += dir * speed;
    if (pos >= 1) { pos = 1; dir = -1; speed = 0.007 + Math.random() * 0.005; }
    if (pos <= 0) { pos = 0; dir =  1; speed = 0.007 + Math.random() * 0.005; }
    needle.style.left = (pos * 100) + '%';
    raf = requestAnimationFrame(tick);
  }

  function doFlip() {
    if (flipped) return;
    flipped = true;
    cancelAnimationFrame(raf);
    const inGreen = pos >= gStart && pos <= gEnd;
    const dist    = Math.abs(pos - 0.5);
    const score   = inGreen ? Math.max(70, 100 - dist / (gw / 2) * 30) : Math.max(20, 60 - dist * 90);
    pan.classList.add('flipping');
    setTimeout(() => done(score), 750);
  }

  raf = requestAnimationFrame(tick);

  const scene = document.getElementById('flip-scene');
  scene.addEventListener('click', doFlip);
  scene.addEventListener('touchstart', e => { e.preventDefault(); doFlip(); }, { passive: false });

  return () => {
    cancelAnimationFrame(raf);
    scene?.removeEventListener('click', doFlip);
  };
}

// ── Mini-game: KNEAD ────────────────────────────────────────────────────────
function gameKnead(el, step, done) {
  const needed = step.strokes || 8;
  let strokes = 0, lastDir = null, startX = null, dragging = false, finished = false;

  el.innerHTML = `
    <div class="knead-surface" id="knead-surface">
      <div class="knead-dough" id="knead-dough">${step.emoji}</div>
    </div>
    <p class="mg-hint">Drag left and right to knead!</p>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="knead-bar" style="width:0%"></div></div>`;

  const dough   = document.getElementById('knead-dough');
  const surface = document.getElementById('knead-surface');

  function move(x) {
    if (!dragging || startX === null || finished) return;
    const dx = x - startX;
    if (Math.abs(dx) < 28) return;
    const dir = dx > 0 ? 'r' : 'l';
    dough.style.transform = dir === 'r'
      ? 'scaleX(1.35) scaleY(0.78)'
      : 'scaleX(0.72) scaleY(1.28)';
    if (lastDir && lastDir !== dir) {
      strokes++;
      document.getElementById('knead-bar').style.width = (strokes / needed * 100) + '%';
      if (strokes >= needed) {
        finished = true;
        dough.style.transform = 'scale(1)';
        setTimeout(() => done(100), 300);
        return;
      }
    }
    lastDir = dir;
    startX = x;
  }

  const onDown  = e => { dragging = true; startX = e.clientX; };
  const onMove  = e => move(e.clientX);
  const onUp    = () => { dragging = false; dough.style.transform = 'scale(1)'; startX = null; };
  const onTDown = e => { dragging = true; startX = e.touches[0].clientX; };
  const onTMove = e => { e.preventDefault(); move(e.touches[0].clientX); };
  const onTUp   = () => { dragging = false; dough.style.transform = 'scale(1)'; startX = null; };

  surface.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  surface.addEventListener('touchstart', onTDown, { passive: true });
  document.addEventListener('touchmove', onTMove, { passive: false });
  document.addEventListener('touchend', onTUp);

  return () => {
    surface.removeEventListener('mousedown', onDown);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    surface.removeEventListener('touchstart', onTDown);
    document.removeEventListener('touchmove', onTMove);
    document.removeEventListener('touchend', onTUp);
  };
}

// ── Boot ────────────────────────────────────────────────────────────────────
buildMenu();
