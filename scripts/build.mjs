// Сборка сайта: из tools.js генерирует index.html (RU), en/index.html (EN), robots.txt и sitemap.xml.
// Каталог записывается прямо в HTML, чтобы поисковики видели его без выполнения JavaScript.
//
// Запуск:   node scripts/build.mjs
// Домен:    SITE_URL=https://example.com node scripts/build.mjs
//           (или поменять значение по умолчанию ниже)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

// Адрес сайта. Без слеша в конце.
const SITE_URL = (process.env.SITE_URL || 'https://tools.nikitaivanov.dev').replace(/\/+$/, '');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TODAY = new Date().toISOString().slice(0, 10);
// Дата изменения для sitemap и JSON-LD. Меняется, только если страницы на самом деле изменились (см. конец файла)
const read = file => (existsSync(join(ROOT, file)) ? readFileSync(join(ROOT, file), 'utf8') : '');
let DATE = read('sitemap.xml').match(/<lastmod>([\d-]+)<\/lastmod>/)?.[1] || TODAY;

// tools.js — обычный скрипт с const-объявлениями, достаём их через vm
const ctx = vm.createContext({});
vm.runInContext(`${readFileSync(join(ROOT, 'tools.js'), 'utf8')};this.SECTIONS=SECTIONS;this.PRICING=PRICING;this.I18N=I18N;`, ctx);
const { SECTIONS, PRICING, I18N } = ctx;

