// Каталог уже лежит в HTML (его генерирует scripts/build.mjs) — здесь только поведение:
// терминальная строка, подсказки, клавиша закладки и анимация.
(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const layout = document.getElementById('layout');
  const fx = document.getElementById('fx');
  const mark = document.getElementById('mark');
  const tip = document.getElementById('tip');
  const termText = document.getElementById('term-text');

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

  // ---------- Терминальная строка ----------

  // Фраза печатается по буквам, держится, стирается — и следующая. При «уменьшить движение» стоит первая.
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const termLines = JSON.parse(document.getElementById('term-lines').textContent);
  // Ширина строки — по самой длинной фразе, чтобы текст рос слева направо, а не расползался от центра
  function fixTermWidth() {
    const term = termText.parentElement, current = termText.textContent;
    term.style.width = '';
    termText.textContent = termLines.reduce((a, b) => (b.length > a.length ? b : a));
    term.style.width = `${Math.ceil(term.getBoundingClientRect().width)}px`;
    termText.textContent = current;
  }
  fixTermWidth();
  document.fonts.ready.then(fixTermWidth);
  addEventListener('resize', fixTermWidth);
  (async function type() {
    for (let i = 0; ; i = (i + 1) % termLines.length) {
      const line = termLines[i];
      if (reducedMotion.matches) { termText.textContent = termLines[0]; await wait(1000); continue; }
      for (let n = 2; n <= line.length; n++) { termText.textContent = line.slice(0, n); await wait(55); }
      await wait(2500);
      for (let n = line.length; n >= 2; n--) { termText.textContent = line.slice(0, n); await wait(25); }
      await wait(300);
    }
  })();

  // ---------- Подсказка (только десктоп с мышью) ----------

  function showTip(a) {
    if (!desktop.matches || !canHover.matches) return;
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
