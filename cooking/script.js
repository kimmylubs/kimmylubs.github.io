// ── Recipes ────────────────────────────────────────────────────────────────
const RECIPES = [
  { id:'pizza',   name:'Pizza',      emoji:'🍕',
    steps:[ {game:'knead', instruction:'Knead the pizza dough!',      emoji:'🫓',  strokes:8},
            {game:'pour',  instruction:'Spread the tomato sauce!',    emoji:'🍅',  target:0.62},
            {game:'season',instruction:'Sprinkle on the cheese!',     emoji:'🧀',  needed:18},
            {game:'chop',  instruction:'Chop the toppings!',          emojis:['🫑','🍄','🫒','🧅'], needed:4},
            {game:'flip',  instruction:'Bake it to perfection!',      emoji:'🍕',  greenWidth:0.26} ],
    result:'🍕', mamaMsg:'Bellissimo! Best pizza ever!' },

  { id:'ramen',   name:'Ramen',      emoji:'🍜',
    steps:[ {game:'stir',  instruction:'Boil the rich broth!',        emoji:'🫕',  revolutions:4},
            {game:'chop',  instruction:'Slice the chashu pork!',      emojis:['🥩','🥚','🧅'], needed:3},
            {game:'grate', instruction:'Grate the garlic and ginger!',emoji:'🧄',  strokes:8},
            {game:'pour',  instruction:'Ladle the hot broth!',        emoji:'🥣',  target:0.78},
            {game:'season',instruction:'Add toppings and spice!',     emoji:'🌶️', needed:16} ],
    result:'🍜', mamaMsg:'Slurp slurp! Incredible ramen!' },

  { id:'cake',    name:'Cake',       emoji:'🎂',
    steps:[ {game:'stir',  instruction:'Mix the batter!',             emoji:'🥣',  revolutions:5},
            {game:'pour',  instruction:'Pour into the cake pan!',     emoji:'🧁',  target:0.70},
            {game:'flip',  instruction:'Bake it just right!',         emoji:'🎂',  greenWidth:0.22},
            {game:'season',instruction:'Decorate with sprinkles!',    emoji:'🎂',  needed:22} ],
    result:'🎂', mamaMsg:'Gorgeous! What a beautiful cake!' },

  { id:'tacos',   name:'Tacos',      emoji:'🌮',
    steps:[ {game:'peel',  instruction:'Peel the avocado!',           emoji:'🥑',  skinColor:'#3d5a1a', baseColor:'#c8e66c', innerEmoji:'🥑'},
            {game:'chop',  instruction:'Chop all the veggies!',       emojis:['🍅','🧅','🌶️'], needed:3},
            {game:'season',instruction:'Season the meat well!',       emoji:'🥩',  needed:15},
            {game:'flip',  instruction:'Cook the tortilla!',          emoji:'🫓',  greenWidth:0.30},
            {game:'pour',  instruction:'Add salsa on top!',           emoji:'🍅',  target:0.52} ],
    result:'🌮', mamaMsg:'Olé! That taco is perfecto!' },

  { id:'sushi',   name:'Sushi',      emoji:'🍣',
    steps:[ {game:'stir',  instruction:'Season the sushi rice!',      emoji:'🍚',  revolutions:3},
            {game:'knead', instruction:'Roll it tight!',              emoji:'🍙',  strokes:6},
            {game:'chop',  instruction:'Slice the fish!',             emojis:['🐟','🦐','🥑'], needed:3},
            {game:'season',instruction:'Add wasabi and ginger!',      emoji:'🫚',  needed:12} ],
    result:'🍣', mamaMsg:'Sugoi! A true sushi master!' },

  { id:'cookies', name:'Cookies',    emoji:'🍪',
    steps:[ {game:'stir',  instruction:'Cream the butter and sugar!', emoji:'🍯',  revolutions:4},
            {game:'knead', instruction:'Knead the cookie dough!',     emoji:'🫓',  strokes:6},
            {game:'chop',  instruction:'Cut the cookie shapes!',      emojis:['⭐','🌙','❤️','🌸'], needed:4},
            {game:'flip',  instruction:'Bake them golden brown!',     emoji:'🍪',  greenWidth:0.22} ],
    result:'🍪', mamaMsg:'Oishii! The best cookies ever!' },

  { id:'pancakes',name:'Pancakes',   emoji:'🥞',
    steps:[ {game:'stir',  instruction:'Mix the pancake batter!',     emoji:'🥣',  revolutions:5},
            {game:'pour',  instruction:'Pour onto the hot pan!',      emoji:'🫙',  target:0.65},
            {game:'flip',  instruction:'Flip at the right moment!',   emoji:'🥞',  greenWidth:0.28},
            {game:'season',instruction:'Drizzle maple syrup!',        emoji:'🧇',  needed:14} ],
    result:'🥞', mamaMsg:'Fluffy and golden! Perfect pancakes!' },

  { id:'curry',   name:'Curry',      emoji:'🍛',
    steps:[ {game:'chop',  instruction:'Chop onions and potato!',     emojis:['🧅','🥕','🥔'], needed:3},
            {game:'heat',  instruction:'Sauté until fragrant!',       emoji:'🫕',  greenMin:55, greenMax:75, duration:3},
            {game:'stir',  instruction:'Stir in the curry paste!',    emoji:'🍲',  revolutions:4},
            {game:'season',instruction:'Season with spices!',         emoji:'🌶️', needed:18} ],
    result:'🍛', mamaMsg:'So aromatic! A curry fit for a queen!' },

  { id:'dumplings',name:'Dumplings', emoji:'🥟',
    steps:[ {game:'knead', instruction:'Knead the dumpling dough!',   emoji:'🫓',  strokes:8},
            {game:'peel',  instruction:'Flatten the wrapper!',        emoji:'🫓',  skinColor:'#e8c88a', baseColor:'#fef3c7', innerEmoji:'🫓'},
            {game:'pour',  instruction:'Add the filling!',            emoji:'🥩',  target:0.55},
            {game:'heat',  instruction:'Steam until plump!',          emoji:'🥟',  greenMin:60, greenMax:80, duration:4} ],
    result:'🥟', mamaMsg:'Xiao long bao perfection! Incredible!' },

  { id:'friedrice',name:'Fried Rice', emoji:'🍳',
    steps:[ {game:'chop',  instruction:'Chop the veggies and egg!',   emojis:['🥕','🌽','🥚','🧅'], needed:4},
            {game:'heat',  instruction:'Heat the wok properly!',      emoji:'🫕',  greenMin:65, greenMax:85, duration:3},
            {game:'stir',  instruction:'Toss everything together!',   emoji:'🍳',  revolutions:5},
            {game:'season',instruction:'Add soy sauce!',              emoji:'🫙',  needed:16} ],
    result:'🍳', mamaMsg:'Wok hei! Restaurant-quality fried rice!' },

  { id:'salad',   name:'Salad',      emoji:'🥗',
    steps:[ {game:'peel',  instruction:'Peel the cucumber!',          emoji:'🥒',  skinColor:'#2d6a2d', baseColor:'#dcf5dc', innerEmoji:'🥒'},
            {game:'chop',  instruction:'Chop all the vegetables!',    emojis:['🍅','🫑','🧅','🥕'], needed:4},
            {game:'season',instruction:'Add herbs and seasoning!',    emoji:'🌿',  needed:15},
            {game:'pour',  instruction:'Drizzle the dressing!',       emoji:'🫙',  target:0.50} ],
    result:'🥗', mamaMsg:'So fresh and healthy! Mama approves!' },

  { id:'icecream',name:'Ice Cream',  emoji:'🍨',
    steps:[ {game:'stir',  instruction:'Churn the ice cream base!',   emoji:'🥛',  revolutions:6},
            {game:'pour',  instruction:'Scoop into the bowl!',        emoji:'🍨',  target:0.72},
            {game:'grate', instruction:'Grate chocolate on top!',     emoji:'🍫',  strokes:7},
            {game:'season',instruction:'Add sprinkles and toppings!', emoji:'🍦',  needed:20} ],
    result:'🍨', mamaMsg:'Dreamy! The best ice cream ever!' },
];

