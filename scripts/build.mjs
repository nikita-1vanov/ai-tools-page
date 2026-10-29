// Сборка сайта: из tools.js генерирует index.html, robots.txt и sitemap.xml.
// Каталог записывается прямо в HTML, чтобы поисковики видели его без выполнения JavaScript.
//
// Запуск:   node scripts/build.mjs
// Домен:    SITE_URL=https://example.com node scripts/build.mjs
//           (или поменять значение по умолчанию ниже)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

// Адрес сайта. Без слеша в конце.
const SITE_URL = (process.env.SITE_URL || 'https://tools.nikitaivanov.dev').replace(/\/+$/, '');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TODAY = new Date().toISOString().slice(0, 10);
// Дата изменения для sitemap и JSON-LD. Меняется, только если страница на самом деле изменилась (см. конец файла)
const read = file => (existsSync(join(ROOT, file)) ? readFileSync(join(ROOT, file), 'utf8') : '');
let DATE = read('sitemap.xml').match(/<lastmod>([\d-]+)<\/lastmod>/)?.[1] || TODAY;

// tools.js — обычный скрипт с const-объявлениями, достаём их через vm
const ctx = vm.createContext({});
vm.runInContext(`${readFileSync(join(ROOT, 'tools.js'), 'utf8')};this.SECTIONS=SECTIONS;this.PRICING=PRICING;this.FILTERS=FILTERS;this.SITE=SITE;`, ctx);
const { SECTIONS, PRICING, FILTERS, SITE } = ctx;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const host = url => new URL(url).hostname;

const all = SECTIONS.flatMap(s => s.tools);
const hosts = [...new Set(all.map(t => host(t.url)))];

// Сервис = название: один сервис может стоять в нескольких разделах, а два разных (Grok и Grok Imagine) — на одном домене.
// id — латинский слаг названия: прямая ссылка на карточку (#kling), счётчик фильтра, JSON-LD
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const slug = name => name.toLowerCase().replace(/[а-яё]/g, ch => TR[ch]).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const names = [...new Set(all.map(t => t.name))];
const N = names.length;
const withN = s => s.replace('{n}', N);
const dupIds = names.map(slug).filter((id, i, a) => a.indexOf(id) !== i);
if (dupIds.length) throw new Error(`Одинаковые id сервисов: ${dupIds.join(', ')}`);

// У каждого сервиса должны быть тариф и признаки фильтра, иначе карточка выйдет пустой
const missing = hosts.filter(h => !FILTERS[h] || !PRICING[h]);
if (missing.length) throw new Error(`Нет данных в FILTERS или PRICING (tools.js): ${missing.join(', ')}`);

// Логотипы. Если у сайта нет иконки, сервис фавиконок отвечает 404 и отдаёт заглушку-глобус —
// такие сервисы сразу получают букву вместо картинки. Без сети проверка пропускается,
// тогда заглушку по размеру ловит app.js.
const favicon = h => `https://www.google.com/s2/favicons?domain=${h}&sz=128`;
const LOGOS = Object.fromEntries(await Promise.all(hosts.map(async h => {
  try {
    const res = await fetch(favicon(h), { signal: AbortSignal.timeout(10000) });
    return [h, res.ok ? 'ok' : res.status === 404 ? 'none' : ''];
  } catch { return [h, '']; }
})));
const unchecked = Object.values(LOGOS).filter(v => !v).length;
if (unchecked) console.warn(`Логотипы: не удалось проверить ${unchecked} из ${hosts.length} — их проверит app.js в браузере`);

const monogram = name => name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 1).toUpperCase();

const NI_MARK = '<g fill="currentColor"><rect x="6" y="8" width="16" height="84"/><polygon points="6,8 22,8 58,92 42,92"/><rect x="42" y="8" width="16" height="84"/><rect x="78" y="8" width="16" height="84"/></g>';
const FLAG = '<svg class="flag" viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="4" fill="#fff"/><rect y="4" width="18" height="4" fill="#0039A6"/><rect y="8" width="18" height="4" fill="#D52B1E"/></svg>';
const HAND = '<svg class="hand" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.6-2.2l-3-3.6a1.5 1.5 0 0 1 2.2-2L9 15.5V11"/></svg>';

// Тариф: data-атрибуты для карточки (app.js) и тот же текст для скринридеров и поисковиков
function pricing(h) {
  const p = PRICING[h];
  const plan = p.paid.price ? p.paid.plan : 'Платно';
  const paid = p.paid.price ? `${p.paid.once ? `от ${p.paid.price} разово` : `от ${p.paid.price}/мес`} · ${p.paid.ru}` : p.paid.ru;
  return {
    attrs: ` data-free="${esc(p.free.ru)}" data-plan="${esc(plan)}" data-paid="${esc(paid)}"`,
    text: `. Бесплатно: ${esc(p.free.ru)}. ${esc(plan)}: ${esc(paid)}`,
  };
}

