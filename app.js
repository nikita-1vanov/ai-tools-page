// Каталог уже лежит в HTML (его генерирует scripts/build.mjs) — здесь только поведение:
// «ещё N» в полосах, фильтр «Работает из России», подсказка при наведении, карточка сервиса, форма обратной связи.
(() => {
  const layout = document.getElementById('layout');
  const tip = document.getElementById('tip'), card = document.getElementById('card'), backdrop = document.getElementById('backdrop');
  const desktop = matchMedia('(min-width: 900px)');
  const canHover = matchMedia('(hover: hover)');

  const secs = [...layout.querySelectorAll('.sec')];
  const tools = [...layout.querySelectorAll('.tool')];
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  // ---------- Логотипы ----------

  // Сайты без логотипа сборка уже заменила буквой (см. scripts/build.mjs).
  // Здесь — запасной вариант: картинка не загрузилась или сборка шла без сети (нет data-logo)
  // и сервис фавиконок отдал свою заглушку 16px.
  function monogram(ico, name) {
    ico.querySelector('img')?.replaceWith(el('span', 'mono', name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase()));
  }
  tools.forEach(a => {
    const img = a.querySelector('img');
    if (!img) return;
    const ico = a.querySelector('.ico'), name = a.querySelector('.name').textContent;
    const check = () => { if (!img.naturalWidth || (!img.dataset.logo && img.naturalWidth <= 16)) monogram(ico, name); };
    if (img.complete && img.naturalWidth) check();
    else { img.addEventListener('load', check); img.addEventListener('error', () => monogram(ico, name)); }
  });

  // ---------- «Ещё N / свернуть» ----------

  // Сколько сервисов видно без раскрытия — задано в styles.css (--visible у .icons), чтобы не расходиться с nth-child
  const visible = sec => +getComputedStyle(sec.querySelector('.icons')).getPropertyValue('--visible') || 12;
  function updateMore() {
    secs.forEach(sec => {
      const n = +sec.querySelector('.icons').dataset.n, btn = sec.querySelector('.more'), open = sec.classList.contains('open');
      btn.hidden = n <= visible(sec);
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.n').textContent = open ? 'свернуть' : `ещё ${n - visible(sec)}`;
    });
  }
  // На десктопе полосы одного ряда делят высоту: раскрываем и сворачиваем обе сразу, иначе соседняя висит пустой
  function toggleSec(sec, open = !sec.classList.contains('open')) {
    const group = desktop.matches ? secs.filter(x => x.dataset.row === sec.dataset.row) : [sec];
    group.forEach(x => x.classList.toggle('open', open));
    updateMore();
  }
  secs.forEach(sec => sec.querySelector('.more').addEventListener('click', () => toggleSec(sec)));
  let lastWidth = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== lastWidth) { lastWidth = innerWidth; updateMore(); } });
  updateMore();

  // ---------- Фильтр «Работает из России» ----------

  // Неподходящие сервисы остаются на месте, тускнеют и не кликаются. Выбор запоминается в браузере.
  const FILTER_KEY = 'ai-tools:ru-only';
  const filterBtn = document.getElementById('filter-ru'), countEl = document.getElementById('count');
  let ruOnly = false;
  try { ruOnly = localStorage.getItem(FILTER_KEY) === '1'; } catch {}

  function applyFilter() {
    filterBtn.setAttribute('aria-pressed', String(ruOnly));
    const seen = new Set();
    tools.forEach(a => {
      const off = ruOnly && a.dataset.vpn !== 'ok';
      a.classList.toggle('off', off);
      if (off) { a.setAttribute('aria-disabled', 'true'); a.tabIndex = -1; }
      else { a.removeAttribute('aria-disabled'); a.removeAttribute('tabindex'); seen.add(a.dataset.id); }
    });
    countEl.replaceChildren();
    if (ruOnly) countEl.append(el('b', null, seen.size), ` из ${countEl.dataset.total}`);
  }
  filterBtn.addEventListener('click', () => {
    ruOnly = !ruOnly;
    try { localStorage.setItem(FILTER_KEY, ruOnly ? '1' : '0'); } catch {}
    applyFilter();
  });
  applyFilter();

  // ---------- Всплывашки: подсказка и карточка ----------

  // Ставит блок по центру под якорем (или над ним, если снизу не помещается), не выходя за края экрана
  function place(box, r, below, above) {
    // Замер в левом углу: у правого края блок сжимается и даёт неверный размер
    box.style.left = '0px'; box.style.top = '0px';
    const w = box.offsetWidth, h = box.offsetHeight;
    box.style.left = `${Math.min(Math.max(r.left + r.width / 2 - w / 2, 8), innerWidth - w - 8)}px`;
    box.style.top = `${r.bottom + h + below + 10 < innerHeight ? r.bottom + below : r.top - h - above}px`;
  }
  const colorOf = a => getComputedStyle(a).getPropertyValue('--c');

  function showTip(a) {
    if (!desktop.matches || !canHover.matches || a.classList.contains('off') || card.classList.contains('show')) return;
    tip.replaceChildren(el('b', null, a.querySelector('.name').textContent), ` · ${a.dataset.desc}`, el('span', 'more-hint', 'Нажмите — подробнее'));
    tip.style.setProperty('--c', colorOf(a));
    place(tip, a.querySelector('.ico').getBoundingClientRect(), 30, 10);
    tip.classList.add('show');
  }
  const hideTip = () => tip.classList.remove('show');

  // ---------- Карточка сервиса (клик или тап) ----------

  let selected = null;

  function openCard(a) {
    hideTip();
    selected?.classList.remove('sel');
    selected = a; a.classList.add('sel');
    const d = a.dataset, name = a.querySelector('.name').textContent;

    const hd = el('div', 'hd');
    const ico = el('span', 'ico');
    ico.append(a.querySelector('.ico').firstElementChild.cloneNode(true));
    const title = el('div'); title.append(el('b', null, name), el('small', null, d.host.replace(/^www\./, '')));
    const x = el('button', 'x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Закрыть'); x.addEventListener('click', closeCard);
    hd.append(ico, title, x);

    const dl = el('dl');
    const row = (k, v, muted) => { const dd = el('dd', muted ? 'muted' : null); dd.append(v); dl.append(el('dt', null, k), dd); };
    row('Бесплатно', d.free, d.match !== 'free');
    row(d.plan, d.paid);
    row('Из России', el('span', `st ${d.vpn}`, d.vpn === 'ok' ? 'Работает' : 'Нужен VPN'));
    row('Оплата из РФ', 'не проверяли', true);

    const go = el('a', 'go', `Открыть ${name} ↗`); go.href = a.href; go.target = '_blank'; go.rel = 'noopener';
    card.replaceChildren(hd, el('p', null, d.desc), dl, go);
    card.style.setProperty('--c', colorOf(a));

    if (desktop.matches) place(card, a.getBoundingClientRect(), 10, 10); // под названием, не поверх него
    else backdrop.classList.add('show');
    card.classList.add('show');
  }
  function closeCard() {
    card.classList.remove('show'); backdrop.classList.remove('show');
    selected?.classList.remove('sel'); selected = null;
  }
  tools.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (a.classList.contains('off')) return;
      selected === a ? closeCard() : openCard(a);
    });
    a.addEventListener('mouseenter', () => showTip(a));
    a.addEventListener('mouseleave', hideTip);
    a.addEventListener('focus', () => showTip(a));
    a.addEventListener('blur', hideTip);
  });
  document.addEventListener('click', e => { if (card.classList.contains('show') && !card.contains(e.target) && !e.target.closest('.tool')) closeCard(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCard(); });
  // На десктопе карточка привязана к иконке — при прокрутке закрываем. На телефоне она по центру, а страница под ней заблокирована
  addEventListener('scroll', () => { hideTip(); if (desktop.matches) closeCard(); }, { passive: true });
  backdrop.addEventListener('click', closeCard);

  // ---------- Форма «Предложить сервис / Сообщить об ошибке» ----------

  // Отправляется в Telegram через прокси (scripts/relay); адрес — SITE.relayUrl в tools.js
  const fb = document.getElementById('fb');
  const RELAY_URL = fb.dataset.relay, TOOL_NAMES = JSON.parse(fb.dataset.tools);
  const fbForm = document.getElementById('fb-form'), fbDone = document.getElementById('fb-done');
  const fbStatus = document.getElementById('fb-status'), fbSend = document.getElementById('fb-send');
  const tabs = [...fb.querySelectorAll('[role="tab"]')];
  const acInput = fbForm.querySelector('[name="tool"]'), acList = document.getElementById('ac-list');

  function fbKind(kind) {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.kind === kind)));
    fb.querySelectorAll('.fb-body').forEach(b => {
      const on = b.dataset.for === kind;
      b.hidden = !on;
      b.querySelectorAll('[required]').forEach(i => (i.disabled = !on));
    });
  }
  function fbOpen(kind) {
    fbForm.reset(); fbForm.hidden = false; fbDone.hidden = true; fbStatus.textContent = ''; fbStatus.classList.remove('err');
    acClose();
    fbKind(kind);
    fb.showModal();
    fb.querySelector('.fb-body:not([hidden]) input').focus();
  }
  document.querySelectorAll('[data-form]').forEach(b => b.addEventListener('click', () => fbOpen(b.dataset.form)));
  tabs.forEach(t => t.addEventListener('click', () => fbKind(t.dataset.kind)));
  document.getElementById('fb-close').addEventListener('click', () => fb.close());
  document.getElementById('fb-ok').addEventListener('click', () => fb.close());
  fb.addEventListener('click', e => { if (e.target === fb) fb.close(); });

  // Подсказки по названию сервиса: список по клику в поле или вводу, не по программному фокусу
  let acIdx = -1;
  function acRender() {
    const q = acInput.value.trim().toLowerCase();
    const hits = q ? TOOL_NAMES.filter(n => n.toLowerCase().includes(q)).slice(0, 30) : TOOL_NAMES;
    acList.replaceChildren(...(hits.length
      ? hits.map(n => { const li = el('li', null, n); li.setAttribute('role', 'option'); return li; })
      : [el('li', 'none', 'Нет в каталоге — напишите название как есть')]));
    acIdx = -1;
    acList.hidden = false; acInput.setAttribute('aria-expanded', 'true');
  }
  function acClose() { acList.hidden = true; acInput.setAttribute('aria-expanded', 'false'); }
  acInput.addEventListener('click', acRender);
  acInput.addEventListener('input', acRender);
  acInput.addEventListener('blur', () => setTimeout(acClose, 150));
  acList.addEventListener('mousedown', e => { const li = e.target.closest('li:not(.none)'); if (li) { acInput.value = li.textContent; acClose(); } });
  acInput.addEventListener('keydown', e => {
    const items = [...acList.querySelectorAll('li:not(.none)')];
    if (acList.hidden || !items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      acIdx = (acIdx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((li, i) => li.setAttribute('aria-selected', String(i === acIdx)));
      items[acIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && acIdx >= 0) { e.preventDefault(); acInput.value = items[acIdx].textContent; acClose(); }
    else if (e.key === 'Escape') { e.preventDefault(); acClose(); } // иначе Esc закроет весь диалог
  });

  fbForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!fbForm.reportValidity()) return;
    const data = Object.fromEntries(new FormData(fbForm));
    data.what = [...fbForm.querySelectorAll('[name="what"]:checked')].map(i => i.value);
    data.kind = tabs.find(t => t.getAttribute('aria-selected') === 'true').dataset.kind;
    data.page = location.href;
    fbStatus.classList.remove('err');
    if (!RELAY_URL) { fbStatus.textContent = 'Отправка ещё не подключена'; fbStatus.classList.add('err'); return; }
    fbSend.disabled = true; fbStatus.textContent = 'Отправляем…';
    try {
      const res = await fetch(RELAY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(await res.text());
      fbForm.hidden = true; fbDone.hidden = false;
    } catch {
      fbStatus.textContent = 'Не отправилось. Попробуйте позже или напишите в канал.'; fbStatus.classList.add('err');
    } finally { fbSend.disabled = false; }
  });

  // ---------- Прямые ссылки: #kling или #klingai.com — карточка сервиса, #suggest / #bug — форма ----------

  const h = decodeURIComponent(location.hash.slice(1)).toLowerCase().replace(/^www\./, '');
  if (h === 'suggest' || h === 'bug') fbOpen(h);
  else if (h) {
    const deep = tools.find(a => a.dataset.id === h) || tools.find(a => a.dataset.host.replace(/^www\./, '') === h);
    if (deep) {
      // Сервис может быть спрятан за «ещё N» — сначала раскрываем полосу
      const sec = deep.closest('.sec');
      if (!sec.classList.contains('open') && deep.closest('li').offsetParent === null) toggleSec(sec, true);
      // Сначала прокрутка, карточка — после: событие прокрутки закрыло бы её
      deep.scrollIntoView({ block: 'center' });
      setTimeout(() => openCard(deep), 300);
    }
  }
})();
