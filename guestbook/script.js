import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const app = initializeApp({
  apiKey:            'AIzaSyCVJWs1zFpoFGtTfATVaMJpgJrrDlMv_kM',
  authDomain:        'kimmylubs.firebaseapp.com',
  projectId:         'kimmylubs',
  storageBucket:     'kimmylubs.firebasestorage.app',
  messagingSenderId: '438543787107',
  appId:             '1:438543787107:web:fd8ee35f2c55c64b9cc456',
});
const db = getFirestore(app);

// ── Emoji picker ────────────────────────────────────────────────────────────
const EMOJIS = ['🌸','🐰','✨','🌈','🍓','🎀','🦋','🌙','⭐','🍵','🌻','💜','🐸','🍄','🎵','🌷'];
let selectedEmoji = EMOJIS[0];

const emojiRow = document.getElementById('emoji-row');
EMOJIS.forEach(e => {
  const btn = document.createElement('button');
  btn.className = 'emoji-btn' + (e === selectedEmoji ? ' selected' : '');
  btn.textContent = e;
  btn.type = 'button';
  btn.addEventListener('click', () => {
    selectedEmoji = e;
    emojiRow.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
  emojiRow.appendChild(btn);
});

// ── Char counter ─────────────────────────────────────────────────────────────
const msgEl    = document.getElementById('gb-message');
const countEl  = document.getElementById('gb-char-count');
msgEl.addEventListener('input', () => {
  countEl.textContent = `${msgEl.value.length} / 500`;
});

// ── Submit ───────────────────────────────────────────────────────────────────
const submitBtn = document.getElementById('gb-submit');
const statusEl  = document.getElementById('gb-status');

submitBtn.addEventListener('click', async () => {
  const name    = document.getElementById('gb-name').value.trim();
  const message = msgEl.value.trim();

  if (!name || !message) {
    setStatus('please fill in your name and message!', 'error');
    return;
  }

  submitBtn.disabled = true;
  try {
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      emoji: selectedEmoji,
      timestamp: serverTimestamp(),
    });
    document.getElementById('gb-name').value = '';
    msgEl.value = '';
    countEl.textContent = '0 / 500';
    setStatus('thank you for signing! ♡', 'success');
    setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'gb-status'; }, 3500);
  } catch (err) {
    setStatus('something went wrong — try again!', 'error');
  } finally {
    submitBtn.disabled = false;
  }
});

function setStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className   = `gb-status ${type}`;
}

// ── Live entries ─────────────────────────────────────────────────────────────
const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'), limit(100));

onSnapshot(q, snapshot => {
  const container = document.getElementById('gb-entries');
  if (snapshot.empty) {
    container.innerHTML = '<p class="gb-empty">no messages yet — be the first! ♡</p>';
    return;
  }
  container.innerHTML = snapshot.docs.map(doc => {
    const d    = doc.data();
    const date = d.timestamp?.toDate();
    const dateStr = date
      ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '';
    return `
      <div class="gb-entry card">
        <div class="gb-entry-header">
          <span class="gb-emoji">${d.emoji || '🌸'}</span>
          <span class="gb-name">${esc(d.name)}</span>
          <span class="gb-date">${dateStr}</span>
        </div>
        <p class="gb-message">${esc(d.message)}</p>
      </div>`;
  }).join('');
});

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