function tool(t) {
  const h = host(t.url), f = FILTERS[h], pr = pricing(h);
  const logo = LOGOS[h] === 'none'
    ? `<span class="mono">${esc(monogram(t.name))}</span>`
    : `<img src="${esc(favicon(h))}" alt="" width="28" height="28" loading="lazy" referrerpolicy="no-referrer"${LOGOS[h] ? ' data-logo="ok"' : ''}>`;
  const access = f.noVpn ? 'Работает' : 'Нужен VPN';
  return `
        <li><a class="tool" href="${esc(t.url)}" data-id="${slug(t.name)}" data-host="${esc(h)}" data-desc="${esc(t.ru)}"${pr.attrs} data-vpn="${f.noVpn ? 'ok' : 'vpn'}" data-match="${f.free ? 'free' : ''}">
          <span class="ico">${logo}${f.noVpn ? '<i class="dot" aria-hidden="true"></i>' : ''}</span>
          <span class="name">${esc(t.name)}</span><span class="sr-only"> — ${esc(t.ru)}${pr.text}. Из России: ${access}</span>
        </a></li>`;
}

function section(sec, i) {
  const side = i < 5 ? 'l' : 'r', row = i % 5 + 1;
  return `
      <section class="sec ${side}${sec.accent ? ' amber' : ''}" data-row="${row}" style="grid-row:${row}" aria-labelledby="sec-${sec.id}">
        <h2 class="tab" id="sec-${sec.id}">${esc(sec.ru)}</h2>
        <div class="band"><ul class="icons" data-n="${sec.tools.length}">${sec.tools.map(tool).join('')}
        </ul></div>
        <button class="more" type="button" hidden aria-expanded="false"><span class="n"></span></button>
      </section>`;
}

function jsonLd() {
  const author = { '@type': 'Person', name: 'Nikita Ivanov', jobTitle: 'AI Engineering' };
  let pos = 0;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'AI Tools: Best 2026', inLanguage: 'ru', author },
      {
        '@type': 'CollectionPage', '@id': `${SITE_URL}/#page`, url: `${SITE_URL}/`, name: SITE.title, description: withN(SITE.description), inLanguage: 'ru',
        isPartOf: { '@id': `${SITE_URL}/#website` }, author, dateModified: DATE,
        image: `${SITE_URL}/assets/og-ru.png`,
        mainEntity: {
          '@type': 'ItemList', numberOfItems: N,
          // Каждый сервис один раз — в первом разделе, где он встречается
          itemListElement: SECTIONS.flatMap(s => s.tools.filter(t => all.find(x => x.name === t.name) === t).map(t => ({
            '@type': 'ListItem', position: ++pos, name: t.name, url: t.url, description: `${s.ru}: ${t.ru}`,
          }))),
        },
      },
    ],
  };
}

// Подвал: кнопки формы и ссылки; пустые ссылки не выводятся
function footerLinks() {
  return [
    '<button type="button" data-form="suggest">Предложить сервис</button>',
    '<button type="button" data-form="bug">Сообщить об ошибке</button>',
    SITE.channel && `<a href="${esc(SITE.channel)}" target="_blank" rel="noopener">Канал в Telegram</a>`,
    SITE.course && `<a href="${esc(SITE.course)}">Курс «ИИ для новичков»</a>`,
  ].filter(Boolean).join('\n        ');
}

// Форма «Предложить сервис / Сообщить об ошибке» — отправляется в Telegram через прокси (scripts/relay)
function feedbackForm() {
  const sorted = [...names].sort((a, b) => a.localeCompare(b, 'ru'));
  return `
  <dialog class="fb" id="fb" data-relay="${esc(SITE.relayUrl)}" data-tools="${esc(JSON.stringify(sorted))}">
    <form id="fb-form" novalidate>
      <div class="fb-tabs" role="tablist">
        <button type="button" role="tab" data-kind="suggest" aria-selected="true">Предложить сервис</button>
        <button type="button" role="tab" data-kind="bug" aria-selected="false">Сообщить об ошибке</button>
      </div>
      <button type="button" class="x" id="fb-close" aria-label="Закрыть">×</button>

      <div class="fb-body" data-for="suggest">
        <label>Сайт сервиса<input name="url" type="url" placeholder="https://" required inputmode="url"></label>
        <label>Чем полезен<textarea name="why" rows="3" placeholder="Что делает и почему его стоит добавить" required></textarea></label>
      </div>
      <div class="fb-body" data-for="bug" hidden>
        <div class="ac">
          <label>Сервис<input name="tool" type="text" placeholder="Начните печатать название" required autocomplete="off" role="combobox" aria-expanded="false" aria-controls="ac-list"></label>
          <ul class="ac-list" id="ac-list" role="listbox" hidden></ul>
        </div>
        <fieldset class="fb-what"><legend>Что не так</legend>
          <label><input type="checkbox" name="what" value="vpn"> Не открывается из России</label>
          <label><input type="checkbox" name="what" value="price"> Цена или тариф устарели</label>
          <label><input type="checkbox" name="what" value="free"> Бесплатного тарифа нет</label>
          <label><input type="checkbox" name="what" value="other"> Другое</label>
        </fieldset>
        <label>Подробнее<textarea name="details" rows="3" placeholder="Что увидели и когда"></textarea></label>
      </div>

      <label>Ваш Telegram <span class="opt">необязательно</span><input name="contact" type="text" placeholder="@username" autocomplete="off"></label>
      <!-- Ловушка для ботов: люди поле не видят и не заполняют -->
      <input name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">

      <div class="fb-foot">
        <span class="fb-status" id="fb-status" aria-live="polite"></span>
        <button type="submit" class="go" id="fb-send">Отправить</button>
      </div>
    </form>
    <div class="fb-done" id="fb-done" hidden>
      <b>Отправлено</b>
      <p>Спасибо! Сообщение ушло автору в Telegram.</p>
      <button type="button" class="go" id="fb-ok">Закрыть</button>
    </div>
  </dialog>`;
}