// ── Audio ──────────────────────────────────────────────────────────────────
let _ac = null;
function ac() {
  if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)();
  if (_ac.state === 'suspended') _ac.resume();
  return _ac;
}

function noise(dur, lo, hi, vol = 0.2, attack = 0) {
  try {
    const ctx = ac();
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 1.5);
    const src = ctx.createBufferSource();  src.buffer = buf;
    const flt = ctx.createBiquadFilter(); flt.type = 'bandpass'; flt.frequency.value = (lo+hi)/2; flt.Q.value = 0.7;
    const g   = ctx.createGain();
    if (attack) { g.gain.setValueAtTime(0, ctx.currentTime); g.gain.linearRampToValueAtTime(vol, ctx.currentTime + attack); }
    else g.gain.value = vol;
    src.connect(flt); flt.connect(g); g.connect(ctx.destination); src.start();
  } catch {}
}

function tone(freq, dur, type = 'sine', vol = 0.2, slide = 0) {
  try {
    const ctx = ac();
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    if (slide) osc.frequency.linearRampToValueAtTime(slide, ctx.currentTime + dur);
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(g); g.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + dur);
  } catch {}
}

let _lastNoise = 0;
function throttleNoise(fn, ms = 120) {
  const now = Date.now(); if (now - _lastNoise < ms) return; _lastNoise = now; fn();
}