const PAGES = {
  ru: { path: '/', file: 'index.html', base: '' },
  en: { path: '/en/', file: 'en/index.html', base: '../' },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const host = url => new URL(url).hostname;

// Фразы терминальной строки под знаком AI — одинаковые в RU и EN, идут по кругу
const UNIQUE_TOOLS = new Set(SECTIONS.flatMap(s => s.tools.map(t => host(t.url)))).size;
const TERM_LINES = ['> SYSTEM ONLINE', `> ${UNIQUE_TOOLS} TOOLS LOADED`, '> CHARGING NEURONS...', '> HUMAN DETECTED :)', '> READY TO CREATE'];

// Логотипы. Если у сайта нет иконки, сервис фавиконок отвечает 404 и отдаёт заглушку-глобус —
// такие сервисы сразу получают букву вместо картинки. Без сети проверка пропускается,
// тогда заглушку по размеру ловит app.js.
const favicon = h => `https://www.google.com/s2/favicons?domain=${h}&sz=128`;
const LOGOS = Object.fromEntries(await Promise.all([...new Set(SECTIONS.flatMap(s => s.tools.map(t => host(t.url))))].map(async h => {
  try {
    const res = await fetch(favicon(h), { signal: AbortSignal.timeout(10000) });
    return [h, res.ok ? 'ok' : res.status === 404 ? 'none' : ''];
  } catch { return [h, '']; }
})));
const unchecked = Object.values(LOGOS).filter(v => !v).length;
if (unchecked) console.warn(`Логотипы: не удалось проверить ${unchecked} из ${Object.keys(LOGOS).length} — их проверит app.js в браузере`);

const monogram = name => name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase();

const NI_MARK = '<g fill="currentColor"><rect x="6" y="8" width="16" height="84"/><polygon points="6,8 22,8 58,92 42,92"/><rect x="42" y="8" width="16" height="84"/><rect x="78" y="8" width="16" height="84"/></g>';

// Тариф для подсказки: data-атрибуты для app.js и тот же текст для скринридеров и поисковиков
function pricing(tool, lang) {
  const p = PRICING[host(tool.url)];
  if (!p) return { attrs: '', text: '' };
  const t = I18N[lang];
  const plan = p.paid.price ? (lang === 'en' && p.paid.planEn) || p.paid.plan : t.paidLabel;
  const paid = p.paid.price ? `${(p.paid.once ? t.once : t.from)(p.paid.price)} · ${p.paid[lang]}` : p.paid[lang];
  return {
    attrs: ` data-free="${esc(p.free[lang])}" data-plan="${esc(plan)}" data-paid="${esc(paid)}"`,
    text: `. ${esc(t.freeLabel)}: ${esc(p.free[lang])}. ${esc(plan)}: ${esc(paid)}`,
  };
}

function section(sec, i, lang) {
  const side = i < 5 ? 'l' : 'r', row = i % 5 + 1;
  const name = t => (lang === 'en' && t.nameEn) || t.name;
  const items = sec.tools.map(t => {
    const pr = pricing(t, lang), h = host(t.url);
    const logo = LOGOS[h] === 'none'
      ? `<span class="mono">${esc(monogram(name(t)))}</span>`
      : `<img src="${esc(favicon(h))}" alt="" width="28" height="28" referrerpolicy="no-referrer"${LOGOS[h] ? ' data-logo="ok"' : ''}>`;
    return `
          <li><a class="tool" href="${esc(t.url)}" target="_blank" rel="noopener" data-desc="${esc(t[lang])}"${pr.attrs}>
            <span class="ico">${logo}</span>
            <span class="name">${esc(name(t))}</span><span class="sr-only"> — ${esc(t[lang])}${pr.text}</span>
          </a></li>`;
  }).join('');
  return `
      <section class="sec ${side}${sec.accent ? ' amber' : ''}" data-row="${row}" style="grid-row:${row}" aria-labelledby="sec-${sec.id}">
        <h2 class="tab" id="sec-${sec.id}">${esc(sec[lang])}</h2>
        <div class="band"><ul class="icons">${items}
        </ul></div>
      </section>`;
}

function jsonLd(lang) {
  const t = I18N[lang], url = SITE_URL + PAGES[lang].path;
  const author = { '@type': 'Person', name: 'Nikita Ivanov', jobTitle: 'AI Engineering' };
  let pos = 0;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'AI Tools: Best 2026', inLanguage: ['ru', 'en'], author },
      {
        '@type': 'CollectionPage', '@id': `${url}#page`, url, name: t.title, description: t.description, inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` }, author, dateModified: DATE,
        image: `${SITE_URL}/assets/og-${lang}.png`,
        mainEntity: {
          '@type': 'ItemList', numberOfItems: SECTIONS.reduce((n, s) => n + s.tools.length, 0),
          itemListElement: SECTIONS.flatMap(s => s.tools.map(tool => ({
            '@type': 'ListItem', position: ++pos, name: (lang === 'en' && tool.nameEn) || tool.name, url: tool.url, description: `${s[lang]}: ${tool[lang]}`,
          }))),
        },
      },
    ],
  };
}

function page(lang) {
  const t = I18N[lang], p = PAGES[lang], b = p.base;
  const url = SITE_URL + p.path, og = `${SITE_URL}/assets/og-${lang}.png`;
  const other = lang === 'ru' ? 'en' : 'ru';
  const langLink = l => l === lang
    ? `<a aria-current="true">${l.toUpperCase()}</a>`
    : `<a href="${lang === 'ru' ? 'en/' : '../'}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`;

  return `<!doctype html>
<!-- Сгенерировано scripts/build.mjs из tools.js — правки вносить туда, затем: node scripts/build.mjs -->
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Nikita Ivanov">
  <meta name="theme-color" content="#0E1014">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="ru" href="${SITE_URL}/">
  <link rel="alternate" hreflang="en" href="${SITE_URL}/en/">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AI Tools">
  <meta property="og:title" content="${esc(t.title)}">
  <meta property="og:description" content="${esc(t.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:locale:alternate" content="${I18N[other].locale}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:secure_url" content="${og}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(t.ogAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.title)}">
  <meta name="twitter:description" content="${esc(t.description)}">
  <meta name="twitter:image" content="${og}">
  <meta name="twitter:image:alt" content="${esc(t.ogAlt)}">

  <link rel="icon" href="${b}favicon.ico" sizes="48x48">
  <link rel="icon" type="image/svg+xml" href="${b}assets/favicon-32.svg">
  <link rel="icon" type="image/png" sizes="120x120" href="${b}assets/icon-120.png">
  <link rel="apple-touch-icon" href="${b}assets/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://www.google.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Unbounded:wght@300;500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Schibsted+Grotesk:wght@700&display=swap">
  <link rel="stylesheet" href="${b}styles.css">
  <script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')}</script>
</head>
<body>
  <div class="page">
    <nav class="lang" aria-label="Language">${langLink('ru')}<span aria-hidden="true">/</span>${langLink('en')}</nav>

    <header class="header">
      <h1>AI TOOLS: <span class="acc">BEST 2026</span></h1>
      <p class="tagline">${esc(t.tagline)}</p>
      <p class="bookmark">${esc(t.bookmarkBefore)} <kbd id="bm-key">⌘D</kbd>${esc(t.bookmarkAfter)}</p>
    </header>

    <main class="layout" id="layout">${SECTIONS.map((s, i) => section(s, i, lang)).join('')}
      <div class="center">
        <div class="glow" aria-hidden="true"></div>
        <div class="mark" id="mark" aria-hidden="true">AI</div>
        <p class="term" aria-hidden="true"><span id="term-text">${esc(TERM_LINES[0])}</span><span class="cur"></span></p>
        <script type="application/json" id="term-lines">${JSON.stringify(TERM_LINES)}</script>
      </div>
      <svg class="fx" id="fx" aria-hidden="true">
        <defs>
          <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>
    </main>

    <footer class="footer">
      <div class="lockup">
        <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">${NI_MARK}</svg>
        <div>
          <div class="name">NIKITA IVANOV</div>
          <div class="role"><span class="ai">AI</span> · Engineering</div>
        </div>
      </div>
    </footer>
  </div>

  <div class="tip" id="tip" role="tooltip" data-free-label="${esc(t.freeLabel)}"></div>

  <script src="${b}app.js"></script>
</body>
</html>
`;
}

// Сначала собираем с прошлой датой: если страницы не изменились, дата остаётся прежней
let pages = Object.keys(PAGES).map(lang => [PAGES[lang].file, page(lang)]);
if (pages.some(([file, html]) => read(file) !== html)) {
  DATE = TODAY;
  pages = Object.keys(PAGES).map(lang => [PAGES[lang].file, page(lang)]);
}
for (const [file, html] of pages) {
  const out = join(ROOT, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /drafts/
Disallow: /reference/
Disallow: /scripts/

# Яндекс: адреса с метками — та же страница, склеивать с адресом без них
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&ysclid&gclid&fbclid

Sitemap: ${SITE_URL}/sitemap.xml
`);

const alternates = `
    <xhtml:link rel="alternate" hreflang="ru" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${DATE}</lastmod>${alternates}
  </url>
  <url>
    <loc>${SITE_URL}/en/</loc>
    <lastmod>${DATE}</lastmod>${alternates}
  </url>
</urlset>
`);

console.log(`Собрано для ${SITE_URL}: index.html, en/index.html, robots.txt, sitemap.xml (дата изменения ${DATE})`);
