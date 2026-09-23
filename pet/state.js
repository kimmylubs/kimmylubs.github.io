/* Shared care rules. Keep the original storage key so existing pets come along. */
(function (root) {
  const KEY = 'mochi_state';
  const clamp = (n, fallback = 70) => Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : fallback;
  function normalize(raw, now = Date.now()) {
    const s = raw && typeof raw === 'object' ? raw : {};
    return {
      name: typeof s.name === 'string' && s.name.trim() ? s.name.trim().slice(0, 24) : 'Puffs',
      fullness: clamp(s.fullness, 80), happiness: clamp(s.happiness, 75), energy: clamp(s.energy, 80),
      born: Number.isFinite(s.born) ? Math.min(s.born, now) : now,
      lastUpdate: Number.isFinite(s.lastUpdate) ? Math.min(s.lastUpdate, now) : now,
      sleepUntil: Number.isFinite(s.sleepUntil) ? Math.min(s.sleepUntil, now + 60000) : 0,
      careCount: Number.isFinite(s.careCount) ? Math.max(0, Math.floor(s.careCount)) : 0,
    };
  }
  function advance(raw, now = Date.now()) {
    const s = normalize(raw, now);
    const elapsed = Math.max(0, now - s.lastUpdate);
    const resting = s.sleepUntil ? Math.max(0, Math.min(now, s.sleepUntil) - s.lastUpdate) : 0;
    const minutes = Math.min(elapsed / 60000, 480);
    // Time away is gentle: needs never sink below 15 just because a tab was closed.
    const drift = (value, amount) => Math.max(Math.min(value, 15), value - amount);
    s.fullness = drift(s.fullness, minutes * 0.03);
    s.happiness = drift(s.happiness, minutes * 0.015);
    s.energy = clamp(drift(s.energy, Math.min(Math.max(0, elapsed - resting) / 60000, 480) * 0.04) + resting / 2000);
    if (s.sleepUntil <= now) s.sleepUntil = 0;
    s.lastUpdate = now;
    return s;
  }
  function act(raw, action, now = Date.now()) {
    const s = advance(raw, now);
    if (action === 'wake') { s.sleepUntil = 0; return s; }
    if (s.sleepUntil) return s;
    if (action === 'feed') { s.fullness = clamp(s.fullness + 25); s.happiness = clamp(s.happiness + 4); }
    else if (action === 'play') {
      if (s.energy < 10) return s;
      s.happiness = clamp(s.happiness + 20); s.energy = clamp(s.energy - 8); s.fullness = clamp(s.fullness - 3);
    } else if (action === 'pet') s.happiness = clamp(s.happiness + 5);
    else if (action === 'sleep') s.sleepUntil = now + 60000;
    else return s;
    s.careCount += 1;
    return s;
  }
  root.PuffsCare = { KEY, normalize, advance, act };
})(typeof window === 'undefined' ? globalThis : window);