const SFX = {
  chop:    () => noise(0.06, 400, 2500, 0.45),
  stir:    () => throttleNoise(() => noise(0.15, 150, 900, 0.12)),
  pour:    () => throttleNoise(() => noise(0.18, 80, 700, 0.18), 200),
  season:  () => noise(0.08, 800, 5000, 0.12),
  sizzle:  () => noise(0.6, 1500, 9000, 0.1),
  thud:    () => noise(0.09, 40, 250, 0.35),
  scrape:  () => throttleNoise(() => noise(0.12, 600, 3500, 0.15)),
  bubble:  () => tone(280 + Math.random()*120, 0.25, 'sine', 0.08),
  ding:    (f=880) => tone(f, 0.5, 'sine', 0.22),
  success: () => [523,659,784,1047].forEach((f,i) => setTimeout(() => tone(f, 0.4, 'sine', 0.18), i*110)),
  fanfare: () => [523,659,784,1047,1319].forEach((f,i) => setTimeout(() => tone(f, 0.6, 'triangle', 0.22), i*90)),
  sad:     () => tone(350, 0.5, 'sawtooth', 0.12, 180),
};

// ── Effects ────────────────────────────────────────────────────────────────
function burst(type = 'star', count = 14) {
  const sets = {
    star:  ['⭐','✨','🌟','💫'],
    heart: ['❤️','💜','💖','🩷','💕'],
    sweat: ['💧','😰'],
  };
  const chars = sets[type] || sets.star;
  const cx = window.innerWidth * 0.5, cy = window.innerHeight * 0.42;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'fx-particle';
      p.textContent = chars[Math.floor(Math.random() * chars.length)];
      const angle = Math.random() * Math.PI * 2;
      const spd   = 70 + Math.random() * 130;
      p.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(angle)*spd}px;--dy:${Math.sin(angle)*spd-80}px;font-size:${0.9+Math.random()*0.8}rem;animation-duration:${0.7+Math.random()*0.5}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }, i * 28);
  }
}

