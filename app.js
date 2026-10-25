// Каталог уже лежит в HTML (его генерирует scripts/build.mjs) — здесь только поведение:
// страницы в полосах, фильтр FREE / NO VPN, подсказки, клавиша закладки и анимация.
(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const layout = document.getElementById('layout');
  const fx = document.getElementById('fx');
  const mark = document.getElementById('mark');
  const tip = document.getElementById('tip');

  const desktop = matchMedia('(min-width: 900px)');
  const canHover = matchMedia('(hover: hover)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const sections = [...layout.querySelectorAll('.sec')];
  const tools = [...layout.querySelectorAll('.tool')];

  // ---------- Логотипы ----------

  // Сайты без логотипа сборка уже заменила буквой (см. scripts/build.mjs).
  // Здесь — запасной вариант: картинка не загрузилась или сборка шла без сети (нет data-logo)
  // и сервис фавиконок отдал свою заглушку 16px.
  function monogram(ico, name) {
    const m = document.createElement('span');
    m.className = 'mono';
    m.textContent = name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase();
    ico.replaceChildren(m);
  }
  tools.forEach(a => {
    const img = a.querySelector('img');
    if (!img) return;
    const ico = a.querySelector('.ico'), name = a.querySelector('.name').textContent;
    const check = () => { if (!img.naturalWidth || (!img.dataset.logo && img.naturalWidth <= 16)) monogram(ico, name); };
    if (img.complete) check();
    else { img.addEventListener('load', check); img.addEventListener('error', () => monogram(ico, name)); }
  });

  // ⌘D на Mac, Ctrl+D на остальных системах
  if (!/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)) document.getElementById('bm-key').textContent = 'Ctrl+D';

  // ---------- Страницы в полосе ----------

  // На странице 8 сервисов (2 ряда по 4), на узком десктопе 900–1099px — 6 (2 ряда по 3).
  // Всегда открывается первая страница, на последней листание останавливается.
  // Десктоп: стрелки на рамке и точки. Телефон: свайп и точки, край следующей страницы выглядывает справа.
  const narrow = matchMedia('(min-width: 900px) and (max-width: 1099px)');
  const pageSize = () => (narrow.matches ? 6 : 8);

  const pagers = [...layout.querySelectorAll('.sec')].map(sec => {
    const band = sec.querySelector('.band'), vp = band.querySelector('.vp'), track = band.querySelector('.track');
    const dotsBox = sec.querySelector('.dots'), items = [...track.querySelectorAll('li')];
    const prev = sec.querySelector('.pg-arr.prev'), next = sec.querySelector('.pg-arr.next');
    let pages = [...track.children], dots = [...dotsBox.children], cur = 0;

    // Раскладываем сервисы по страницам нужного размера (сборка кладёт по 8)
    function paginate() {
      const size = pageSize();
      if (pages.length === Math.ceil(items.length / size) && pages[0].children.length === Math.min(size, items.length)) return false;
      pages = [];
      for (let k = 0; k < items.length; k += size) {
        const ul = document.createElement('ul');
        ul.className = 'icons';
        ul.append(...items.slice(k, k + size));
        pages.push(ul);
      }
      track.replaceChildren(...pages);
      dots = pages.map((_, k) => {
        const d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('aria-label', dotsBox.dataset.label.replace('%n', k + 1));
        d.addEventListener('click', () => go(k));
        return d;
      });
      dotsBox.replaceChildren(...dots);
      band.classList.toggle('paged', pages.length > 1);
      cur = 0;
      return true;
    }

    // Сдвиг до страницы k в px; последняя прижимается к правому краю (на телефоне страница уже полосы)
    const offset = k => Math.min(pages[k].offsetLeft - pages[0].offsetLeft, track.scrollWidth - vp.clientWidth);
    function go(k) {
      cur = Math.max(0, Math.min(pages.length - 1, k));
      track.style.transform = `translateX(${-offset(cur)}px)`;
      prev.disabled = cur === 0;
      next.disabled = cur === pages.length - 1;
      dots.forEach((d, j) => (j === cur ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      vp.classList.toggle('end', cur === pages.length - 1);
      hideTip();
    }
    prev.addEventListener('click', () => go(cur - 1));
    next.addEventListener('click', () => go(cur + 1));
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    // Переход Tab-ом на сервис со скрытой страницы — показываем его страницу,
    // а подсказку — когда лента доедет (go() её прячет, а на старом месте она встала бы мимо иконки)
    track.addEventListener('focusin', e => {
      const j = pages.findIndex(p => p.contains(e.target));
      if (j === cur) return;
      go(j);
      const a = e.target.closest('.tool');
      if (a) setTimeout(() => { if (document.activeElement === a) showTip(a); }, reducedMotion.matches ? 0 : 450);
    });
    // Листаем только сдвигом ленты. Браузер сам прокручивает обёртку к сфокусированной ссылке — сбрасываем,
    // иначе прокрутка сложится со сдвигом и полоса покажет пустое место
    vp.addEventListener('scroll', () => { vp.scrollLeft = 0; });

    // Свайп пальцем: лента едет за пальцем, на краях — с сопротивлением; отпустили — доводим до страницы
    let x0 = null, dx = 0, swipedAt = 0;
    vp.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' || pages.length < 2) return;
      x0 = e.clientX; dx = 0;
      track.classList.add('drag');
    });
    vp.addEventListener('pointermove', e => {
      if (x0 === null) return;
      dx = e.clientX - x0;
      const edge = (cur === 0 && dx > 0) || (cur === pages.length - 1 && dx < 0);
      track.style.transform = `translateX(${-offset(cur) + (edge ? dx / 3 : dx)}px)`;
    });
    vp.addEventListener('pointerup', () => {
      if (x0 === null) return;
      x0 = null;
      track.classList.remove('drag');
      if (Math.abs(dx) > 10) swipedAt = performance.now();
      go(Math.abs(dx) > 40 ? cur + (dx < 0 ? 1 : -1) : cur);
    });
    // Браузер забрал жест себе (палец пошёл вертикально — прокрутка страницы): не листаем, возвращаем ленту
    vp.addEventListener('pointercancel', () => {
      if (x0 === null) return;
      x0 = null;
      track.classList.remove('drag');
      go(cur);
    });
    // После свайпа палец отпускают над иконкой — это не нажатие. Только сразу после свайпа:
    // нажатия с клавиатуры и скринридера позже не трогаем
    vp.addEventListener('click', e => { if (performance.now() - swipedAt < 400) e.preventDefault(); }, true);

    paginate();
    go(0);
    return {
      // Ширина страницы зависит от экрана (на телефоне 86%), размер страницы — от узкого десктопа
      relayout() { const rebuilt = paginate(); go(cur); return rebuilt; },
      get pages() { return pages; },
      get dots() { return dots; },
    };
  });
  // Пересчёт — только при смене ширины (на телефоне адресная строка при прокрутке меняет лишь высоту) и не чаще раза за кадр.
  // Страницы пересобраны — точки заново гасим по фильтру
  let lastWidth = innerWidth, frame = 0;
  addEventListener('resize', () => {
    if (innerWidth === lastWidth || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      lastWidth = innerWidth;
      if (pagers.map(p => p.relayout()).some(Boolean)) applyFilters();
    });
  });

  // ---------- Фильтр FREE / NO VPN ----------

  // Неподходящие сервисы остаются на месте, тускнеют и не кликаются. Оба фильтра — условие «И».
  // Выбор запоминается в браузере (без localStorage просто не запоминается).
  const FILTER_KEY = 'ai-tools:filters';
  const filterBtns = [...document.querySelectorAll('#filters [data-f]')];
  let active = [];
  try {
    const saved = JSON.parse(localStorage.getItem(FILTER_KEY));
    if (Array.isArray(saved)) active = filterBtns.map(b => b.dataset.f).filter(f => saved.includes(f));
  } catch {}

  function applyFilters() {
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(active.includes(b.dataset.f))));
    tools.forEach(a => {
      const tags = a.dataset.match.split(' ');
      const off = !active.every(f => tags.includes(f));
      a.classList.toggle('off', off);
      if (off) { a.setAttribute('aria-disabled', 'true'); a.tabIndex = -1; }
      else { a.removeAttribute('aria-disabled'); a.removeAttribute('tabindex'); }
    });
    // Точки страниц, где под фильтр ничего не подходит, гаснут
    pagers.forEach(p => p.dots.forEach((d, j) => d.classList.toggle('empty', active.length > 0 && !p.pages[j].querySelector('.tool:not(.off)'))));
  }
  filterBtns.forEach(b => b.addEventListener('click', () => {
    const f = b.dataset.f;
    active = active.includes(f) ? active.filter(x => x !== f) : [...active, f];
    try { localStorage.setItem(FILTER_KEY, JSON.stringify(active)); } catch {}
    applyFilters();
  }));
  tools.forEach(a => a.addEventListener('click', e => { if (a.classList.contains('off')) e.preventDefault(); }));
  applyFilters();

  const wait = ms => new Promise(r => setTimeout(r, ms));

  // ---------- Подсказка (только десктоп с мышью) ----------

  function showTip(a) {
    if (!desktop.matches || !canHover.matches || a.classList.contains('off')) return;
    const b = document.createElement('b');
    b.textContent = a.querySelector('.name').textContent;
    tip.replaceChildren(b, ` · ${a.dataset.desc}`);
    if (a.dataset.free) {
      const rows = document.createElement('dl');
      [[tip.dataset.freeLabel, a.dataset.free], [a.dataset.plan, a.dataset.paid]].forEach(([k, v]) => {
        const dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = k; dd.textContent = v;
        rows.append(dt, dd);
      });
      tip.append(rows);
    }
    tip.style.setProperty('--c', getComputedStyle(a).getPropertyValue('--c'));
    const r = a.querySelector('.ico').getBoundingClientRect();
    // Замер в левом углу: на старом месте у правого края подсказка сжимается и даёт неверный размер
    tip.style.left = '0px';
    const w = tip.offsetWidth, h = tip.offsetHeight;
    const x = Math.min(Math.max(r.left + r.width / 2 - w / 2, 8), innerWidth - w - 8);
    const below = r.bottom + h + 40 < innerHeight;
    tip.style.left = `${x}px`;
    tip.style.top = `${below ? r.bottom + 30 : r.top - h - 10}px`;
    tip.classList.add('show');
  }
  function hideTip() { tip.classList.remove('show'); }
  tools.forEach(a => {
    a.addEventListener('mouseenter', () => showTip(a));
    a.addEventListener('mouseleave', hideTip);
    a.addEventListener('focus', () => showTip(a));
    a.addEventListener('blur', hideTip);
  });
  addEventListener('scroll', hideTip, { passive: true });

  // ---------- Анимация ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const svg = (tag, attrs) => {
    const n = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    fx.appendChild(n);
    return n;
  };
  const rel = el => {
    const a = el.getBoundingClientRect(), o = layout.getBoundingClientRect();
    return { x: a.left - o.left, y: a.top - o.top, w: a.width, h: a.height };
  };

  // Неоновое мерцание контура AI — на всех экранах
  (function flicker() {
    setTimeout(() => {
      if (!reducedMotion.matches) {
        mark.classList.remove('flicker');
        void mark.offsetWidth;
        mark.classList.add('flicker');
      }
      flicker();
    }, 5000 + Math.random() * 4000);
  })();

  // Ломаная молнии между двумя точками
  function boltPoints(a, b, jitter) {
    const n = 14, pts = [];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy), px = -dy / len, py = dx / len;
    for (let i = 0; i <= n; i++) {
      const t = i / n, j = (i === 0 || i === n) ? 0 : (Math.random() - .5) * 2 * jitter * Math.sin(Math.PI * t);
      pts.push(`${a.x + dx * t + px * j},${a.y + dy * t + py * j}`);
    }
    return pts.join(' ');
  }

  async function bolt(a, b, color) {
    const glow = svg('polyline', { fill: 'none', stroke: color, 'stroke-width': 3, filter: 'url(#neon)', 'stroke-linejoin': 'round' });
    const core = svg('polyline', { fill: 'none', stroke: '#fff', 'stroke-width': 1.2, 'stroke-linejoin': 'round' });
    for (let k = 0; k < 4; k++) {
      const p = boltPoints(a, b, 16);
      glow.setAttribute('points', p);
      core.setAttribute('points', p);
      glow.style.opacity = core.style.opacity = k % 2 ? .55 : 1;
      await wait(70);
    }
    glow.remove();
    core.remove();
  }

  // Точка входа: ближайшая к знаку точка рамки и её позиция вдоль периметра
  // (путь <rect> идёт по часовой от (x + rx, y))
  function entryOf(r, p, rx) {
    const sw = r.w - 2 * rx, sh = r.h - 2 * rx, arc = Math.PI * rx / 2, P = 2 * sw + 2 * sh + 4 * arc, m = rx + 10;
    const outX = p.x < r.x ? r.x - p.x : p.x > r.x + r.w ? p.x - r.x - r.w : 0;
    const outY = p.y < r.y ? r.y - p.y : p.y > r.y + r.h ? p.y - r.y - r.h : 0;
    let pt, s;
    if (outY > outX) {
      const x = clamp(p.x, r.x + m, r.x + r.w - m);
      if (p.y < r.y) { pt = { x, y: r.y }; s = x - r.x - rx; }
      else { pt = { x, y: r.y + r.h }; s = sw + arc + sh + arc + (r.x + r.w - rx - x); }
    } else {
      const y = clamp(p.y, r.y + m, r.y + r.h - m);
      if (p.x > r.x + r.w) { pt = { x: r.x + r.w, y }; s = sw + arc + (y - r.y - rx); }
      else { pt = { x: r.x, y }; s = 2 * sw + sh + 3 * arc + (r.y + r.h - rx - y); }
    }
    return { pt, f: s / P * 100 };
  }

  // Заряд расходится по рамке двумя искрами от точки входа и сходится на дальней стороне
  async function charge(sec, r, f, color) {
    const rx = 10;
    sec.classList.add('hit');
    const mk = (stroke, width, glow) => svg('rect', {
      x: r.x, y: r.y, width: r.w, height: r.h, rx, fill: 'none', stroke, 'stroke-width': width,
      pathLength: 100, 'stroke-dasharray': '9 91', 'stroke-linecap': 'round', ...(glow ? { filter: 'url(#neon)' } : {}),
    });
    const sparks = [mk(color, 6, true), mk('#fff', 2), mk(color, 6, true), mk('#fff', 2)];
    const dur = 2200, t0 = performance.now();
    await new Promise(done => {
      (function step(now) {
        const t = Math.min(1, (now - t0) / dur), d = 50 * t;
        const fade = t > .85 ? (1 - t) / .15 : 1;
        sparks.forEach((s, k) => {
          s.setAttribute('stroke-dashoffset', -(f + (k < 2 ? d : -d) - 4.5));
          s.style.opacity = fade * (.85 + Math.random() * .15);
        });
        t < 1 ? requestAnimationFrame(step) : done();
      })(t0);
    });
    sparks.forEach(s => s.remove());
    setTimeout(() => sec.classList.remove('hit'), 250);
  }

  let last = -1;
  async function discharge() {
    let i;
    do { i = Math.floor(Math.random() * sections.length); } while (i === last);
    last = i;
    const sec = sections[i];
    const color = getComputedStyle(sec).getPropertyValue('--c').trim();
    const m = rel(mark), r = rel(sec.querySelector('.band'));
    const c = { x: m.x + m.w / 2, y: m.y + m.h / 2 };
    const { pt, f } = entryOf(r, c, 10);
    // Молния стартует с края знака в сторону рамки
    const dx = pt.x - c.x, dy = pt.y - c.y, k = 1 / Math.hypot(dx / (m.w * .45), dy / (m.h * .42));
    mark.classList.add('zap');
    await bolt({ x: c.x + dx * k, y: c.y + dy * k }, pt, color);
    mark.classList.remove('zap');
    await charge(sec, r, f, color);
  }

  // Молнии — только на десктопе, без «уменьшить движение» и пока вкладка видна
  (async function loop() {
    await wait(1500);
    for (;;) {
      if (desktop.matches && !reducedMotion.matches && !document.hidden) await discharge();
      await wait(3000 + Math.random() * 2000);
    }
  })();
})();
