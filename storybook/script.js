const STORAGE_KEY = 'scrapbook_reading_v1';
const $ = selector => document.querySelector(selector);
let stored = {}, storageOK = true;
try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { storageOK = false; }
const validIds = new Set(BOOKS.map(book => book.id));
const favorites = new Set(Array.isArray(stored.favorites) ? stored.favorites.filter(id => validIds.has(id)) : []);
const progress = {};
for (const book of BOOKS) {
  const saved = stored.progress?.[book.id];
  if (saved && Number.isInteger(saved.page)) progress[book.id] = {page:Math.max(0,Math.min(book.pages.length-1,saved.page)),complete:saved.complete===true};
}
let lastBook = validIds.has(stored.lastBook) ? stored.lastBook : null;
let textSize = [18,20,22,24,26].includes(stored.textSize) ? stored.textSize : 20;
let favoritesOnly = false, activeBook = null, pageIndex = 0, lastOpenedButton = null;

function saveReading() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify({favorites:[...favorites],progress,lastBook,textSize})); storageOK=true; }
  catch { storageOK=false; }
  $('#reading-storage').textContent = storageOK ? '' : 'You can still read every story. Saving your place is unavailable in this browser.';
}
function minutes(book) { return Math.max(1,Math.ceil(book.pages.reduce((sum,p)=>sum+p.text.split(/\s+/).length,0)/160)); }
function featuredBook() { return BOOKS.find(book=>book.id===lastBook) || BOOKS.find(book=>book.id==='mochi') || BOOKS[0]; }
function resumePage(book) { return progress[book.id]?.complete ? 0 : progress[book.id]?.page || 0; }
function toggleFavorite(book) {
  if (favorites.has(book.id)) favorites.delete(book.id); else favorites.add(book.id);
  saveReading();
  renderLibrary(); if (activeBook) updateFavorite();
}
function renderLibrary() {
  const query=$('#book-search').value.trim().toLowerCase();
  const visible=BOOKS.filter(book=>(!favoritesOnly || favorites.has(book.id)) && book.title.toLowerCase().includes(query));
  const grid=$('#book-grid');grid.replaceChildren();
  visible.forEach(book=>{
    const article=document.createElement('article');article.className='library-book';
    const pick=document.createElement('button');pick.type='button';pick.className='book-pick';pick.dataset.book=book.id;
    pick.style.setProperty('--book-color',book.coverColor);pick.style.setProperty('--book-spine',book.spineColor);
    const emoji=document.createElement('span');emoji.className='shelf-book-emoji';emoji.textContent=book.emoji;emoji.setAttribute('aria-hidden','true');
    const copy=document.createElement('span');copy.className='shelf-book-copy';
    const title=document.createElement('span');title.className='shelf-book-title';title.textContent=book.title;
    copy.append(title);pick.append(emoji,copy);
    pick.classList.toggle('active',activeBook?.id===book.id);
    if(activeBook?.id===book.id)pick.setAttribute('aria-current','true');
    pick.addEventListener('click',()=>{lastOpenedButton=book.id;openBook(book,resumePage(book));});
    article.append(pick);grid.append(article);
  });
  $('#filter-all').setAttribute('aria-pressed',!favoritesOnly);$('#filter-favorites').setAttribute('aria-pressed',favoritesOnly);
  $('#library-empty').hidden=visible.length>0;
  $('#library-results').textContent=`${visible.length} ${visible.length===1?'story':'stories'}${favoritesOnly?' in your favorites':''}`;
  $('#library-summary').textContent=`${BOOKS.length} illustrated stories · ${Object.values(progress).filter(p=>p.complete).length} read · ${favorites.size} favorites`;
  const book=featuredBook();const saved=progress[book.id];
  $('#featured-label').textContent=saved&&!saved.complete?'RIGHT WHERE YOU LEFT OFF':'A COZY PLACE TO START';
  $('#featured-title').textContent=book.title;
  $('.featured-art').firstChild.textContent=book.emoji;
  $('#featured-description').textContent=saved&&!saved.complete?`Your bookmark is on page ${saved.page+1} of ${book.pages.length}.`:`${book.pages.length} illustrated pages. ${minutes(book)} quiet minutes just for you.`;
  $('#featured-read').textContent=saved&&!saved.complete?'Continue reading →':'Read this story →';
}
function updateFavorite() {
  $('#reader-favorite').textContent=favorites.has(activeBook.id)?'♥':'♡';
  $('#reader-favorite').setAttribute('aria-pressed',favorites.has(activeBook.id));
  $('#reader-favorite').setAttribute('aria-label',`Favorite ${activeBook.title}`);
}
function openBook(book,page=0,writeHistory=true) {
  activeBook=book;pageIndex=Math.max(0,Math.min(book.pages.length-1,page));
  $('#library').hidden=true;$('#reader').hidden=false;$('#reader-title').textContent=book.title;
  $('#page-select').replaceChildren(...book.pages.map((_,i)=>{const option=document.createElement('option');option.value=i;option.textContent=`${i+1} of ${book.pages.length}`;return option;}));
  if(writeHistory) history.pushState(null,'',`#${book.id}/${pageIndex+1}`);
  renderLibrary();updateFavorite();renderPage();$('#reader-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
function renderPage() {
  const page=activeBook.pages[pageIndex];
  $('#left-page').className=`left-page ${page.scene}`;
  const character=$('#scene-char');
  if(page.svg) character.innerHTML=page.svg; else character.textContent=page.char||'';
  $('#scene-caption').textContent=activeBook.title;
  $('#page-text').replaceChildren(...page.text.split(/\n\s*\n/).map(part=>{const paragraph=document.createElement('p');paragraph.textContent=part.replace(/\n/g,' ');return paragraph;}));
  $('#page-text').style.setProperty('--story-text-size',`${textSize}px`);
  $('#page-number').textContent=`${pageIndex+1} / ${activeBook.pages.length}`;
  $('#previous-page').disabled=pageIndex===0;$('#next-page').disabled=pageIndex===activeBook.pages.length-1;
  $('#page-select').value=String(pageIndex);
  const percent=Math.round((pageIndex+1)/activeBook.pages.length*100);
  $('#reading-progress').setAttribute('aria-valuenow',percent);$('#reading-progress').setAttribute('aria-valuetext',`Page ${pageIndex+1} of ${activeBook.pages.length}`);$('#reading-progress').firstElementChild.style.width=`${percent}%`;
  $('#reader-hint').textContent=`Page ${pageIndex+1} of ${activeBook.pages.length} · Use arrow keys or swipe to turn the page.`;
  $('#reader-finish').hidden=pageIndex!==activeBook.pages.length-1;
  $('#text-smaller').disabled=textSize===18;$('#text-larger').disabled=textSize===26;
  progress[activeBook.id]={page:pageIndex,complete:progress[activeBook.id]?.complete===true||pageIndex===activeBook.pages.length-1};
  lastBook=activeBook.id;saveReading();history.replaceState(null,'',`#${activeBook.id}/${pageIndex+1}`);
}
function turnPage(direction) { if(!activeBook)return;const next=pageIndex+direction;if(next<0||next>=activeBook.pages.length)return;pageIndex=next;renderPage(); }
function backToLibrary(writeHistory=true) {
  activeBook=null;$('#reader').hidden=true;$('#library').hidden=false;
  if(writeHistory) history.pushState(null,'',location.pathname+location.search);
  renderLibrary();
  const trigger=[...document.querySelectorAll('[data-book]')].find(button=>button.dataset.book===lastOpenedButton);
  (trigger||$('#filter-all')).focus({preventScroll:true});
}
function openFromURL() {
  const [id,number]=location.hash.slice(1).split('/');const book=BOOKS.find(b=>b.id===id);
  if(book)openBook(book,Number.isInteger(Number(number))&&Number(number)>0?Number(number)-1:resumePage(book),false);
  else backToLibrary(false);
}
$('#featured-read').addEventListener('click',()=>{const book=featuredBook();lastOpenedButton=book.id;openBook(book,resumePage(book));});
$('#book-search').addEventListener('input',renderLibrary);
$('#filter-all').addEventListener('click',()=>{favoritesOnly=false;renderLibrary();});
$('#filter-favorites').addEventListener('click',()=>{favoritesOnly=true;renderLibrary();});
$('#back-library').addEventListener('click',()=>backToLibrary());$('#another-story').addEventListener('click',()=>backToLibrary());
$('#reread-story').addEventListener('click',()=>{pageIndex=0;renderPage();$('#reader-title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});});
$('#reader-favorite').addEventListener('click',()=>toggleFavorite(activeBook));
$('#previous-page').addEventListener('click',()=>turnPage(-1));$('#next-page').addEventListener('click',()=>turnPage(1));
$('#page-select').addEventListener('change',event=>{pageIndex=Number(event.target.value);renderPage();});
for(const [id,change] of [['text-smaller',-2],['text-larger',2]]) $('#'+id).addEventListener('click',()=>{textSize=Math.max(18,Math.min(26,textSize+change));renderPage();});
document.addEventListener('keydown',event=>{if(!activeBook||event.target.closest('input,select,textarea')||event.altKey||event.ctrlKey||event.metaKey)return;if(event.key==='ArrowRight'){event.preventDefault();turnPage(1);}if(event.key==='ArrowLeft'){event.preventDefault();turnPage(-1);}if(event.key==='Escape')backToLibrary();});
let touchStart=null;
$('#reading-spread').addEventListener('touchstart',event=>{if(event.touches.length===1)touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
$('#reading-spread').addEventListener('touchend',event=>{if(!touchStart)return;const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)turnPage(dx<0?1:-1);touchStart=null;},{passive:true});
window.addEventListener('popstate',openFromURL);
renderLibrary();if(location.hash)openFromURL();
if(!storageOK)$('#reading-storage').textContent='You can still read every story. Saving your place is unavailable in this browser.';