function page() {
  const og = `${SITE_URL}/assets/og-ru.png`, description = withN(SITE.description);
  const lockup = `
        <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">${NI_MARK}</svg>
        <div>
          <div class="name">NIKITA IVANOV</div>
          <div class="role"><span class="ai">AI</span> · Engineering</div>
        </div>`;

  return `<!doctype html>
<!-- Сгенерировано scripts/build.mjs из tools.js — правки вносить туда, затем: node scripts/build.mjs -->
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(SITE.title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Nikita Ivanov">
  <meta name="theme-color" content="#0E1014">
  <link rel="canonical" href="${SITE_URL}/">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AI Tools">
  <meta property="og:title" content="${esc(SITE.title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE_URL}/">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:image" content="${og}">
  <meta property="og:image:secure_url" content="${og}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(SITE.ogAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(SITE.title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${og}">
  <meta name="twitter:image:alt" content="${esc(SITE.ogAlt)}">

  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="icon" type="image/svg+xml" href="assets/favicon-32.svg">
  <link rel="icon" type="image/png" sizes="120x120" href="assets/icon-120.png">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://www.google.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Unbounded:wght@300;500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Schibsted+Grotesk:wght@700&display=swap">
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>
</head>
<body>
  <div class="page">
    <header class="header">
      <h1>AI TOOLS: <span class="acc">BEST 2026</span></h1>
      <p class="tagline">${esc(withN(SITE.tagline))}</p>
      <p class="howto"><span class="k">${HAND}Нажмите на сервис</span></p>
    </header>

    <main class="layout" id="layout">${SECTIONS.map(section).join('')}
      <div class="center">
        <div class="glow" aria-hidden="true"></div>
        <div class="mark" aria-hidden="true">AI</div>
        <div class="filters" role="group" aria-label="Фильтр сервисов">
          <button class="tg" type="button" id="filter-ru" aria-pressed="false" data-tip="Показать только сервисы, которые открываются из России без VPN"><span class="sw" aria-hidden="true"></span>Работает из России${FLAG}</button>
        </div>
        <div class="count" id="count" data-total="${N}"></div>
      </div>
    </main>

    <footer class="footer">
      <div class="links">
        ${footerLinks()}
      </div>
      ${SITE.author
        ? `<a class="lockup" href="${esc(SITE.author)}" target="_blank" rel="noopener">${lockup}
      </a>`
        : `<div class="lockup">${lockup}
      </div>`}
    </footer>
  </div>

  <div class="tip" id="tip" role="tooltip"></div>
  <div class="backdrop" id="backdrop"></div>
  <div class="card" id="card" role="dialog" aria-modal="false"></div>
${feedbackForm()}

  <script src="app.js"></script>
</body>
</html>
`;
}

// Сначала собираем с прошлой датой: если страница не изменилась, дата остаётся прежней
let html = page();
if (read('index.html') !== html) { DATE = TODAY; html = page(); }
writeFileSync(join(ROOT, 'index.html'), html);

// Английская версия удалена 29.10.2026, но адрес /en/ был в индексе и чужих ссылках — отдаём редирект на главную
mkdirSync(join(ROOT, 'en'), { recursive: true });
writeFileSync(join(ROOT, 'en/index.html'), `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>AI Tools: Best 2026</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${SITE_URL}/">
<meta http-equiv="refresh" content="0; url=${SITE_URL}/"></head>
<body><a href="${SITE_URL}/">${SITE_URL}/</a></body></html>
`);

writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /drafts/
Disallow: /reference/
Disallow: /scripts/

# Яндекс: адреса с метками — та же страница, склеивать с адресом без них
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&ysclid&gclid&fbclid

Sitemap: ${SITE_URL}/sitemap.xml
`);

writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${DATE}</lastmod>
  </url>
</urlset>
`);

console.log(`Собрано для ${SITE_URL}: index.html, en/index.html (редирект), robots.txt, sitemap.xml — ${N} сервисов, дата изменения ${DATE}`);
