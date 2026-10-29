# Форма «Предложить сервис / Сообщить об ошибке» → Telegram

Сайт лежит на GitHub Pages — это просто файлы, и любой ключ в них виден всем, кто откроет исходник.
Поэтому токен бота хранится не на сайте, а в маленьком прокси на Cloudflare Workers (бесплатный тариф:
100 000 запросов в день). Сайт отправляет форму прокси, прокси — боту. В репозиторий попадает только код
прокси, без токенов.

```
браузер ──POST JSON──▶ Cloudflare Worker ──sendMessage──▶ Telegram-бот ──▶ ваш чат
                       (здесь TG_TOKEN, TG_CHAT)
```

## Настройка один раз

1. **Бот.** В Telegram открыть @BotFather → `/newbot` → получить токен вида `123456:ABC-DEF…`.
2. **Куда слать.** Написать боту любое сообщение (или добавить его в группу), затем открыть в браузере
   `https://api.telegram.org/bot<токен>/getUpdates` и взять `chat.id` из ответа. Для группы id начинается с `-100`.
3. **Прокси.** Нужен аккаунт Cloudflare и `npm i -g wrangler`. В этой папке:
   ```
   wrangler login
   wrangler secret put TG_TOKEN     # вставить токен
   wrangler secret put TG_CHAT      # вставить chat.id
   wrangler deploy
   ```
   `wrangler deploy` напечатает адрес вида `https://ai-tools-feedback.<аккаунт>.workers.dev`.
4. **Сайт.** Вписать этот адрес в `SITE.relayUrl` в `tools.js` и пересобрать: `node scripts/build.mjs`.

## Защита от спама

- Принимаются запросы только с адресов из `ORIGINS` (`wrangler.toml`).
- Скрытое поле `website` — ловушка: боты его заполняют, люди не видят. Такие запросы молча отбрасываются.
- Не больше 5 сообщений в минуту с одного IP (`[[ratelimits]]`).
- Длина полей ограничена, HTML экранируется — в Telegram не уйдёт ничего лишнего.

Если спам всё же пойдёт — добавить Cloudflare Turnstile (бесплатная «я не робот» без картинок):
на сайте виджет, в воркере проверка токена через `siteverify`.

## Проверка без сайта

```
curl -X POST https://ai-tools-feedback.<аккаунт>.workers.dev \
  -H 'Content-Type: application/json' -H 'Origin: https://tools.nikitaivanov.dev' \
  -d '{"kind":"suggest","url":"https://example.com","why":"проверка"}'
```

Ответ `ok` и сообщение в Telegram — всё работает.
