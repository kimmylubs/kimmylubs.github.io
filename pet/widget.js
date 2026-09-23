(function () {
  const host = document.getElementById('mochi-home') || document.getElementById('pet-home');
  if (!host || !window.PuffsCare) return;
  const care = window.PuffsCare;
  const fullPage = host.id === 'pet-home';
  let fallback = care.normalize(null), storageAvailable = true, reactionTimer;
  function load() {
    try { const raw = localStorage.getItem(care.KEY); return care.advance(raw ? JSON.parse(raw) : fallback); }
    catch { storageAvailable = false; return care.advance(fallback); }
  }
  function save(state) {
    fallback = state;
    try { localStorage.setItem(care.KEY, JSON.stringify(state)); storageAvailable = true; }
    catch { storageAvailable = false; }
  }
  host.innerHTML = `
    <section class="puffs-card" aria-label="Your little friend">
      <div class="puffs-top"><span class="puffs-kicker">YOUR LITTLE FRIEND</span><span class="puffs-mood"></span></div>
      <div class="puffs-scene">
        <span class="puffs-sun" aria-hidden="true"></span><span class="puffs-cloud cloud-one" aria-hidden="true"></span><span class="puffs-cloud cloud-two" aria-hidden="true"></span>
        <span class="puffs-spark sparkle-one" aria-hidden="true">✦</span><span class="puffs-spark sparkle-two" aria-hidden="true">✧</span>
        <div class="puffs-ground" aria-hidden="true"><span>✿</span><span>✿</span><span>✿</span></div>
        <button class="puffs-bunny" type="button" aria-label="Give your friend a gentle pat">
          <span class="puffs-ears" aria-hidden="true"><i></i><i></i></span>
          <span class="puffs-body" aria-hidden="true"><i class="puffs-tail"></i><i class="puffs-paw paw-left"></i><i class="puffs-paw paw-right"></i></span>
          <span class="puffs-head" aria-hidden="true"><i class="puffs-eye eye-left"></i><i class="puffs-eye eye-right"></i><i class="puffs-blush blush-left"></i><i class="puffs-blush blush-right"></i><i class="puffs-nose"></i><i class="puffs-mouth"></i></span>
          <span class="puffs-bow" aria-hidden="true">✿</span>
        </button>
        <span class="puffs-reaction" aria-hidden="true"></span><span class="puffs-zzz" aria-hidden="true">z z z</span>
        <span class="puffs-scene-hint">tap for a little love</span>
      </div>
      <div class="puffs-content">
        <div class="puffs-name-row"><h2 class="puffs-name"></h2><button class="puffs-rename" type="button" aria-label="Rename your friend" title="Rename your friend">✎</button></div>
        <form class="puffs-rename-form" hidden><label for="puffs-name-input">Your friend’s name</label><div><input id="puffs-name-input" maxlength="24" required autocomplete="off"><button type="submit">Save</button><button type="button" class="puffs-cancel">Cancel</button></div></form>
        <p class="puffs-message" role="status" aria-live="polite"></p>
        <div class="puffs-stats">
          ${[['fullness','🍓','Food'],['happiness','♡','Joy'],['energy','☾','Energy']].map(([key, icon, label]) => `<div class="puffs-stat"><div><span>${icon} ${label}</span><span data-value="${key}"></span></div><div class="puffs-meter" role="meter" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" data-meter="${key}"><span></span></div></div>`).join('')}
        </div>
        <div class="puffs-actions"><button type="button" data-action="feed"><span aria-hidden="true">🍓</span>Feed</button><button type="button" data-action="play"><span aria-hidden="true">🎀</span>Play</button><button type="button" data-action="sleep"><span aria-hidden="true">☾</span><span class="sleep-label">Nap</span></button></div>
        <p class="puffs-info"></p>
        ${fullPage ? '<a class="puffs-visit" href="/">← Back to the scrapbook</a>' : '<a class="puffs-visit" href="/pet/"></a>'}
        <p class="puffs-storage"></p>
      </div>
    </section>`;
  const $ = selector => host.querySelector(selector);
  const card = $('.puffs-card');
  let state = load();
  save(state);
  function render(override) {
    const asleep = state.sleepUntil > Date.now();
    card.classList.toggle('is-asleep', asleep);
    $('.puffs-scene-hint').textContent = asleep ? 'shh… tiny dreams in progress' : 'tap for a little love';
    $('.puffs-name').textContent = `${state.name} ♡`;
    $('.puffs-bunny').setAttribute('aria-label', `Give ${state.name} a gentle pat`);
    $('.puffs-bunny').disabled = asleep;
    $('.puffs-mood').textContent = asleep ? 'dreaming' : state.fullness < 30 ? 'snack time' : state.energy < 25 ? 'feeling sleepy' : 'cozy & loved';
    const message = override || (asleep ? 'a tiny nap, a big dream ☁' : state.fullness < 30 ? 'a strawberry would be lovely ♡' : state.energy < 25 ? 'shall we have a cozy little nap?' : state.happiness < 40 ? 'a little playtime together?' : 'my favorite place is here with you.');
    if ($('.puffs-message').textContent !== message) $('.puffs-message').textContent = message;
    for (const key of ['fullness','happiness','energy']) {
      const value = Math.round(state[key]);
      $(`[data-value="${key}"]`).textContent = `${value}%`;
      const meter = $(`[data-meter="${key}"]`);
      meter.setAttribute('aria-valuenow', value);
      meter.firstElementChild.style.width = `${value}%`;
    }
    $('[data-action="feed"]').disabled = asleep || state.fullness >= 100;
    $('[data-action="play"]').disabled = asleep || state.energy < 10;
    $('.sleep-label').textContent = asleep ? 'Wake' : 'Nap';
    $('[data-action="sleep"]').setAttribute('aria-label', asleep ? 'Wake your friend' : 'Take a one-minute nap');
    const days = Math.max(0, Math.floor((Date.now() - state.born) / 86400000));
    $('.puffs-info').textContent = asleep ? `Resting · ${Math.ceil((state.sleepUntil - Date.now()) / 1000)}s left` : `${days ? `${days} day${days === 1 ? '' : 's'} together` : 'our first day together'} · ${state.careCount} little moments`;
    if (!fullPage) $('.puffs-visit').textContent = `Spend a little time with ${state.name} →`;
    $('.puffs-storage').textContent = storageAvailable ? '' : 'Your friend is here for this visit. Saving is unavailable in this browser.';
  }
  function interact(action) {
    state = load();
    const resolved = action === 'sleep' && state.sleepUntil ? 'wake' : action;
    state = care.act(state, resolved);
    save(state);
    clearTimeout(reactionTimer);
    card.classList.remove('is-playing', 'is-feeding', 'is-petted');
    const feedback = {feed:'nom nom… berry delicious! ♡',play:'again, again! that was fun!',pet:'oh! a little pat just for me ♡',wake:'hello again, sunshine!'};
    render(feedback[resolved]);
    const effects = { feed: ['is-feeding','🍓'], play: ['is-playing','✦'], pet: ['is-petted','♡'] };
    if (effects[resolved]) {
      const [className, symbol] = effects[resolved];
      $('.puffs-reaction').textContent = symbol;
      // Restart an animation after repeated clicks without changing the saved pet.
      void card.offsetWidth;
      card.classList.add(className);
    }
    reactionTimer = setTimeout(() => { card.classList.remove('is-playing','is-feeding','is-petted'); state = load(); render(); }, 2200);
  }
  host.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => interact(button.dataset.action)));
  $('.puffs-bunny').addEventListener('click', () => interact('pet'));
  $('.puffs-rename').addEventListener('click', () => {
    $('.puffs-rename-form').hidden = false;
    $('#puffs-name-input').value = state.name;
    $('#puffs-name-input').focus();
  });
  function closeRename() { $('.puffs-rename-form').hidden = true; $('.puffs-rename').focus(); }
  $('.puffs-cancel').addEventListener('click', closeRename);
  $('.puffs-rename-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#puffs-name-input').value.trim();
    if (!name) return;
    state = load(); state.name = name.slice(0,24); save(state); render(); closeRename();
  });
  $('#puffs-name-input').addEventListener('keydown', event => { if (event.key === 'Escape') closeRename(); });
  window.addEventListener('storage', event => { if (event.key === care.KEY || event.key === null) { clearTimeout(reactionTimer); card.classList.remove('is-playing','is-feeding','is-petted'); state = load(); render(); } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { state = load(); render(); } });
  setInterval(() => { if (!document.hidden) { state = load(); if (!card.matches('.is-playing,.is-feeding,.is-petted')) render(); } }, 1000);
  render();
})();
