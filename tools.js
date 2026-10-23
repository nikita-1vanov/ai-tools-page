// Каталог сервисов — источник данных для scripts/build.mjs.
// После правок пересобрать страницы: node scripts/build.mjs
//
// Порядок разделов: 1–5 — левая колонка сверху вниз, 6–10 — правая.
// Внутри раздела сервисы идут по популярности.
//
// Поля сервиса:
//   name   — название (nameEn — английское, если отличается)
//   url    — адрес сайта (по нему же берётся логотип)
//   ru, en — короткое описание для подсказки

const SECTIONS = [
  {
    id: 'chat', ru: 'Чат-боты', en: 'Chatbots',
    tools: [
      { name: 'ChatGPT', url: 'https://chatgpt.com', ru: 'Универсальный ассистент OpenAI', en: 'OpenAI’s all-purpose assistant' },
      { name: 'Claude', url: 'https://claude.ai', ru: 'Ассистент Anthropic для текста и кода', en: 'Anthropic’s assistant for writing and code' },
      { name: 'Gemini', url: 'https://gemini.google.com', ru: 'Ассистент Google', en: 'Google’s assistant' },
      { name: 'DeepSeek', url: 'https://chat.deepseek.com', ru: 'Бесплатная модель с рассуждениями', en: 'Free reasoning model' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', ru: 'Поиск с ответами и источниками', en: 'Answer engine with sources' },
      { name: 'Grok', url: 'https://grok.com', ru: 'Ассистент xAI', en: 'xAI’s assistant' },
      { name: 'Алиса', nameEn: 'Alice', url: 'https://alice.yandex.ru', ru: 'Ассистент Яндекса', en: 'Yandex assistant' },
      { name: 'GigaChat', url: 'https://giga.chat', ru: 'Ассистент Сбера', en: 'Sber’s assistant' },
    ],
  },
  {
    id: 'writing', ru: 'Текст', en: 'Writing',
    tools: [
      { name: 'Claude', url: 'https://claude.ai', ru: 'Длинные тексты и редактура', en: 'Long-form writing and editing' },
      { name: 'ChatGPT', url: 'https://chatgpt.com', ru: 'Черновики, письма, идеи', en: 'Drafts, emails, ideas' },
      { name: 'Grammarly', url: 'https://www.grammarly.com', ru: 'Проверка английского текста', en: 'English grammar and style' },
      { name: 'DeepL', url: 'https://www.deepl.com', ru: 'Точный перевод и редактор', en: 'Accurate translation and writing' },
      { name: 'QuillBot', url: 'https://quillbot.com', ru: 'Перефразирование и пересказ', en: 'Paraphrasing and summaries' },
      { name: 'Notion AI', url: 'https://www.notion.com', ru: 'ИИ внутри заметок и баз знаний', en: 'AI inside your notes and wikis' },
      { name: 'Jasper', url: 'https://www.jasper.ai', ru: 'Маркетинговые тексты в голосе бренда', en: 'On-brand marketing copy' },
      { name: 'Sudowrite', url: 'https://www.sudowrite.com', ru: 'Помощник для художественной прозы', en: 'Fiction writing partner' },
    ],
  },
  {
    id: 'images', ru: 'Изображения', en: 'Images',
    tools: [
      { name: 'Midjourney', url: 'https://www.midjourney.com', ru: 'Художественная генерация изображений', en: 'Artistic image generation' },
      { name: 'Ideogram', url: 'https://ideogram.ai', ru: 'Картинки с аккуратным текстом', en: 'Images with legible text' },
      { name: 'Leonardo', url: 'https://leonardo.ai', ru: 'Арт и игровые ассеты', en: 'Art and game assets' },
      { name: 'Firefly', url: 'https://firefly.adobe.com', ru: 'Генерация от Adobe', en: 'Adobe’s generative AI' },
      { name: 'Flux', url: 'https://bfl.ai', ru: 'Модели Black Forest Labs', en: 'Black Forest Labs models' },
      { name: 'Krea', url: 'https://www.krea.ai', ru: 'Генерация в реальном времени', en: 'Real-time generation' },
      { name: 'Recraft', url: 'https://www.recraft.ai', ru: 'Векторы, иконки, иллюстрации', en: 'Vectors, icons, illustrations' },
      { name: 'Шедеврум', nameEn: 'Shedevrum', url: 'https://shedevrum.ai', ru: 'Картинки и видео от Яндекса', en: 'Yandex image and video app' },
    ],
  },
  {
    id: 'video', ru: 'Видео', en: 'Video',
    tools: [
      { name: 'Veo', url: 'https://labs.google/flow', ru: 'Видео со звуком от Google', en: 'Google’s video with sound' },
      { name: 'Kling', url: 'https://klingai.com', ru: 'Реалистичное видео', en: 'Realistic video generation' },
      { name: 'Hailuo', url: 'https://hailuoai.video', ru: 'Видео по тексту и фото от MiniMax', en: 'MiniMax text- and image-to-video' },
      { name: 'Runway', url: 'https://runwayml.com', ru: 'Генерация и монтаж видео', en: 'Video generation and editing' },
      { name: 'HeyGen', url: 'https://www.heygen.com', ru: 'Видео с цифровыми аватарами', en: 'Talking avatar videos' },
      { name: 'Higgsfield', url: 'https://higgsfield.ai', ru: 'Кинематографичное видео с эффектами камеры', en: 'Cinematic video with camera effects' },
      { name: 'Pika', url: 'https://pika.art', ru: 'Короткие ролики и эффекты', en: 'Short clips and effects' },
      { name: 'CapCut', url: 'https://www.capcut.com', ru: 'Монтаж для соцсетей с ИИ', en: 'Social video editing with AI' },
    ],
  },
  {
    id: 'audio', ru: 'Музыка и голос', en: 'Music & Voice',
    tools: [
      { name: 'Suno', url: 'https://suno.com', ru: 'Песни по описанию', en: 'Songs from a prompt' },
      { name: 'ElevenLabs', url: 'https://elevenlabs.io', ru: 'Синтез и клонирование голоса', en: 'Voice synthesis and cloning' },
      { name: 'Udio', url: 'https://www.udio.com', ru: 'Генерация музыки', en: 'Music generation' },
      { name: 'Murf', url: 'https://murf.ai', ru: 'Озвучка текста студийными голосами', en: 'Studio-quality voiceover from text' },
      { name: 'Descript', url: 'https://www.descript.com', ru: 'Монтаж подкастов через текст', en: 'Edit podcasts by editing text' },
      { name: 'Adobe Podcast', url: 'https://podcast.adobe.com', ru: 'Студийный звук из любой записи', en: 'Studio sound from any recording' },
      { name: 'Mubert', url: 'https://mubert.com', ru: 'Фоновая музыка без авторских прав', en: 'Royalty-free background music' },
      { name: 'Krisp', url: 'https://krisp.ai', ru: 'Шумоподавление на созвонах', en: 'Noise cancellation for calls' },
    ],
  },
  {
    id: 'productivity', ru: 'Продуктивность', en: 'Productivity',
    tools: [
      { name: 'NotebookLM', url: 'https://notebooklm.google.com', ru: 'Конспекты и подкасты по документам', en: 'Notes and podcasts from your docs' },
      { name: 'Gamma', url: 'https://gamma.app', ru: 'Презентации за минуту', en: 'Decks in a minute' },
      { name: 'Notion AI', url: 'https://www.notion.com', ru: 'Заметки, задачи и базы знаний', en: 'Notes, tasks and wikis' },
      { name: 'Napkin', url: 'https://www.napkin.ai', ru: 'Схемы и инфографика из текста', en: 'Diagrams from text' },
      { name: 'Granola', url: 'https://www.granola.ai', ru: 'Умные заметки со встреч', en: 'AI meeting notes' },
      { name: 'Otter', url: 'https://otter.ai', ru: 'Расшифровка встреч', en: 'Meeting transcription' },
      { name: 'Fireflies', url: 'https://fireflies.ai', ru: 'Протоколы созвонов', en: 'Call notes and summaries' },
      { name: 'Motion', url: 'https://www.usemotion.com', ru: 'Планировщик задач и календаря', en: 'AI calendar and task planner' },
    ],
  },
  {
    id: 'agents', ru: 'Агенты и автоматизация', en: 'Agents & Automation',
    tools: [
      { name: 'n8n', url: 'https://n8n.io', ru: 'Автоматизации и ИИ-агенты', en: 'Workflows and AI agents' },
      { name: 'Manus', url: 'https://manus.im', ru: 'Автономный агент для задач', en: 'Autonomous task agent' },
      { name: 'Make', url: 'https://www.make.com', ru: 'Визуальные сценарии интеграций', en: 'Visual integration scenarios' },
      { name: 'Zapier', url: 'https://zapier.com', ru: 'Связка тысяч сервисов', en: 'Connect thousands of apps' },
      { name: 'Genspark', url: 'https://www.genspark.ai', ru: 'Агент для поиска и документов', en: 'Agent for research and docs' },
      { name: 'Lindy', url: 'https://www.lindy.ai', ru: 'ИИ-сотрудники для рутины', en: 'AI employees for busywork' },
      { name: 'Gumloop', url: 'https://www.gumloop.com', ru: 'Конструктор ИИ-процессов', en: 'AI workflow builder' },
      { name: 'Relevance AI', url: 'https://relevanceai.com', ru: 'Команда агентов без кода', en: 'No-code agent teams' },
    ],
  },
  {
    id: 'coding', ru: 'Код и разработка', en: 'Coding', accent: true,
    tools: [
      { name: 'Cursor', url: 'https://cursor.com', ru: 'Редактор кода с ИИ', en: 'AI code editor' },
      { name: 'Claude Code', url: 'https://www.claude.com/product/claude-code', ru: 'Агент для кода в терминале', en: 'Agentic coding in your terminal' },
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', ru: 'Автодополнение и агент в IDE', en: 'Completions and agent in your IDE' },
      { name: 'Lovable', url: 'https://lovable.dev', ru: 'Приложения по описанию', en: 'Apps from a prompt' },
      { name: 'v0', url: 'https://v0.app', ru: 'Интерфейсы и сайты по промпту', en: 'UI and sites from a prompt' },
      { name: 'Bolt', url: 'https://bolt.new', ru: 'Веб-приложения в браузере', en: 'Web apps in the browser' },
      { name: 'Replit', url: 'https://replit.com', ru: 'Код и деплой в облаке', en: 'Code and deploy in the cloud' },
      { name: 'Windsurf', url: 'https://windsurf.com', ru: 'ИИ-среда разработки', en: 'AI-native IDE' },
    ],
  },
  {
    id: 'design', ru: 'Дизайн', en: 'Design',
    tools: [
      { name: 'Figma', url: 'https://www.figma.com', ru: 'Интерфейсы с ИИ-функциями', en: 'Interface design with AI' },
      { name: 'Canva', url: 'https://www.canva.com', ru: 'Дизайн для всех с ИИ', en: 'Design for everyone, with AI' },
      { name: 'Framer', url: 'https://www.framer.com', ru: 'Сайты без кода', en: 'No-code websites' },
      { name: 'Stitch', url: 'https://stitch.withgoogle.com', ru: 'Макеты интерфейсов от Google', en: 'UI mockups by Google' },
      { name: 'Relume', url: 'https://www.relume.io', ru: 'Структура и вайрфреймы сайта', en: 'Sitemaps and wireframes' },
      { name: 'Uizard', url: 'https://uizard.io', ru: 'Прототипы из эскизов', en: 'Prototypes from sketches' },
      { name: 'Photoroom', url: 'https://www.photoroom.com', ru: 'Удаление фона и фото товаров', en: 'Background removal, product shots' },
      { name: 'Looka', url: 'https://looka.com', ru: 'Логотип и брендинг', en: 'Logo and brand kit' },
    ],
  },
  {
    id: 'learning', ru: 'Обучение', en: 'Learning',
    tools: [
      { name: 'NotebookLM', url: 'https://notebooklm.google.com', ru: 'Учись по своим материалам', en: 'Study from your own sources' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', ru: 'Разобраться в теме с источниками', en: 'Learn any topic with sources' },
      { name: 'Duolingo', url: 'https://www.duolingo.com', ru: 'Языки с ИИ-диалогами', en: 'Languages with AI chats' },
      { name: 'Khanmigo', url: 'https://www.khanmigo.ai', ru: 'ИИ-репетитор Khan Academy', en: 'Khan Academy’s AI tutor' },
      { name: 'Praktika', url: 'https://praktika.ai', ru: 'Английский с ИИ-аватаром', en: 'English with an AI tutor avatar' },
      { name: 'Speak', url: 'https://www.speak.com', ru: 'Разговорная практика языка', en: 'Speaking practice' },
      { name: 'Photomath', url: 'https://photomath.com', ru: 'Решение задач по фото', en: 'Solve math from a photo' },
      { name: 'Brainly', url: 'https://brainly.com', ru: 'Помощь с домашними заданиями', en: 'Homework help' },
    ],
  },
];

// Тарифы по домену сервиса (один сервис может стоять в нескольких разделах).
//   free  — что даёт бесплатный тариф
//   paid  — минимальный платный тариф: plan — название, price — цена в месяц при помесячной оплате
//           (в подсказке выводится как «от …/мес»; once: true — разовая оплата, «от … разово»),
//           ru/en — главный лимит. Без price — подписки нет.
// Проверено: октябрь 2026. Источник — в комментарии над записью (у раздела «Чат-боты» — в TZ.md).

const PRICING = {
  'chatgpt.com': {
    free: { ru: 'базовая модель, лимиты на файлы и картинки', en: 'base model, limited uploads and images' },
    paid: { plan: 'Go', price: '$8', ru: 'больше картинок, файлов и памяти', en: 'more images, uploads and memory' },
  },
  'claude.ai': {
    free: { ru: 'лимит сообщений, обновляется каждые 5 часов', en: 'message limit, resets every 5 hours' },
    paid: { plan: 'Pro', price: '$20', ru: 'в 5+ раз больше сообщений', en: '5×+ more messages' },
  },
  'gemini.google.com': {
    free: { ru: 'базовый лимит, обновляется каждые 5 часов', en: 'base limit, resets every 5 hours' },
    paid: { plan: 'Google AI Plus', price: '$4.99', ru: 'в 2 раза больше лимитов, генерация видео', en: '2× the limits, video generation' },
  },
  'chat.deepseek.com': {
    free: { ru: 'без ограничений, в часы пик возможны задержки', en: 'unlimited, may slow down at peak hours' },
    paid: { ru: 'подписки нет', en: 'no subscription' },
  },
  'www.perplexity.ai': {
    free: { ru: '~3 Pro-поиска в день, обычный поиск без ограничений', en: '~3 Pro searches a day, basic search unlimited' },
    paid: { plan: 'Pro', price: '$20', ru: 'сотни Pro-поисков, Deep Research', en: 'hundreds of Pro searches, Deep Research' },
  },
  'grok.com': {
    free: { ru: 'ограниченное число запросов', en: 'limited requests' },
    paid: { plan: 'SuperGrok', price: '$30', ru: 'все модели, картинки, голос', en: 'all models, images, voice' },
  },
  'alice.yandex.ru': {
    free: { ru: 'чат, картинки и файлы с мягкими лимитами', en: 'chat, images and files with soft limits' },
    paid: { plan: 'Алиса Плюс', planEn: 'Alice Plus', price: '199 ₽', ru: 'опция к Яндекс Плюсу: картинки без водяных знаков, больше «Исследований»', en: 'Yandex Plus add-on: watermark-free images, more Research' },
  },
  'giga.chat': {
    free: { ru: 'чат без подписки', en: 'chat with no subscription' },
    paid: { ru: 'подписки нет, платно только API', en: 'no subscription, API only' },
  },
  // источник: https://www.grammarly.com/plans
  'www.grammarly.com': {
    free: { ru: 'проверка орфографии и грамматики, 100 ИИ-запросов в месяц', en: 'spelling and grammar fixes, 100 AI prompts per month' },
    paid: { plan: 'Pro', price: '$30', ru: '2 000 ИИ-запросов в месяц, переписывание, тон, плагиат', en: '2,000 AI prompts per month, rewrites, tone, plagiarism' },
  },
  // источник: https://www.deepl.com/pro
  'www.deepl.com': {
    free: { ru: '50 000 символов в месяц и 1 файл в месяц', en: '50,000 characters per month and 1 file per month' },
    paid: { plan: 'Individual', price: '€8.99', ru: '300 000 символов в месяц, 3 файла до 30 МБ', en: '300,000 characters per month, 3 files up to 30 MB' },
  },
  // источник: https://quillbot.com/premium (403) → https://www.eesel.ai/blog/quillbot-pricing
  'quillbot.com': {
    free: { ru: 'перефраз до 125 слов за раз, 2 режима', en: 'paraphrase up to 125 words at a time, 2 modes' },
    paid: { plan: 'Premium', price: '$19.95', ru: 'перефраз без лимита слов, все режимы, проверка на плагиат', en: 'unlimited paraphrase length, all modes, plagiarism check' },
  },
  // источник: https://www.notion.com/pricing
  'www.notion.com': {
    free: { ru: 'ограниченная пробная версия Notion AI', en: 'limited Notion AI trial' },
    paid: { plan: 'Business', price: '$24', ru: 'полный Notion AI: агент, заметки встреч, поиск', en: 'full Notion AI: agent, meeting notes, search' },
  },
  // источник: https://www.jasper.ai/pricing
  'www.jasper.ai': {
    free: { ru: 'пробный период 7 дней', en: '7-day free trial' },
    paid: { plan: 'Pro', price: '$69', ru: '1 место, 2 голоса бренда, 3 аудитории', en: '1 seat, 2 brand voices, 3 audiences' },
  },
  // источник: https://www.sudowrite.com/pricing
  'www.sudowrite.com': {
    free: { ru: 'пробный период с ограниченными кредитами, без карты', en: 'free trial with limited credits, no card needed' },
    paid: { plan: 'Hobby & Student', price: '$19', ru: '225 000 кредитов в месяц', en: '225,000 credits per month' },
  },
  // источник: https://www.eesel.ai/blog/midjourney-pricing (официальная docs.midjourney.com — 403)
  'www.midjourney.com': {
    free: { ru: 'нет', en: 'none' },
    paid: { plan: 'Basic', price: '$10', ru: '~3,3 часа быстрой генерации (~200 картинок) в месяц', en: '~3.3 fast GPU hours (~200 images) per month' },
  },
  // источник: https://eesel.ai/blog/ideogram-pricing (официальная ideogram.ai/pricing — 403)
  'ideogram.ai': {
    free: { ru: '10 медленных кредитов в неделю, картинки публичные', en: '10 slow credits per week, images are public' },
    paid: { plan: 'Plus', price: '$20', ru: '1 000 приоритетных кредитов в месяц', en: '1,000 priority credits per month' },
  },
  // источник: https://eesel.ai/blog/leonardo-ai-pricing (официальная leonardo.ai/pricing — 403)
  'leonardo.ai': {
    free: { ru: '150 токенов в день, без коммерческих прав', en: '150 tokens per day, no commercial rights' },
    paid: { plan: 'Essential', price: '$12', ru: '8 500 быстрых токенов в месяц, приватность', en: '8,500 fast tokens per month, private generations' },
  },
  // источник: https://www.adobe.com/products/firefly/plans.html
  'firefly.adobe.com': {
    free: { ru: 'ограниченные бесплатные генерации каждый день', en: 'limited free generations, refreshed daily' },
    paid: { plan: 'Firefly Standard', price: '$9.99', ru: '2 000 генеративных кредитов в месяц', en: '2,000 generative credits per month' },
  },
  // источник: https://docs.bfl.ai/quick_start/pricing
  'bfl.ai': {
    free: { ru: 'нет, бесплатных кредитов не заявлено', en: 'none, no free credits announced' },
    paid: { ru: 'подписки нет, предоплата кредитами: 1 кредит = $0.01', en: 'no subscription, prepaid credits: 1 credit = $0.01' },
  },
  // источник: https://www.krea.ai/pricing
  'www.krea.ai': {
    free: { ru: '100 вычислительных единиц в день', en: '100 compute units per day' },
    paid: { plan: 'Basic', price: '$9', ru: '5 000 вычислительных единиц в месяц', en: '5,000 compute units per month' },
  },
  // источник: https://costbench.com/software/ai-image-generators/recraft/ (официальная страница без цифр)
  'www.recraft.ai': {
    free: { ru: 'ограниченные кредиты в день, картинки публичные', en: 'limited daily credits, images are public' },
    paid: { plan: 'Basic', price: '$12', ru: '1 000 кредитов в месяц, коммерческие права', en: '1,000 credits per month, commercial rights' },
  },
  // источник: https://yandex.ru/support/shedevrum/ru/pro
  'shedevrum.ai': {
    free: { ru: 'генерации без оплаты, 2 варианта за запрос, с водяным знаком', en: 'free generations, 2 variants per prompt, watermarked' },
    paid: { plan: 'Шедеврум Про', planEn: 'Shedevrum Pro', price: '100 ₽', ru: 'при Яндекс Плюсе: 6 вариантов, 4K, без водяного знака', en: 'with Yandex Plus: 6 variants, 4K, no watermark' },
  },
  // источник: https://www.aiarty.com/ai-video-generator/hailuo-ai-pricing.htm (сверено с magichour.ai, 18.10.2026)
  'hailuoai.video': {
    free: { ru: 'стартовые кредиты, видео с водяным знаком', en: 'starter credits, watermarked video' },
    paid: { plan: 'Standard', price: '$14.99', ru: '1 000 кредитов в месяц, без водяного знака', en: '1,000 credits a month, no watermark' },
  },
  // источник: https://one.google.com/about/google-ai-plans/ ; https://diyai.io/ai-tools/video-generation/google-veo-pricing/
  'labs.google': {
    free: { ru: '50 кредитов Flow в день, не копятся', en: '50 Flow credits per day, no rollover' },
    paid: { plan: 'Google AI Pro', price: '$19.99', ru: '1 000 кредитов Flow в месяц', en: '1,000 Flow credits per month' },
  },
  // источник: https://www.eesel.ai/en/blog/kling-ai-pricing (официальная kling.ai/membership/membership-plan не отдала контент)
  'klingai.com': {
    free: { ru: '66 кредитов в день, с водяным знаком', en: '66 credits per day, watermarked' },
    paid: { plan: 'Standard', price: '$10', ru: '660 кредитов в месяц', en: '660 credits per month' },
  },
  // источник: https://runway.com/pricing
  'runwayml.com': {
    free: { ru: '125 кредитов единоразово', en: '125 one-time credits' },
    paid: { plan: 'Standard', price: '$15', ru: '625 кредитов в месяц', en: '625 credits per month' },
  },
  // источник: https://www.heygen.com/pricing
  'www.heygen.com': {
    free: { ru: '3 видео в месяц до 1 минуты, с водяным знаком', en: '3 videos per month up to 1 min, watermarked' },
    paid: { plan: 'Creator', price: '$29', ru: '600 кредитов в месяц', en: '600 credits per month' },
  },
  // источник: https://pika.art/pricing
  'pika.art': {
    free: { ru: '0 кредитов, только покупка пакетов', en: '0 credits, top-up packs only' },
    paid: { plan: 'Starter', price: '$10', ru: '900 кредитов в месяц', en: '900 credits per month' },
  },
  // источник: https://www.capcut.com/pricing
  'www.capcut.com': {
    free: { ru: 'базовый монтаж и бесплатные шаблоны', en: 'basic editing and free templates' },
    paid: { plan: 'Pro', price: '€19.99', ru: '1 200 ИИ-кредитов в месяц, 1 ТБ облака', en: '1,200 AI credits per month, 1 TB storage' },
  },
  // источник: https://suno.com/pricing ; https://gptprompts.ai/suno-pricing
  'suno.com': {
    free: { ru: '50 кредитов в день (~10 песен), без коммерции', en: '50 credits per day (~10 songs), non-commercial' },
    paid: { plan: 'Pro', price: '$10', ru: '2 500 кредитов в месяц (~500 песен)', en: '2,500 credits per month (~500 songs)' },
  },
  // источник: https://dupple.com/learn/is-elevenlabs-free (официальная elevenlabs.io/pricing редиректит по гео)
  'elevenlabs.io': {
    free: { ru: '10 000 кредитов в месяц (~10 мин речи)', en: '10,000 credits per month (~10 min of speech)' },
    paid: { plan: 'Starter', price: '$6', ru: '30 000 кредитов в месяц, коммерческая лицензия', en: '30,000 credits per month, commercial license' },
  },
  // источник: https://gptprompts.ai/udio-pricing (официальная www.udio.com/pricing не отдала контент)
  'www.udio.com': {
    free: { ru: '10 кредитов в день', en: '10 credits per day' },
    paid: { plan: 'Standard', price: '$10', ru: '2 400 кредитов в месяц', en: '2,400 credits per month' },
  },
  // источник: https://www.descript.com/pricing
  'www.descript.com': {
    free: { ru: '1 час медиа в месяц, 100 ИИ-кредитов разово', en: '1 media hour per month, 100 one-time AI credits' },
    paid: { plan: 'Hobbyist', price: '$24', ru: '10 часов медиа и 400 ИИ-кредитов в месяц', en: '10 media hours and 400 AI credits per month' },
  },
  // источник: https://www.feisworld.com/blog/adobe-podcast-enhance-speech-v2 ; https://helpx.adobe.com/podcast/adobe-podcast-premium-plan-change-faq.html
  'podcast.adobe.com': {
    free: { ru: 'улучшение речи 1 час в день, файлы до 30 мин', en: 'enhance speech 1 hour per day, files up to 30 min' },
    paid: { plan: 'Firefly Pro', price: '$19.99', ru: 'все функции Podcast + 4 000 ген. кредитов в месяц', en: 'all Podcast features + 4,000 gen credits per month' },
  },
  // источник: https://mubert.com/render/pricing
  'mubert.com': {
    free: { ru: '25 треков в месяц', en: '25 tracks per month' },
    paid: { plan: 'Creator', price: '$14', ru: '500 треков в месяц', en: '500 tracks per month' },
  },
  // источник: https://krisp.ai/pricing/
  'krisp.ai': {
    free: { ru: 'пробный период 7 дней', en: '7-day free trial' },
    paid: { plan: 'Core', price: '$16', ru: 'шумоподавление и заметки встреч, акцент 1 ч/день', en: 'noise cancellation and meeting notes, accent 1 h/day' },
  },
  // источник: https://creatify.ai/blog/higgsfield-pricing-(2026)-plans-and-what-you-ll-actually-pay (сверено с krea.ai/blog)
  'higgsfield.ai': {
    free: { ru: 'только знакомство с интерфейсом, без кредитов', en: 'interface preview only, no credits' },
    paid: { plan: 'Starter', price: '$19', ru: '270 кредитов в месяц, коммерческое использование', en: '270 credits a month, commercial use' },
  },
  // источник: https://smallest.ai/blog/murf-ai-pricing-plans-cost-what-you-get-in-2026
  'murf.ai': {
    free: { ru: '10 минут генерации, без скачивания', en: '10 minutes of generation, no downloads' },
    paid: { plan: 'Creator', price: '$29', ru: '~2 часа озвучки в месяц, коммерческие права', en: '~2 hours of voiceover a month, commercial rights' },
  },
  // источник: https://9to5google.com/2026/06/08/google-ai-plus-price-drop/ , https://elephas.app/blog/notebooklm-free-vs-plus
  'notebooklm.google.com': {
    free: { ru: '100 блокнотов, 50 чатов и 3 аудиообзора в день', en: '100 notebooks, 50 chats and 3 audio overviews a day' },
    paid: { plan: 'Google AI Plus', price: '$4.99', ru: 'вдвое выше лимиты, до 100 источников в блокноте', en: '2× limits, up to 100 sources per notebook' },
  },
  // источник: https://www.zemith.com/en/learn/gamma-pricing (официальная страница — 403)
  'gamma.app': {
    free: { ru: '400 кредитов разово, с водяным знаком Gamma', en: '400 one-time credits, with Gamma watermark' },
    paid: { plan: 'Plus', price: '$12', ru: '1000 кредитов в месяц, без водяного знака', en: '1,000 credits a month, no watermark' },
  },
  // источник: https://www.napkin.ai/pricing
  'www.napkin.ai': {
    free: { ru: '500 ИИ-кредитов в неделю', en: '500 AI credits a week' },
    paid: { plan: 'Plus', price: '$9', ru: '10 000 ИИ-кредитов в месяц', en: '10,000 AI credits a month' },
  },
  // источник: https://www.granola.ai/pricing
  'www.granola.ai': {
    free: { ru: 'встречи без лимита, история заметок 30 дней', en: 'unlimited meetings, 30-day notes history' },
    paid: { plan: 'Business', price: '$14', ru: 'безлимитные заметки и вся история', en: 'unlimited notes and full history' },
  },
  // источник: https://otter.ai/pricing
  'otter.ai': {
    free: { ru: '300 минут транскрипции в месяц', en: '300 transcription minutes a month' },
    paid: { plan: 'Pro', price: '$16.99', ru: '1200 минут транскрипции в месяц', en: '1,200 transcription minutes a month' },
  },
  // источник: https://sonix.ai/resources/fireflies-ai-pricing/ , https://www.castmagic.io/de/blog/fireflies-pricing (официальная без цифр)
  'fireflies.ai': {
    free: { ru: 'транскрипция с ограниченным хранилищем записей', en: 'transcription with limited recording storage' },
    paid: { plan: 'Pro', price: '$18', ru: 'безлимит транскрипции, 8000 минут хранилища', en: 'unlimited transcription, 8,000 min storage' },
  },
  // источник: https://www.usemotion.com/pricing , https://academy.techpresso.co/reviews/is-motion-worth-it
  'www.usemotion.com': {
    free: { ru: 'пробный период 7 дней', en: '7-day free trial' },
    paid: { plan: 'Pro AI', price: '$19', ru: '7500 ИИ-кредитов в месяц', en: '7,500 AI credits a month' },
  },
  // источник: https://n8n.io/pricing/ , https://www.activepieces.com/blog/n8n-pricing-2026-plans-free-tier-costs-explained.md
  'n8n.io': {
    free: { ru: 'облако — пробный период; self-hosted бесплатен', en: 'cloud trial only; self-hosted is free' },
    paid: { plan: 'Starter', price: '€24', ru: '2500 запусков сценариев в месяц', en: '2,500 workflow executions a month' },
  },
  // источник: https://www.usecarly.com/blog/manus-pricing/ (официальная страница без данных)
  'manus.im': {
    free: { ru: '300 кредитов в день + 1000 разово', en: '300 credits a day + 1,000 one-time' },
    paid: { plan: 'Pro', price: '$20', ru: '4000 кредитов в месяц', en: '4,000 credits a month' },
  },
  // источник: https://www.make.com/en/pricing , https://latenode.com/blog/make-com-pricing
  'www.make.com': {
    free: { ru: '1000 кредитов в месяц, 2 активных сценария', en: '1,000 credits a month, 2 active scenarios' },
    paid: { plan: 'Core', price: '$10.59', ru: '10 000 кредитов в месяц', en: '10,000 credits a month' },
  },
  // источник: https://zapier.com/pricing
  'zapier.com': {
    free: { ru: '100 задач в месяц', en: '100 tasks a month' },
    paid: { plan: 'Professional', price: '$29.99', ru: '750 задач в месяц', en: '750 tasks a month' },
  },
  // источник: https://www.eesel.ai/blog/genspark-ai-pricing (официальная страница — 403)
  'www.genspark.ai': {
    free: { ru: '100 кредитов в день', en: '100 credits a day' },
    paid: { plan: 'Plus', price: '$24.99', ru: '10 000 кредитов в месяц', en: '10,000 credits a month' },
  },
  // источник: https://www.lindy.ai/pricing
  'www.lindy.ai': {
    free: { ru: 'пробный период 7 дней ($50 кредитов)', en: '7-day trial ($50 in credits)' },
    paid: { plan: 'Team', price: '$29.99', ru: '3000 кредитов в месяц', en: '3,000 credits a month' },
  },
  // источник: https://www.jetadmin.io/blog/gumloop-pricing/ , https://www.eesel.ai/blog/gumloop-pricing
  'www.gumloop.com': {
    free: { ru: 'пробный период 14 дней', en: '14-day free trial' },
    paid: { plan: 'Pro', price: '$37', ru: '20 000 кредитов в месяц', en: '20,000 credits a month' },
  },
  // источник: https://www.getmacha.com/blog/relevance-ai-pricing-explained
  'relevanceai.com': {
    free: { ru: 'нет, бесплатный тариф закрыт для новых', en: 'none, free plan closed to new users' },
    paid: { plan: 'Pro', price: '$29', ru: '2500 действий в месяц', en: '2,500 actions a month' },
  },
  // источник: https://cursor.com/pricing
  'cursor.com': {
    free: { ru: 'ограниченно: агент и чат с малым лимитом запросов', en: 'limited agent and chat requests' },
    paid: { plan: 'Plus', price: '$8', ru: 'общий пул с Grok, только модели Grok', en: 'shared pool with Grok, Grok models only' },
  },
  // источник: https://www.claude.com/pricing
  'www.claude.com': {
    free: { ru: 'нет: Claude Code только в платных тарифах', en: 'none: Claude Code is paid plans only' },
    paid: { plan: 'Pro', price: '$20', ru: 'лимит на 5-часовые сессии и на неделю', en: 'limits per 5-hour session and per week' },
  },
  // источник: https://github.com/features/copilot/plans
  'github.com': {
    free: { ru: '2000 автодополнений и 50 запросов в чат в месяц', en: '2,000 completions and 50 chat requests a month' },
    paid: { plan: 'Pro', price: '$10', ru: 'безлимит автодополнений, $10 ИИ-кредитов в месяц', en: 'unlimited completions, $10 AI credits a month' },
  },
  // источник: https://lovable.dev/pricing (цена Pro — по обзорам: https://www.fuzen.io/posts/lovable-pricing-explained-credits-plans-and-real-monthly-cost-2026)
  'lovable.dev': {
    free: { ru: '5 кредитов в день, до 30 в месяц', en: '5 credits a day, up to 30 a month' },
    paid: { plan: 'Pro', price: '$25', ru: '100 кредитов в месяц', en: '100 credits a month' },
  },
  // источник: https://v0.app/pricing
  'v0.app': {
    free: { ru: '7 сообщений в день', en: '7 messages a day' },
    paid: { plan: 'Plus', price: '$30', ru: '$30 кредитов в месяц + $2 в день за вход', en: '$30 credits a month + $2 daily on login' },
  },
  // источник: https://bolt.new/pricing
  'bolt.new': {
    free: { ru: '1 млн токенов в месяц, до 300 тыс. в день', en: '1M tokens a month, up to 300K a day' },
    paid: { plan: 'Pro', price: '$25', ru: '10 млн токенов в месяц с переносом остатка', en: '10M tokens a month with rollover' },
  },
  // источник: https://replit.com/pricing, https://docs.replit.com/billing/plans
  'replit.com': {
    free: { ru: 'ежедневные кредиты агента и 1 опубликованное приложение', en: 'daily agent credits and 1 published app' },
    paid: { plan: 'Core', price: '$20', ru: '$20 кредитов на модели в месяц', en: '$20 of model credits a month' },
  },
  // источник: https://devin.ai/pricing (windsurf.com/pricing перенаправляет туда)
  'windsurf.com': {
    free: { ru: 'небольшая квота агента, безлимитный Tab', en: 'light agent quota, unlimited Tab completions' },
    paid: { plan: 'Pro', price: '$20', ru: 'увеличенные дневные и недельные квоты, все модели', en: 'higher daily and weekly quotas, all models' },
  },
  // источник: https://www.figma.com/pricing/ (помесячная цена — по обзорам: https://www.usecarly.com/blog/figma-pricing/)
  'www.figma.com': {
    free: { ru: '150 ИИ-кредитов в день, до 500 в месяц', en: '150 AI credits a day, up to 500 a month' },
    paid: { plan: 'Professional', price: '$20', ru: 'полное место: 3000 ИИ-кредитов в месяц', en: 'full seat: 3,000 AI credits a month' },
  },
  // источник: https://www.eesel.ai/en/blog/canva-ai-pricing, https://designrr.io/canva-pricing/ (canva.com отдаёт 403)
  'www.canva.com': {
    free: { ru: 'до 200 стандартных или 20 премиум ИИ-запросов в месяц', en: 'up to 200 standard or 20 premium AI uses a month' },
    paid: { plan: 'Pro', price: '$18', ru: '2000 стандартных и 200 премиум ИИ-запросов в месяц', en: '2,000 standard and 200 premium AI uses a month' },
  },
  // источник: https://www.framer.com/pricing (помесячная цена — по обзорам: https://emergent.sh/learn/framer-pricing)
  'www.framer.com': {
    free: { ru: '500 ИИ-кредитов на пробу, домен Framer', en: '500 AI credits to try, Framer domain' },
    paid: { plan: 'Basic', price: '$15', ru: '30 страниц, 1000 ИИ-кредитов в месяц, свой домен', en: '30 pages, 1,000 AI credits a month, custom domain' },
  },
  // источник: https://www.banani.co/blog/google-stitch-pricing-and-credits
  'stitch.withgoogle.com': {
    free: { ru: '400 кредитов на дизайн и 15 на редизайн в день', en: '400 design and 15 redesign credits a day' },
    paid: { ru: 'подписки нет', en: 'no subscription' },
  },
  // источник: https://www.relume.ai/pricing (www.relume.io перенаправляет туда)
  'www.relume.io': {
    free: { ru: 'ограниченно: ИИ с малым лимитом, 1500 просмотров сайта', en: 'limited AI usage, 1,500 site page views' },
    paid: { plan: 'Pro', price: '$14', ru: 'безлимит сайтов, базовый Pro-объём AI', en: 'unlimited websites, base Pro AI usage' },
  },
  // источник: https://uizard.io/pricing/ (помесячная цена — по обзорам: https://costbench.com/software/ai-design-tools/uizard/discounts/)
  'uizard.io': {
    free: { ru: '2 проекта и 3 ИИ-генерации в месяц', en: '2 projects and 3 AI generations a month' },
    paid: { plan: 'Pro', price: '$19', ru: 'до 100 проектов и 500 ИИ-генераций в месяц', en: 'up to 100 projects and 500 AI generations a month' },
  },
  // источник: https://www.photoroom.com/pricing, https://help.photoroom.com/en/articles/15284788-export-limit
  'www.photoroom.com': {
    free: { ru: '100 экспортов в месяц, не больше 25 в неделю', en: '100 exports a month, max 25 a week' },
    paid: { plan: 'Pro', price: '$12.99', ru: '8000 ИИ-кредитов и 1000 экспортов в месяц', en: '8,000 AI credits and 1,000 exports a month' },
  },
  // источник: https://pricingsaas.com/companies/looka (looka.com отдаёт 403)
  'looka.com': {
    free: { ru: 'создание и правка логотипа, скачивание платное', en: 'design and edit logos, download is paid' },
    paid: { plan: 'Basic Logo Package', price: '$35', once: true, ru: 'логотип в PNG', en: 'logo as PNG' },
  },
  // источник: https://apps.apple.com/us/app/id570060128 ; https://www.mindomax.com/duolingo-cost
  'www.duolingo.com': {
    free: { ru: 'все курсы бесплатно, с рекламой и лимитом энергии', en: 'all courses free, with ads and an energy limit' },
    paid: { plan: 'Super', price: '$12.99', ru: 'без рекламы и без лимита энергии', en: 'no ads, unlimited energy' },
  },
  // источник: https://www.khanmigo.ai/pricing
  'www.khanmigo.ai': {
    free: { ru: 'бесплатно для учителей; ученикам — нет', en: 'free for teachers; none for learners' },
    paid: { plan: 'Learners', price: '$4', ru: 'ИИ-репетитор для ученика или родителя', en: 'AI tutor for a learner or parent' },
  },
  // источник: https://apps.apple.com/us/app/id1624701477 ; https://intercom.help/praktika-ai/fr/articles/12008580-existe-t-il-une-version-gratuite-de-l-application-ou-dois-je-souscrire-un-abonnement
  'praktika.ai': {
    free: { ru: 'ограниченно: несколько ИИ-аватаров', en: 'limited: a few AI avatars' },
    paid: { plan: 'Premium', price: '$9.99', ru: 'все аватары и уроки без ограничений', en: 'all avatars and lessons, no limits' },
  },
  // источник: https://www.speak.com/ ; https://apps.apple.com/us/app/id1286609883
  'www.speak.com': {
    free: { ru: 'пробный период 7 дней', en: '7-day free trial' },
    paid: { plan: 'Premium', price: '$17.99', ru: 'все уроки и разговорная практика с ИИ', en: 'all lessons and AI conversation practice' },
  },
  // источник: https://support.google.com/photomath/answer/14330572?hl=en ; https://apps.apple.com/us/app/id919087726
  'photomath.com': {
    free: { ru: 'сканирование и пошаговые решения без лимита', en: 'unlimited scanning and step-by-step solutions' },
    paid: { plan: 'Photomath Plus', price: '$9.99', ru: '400+ анимированных уроков и подробные объяснения', en: '400+ animated tutorials and deeper explanations' },
  },
  // источник: https://apps.apple.com/us/app/id745089947 ; https://www.fast.io/resources/brainly-ai-review-2026.md
  'brainly.com': {
    free: { ru: 'ограниченно ответов в день, с рекламой', en: 'limited answers per day, with ads' },
    paid: { plan: 'Brainly Plus', price: '$9.99', ru: 'без рекламы, больше ответов ИИ', en: 'no ads, more AI answers' },
  },
};

const I18N = {
  ru: {
    title: 'AI Tools: Best 2026 — лучшие нейросети по категориям',
    description: 'Работай быстрее. Делай больше. Лучшие ИИ-сервисы 2026 в 10 категориях — от чат-ботов до генерации видео и кода.',
    ogAlt: 'AI TOOLS: BEST 2026 — работай быстрее, делай больше',
    locale: 'ru_RU',
    tagline: 'Работай быстрее. Делай больше.',
    bookmarkBefore: 'Нажми',
    bookmarkAfter: ', чтобы сохранить в закладки',
    freeLabel: 'Бесплатно',
    paidLabel: 'Платно',
    from: price => `от ${price}/мес`,
    once: price => `от ${price} разово`,
  },
  en: {
    title: 'AI Tools: Best 2026 — the best AI tools by category',
    description: 'Work faster. Do more. The best AI tools of 2026 in 10 categories — from chatbots to video generation and coding.',
    ogAlt: 'AI TOOLS: BEST 2026 — work faster, do more',
    locale: 'en_US',
    tagline: 'Work faster. Do more.',
    bookmarkBefore: 'Press',
    bookmarkAfter: ' to bookmark',
    freeLabel: 'Free',
    paidLabel: 'Paid',
    from: price => `from ${price}/mo`,
    once: price => `from ${price} one-time`,
  },
};