function rainConfetti(count = 28) {
  const chars = ['🎊','🎉','⭐','✨','🌟','🌸','💜','🎀','🩷'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'fx-confetti';
      p.textContent = chars[Math.floor(Math.random() * chars.length)];
      const dur = 1.6 + Math.random() * 1.2;
      p.style.cssText = `left:${Math.random()*100}vw;--dx:${(Math.random()-0.5)*140}px;animation-duration:${dur}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), dur * 1000 + 200);
    }, i * 55);
  }
}

function sweatMama() {
  const el = document.getElementById('mama-char');
  if (!el) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      const d = document.createElement('div');
      d.className = 'fx-particle';
      d.textContent = '💧';
      d.style.cssText = `left:${r.right-10}px;top:${r.top+20}px;--dx:${15+i*12}px;--dy:${20+i*15}px;font-size:1rem;animation-duration:0.9s`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 1000);
    }, i * 120);
  }
}

// ── Step-specific Mama dialogue ────────────────────────────────────────────
const STEP_LINES = {
  chop:   ['Quick! Chop chop! 🔪', 'Faster! Faster!', 'Mince it well!', 'Slice it thin!'],
  stir:   ['Round and round! 🌀', 'Keep stirring!', "Don't stop now!", 'Mix it well!'],
  pour:   ['Steady now... 💧', 'Watch the level!', 'Not too much!', 'Slow and steady!'],
  season: ['A little more! 🧂', 'Sprinkle everywhere!', 'Season it well!', 'All over!'],
  flip:   ['Watch... wait... NOW! ⚡', 'Ready? Stay focused!', 'Timing is everything!', 'Nowww!'],
  knead:  ['Push! Pull! 💪', 'Work that dough!', 'More strength!', 'Put your back into it!'],
  peel:   ['Gentle strokes! ✋', 'Careful now...', 'Nice and slow!', "Don't tear it!"],
  grate:  ['Up and down! ⬆️⬇️', "That's it! Keep going!", 'Back and forth!', 'Grate it all!'],
  heat:   ['Watch the heat! 🌡️', "Don't burn it!", 'Stay in the green!', 'Keep it steady!'],
};
function stepLine(game) {
  const lines = STEP_LINES[game] || ['You can do it!'];
  return lines[Math.floor(Math.random() * lines.length)];
}

// ── Game State ─────────────────────────────────────────────────────────────
const G = { recipe: null, stepIdx: 0, scores: [], cleanup: null };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function mama(expr, msg) {
  const el = document.getElementById('mama-char');
  el.className = `mama-char ${expr}`;
  document.getElementById('mama-msg').textContent = msg;
}

// ── Menu ───────────────────────────────────────────────────────────────────
function buildMenu() {
  const grid = document.getElementById('recipe-grid');
  grid.innerHTML = RECIPES.map(r => `
    <button class="recipe-card" data-id="${r.id}">
      <span class="recipe-emoji">${r.emoji}</span>
      <span class="recipe-name">${r.name}</span>
      <span class="recipe-steps">${r.steps.length} steps</span>
    </button>`).join('');
  grid.querySelectorAll('.recipe-card').forEach(card =>
    card.addEventListener('click', () => startRecipe(RECIPES.find(r => r.id === card.dataset.id)))
  );
  showScreen('screen-menu');
}

// ── Game Flow ──────────────────────────────────────────────────────────────
function startRecipe(recipe) {
  G.recipe = recipe; G.stepIdx = 0; G.scores = [];
  document.getElementById('game-recipe-name').textContent = recipe.name;
  showScreen('screen-game');
  runStep();
}

function runStep() {
  if (G.cleanup) { G.cleanup(); G.cleanup = null; }
  const step  = G.recipe.steps[G.stepIdx];
  const total = G.recipe.steps.length;
  document.getElementById('step-counter').textContent = `Step ${G.stepIdx + 1} / ${total}`;
  document.getElementById('step-bar-fill').style.width  = `${((G.stepIdx + 1) / total) * 100}%`;
  document.getElementById('step-instruction').textContent = step.instruction;
  const el = document.getElementById('game-area');
  el.innerHTML = '';
  mama('', stepLine(step.game));
  const fns = { chop:gameChop, stir:gameStir, pour:gamePour, season:gameSeason, flip:gameFlip, knead:gameKnead, peel:gamePeel, grate:gameGrate, heat:gameHeat };
  G.cleanup = fns[step.game](el, step, onStepDone) || null;
}

function onStepDone(raw) {
  const score = Math.round(Math.max(0, Math.min(100, raw)));
  G.scores.push(score);
  if (G.cleanup) { G.cleanup(); G.cleanup = null; }

  const overlay = document.getElementById('reaction-overlay');
  const label   = document.getElementById('reaction-label');
  document.getElementById('reaction-score').textContent = score;

  let expr, text, mamaText;
  if (score >= 88) {
    expr = 'wonderful'; text = 'Wonderful! ★'; mamaText = 'Perfect! Amazing! ★★★';
    SFX.fanfare(); setTimeout(() => burst('star', 18), 100); setTimeout(() => burst('heart', 10), 400);
  } else if (score >= 68) {
    expr = 'good'; text = 'Good!'; mamaText = 'Well done! Keep it up!';
    SFX.success(); setTimeout(() => burst('star', 8), 100);
  } else if (score >= 48) {
    expr = 'ok'; text = 'OK!'; mamaText = "Not bad! You'll get it!";
    SFX.ding();
  } else {
    expr = 'bad'; text = 'Oh no...'; mamaText = 'Practice makes perfect!';
    SFX.sad(); sweatMama();
  }

  label.textContent = text;
  label.className   = `reaction-label ${expr}`;
  mama(expr === 'wonderful' ? 'wonderful' : expr === 'bad' ? 'worried' : '', mamaText);
  overlay.classList.remove('hidden');

  const advance = () => {
    overlay.classList.add('hidden');
    overlay.removeEventListener('click', advance);
    G.stepIdx++;
    G.stepIdx >= G.recipe.steps.length ? showResult() : runStep();
  };
  setTimeout(() => overlay.addEventListener('click', advance), 400);
  setTimeout(advance, 2400);
}

function showResult() {
  const avg   = G.scores.reduce((a, b) => a + b, 0) / G.scores.length;
  const grade = avg >= 88 ? 'S' : avg >= 72 ? 'A' : avg >= 55 ? 'B' : 'C';

  document.getElementById('result-dish').textContent    = G.recipe.result;
  document.getElementById('result-name').textContent    = G.recipe.name;
  document.getElementById('result-grade').textContent   = grade;
  document.getElementById('result-grade').className     = `result-grade grade-${grade}`;
  document.getElementById('result-mama-msg').textContent = G.recipe.mamaMsg;
  document.getElementById('result-scores').innerHTML    = G.recipe.steps.map((s, i) => `
    <div class="result-step">
      <span>${s.instruction}</span>
      <span class="result-step-score">${G.scores[i]}</span>
    </div>`).join('');

  mama('wonderful', G.recipe.mamaMsg);
  showScreen('screen-result');

  if (grade === 'S' || grade === 'A') { SFX.fanfare(); setTimeout(() => rainConfetti(), 200); }
  else { SFX.success(); }
}

document.getElementById('btn-again').addEventListener('click', () => startRecipe(G.recipe));
document.getElementById('btn-menu').addEventListener('click', buildMenu);

// ── CHOP ───────────────────────────────────────────────────────────────────
function gameChop(el, step, done) {
  const emojis = step.emojis || [step.emoji];
  const needed = step.needed || emojis.length;
  let chopped  = 0;
  const t0     = Date.now();

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
      SFX.chop();
      hits++;
      item.classList.add('chopping');
      setTimeout(() => item.classList.remove('chopping'), 180);
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

// ── STIR ───────────────────────────────────────────────────────────────────
function gameStir(el, step, done) {
  const targetDist = (step.revolutions || 4) * 480;
  let dist = 0, last = null, dragging = false, raf = null, finished = false;

  el.innerHTML = `
    <canvas id="stir-canvas" width="260" height="260"></canvas>
    <p class="mg-hint">Hold & move in circles! 🌀</p>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="stir-bar" style="width:0%"></div></div>`;

  const canvas = document.getElementById('stir-canvas');
  const ctx    = canvas.getContext('2d');
  const trail  = [];

  function drawBowl() {
    ctx.clearRect(0, 0, 260, 260);
    ctx.fillStyle = '#f5e6d3';
    ctx.beginPath(); ctx.ellipse(130, 185, 105, 68, 0, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#e8d5b0';
    ctx.beginPath(); ctx.ellipse(130, 165, 105, 36, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = step.emoji?.includes('🍚') ? '#f0ece4' : step.emoji?.includes('🍯') ? '#fbbf24' : step.emoji?.includes('🥛') ? '#f0f4ff' : '#c8a97e';
    ctx.beginPath(); ctx.ellipse(130, 168, 95, 30, 0, 0, Math.PI * 2); ctx.fill();
  }

  function draw() {
    drawBowl();
    if (trail.length > 1) {
      ctx.strokeStyle = 'rgba(255,255,255,0.78)';
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
      dist += d; trail.push({ x, y }); if (trail.length > 50) trail.shift();
      SFX.stir();
      const pct = Math.min(1, dist / targetDist);
      document.getElementById('stir-bar').style.width = (pct * 100) + '%';
      if (!finished && dist >= targetDist) { finished = true; setTimeout(() => done(100), 300); }
    }
    last = { x, y };
  }

  const onDown = () => { dragging = true; last = null; };
  const onUp   = () => { dragging = false; last = null; };
  const onMove = e => { if (dragging) addPt(e.clientX, e.clientY); };
  const onTouch = e => { e.preventDefault(); if (dragging && e.touches[0]) addPt(e.touches[0].clientX, e.touches[0].clientY); };

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

// ── POUR ───────────────────────────────────────────────────────────────────
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
      <p class="pour-hint" id="pour-hint">Hold to pour!</p>
    </div>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="pour-bar" style="width:0%"></div></div>`;

  document.getElementById('pour-zone').style.cssText = `bottom:${(target-0.11)*100}%;height:22%`;
  const bottle = document.getElementById('pour-bottle');
  const stream = document.getElementById('pour-stream');
  const fillEl = document.getElementById('pour-fill');
  const hint   = document.getElementById('pour-hint');

  function tick() {
    if (pouring && !finished) {
      SFX.pour();
      fill = Math.min(1, fill + 0.004);
      fillEl.style.height = (fill * 100) + '%';
      document.getElementById('pour-bar').style.width = Math.min(100, fill / target * 100) + '%';
      if (fill >= 1) { finish(false); return; }
    }
    raf = requestAnimationFrame(tick);
  }

  function finish(released) {
    if (finished) return;
    finished = true; pouring = false;
    bottle.classList.remove('pouring'); stream.style.height = '0';
    const diff  = Math.abs(fill - target);
    const score = released && diff < 0.15 ? Math.max(40, 100 - diff * 320) : Math.max(20, 50 - diff * 200);
    hint.textContent = diff < 0.06 ? 'Perfect! ✨' : diff < 0.14 ? 'Good enough!' : fill > target ? 'Too much! 😅' : 'A bit more...';
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

// ── SEASON ─────────────────────────────────────────────────────────────────
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
    SFX.season();
    const r = food.getBoundingClientRect();
    const d = document.createElement('div');
    d.className = 'season-dot';
    d.style.left = ((cx - r.left) / r.width  * 100).toFixed(1) + '%';
    d.style.top  = ((cy - r.top)  / r.height * 100).toFixed(1) + '%';
    dots.appendChild(d);
    count++;
    document.getElementById('season-bar').style.width = (count / needed * 100) + '%';
    if (count >= needed) { finished = true; setTimeout(() => done(100), 350); }
  }

  const onClick = e => addDot(e.clientX, e.clientY);
  const onTouch = e => { e.preventDefault(); [...e.touches].forEach(t => addDot(t.clientX, t.clientY)); };

  food.addEventListener('click', onClick);
  food.addEventListener('touchstart', onTouch, { passive: false });
  food.addEventListener('touchmove',  onTouch, { passive: false });

  return () => {
    food.removeEventListener('click', onClick);
    food.removeEventListener('touchstart', onTouch);
    food.removeEventListener('touchmove',  onTouch);
  };
}

// ── FLIP ───────────────────────────────────────────────────────────────────
function gameFlip(el, step, done) {
  const gw = step.greenWidth || 0.25;
  const gS = 0.5 - gw / 2, gE = 0.5 + gw / 2;
  let pos = 0, dir = 1, speed = 0.009, flipped = false, raf = null;

  el.innerHTML = `
    <div class="flip-scene" id="flip-scene">
      <div class="flip-pan" id="flip-pan"><span class="flip-food">${step.emoji}</span></div>
      <div class="flip-gauge-wrap">
        <div class="flip-gauge">
          <div class="flip-green" style="left:${gS*100}%;width:${gw*100}%"></div>
          <div class="flip-needle" id="flip-needle" style="left:0%"></div>
        </div>
        <div class="flip-labels"><span>Too early</span><span>Perfect!</span><span>Too late</span></div>
      </div>
      <p class="mg-hint">Click when the needle hits the green! ⚡</p>
    </div>`;

  const needle = document.getElementById('flip-needle');
  const pan    = document.getElementById('flip-pan');

  function tick() {
    if (flipped) return;
    pos += dir * speed;
    if (pos >= 1) { pos = 1; dir = -1; speed = 0.007 + Math.random()*0.005; }
    if (pos <= 0) { pos = 0; dir =  1; speed = 0.007 + Math.random()*0.005; }
    needle.style.left = (pos * 100) + '%';
    raf = requestAnimationFrame(tick);
  }

  function doFlip() {
    if (flipped) return;
    flipped = true; cancelAnimationFrame(raf);
    SFX.sizzle();
    const inGreen = pos >= gS && pos <= gE;
    const dist    = Math.abs(pos - 0.5);
    const score   = inGreen ? Math.max(70, 100 - dist/(gw/2)*30) : Math.max(20, 60 - dist*90);
    pan.classList.add('flipping');
    setTimeout(() => done(score), 760);
  }

  raf = requestAnimationFrame(tick);
  const scene = document.getElementById('flip-scene');
  scene.addEventListener('click', doFlip);
  scene.addEventListener('touchstart', e => { e.preventDefault(); doFlip(); }, { passive: false });

  return () => { cancelAnimationFrame(raf); scene?.removeEventListener('click', doFlip); };
}

// ── KNEAD ──────────────────────────────────────────────────────────────────
function gameKnead(el, step, done) {
  const needed = step.strokes || 8;
  let strokes = 0, lastDir = null, startX = null, dragging = false, finished = false;

  el.innerHTML = `
    <div class="knead-surface" id="knead-surface">
      <div class="knead-dough" id="knead-dough">${step.emoji}</div>
    </div>
    <p class="mg-hint">Drag left and right to knead! 💪</p>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="knead-bar" style="width:0%"></div></div>`;

  const dough   = document.getElementById('knead-dough');
  const surface = document.getElementById('knead-surface');

  function move(x) {
    if (!dragging || startX === null || finished) return;
    const dx = x - startX;
    if (Math.abs(dx) < 28) return;
    const dir = dx > 0 ? 'r' : 'l';
    dough.style.transform = dir === 'r' ? 'scaleX(1.38) scaleY(0.75)' : 'scaleX(0.70) scaleY(1.32)';
    if (lastDir && lastDir !== dir) {
      SFX.thud(); strokes++;
      document.getElementById('knead-bar').style.width = (strokes / needed * 100) + '%';
      if (strokes >= needed) { finished = true; dough.style.transform = 'scale(1)'; setTimeout(() => done(100), 300); return; }
    }
    lastDir = dir; startX = x;
  }

  const onDown = e => { dragging = true; startX = e.clientX; };
  const onMove = e => move(e.clientX);
  const onUp   = () => { dragging = false; dough.style.transform = 'scale(1)'; startX = null; };
  const onTD   = e => { dragging = true; startX = e.touches[0].clientX; };
  const onTM   = e => { e.preventDefault(); move(e.touches[0].clientX); };
  const onTU   = () => { dragging = false; dough.style.transform = 'scale(1)'; startX = null; };

  surface.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  surface.addEventListener('touchstart', onTD, { passive: true }); document.addEventListener('touchmove', onTM, { passive: false }); document.addEventListener('touchend', onTU);

  return () => {
    surface.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp);
    surface.removeEventListener('touchstart', onTD); document.removeEventListener('touchmove', onTM); document.removeEventListener('touchend', onTU);
  };
}

