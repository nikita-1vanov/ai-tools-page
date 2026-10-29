// Прокси «форма на сайте → сообщение в Telegram». Cloudflare Worker.
//
// Зачем: сайт лежит на GitHub Pages, это статические файлы — любой токен в них виден всем.
// Токен бота хранится здесь, в секретах воркера, и в репозиторий не попадает.
//
// Секреты (wrangler secret put …):
//   TG_TOKEN   — токен бота от @BotFather
//   TG_CHAT    — id чата, куда слать (ваш личный чат с ботом или группа)
// Переменные (wrangler.toml [vars]):
//   ORIGINS    — с каких сайтов принимать, через запятую: https://tools.nikitaivanov.dev
//
// Запрос с сайта: POST JSON { kind: 'suggest' | 'bug', url, why, tool, what[], details, contact, page, website }
// Поле website — ловушка для ботов: у людей оно скрыто и пустое.

const LIMITS = { url: 300, why: 1500, tool: 100, details: 1500, contact: 64, page: 300 };

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const reply = (status, text) => new Response(text, { status, headers: { ...cors, 'Content-Type': 'text/plain; charset=utf-8' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return reply(405, 'POST only');
    if (allowed.length && !allowed.includes(origin)) return reply(403, 'Bad origin');

    // Простая защита от потока: не больше N сообщений в минуту с одного IP.
    // Binding RATE в wrangler.toml; без него проверка пропускается.
    if (env.RATE) {
      const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.RATE.limit({ key: ip });
      if (!success) return reply(429, 'Слишком часто. Подождите минуту');
    }

    let d;
    try { d = await req.json(); } catch { return reply(400, 'Bad JSON'); }
    if (!d || typeof d !== 'object' || Array.isArray(d)) return reply(400, 'Bad JSON');
    if (d.website) return reply(200, 'ok'); // бот заполнил ловушку — делаем вид, что приняли
    if (!['suggest', 'bug'].includes(d.kind)) return reply(400, 'Bad kind');

    const s = (k) => String(d[k] ?? '').trim().slice(0, LIMITS[k] || 200);
    const esc = (t) => t.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

    let text;
    if (d.kind === 'suggest') {
      if (!s('url') || !s('why')) return reply(400, 'Нужны сайт и описание');
      text = `🆕 <b>Предложить сервис</b>\n${esc(s('url'))}\n\n${esc(s('why'))}`;
    } else {
      const WHAT = { vpn: 'не открывается из России', price: 'цена или тариф устарели', free: 'бесплатного тарифа нет', other: 'другое' };
      const what = (Array.isArray(d.what) ? d.what : []).map(w => WHAT[w]).filter(Boolean).join(', ');
      if (!s('tool')) return reply(400, 'Нужен сервис');
      text = `🐞 <b>Ошибка: ${esc(s('tool'))}</b>\n${esc(what || '—')}` + (s('details') ? `\n\n${esc(s('details'))}` : '');
    }
    if (s('contact')) text += `\n\n👤 ${esc(s('contact'))}`;
    if (s('page')) text += `\n🔗 ${esc(s('page'))}`;

    const tg = await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TG_CHAT, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!tg.ok) return reply(502, 'Telegram не принял сообщение');
    return reply(200, 'ok');
  },
};