// ── PEEL ───────────────────────────────────────────────────────────────────
function gamePeel(el, step, done) {
  el.innerHTML = `
    <p class="mg-hint">✋ Drag to peel!</p>
    <canvas id="peel-canvas" width="220" height="220" style="border-radius:50%;cursor:crosshair;touch-action:none;display:block;"></canvas>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="peel-bar" style="width:0%"></div></div>`;

  const canvas = document.getElementById('peel-canvas');
  const ctx    = canvas.getContext('2d');
  const skin   = document.createElement('canvas'); skin.width = skin.height = 220;
  const sc     = skin.getContext('2d');

  sc.fillStyle = step.skinColor || '#8B5E3C';
  sc.beginPath(); sc.arc(110, 110, 108, 0, Math.PI * 2); sc.fill();

  function drawAll() {
    ctx.clearRect(0, 0, 220, 220);
    ctx.fillStyle = step.baseColor || '#fef3c7';
    ctx.beginPath(); ctx.arc(110, 110, 108, 0, Math.PI * 2); ctx.fill();
    ctx.font = '88px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(step.innerEmoji || step.emoji, 110, 114);
    ctx.drawImage(skin, 0, 0);
  }
  drawAll();

  let erased = 0, finished = false, dragging = false;
  const total = Math.PI * 108 * 108;

  function erase(cx, cy) {
    const r = canvas.getBoundingClientRect();
    const x = (cx - r.left) * (220 / r.width);
    const y = (cy - r.top)  * (220 / r.height);
    SFX.scrape();
    const radius = 24;
    sc.globalCompositeOperation = 'destination-out';
    sc.beginPath(); sc.arc(x, y, radius, 0, Math.PI * 2); sc.fill();
    sc.globalCompositeOperation = 'source-over';
    drawAll();
    erased += Math.PI * radius * radius * 0.5;
    const pct = Math.min(1, erased / (total * 0.75));
    document.getElementById('peel-bar').style.width = (pct * 100) + '%';
    if (!finished && pct >= 1) { finished = true; setTimeout(() => done(100), 400); }
  }

  const onDown = () => { dragging = true; };
  const onMove = e => { if (dragging) erase(e.clientX, e.clientY); };
  const onUp   = () => { dragging = false; };
  const onTD   = () => { dragging = true; };
  const onTM   = e => { e.preventDefault(); if (dragging) erase(e.touches[0].clientX, e.touches[0].clientY); };
  const onTU   = () => { dragging = false; };

  canvas.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onTD, { passive: true }); canvas.addEventListener('touchmove', onTM, { passive: false }); document.addEventListener('touchend', onTU);

  return () => {
    canvas.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp);
    canvas.removeEventListener('touchstart', onTD); canvas.removeEventListener('touchmove', onTM); document.removeEventListener('touchend', onTU);
  };
}

// ── GRATE ──────────────────────────────────────────────────────────────────
function gameGrate(el, step, done) {
  const needed = step.strokes || 8;
  let strokes = 0, lastDir = null, startY = null, dragging = false, finished = false;

  el.innerHTML = `
    <div class="grate-scene">
      <div class="grate-box">
        <div class="grate-lines"></div>
        <div class="grate-item" id="grate-item">${step.emoji}</div>
        <div class="grate-bits" id="grate-bits"></div>
      </div>
      <p class="mg-hint">Drag up and down to grate! ⬆️⬇️</p>
    </div>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="grate-bar" style="width:0%"></div></div>`;

  const item = document.getElementById('grate-item');
  const bits = document.getElementById('grate-bits');
  const box  = el.querySelector('.grate-box');

  function move(y) {
    if (!dragging || startY === null || finished) return;
    const dy = y - startY;
    if (Math.abs(dy) < 22) return;
    const dir = dy > 0 ? 'd' : 'u';
    item.style.transform = dir === 'd' ? 'translateY(8px) scaleY(0.92)' : 'translateY(-8px) scaleY(1.08)';
    if (lastDir && lastDir !== dir) {
      SFX.scrape(); strokes++;
      const pct = strokes / needed;
      item.style.opacity = Math.max(0.3, 1 - pct * 0.6);
      item.style.fontSize = `${Math.max(1.8, 3.8 - pct * 2)}rem`;
      document.getElementById('grate-bar').style.width = (pct * 100) + '%';
      const bit = document.createElement('span'); bit.className = 'grate-bit';
      bit.textContent = '·'; bit.style.left = (15 + Math.random()*70) + '%';
      bits.appendChild(bit); setTimeout(() => bit.remove(), 900);
      if (strokes >= needed) { finished = true; item.style.transform = ''; setTimeout(() => done(100), 300); return; }
    }
    lastDir = dir; startY = y;
  }

  const onDown = e => { dragging = true; startY = e.clientY; };
  const onMove = e => move(e.clientY);
  const onUp   = () => { dragging = false; item.style.transform = ''; startY = null; };
  const onTD   = e => { dragging = true; startY = e.touches[0].clientY; };
  const onTM   = e => { e.preventDefault(); move(e.touches[0].clientY); };
  const onTU   = () => { dragging = false; item.style.transform = ''; startY = null; };

  box.addEventListener('mousedown', onDown); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  box.addEventListener('touchstart', onTD, { passive: true }); document.addEventListener('touchmove', onTM, { passive: false }); document.addEventListener('touchend', onTU);

  return () => {
    box.removeEventListener('mousedown', onDown); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp);
    box.removeEventListener('touchstart', onTD); document.removeEventListener('touchmove', onTM); document.removeEventListener('touchend', onTU);
  };
}

// ── HEAT ───────────────────────────────────────────────────────────────────
function gameHeat(el, step, done) {
  const greenMin  = step.greenMin  || 55;
  const greenMax  = step.greenMax  || 75;
  const neededMs  = (step.duration || 3) * 1000;
  let temp = 0, inZoneMs = 0, holding = false, finished = false, raf = null;
  let lastT = Date.now(), lastBubble = 0;

  el.innerHTML = `
    <div class="heat-scene">
      <div class="heat-pot-wrap">
        <div class="heat-pot" id="heat-pot">${step.emoji}</div>
        <div class="heat-steam" id="heat-steam"></div>
      </div>
      <div class="heat-gauge-wrap">
        <div class="heat-gauge">
          <div class="heat-gauge-fill" id="heat-fill" style="width:0%"></div>
          <div class="heat-gauge-zone" style="left:${greenMin}%;width:${greenMax-greenMin}%"></div>
          <div class="heat-needle" id="heat-needle" style="left:0%"></div>
        </div>
        <div class="heat-labels"><span>❄️ Cold</span><span>🔥 Too hot!</span></div>
      </div>
      <p class="mg-hint" id="heat-hint">Hold to heat up! Stay in the green zone!</p>
    </div>
    <div class="mg-bar-wrap"><div class="mg-bar-fill" id="heat-bar" style="width:0%"></div></div>`;

  const potEl   = document.getElementById('heat-pot');
  const steamEl = document.getElementById('heat-steam');
  const fillEl  = document.getElementById('heat-fill');
  const needle  = document.getElementById('heat-needle');
  const hint    = document.getElementById('heat-hint');

  function tick() {
    const now = Date.now(), dt = now - lastT; lastT = now;
    if (holding) temp = Math.min(100, temp + dt * 0.09);
    else         temp = Math.max(0,   temp - dt * 0.055);

    const inZone = temp >= greenMin && temp <= greenMax;
    if (inZone) { inZoneMs += dt; document.getElementById('heat-bar').style.width = Math.min(100, inZoneMs / neededMs * 100) + '%'; }

    fillEl.style.width = temp + '%';
    needle.style.left  = temp + '%';
    potEl.classList.toggle('boiling', inZone);
    hint.textContent = temp > greenMax ? 'Too hot! Release! 🔥' : inZone ? 'Perfect! Hold it there! ✨' : 'Keep holding...';

    if (inZone && now - lastBubble > Math.max(180, 700 - temp * 6)) {
      lastBubble = now;
      SFX.bubble();
      const b = document.createElement('span'); b.className = 'heat-bubble';
      b.textContent = ['💧','○','◦'][Math.floor(Math.random()*3)];
      b.style.left = (20 + Math.random()*60) + '%';
      steamEl.appendChild(b); setTimeout(() => b.remove(), 900);
    }

    if (!finished && inZoneMs >= neededMs) {
      finished = true; cancelAnimationFrame(raf); done(100); return;
    }
    raf = requestAnimationFrame(tick);
  }

  const onDown = () => { holding = true; };
  const onUp   = () => { holding = false; };

  el.addEventListener('mousedown', onDown); document.addEventListener('mouseup', onUp);
  el.addEventListener('touchstart', onDown, { passive: true }); document.addEventListener('touchend', onUp);
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    el.removeEventListener('mousedown', onDown); document.removeEventListener('mouseup', onUp);
    el.removeEventListener('touchstart', onDown); document.removeEventListener('touchend', onUp);
  };
}

// ── Boot ───────────────────────────────────────────────────────────────────
buildMenu();
