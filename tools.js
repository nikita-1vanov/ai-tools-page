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
      { name: 'Gemini', url: 'https://gemini.google.com', ru: 'Ассистент Google', en: 'Google’s assistant' },
      { name: 'DeepSeek', url: 'https://chat.deepseek.com', ru: 'Бесплатная модель с рассуждениями', en: 'Free reasoning model' },
      { name: 'Claude', url: 'https://claude.ai', ru: 'Ассистент Anthropic для текста и кода', en: 'Anthropic’s assistant for writing and code' },
      { name: 'Grok', url: 'https://grok.com', ru: 'Ассистент xAI', en: 'xAI’s assistant' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', ru: 'Поиск с ответами и источниками', en: 'Answer engine with sources' },
      { name: 'Алиса', nameEn: 'Alice', url: 'https://alice.yandex.ru', ru: 'Ассистент Яндекса', en: 'Yandex assistant' },
      { name: 'Character.AI', url: 'https://character.ai', ru: 'Чаты с ИИ-персонажами', en: 'Chat with AI characters' },
      { name: 'Copilot', url: 'https://copilot.microsoft.com', ru: 'Ассистент Microsoft', en: 'Microsoft’s assistant' },
      { name: 'Qwen', url: 'https://chat.qwen.ai', ru: 'Бесплатный ассистент Alibaba', en: 'Alibaba’s free assistant' },
      { name: 'Kimi', url: 'https://www.kimi.com', ru: 'Ассистент Moonshot с агентами', en: 'Moonshot’s assistant with agents' },
      { name: 'GigaChat', url: 'https://giga.chat', ru: 'Ассистент Сбера', en: 'Sber’s assistant' },
      { name: 'Poe', url: 'https://poe.com', ru: 'Много моделей в одном чате', en: 'Many models in one chat' },
      { name: 'Le Chat', url: 'https://chat.mistral.ai', ru: 'Европейский ассистент Mistral', en: 'Mistral’s European assistant' },
    ],
  },
  {
    id: 'writing', ru: 'Текст', en: 'Writing',
    tools: [
      { name: 'ChatGPT', url: 'https://chatgpt.com', ru: 'Черновики, письма, идеи', en: 'Drafts, emails, ideas' },
      { name: 'Claude', url: 'https://claude.ai', ru: 'Длинные тексты и редактура', en: 'Long-form writing and editing' },
      { name: 'DeepL', url: 'https://www.deepl.com', ru: 'Точный перевод и редактор', en: 'Accurate translation and writing' },
      { name: 'Grammarly', url: 'https://www.grammarly.com', ru: 'Проверка английского текста', en: 'English grammar and style' },
      { name: 'QuillBot', url: 'https://quillbot.com', ru: 'Перефразирование и пересказ', en: 'Paraphrasing and summaries' },
      { name: 'Notion AI', url: 'https://www.notion.com', ru: 'ИИ внутри заметок и баз знаний', en: 'AI inside your notes and wikis' },
      { name: 'GPTZero', url: 'https://gptzero.me', ru: 'Проверка текста на ИИ', en: 'AI text detector' },
      { name: 'LanguageTool', url: 'https://languagetool.org', ru: 'Проверка грамматики, включая русский', en: 'Grammar checker, Russian included' },
      { name: 'Wordtune', url: 'https://www.wordtune.com', ru: 'Переписывание фраз и тона', en: 'Rewrites sentences and tone' },
      { name: 'ProWritingAid', url: 'https://prowritingaid.com', ru: 'Редактура стиля для авторов', en: 'Style editing for authors' },
      { name: 'Hemingway Editor', url: 'https://hemingwayapp.com', ru: 'Делает текст проще и яснее', en: 'Makes writing bold and clear' },
      { name: 'Jasper', url: 'https://www.jasper.ai', ru: 'Маркетинговые тексты в голосе бренда', en: 'On-brand marketing copy' },
      { name: 'NovelAI', url: 'https://novelai.net', ru: 'Соавтор историй и ролевых сюжетов', en: 'Co-writer for stories and roleplay' },
      { name: 'Sudowrite', url: 'https://www.sudowrite.com', ru: 'Помощник для художественной прозы', en: 'Fiction writing partner' },
    ],
  },
  {
    id: 'images', ru: 'Изображения', en: 'Images',
    tools: [
      { name: 'ChatGPT', url: 'https://chatgpt.com', ru: 'Картинки и правки прямо в чате', en: 'Images and edits right in chat' },
      { name: 'Gemini', url: 'https://gemini.google.com', ru: 'Nano Banana: генерация и редактирование', en: 'Nano Banana: generate and edit' },
      { name: 'Magnific', url: 'https://www.magnific.com', ru: 'ИИ-студия бывшего Freepik', en: 'AI creative suite, formerly Freepik' },
      { name: 'Midjourney', url: 'https://www.midjourney.com', ru: 'Художественная генерация изображений', en: 'Artistic image generation' },
      { name: 'Grok Imagine', url: 'https://grok.com', ru: 'Картинки и анимация от xAI', en: 'xAI’s images and animation' },
      { name: 'Leonardo', url: 'https://leonardo.ai', ru: 'Арт и игровые ассеты', en: 'Art and game assets' },
      { name: 'SeaArt', url: 'https://www.seaart.ai', ru: 'Аниме-арт и модели сообщества', en: 'Anime art and community models' },
      { name: 'Firefly', url: 'https://firefly.adobe.com', ru: 'Генерация от Adobe', en: 'Adobe’s generative AI' },
      { name: 'Dreamina', url: 'https://dreamina.capcut.com', ru: 'Seedream от ByteDance', en: 'ByteDance’s Seedream images' },
      { name: 'Ideogram', url: 'https://ideogram.ai', ru: 'Картинки с аккуратным текстом', en: 'Images with legible text' },
      { name: 'Krea', url: 'https://www.krea.ai', ru: 'Генерация в реальном времени', en: 'Real-time generation' },
      { name: 'Recraft', url: 'https://www.recraft.ai', ru: 'Векторы, иконки, иллюстрации', en: 'Vectors, icons, illustrations' },
      { name: 'Шедеврум', nameEn: 'Shedevrum', url: 'https://shedevrum.ai', ru: 'Картинки и видео от Яндекса', en: 'Yandex image and video app' },
      { name: 'Flux', url: 'https://bfl.ai', ru: 'Модели Black Forest Labs', en: 'Black Forest Labs models' },
    ],
  },
  {
    id: 'video', ru: 'Видео', en: 'Video',
    tools: [
      { name: 'Veo', url: 'https://labs.google/flow', ru: 'Видео со звуком от Google', en: 'Google’s video with sound' },
      { name: 'Kling', url: 'https://klingai.com', ru: 'Реалистичное видео', en: 'Realistic video generation' },
      { name: 'Higgsfield', url: 'https://higgsfield.ai', ru: 'Кинематографичное видео с эффектами камеры', en: 'Cinematic video with camera effects' },
      { name: 'HeyGen', url: 'https://www.heygen.com', ru: 'Видео с цифровыми аватарами', en: 'Talking avatar videos' },
      { name: 'CapCut', url: 'https://www.capcut.com', ru: 'Монтаж для соцсетей с ИИ', en: 'Social video editing with AI' },
      { name: 'Hailuo', url: 'https://hailuoai.video', ru: 'Видео по тексту и фото от MiniMax', en: 'MiniMax text- and image-to-video' },
      { name: 'PixVerse', url: 'https://pixverse.ai', ru: 'Вирусные ролики и эффекты', en: 'Viral clips and effects' },
      { name: 'Runway', url: 'https://runwayml.com', ru: 'Генерация и монтаж видео', en: 'Video generation and editing' },
      { name: 'Invideo', url: 'https://invideo.io', ru: 'Готовые ролики по сценарию', en: 'Full videos from a script' },
      { name: 'Grok Imagine', url: 'https://grok.com', ru: 'Видео и картинки от xAI', en: 'xAI’s video and image generator' },
      { name: 'Dreamina', url: 'https://dreamina.capcut.com', ru: 'Seedance от ByteDance', en: 'ByteDance’s Seedance video' },
      { name: 'Wan', url: 'https://wan.video', ru: 'Видео со звуком от Alibaba', en: 'Alibaba’s video with audio' },
      { name: 'Vidu', url: 'https://www.vidu.com', ru: 'Видео по фото и референсам', en: 'Video from photos and references' },
      { name: 'Synthesia', url: 'https://www.synthesia.io', ru: 'Обучающие видео с ИИ-аватарами', en: 'Training videos with AI avatars' },
      { name: 'Luma', url: 'https://lumalabs.ai', ru: 'Кинематографичное видео моделями Ray', en: 'Cinematic video with Ray models' },
      { name: 'Pika', url: 'https://pika.art', ru: 'Короткие ролики и эффекты', en: 'Short clips and effects' },
      { name: 'Шедеврум', nameEn: 'Shedevrum', url: 'https://shedevrum.ai', ru: 'Видео и картинки от Яндекса', en: 'Yandex video and image app' },
    ],
  },
  {
    id: 'audio', ru: 'Музыка и голос', en: 'Music & Voice',
    tools: [
      { name: 'Suno', url: 'https://suno.com', ru: 'Песни по описанию', en: 'Songs from a prompt' },
      { name: 'ElevenLabs', url: 'https://elevenlabs.io', ru: 'Синтез и клонирование голоса', en: 'Voice synthesis and cloning' },
      { name: 'TurboScribe', url: 'https://turboscribe.ai', ru: 'Расшифровка аудио в текст', en: 'Audio-to-text transcription' },
      { name: 'Fish Audio', url: 'https://fish.audio', ru: 'Озвучка и клонирование голоса', en: 'Text-to-speech and voice cloning' },
      { name: 'Vocal Remover', url: 'https://vocalremover.org', ru: 'Отделение голоса от музыки', en: 'Split vocals from music' },
      { name: 'Speechify', url: 'https://speechify.com', ru: 'Чтение текста вслух', en: 'Reads any text aloud' },
      { name: 'Mureka', url: 'https://www.mureka.ai', ru: 'Песни с вокалом по тексту', en: 'Songs with vocals from text' },
      { name: 'Moises', url: 'https://moises.ai', ru: 'Разделение трека на дорожки', en: 'Split songs into stems' },
      { name: 'Voicemod', url: 'https://www.voicemod.net', ru: 'Смена голоса в реальном времени', en: 'Real-time voice changer' },
      { name: 'Adobe Podcast', url: 'https://podcast.adobe.com', ru: 'Студийный звук из любой записи', en: 'Studio sound from any recording' },
      { name: 'Descript', url: 'https://www.descript.com', ru: 'Монтаж подкастов через текст', en: 'Edit podcasts by editing text' },
      { name: 'LALAL.AI', url: 'https://www.lalal.ai', ru: 'Вокал и инструменты по дорожкам', en: 'Vocal and instrument separation' },
      { name: 'Udio', url: 'https://www.udio.com', ru: 'Генерация музыки', en: 'Music generation' },
      { name: 'Murf', url: 'https://murf.ai', ru: 'Озвучка текста студийными голосами', en: 'Studio-quality voiceover from text' },
      { name: 'Krisp', url: 'https://krisp.ai', ru: 'Шумоподавление на созвонах', en: 'Noise cancellation for calls' },
      { name: 'Mubert', url: 'https://mubert.com', ru: 'Фоновая музыка без авторских прав', en: 'Royalty-free background music' },
    ],
  },
  {
    id: 'productivity', ru: 'Продуктивность', en: 'Productivity',
    tools: [
      { name: 'NotebookLM', url: 'https://notebooklm.google.com', ru: 'Конспекты и подкасты по документам', en: 'Notes and podcasts from your docs' },
      { name: 'Notion AI', url: 'https://www.notion.com', ru: 'Заметки, задачи и базы знаний', en: 'Notes, tasks and wikis' },
      { name: 'ClickUp', url: 'https://clickup.com', ru: 'Задачи и проекты с ИИ', en: 'Tasks and projects with AI' },
      { name: 'Gamma', url: 'https://gamma.app', ru: 'Презентации за минуту', en: 'Decks in a minute' },
      { name: 'Miro', url: 'https://miro.com', ru: 'Онлайн-доска с ИИ', en: 'AI-powered online whiteboard' },
      { name: 'TurboScribe', url: 'https://turboscribe.ai', ru: 'Расшифровка аудио и видео', en: 'Audio and video transcription' },
      { name: 'Todoist', url: 'https://www.todoist.com', ru: 'Список задач с ИИ-помощником', en: 'To-do list with AI assist' },
      { name: 'Otter', url: 'https://otter.ai', ru: 'Расшифровка встреч', en: 'Meeting transcription' },
      { name: 'Read AI', url: 'https://www.read.ai', ru: 'Итоги встреч, писем и чатов', en: 'Recaps of meetings, email, chats' },
      { name: 'Fathom', url: 'https://www.fathom.ai', ru: 'Бесплатный ИИ-протоколист встреч', en: 'Free AI meeting notetaker' },
      { name: 'Fireflies', url: 'https://fireflies.ai', ru: 'Протоколы созвонов', en: 'Call notes and summaries' },
      { name: 'Granola', url: 'https://www.granola.ai', ru: 'Умные заметки со встреч', en: 'AI meeting notes' },
      { name: 'Wispr Flow', url: 'https://wisprflow.ai', ru: 'Голосовой ввод в любом приложении', en: 'Voice dictation in any app' },
      { name: 'Tactiq', url: 'https://tactiq.io', ru: 'Расшифровка Meet, Zoom, Teams', en: 'Transcripts for Meet, Zoom, Teams' },
      { name: 'Notta', url: 'https://www.notta.ai', ru: 'Транскрибация и саммари встреч', en: 'Transcripts and meeting summaries' },
      { name: 'Napkin', url: 'https://www.napkin.ai', ru: 'Схемы и инфографика из текста', en: 'Diagrams from text' },
      { name: 'tl;dv', url: 'https://tldv.io', ru: 'Запись и заметки созвонов', en: 'Call recordings and notes' },
      { name: 'Motion', url: 'https://www.usemotion.com', ru: 'Планировщик задач и календаря', en: 'AI calendar and task planner' },
    ],
  },
  {
    id: 'agents', ru: 'Агенты и автоматизация', en: 'Agents & Automation',
    tools: [
      { name: 'n8n', url: 'https://n8n.io', ru: 'Автоматизации и ИИ-агенты', en: 'Workflows and AI agents' },
      { name: 'Manus', url: 'https://manus.im', ru: 'Автономный агент для задач', en: 'Autonomous task agent' },
      { name: 'Zapier', url: 'https://zapier.com', ru: 'Связка тысяч сервисов', en: 'Connect thousands of apps' },
      { name: 'OpenClaw', url: 'https://openclaw.ai', ru: 'Личный агент в мессенджерах', en: 'Personal agent in your chat apps' },
      { name: 'Genspark', url: 'https://www.genspark.ai', ru: 'Агент для поиска и документов', en: 'Agent for research and docs' },
      { name: 'Make', url: 'https://www.make.com', ru: 'Визуальные сценарии интеграций', en: 'Visual integration scenarios' },
      { name: 'Dify', url: 'https://dify.ai', ru: 'Конструктор ИИ-приложений и агентов', en: 'Builder for AI apps and agents' },
      { name: 'Lindy', url: 'https://www.lindy.ai', ru: 'ИИ-сотрудники для рутины', en: 'AI employees for busywork' },
      { name: 'Skywork', url: 'https://skywork.ai', ru: 'Агент для отчётов и презентаций', en: 'Agent for reports and slides' },
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
      { name: 'Codex', url: 'https://openai.com/codex', ru: 'Агент для кода от OpenAI', en: 'OpenAI’s coding agent' },
      { name: 'Google AI Studio', url: 'https://aistudio.google.com', ru: 'Приложения на Gemini по промпту', en: 'Gemini apps from a prompt' },
      { name: 'Lovable', url: 'https://lovable.dev', ru: 'Приложения по описанию', en: 'Apps from a prompt' },
      { name: 'Replit', url: 'https://replit.com', ru: 'Код и деплой в облаке', en: 'Code and deploy in the cloud' },
      { name: 'Base44', url: 'https://base44.com', ru: 'Приложения без кода от Wix', en: 'No-code apps by Wix' },
      { name: 'v0', url: 'https://v0.app', ru: 'Интерфейсы и сайты по промпту', en: 'UI and sites from a prompt' },
      { name: 'Bolt', url: 'https://bolt.new', ru: 'Веб-приложения в браузере', en: 'Web apps in the browser' },
      { name: 'Antigravity', url: 'https://antigravity.google', ru: 'Агентная IDE от Google', en: 'Google’s agentic IDE' },
      { name: 'Emergent', url: 'https://emergent.sh', ru: 'Полноценные приложения по описанию', en: 'Full-stack apps from a prompt' },
      { name: 'Windsurf', url: 'https://windsurf.com', ru: 'ИИ-среда разработки', en: 'AI-native IDE' },
      { name: 'JetBrains AI', url: 'https://www.jetbrains.com/ai/', ru: 'ИИ и агент Junie в IDE JetBrains', en: 'AI and Junie agent in JetBrains IDEs' },
      { name: 'OpenCode', url: 'https://opencode.ai', ru: 'Открытый агент в терминале', en: 'Open-source terminal agent' },
      { name: 'Kiro', url: 'https://kiro.dev', ru: 'IDE от AWS по спецификациям', en: 'AWS spec-driven IDE' },
      { name: 'Trae', url: 'https://www.trae.ai', ru: 'ИИ-IDE от ByteDance', en: 'ByteDance’s AI IDE' },
      { name: 'Cline', url: 'https://cline.bot', ru: 'Открытый агент для VS Code', en: 'Open-source agent for VS Code' },
    ],
  },
  {
    id: 'design', ru: 'Дизайн', en: 'Design',
    tools: [
      { name: 'Canva', url: 'https://www.canva.com', ru: 'Дизайн для всех с ИИ', en: 'Design for everyone, with AI' },
      { name: 'Figma', url: 'https://www.figma.com', ru: 'Интерфейсы с ИИ-функциями', en: 'Interface design with AI' },
      { name: 'Magnific', url: 'https://www.magnific.com', ru: 'Бывший Freepik: стоки и ИИ-генерация', en: 'Ex-Freepik: stock and AI generation' },
      { name: 'Picsart', url: 'https://picsart.com', ru: 'Фоторедактор и ИИ-дизайн', en: 'Photo editor and AI design' },
      { name: 'remove.bg', url: 'https://www.remove.bg', ru: 'Удаление фона в один клик', en: 'One-click background removal' },
      { name: 'Adobe Express', url: 'https://www.adobe.com/express', ru: 'Быстрая графика от Adobe', en: 'Quick graphics by Adobe' },
      { name: 'Framer', url: 'https://www.framer.com', ru: 'Сайты без кода', en: 'No-code websites' },
      { name: 'Photoroom', url: 'https://www.photoroom.com', ru: 'Удаление фона и фото товаров', en: 'Background removal, product shots' },
      { name: 'Pixelcut', url: 'https://www.pixelcut.ai', ru: 'Фото товаров для магазинов', en: 'Product photos for sellers' },
      { name: 'Recraft', url: 'https://www.recraft.ai', ru: 'Векторы, иконки, иллюстрации', en: 'Vectors, icons, illustrations' },
      { name: 'Pixlr', url: 'https://pixlr.com', ru: 'Онлайн-фоторедактор с ИИ', en: 'Online photo editor with AI' },
      { name: 'Fotor', url: 'https://www.fotor.com', ru: 'Фоторедактор и графика с ИИ', en: 'AI photo editing and graphics' },
      { name: 'Lovart', url: 'https://www.lovart.ai', ru: 'ИИ-агент для дизайна', en: 'AI design agent' },
      { name: 'Stitch', url: 'https://stitch.withgoogle.com', ru: 'Макеты интерфейсов от Google', en: 'UI mockups by Google' },
      { name: 'Relume', url: 'https://www.relume.io', ru: 'Структура и вайрфреймы сайта', en: 'Sitemaps and wireframes' },
      { name: 'Looka', url: 'https://looka.com', ru: 'Логотип и брендинг', en: 'Logo and brand kit' },
      { name: 'Uizard', url: 'https://uizard.io', ru: 'Прототипы из эскизов', en: 'Prototypes from sketches' },
    ],
  },
  {
    id: 'learning', ru: 'Обучение', en: 'Learning',
    tools: [
      { name: 'ChatGPT', url: 'https://chatgpt.com', ru: 'Режим учёбы с пошаговыми объяснениями', en: 'Study mode, step-by-step explanations' },
      { name: 'Gemini', url: 'https://gemini.google.com', ru: 'Guided Learning: разбор темы шагами', en: 'Guided Learning through any topic' },
      { name: 'Duolingo', url: 'https://www.duolingo.com', ru: 'Языки с ИИ-диалогами', en: 'Languages with AI chats' },
      { name: 'Quizlet', url: 'https://quizlet.com', ru: 'Карточки и тесты с ИИ', en: 'Flashcards and quizzes with AI' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', ru: 'Разобраться в теме с источниками', en: 'Learn any topic with sources' },
      { name: 'NotebookLM', url: 'https://notebooklm.google.com', ru: 'Учись по своим материалам', en: 'Study from your own sources' },
      { name: 'Photomath', url: 'https://photomath.com', ru: 'Решение задач по фото', en: 'Solve math from a photo' },
      { name: 'Gauth', url: 'https://www.gauthmath.com', ru: 'Решение домашки по фото', en: 'Homework solver from a photo' },
      { name: 'Brainly', url: 'https://brainly.com', ru: 'Помощь с домашними заданиями', en: 'Homework help' },
      { name: 'Chegg', url: 'https://www.chegg.com', ru: 'Решения задач и учебников', en: 'Step-by-step textbook solutions' },
      { name: 'Speak', url: 'https://www.speak.com', ru: 'Разговорная практика языка', en: 'Speaking practice' },
      { name: 'Praktika', url: 'https://praktika.ai', ru: 'Английский с ИИ-аватаром', en: 'English with an AI tutor avatar' },
      { name: 'ELSA Speak', url: 'https://elsaspeak.com', ru: 'Тренер английского произношения', en: 'English pronunciation coach' },
      { name: 'Khanmigo', url: 'https://www.khanmigo.ai', ru: 'ИИ-репетитор Khan Academy', en: 'Khan Academy’s AI tutor' },
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
  // источник: https://openclaw.ai/
  'openclaw.ai': {
    free: { ru: 'бесплатно и с открытым кодом, модели оплачиваются отдельно', en: 'free and open source, models billed separately' },
    paid: { ru: 'подписки нет', en: 'no subscription' },
  },
  // источник: https://dify.ai/pricing
  'dify.ai': {
    free: { ru: 'Sandbox: 200 сообщений, 5 приложений', en: 'Sandbox: 200 message credits, 5 apps' },
    paid: { plan: 'Professional', price: '$59', ru: '5 000 сообщений в месяц, 50 приложений', en: '5,000 message credits per month, 50 apps' },
  },
  // источник: https://www.eesel.ai/blog/skywork-ai-pricing
  'skywork.ai': {
    free: { ru: 'около 500 кредитов в неделю', en: 'about 500 credits a week' },
    paid: { plan: 'Pro', price: '$19.99', ru: 'около 7 000 кредитов в месяц', en: 'about 7,000 credits per month' },
  },
  // источник: https://convertaudiototext.com/pricing-comparison/turboscribe (turboscribe.ai/pricing — 403)
  'turboscribe.ai': {
    free: { ru: '3 файла в день до 30 минут', en: '3 files a day, up to 30 min each' },
    paid: { plan: 'Unlimited', price: '$20', ru: 'безлимит, файлы до 10 часов', en: 'unlimited, files up to 10 hours' },
  },
  // источник: https://fish.audio/plan/
  'fish.audio': {
    free: { ru: '8 000 кредитов в месяц (~7 минут речи)', en: '8,000 credits a month (~7 min of speech)' },
    paid: { plan: 'Plus', price: '$11', ru: '250 000 кредитов (~200 минут) в месяц', en: '250,000 credits (~200 min) a month' },
  },
  // источник: https://www.aixploria.com/en/vocalremover/ (vocalremover.org — 403)
  'vocalremover.org': {
    free: { ru: 'без регистрации, файлы до 10 минут', en: 'no sign-up, files up to 10 min' },
    paid: { plan: 'Patreon', price: '$7', ru: 'файлы до 20 минут, lossless', en: 'files up to 20 min, lossless' },
  },
  // источник: https://speechify.com/pricing/
  'speechify.com': {
    free: { ru: '10 базовых голосов, скорость до 1,5×', en: '10 basic voices, up to 1.5× speed' },
    paid: { plan: 'Premium', price: '$29', ru: '1000+ голосов, скорость до 5×, ИИ-саммари', en: '1,000+ voices, up to 5× speed, AI summaries' },
  },
  // источник: https://toolquestor.com/vs/mureka-vs-suno ; https://www.goodfirms.co/software/mureka-ai (официальная — 404)
  'www.mureka.ai': {
    free: { ru: 'несколько песен в день, без коммерции', en: 'a few songs a day, non-commercial' },
    paid: { plan: 'Basic', price: '$10', ru: '~400 песен в месяц, коммерческие права', en: '~400 songs a month, commercial rights' },
  },
  // источник: https://apppricinglab.com/iap/apple/1515796612 ; https://sunowatermark.com/blog/moises-ai-review-2026/ (официальная без цифр)
  'moises.ai': {
    free: { ru: '5 треков в месяц до 5 минут', en: '5 songs a month, up to 5 min each' },
    paid: { plan: 'Premium', price: '$5.99', ru: 'больше загрузок, все дорожки', en: 'more uploads, all stems' },
  },
  // источник: https://www.temperstack.com/plans/voicemod/ ; https://aisotools.com/blog/voicemod-review-2026 (официальная без цифр)
  'www.voicemod.net': {
    free: { ru: 'несколько голосов в день по ротации, 1 саундборд', en: 'daily rotating voices, 1 soundboard' },
    paid: { plan: 'Pro', price: '$9.99', ru: 'все голоса и саундборды без ограничений', en: 'all voices and unlimited soundboards' },
  },
  // источник: https://www.lalal.ai/pricing/ ; https://g2.com/products/lalal-ai/pricing (помесячная цена)
  'www.lalal.ai': {
    free: { ru: '10 минут в медленной очереди, без скачивания', en: '10 min in the slow queue, no downloads' },
    paid: { plan: 'Lite', price: '$9.99', ru: '90 быстрых минут в месяц', en: '90 fast-queue minutes a month' },
  },
  // источник: https://www.eesel.ai/en/blog/character-ai-pricing
  'character.ai': {
    free: { ru: 'все персонажи, реклама и замедление в часы пик', en: 'all characters, ads and slowdowns at peak hours' },
    paid: { plan: 'c.ai+', price: '$9.99', ru: 'без рекламы и очереди, безлимитные звонки', en: 'no ads or queue, unlimited voice calls' },
  },
  // источник: https://geotoolbox.ai/blog/copilot-pricing.md
  'copilot.microsoft.com': {
    free: { ru: 'чат, картинки и голос с лимитами', en: 'chat, images and voice with limits' },
    paid: { plan: 'Microsoft 365 Personal', price: '$9.99', ru: 'Copilot в Word, Excel и Outlook с лимитом кредитов', en: 'Copilot in Word, Excel and Outlook with credit limits' },
  },
  // источник: https://felloai.com/qwen-pricing/
  'chat.qwen.ai': {
    free: { ru: 'чат, картинки и видео без подписки', en: 'chat, images and video with no subscription' },
    paid: { ru: 'подписки нет, платно только API', en: 'no subscription, API only' },
  },
  // источник: https://www.kimi.com/help/membership/membership-pricing
  'www.kimi.com': {
    free: { ru: 'чат без жёсткого лимита, 1 задача агента', en: 'chat with no hard cap, 1 agent task' },
    paid: { plan: 'Moderato', price: '$19', ru: 'Deep Research, слайды, сайты, кредиты агента', en: 'Deep Research, slides, websites, agent credits' },
  },
  // источник: https://omidsaffari.com/blog/poe-pricing
  'poe.com': {
    free: { ru: 'небольшой дневной запас поинтов', en: 'small daily allowance of points' },
    paid: { plan: 'Starter', price: '$4.99', ru: '10 000 поинтов в день на все модели', en: '10,000 points a day across all models' },
  },
  // источник: https://krater.ai/pricing/mistral
  'chat.mistral.ai': {
    free: { ru: 'ограниченное число сообщений в день', en: 'limited messages per day' },
    paid: { plan: 'Pro', price: '$14.99', ru: 'больше сообщений, Deep Research, лучшие модели', en: 'more messages, Deep Research, top models' },
  },
  // источник: https://learn.chatgpt.com/docs/pricing
  'openai.com': {
    free: { ru: 'входит в бесплатный ChatGPT для простых задач', en: 'included in free ChatGPT for quick tasks' },
    paid: { plan: 'Go', price: '$8', ru: 'больше лимитов для лёгких задач; CLI и IDE — с Plus за $20', en: 'higher limits for light tasks; CLI and IDE from Plus at $20' },
  },
  // источник: https://ai.google.dev/pricing
  'aistudio.google.com': {
    free: { ru: 'бесплатно с лимитами запросов', en: 'free with rate limits' },
    paid: { ru: 'подписки нет, платно только API', en: 'no subscription, API only' },
  },
  // источник: https://base44.com/pricing
  'base44.com': {
    free: { ru: '25 сообщений в месяц, до 5 приложений', en: '25 message credits per month, up to 5 apps' },
    paid: { plan: 'Starter', price: '$20', ru: '100 сообщений в месяц', en: '100 message credits per month' },
  },
  // источник: https://antigravity.google/pricing
  'antigravity.google': {
    free: { ru: 'базовые недельные лимиты, автодополнение без ограничений', en: 'basic weekly limits, unlimited tab completions' },
    paid: { plan: 'Google AI Pro', price: '$19.99', ru: 'повышенные лимиты и пул ИИ-кредитов', en: 'higher limits and an AI credit pool' },
  },
  // источник: https://emergent.sh/pricing
  'emergent.sh': {
    free: { ru: '10 кредитов в месяц', en: '10 credits per month' },
    paid: { plan: 'Standard', price: '$20', ru: '100 кредитов в месяц', en: '100 credits per month' },
  },
  // источник: https://www.jetbrains.com/help/ai-assistant/2026.2/licensing-and-subscriptions.html
  'www.jetbrains.com': {
    free: { ru: 'AI Free: 3 ИИ-кредита на 30 дней, автодополнение', en: 'AI Free: 3 AI credits per 30 days, completions' },
    paid: { plan: 'AI Pro', price: '$10', ru: '10 ИИ-кредитов на 30 дней', en: '10 AI credits per 30 days' },
  },
  // источник: https://opencode.ai/go
  'opencode.ai': {
    free: { ru: 'бесплатно, есть бесплатные модели', en: 'free, includes free models' },
    paid: { plan: 'Go', price: '$10', ru: 'доступ к открытым моделям с лимитами на 5 часов', en: 'open models with 5-hour usage limits' },
  },
  // источник: https://kiro.dev/pricing/
  'kiro.dev': {
    free: { ru: '50 кредитов в месяц', en: '50 credits per month' },
    paid: { plan: 'Pro', price: '$20', ru: '1 000 кредитов в месяц', en: '1,000 credits per month' },
  },
  // источник: https://aiidelist.com/blog/trae-ai-ide-pricing-2026
  'www.trae.ai': {
    free: { ru: '5 000 автодополнений в месяц, ограниченный агент', en: '5,000 completions per month, limited agent' },
    paid: { plan: 'Lite', price: '$3', ru: 'небольшой пакет запросов к моделям', en: 'small model usage allowance' },
  },
  // источник: https://cline.bot/pricing
  'cline.bot': {
    free: { ru: 'бесплатно и с открытым кодом, модели оплачиваются отдельно', en: 'free and open source, models billed separately' },
    paid: { ru: 'подписки нет', en: 'no subscription' },
  },
  // источник: https://www.magnific.com/pricing ; https://www.magnific.com/ai/docs/plans-and-pricing
  'www.magnific.com': {
    free: { ru: '10 скачиваний стоков и до 20 ИИ-картинок в день', en: '10 stock downloads and up to 20 AI images a day' },
    paid: { plan: 'Premium', price: '$20', ru: '240 000 кредитов в год, все стоки', en: '240,000 credits a year, full stock library' },
  },
  // источник: https://pricingsaas.com/companies/picsart/diffs/2026W35 ; https://toolradar.com/tools/picsart/pricing
  'picsart.com': {
    free: { ru: 'базовый редактор, 5 ИИ-кредитов в неделю', en: 'basic editor, 5 AI credits a week' },
    paid: { plan: 'Pro', price: '$15', ru: '500 кредитов в месяц, премиум-контент', en: '500 credits a month, premium content' },
  },
  // источник: https://www.remove.bg/help/a/what-is-the-difference-between-the-free-plan-subscription-and-pay-as-you-go ; https://tekpon.com/software/removebg/pricing/
  'www.remove.bg': {
    free: { ru: 'превью до 0,25 Мп без лимита, 1 кредит на HD', en: 'unlimited previews up to 0.25 MP, 1 HD credit' },
    paid: { plan: 'Subscription 40', price: '$9', ru: '40 кредитов на HD-изображения в месяц', en: '40 HD image credits a month' },
  },
  // источник: https://www.krea.ai/blog/what-is-adobe-express-free-plan-pricing-and-how-it-compares-in-2026 ; https://helpx.adobe.com/express/mobile/get-started/premium-subscription.html
  'www.adobe.com': {
    free: { ru: 'шаблоны и редактор, ограниченные ИИ-кредиты', en: 'templates and editor, limited AI credits' },
    paid: { plan: 'Premium', price: '$9.99', ru: '250 генеративных кредитов в месяц, премиум-шаблоны', en: '250 generative credits a month, premium templates' },
  },
  // источник: https://www.pixelcut.ai/pricing
  'www.pixelcut.ai': {
    free: { ru: 'ограниченное удаление фона и апскейл без водяного знака', en: 'limited background removal and upscaling, no watermark' },
    paid: { plan: 'Pro', price: '$10', ru: '600 ИИ-кредитов в месяц, безлимит фона и апскейла', en: '600 AI credits a month, unlimited background removal and upscaling' },
  },
  // источник: https://www.xpay.sh/agent-ready-index/pixlr/ ; https://aitoolsatlas.ai/tools/pixlr-ai/pricing
  'pixlr.com': {
    free: { ru: 'базовый редактор с рекламой, мало ИИ-кредитов', en: 'basic editor with ads, few AI credits' },
    paid: { plan: 'Plus', price: '$2.49', ru: '80 ИИ-кредитов в месяц, без рекламы', en: '80 AI credits a month, no ads' },
  },
  // источник: https://www.capterra.com/p/181589/Fotor/pricing/ (официальная страница не найдена, источники расходятся)
  'www.fotor.com': {
    free: { ru: 'базовое редактирование с рекламой, без ИИ-кредитов', en: 'basic editing with ads, no AI credits' },
    paid: { plan: 'Pro', price: '$8.99', ru: 'все инструменты, без рекламы, ИИ-кредиты', en: 'all tools, no ads, AI credits' },
  },
  // источник: https://aireiter.com/blog/lovart-pricing
  'www.lovart.ai': {
    free: { ru: 'ежедневные кредиты, ограниченные модели', en: 'daily credits, limited models' },
    paid: { plan: 'Starter', price: '$19', ru: '2000 быстрых кредитов в месяц', en: '2,000 fast credits a month' },
  },
  // источник: https://aireiter.com/blog/seaart-ai-review-2026 ; https://toolsforhumans.ai/ai-tools/seaart-ai
  'www.seaart.ai': {
    free: { ru: '~130 единиц «стамины» в день (~20 картинок)', en: '~130 stamina per day (~20 images)' },
    paid: { plan: 'Beginner', price: '$5.99', ru: '300 «стамины» в день (~50 картинок)', en: '300 stamina per day (~50 images)' },
  },
  // источник: https://dreamina.capcut.com/ai-video/dreamina-october-offer-faq-2026 ; https://www.iphones.ru/iNotes/dreamina-review
  'dreamina.capcut.com': {
    free: { ru: '120 кредитов в день, 3 видео Seedance', en: '120 credits per day, 3 Seedance videos' },
    paid: { plan: 'Basic', price: '$15', ru: '1 575 кредитов в месяц', en: '1,575 credits per month' },
  },
  // источник: https://www.mindomax.com/quizlet-plus-cost ; https://recurdash.com/subscription-pricing/quizlet-plus
  'quizlet.com': {
    free: { ru: 'карточки без лимита, Learn и тесты ограниченно', en: 'unlimited flashcards, limited Learn and tests' },
    paid: { plan: 'Plus', price: '$7.99', ru: '20 раундов Learn и 3 теста в месяц, без рекламы', en: '20 Learn rounds and 3 tests a month, no ads' },
  },
  // источник: https://apps.apple.com/bb/app/gauthmath-maths-problem-helper/id1542571008 ; https://www.toolsforhumans.ai/ai-tools/gauthmath
  'www.gauthmath.com': {
    free: { ru: 'около 11 вопросов в день, с рекламой', en: 'about 11 questions a day, with ads' },
    paid: { plan: 'Gauth Plus', price: '$11.99', ru: 'безлимит вопросов, без рекламы', en: 'unlimited questions, no ads' },
  },
  // источник: https://myengineeringbuddy.com/blog/chegg-reviews-alternatives-pricing-offerings-in-2025/
  'www.chegg.com': {
    free: { ru: 'нет', en: 'none' },
    paid: { plan: 'Chegg Study', price: '$15.95', ru: 'пошаговые решения и вопросы экспертам', en: 'step-by-step solutions and expert Q&A' },
  },
  // источник: https://learnenglish.life/compare/talki-pal-vs-elsa-speak/ ; https://eikaiwa.weblio.jp/ninja-eikaiwa/elsaspeak-pricing
  'elsaspeak.com': {
    free: { ru: '~25 уроков произношения, 3 ИИ-диалога, с рекламой', en: '~25 pronunciation lessons, 3 AI chats, with ads' },
    paid: { plan: 'Pro', price: '$11.99', ru: 'все 1600+ уроков, без рекламы', en: 'all 1,600+ lessons, no ads' },
  },
  // источник: https://clickup.com/pricing
  'clickup.com': {
    free: { ru: '500 ИИ-кредитов на пространство, 60 МБ хранилища', en: '500 AI credits per workspace, 60 MB storage' },
    paid: { plan: 'Core', price: '$12', ru: '1000 ИИ-кредитов и 1000 автоматизаций в месяц', en: '1,000 AI credits and 1,000 automations a month' },
  },
  // источник: https://miro.com/pricing/ ; https://www.usecarly.com/blog/miro-pricing/ (помесячная цена)
  'miro.com': {
    free: { ru: '3 редактируемые доски, пробные ИИ-кредиты', en: '3 editable boards, trial AI credits' },
    paid: { plan: 'Starter', price: '$10', ru: 'безлимит досок, 25 ИИ-кредитов в месяц', en: 'unlimited boards, 25 AI credits a month' },
  },
  // источник: https://www.todoist.com/pricing ; https://www.todoist.com/help/articles/todoist-pricing-and-plans-update-2025-everything-you-need-to-know-Tn6Pg1JKI
  'www.todoist.com': {
    free: { ru: '5 проектов, голосовой ввод Ramble с лимитом', en: '5 projects, limited Ramble voice input' },
    paid: { plan: 'Pro', price: '$7', ru: '300 проектов, ИИ-помощник, безлимит Ramble', en: '300 projects, AI assist, unlimited Ramble' },
  },
  // источник: https://www.read.ai/plans-pricing
  'www.read.ai': {
    free: { ru: '5 встреч в месяц до 1 часа', en: '5 meetings a month, up to 1 hour' },
    paid: { plan: 'Pro', price: '$19.75', ru: 'безлимит встреч до 4 часов', en: 'unlimited meetings up to 4 hours' },
  },
  // источник: https://www.fathom.ai/pricing ; https://sonix.ai/resources/fathom-pricing/ (цена Premium)
  'www.fathom.ai': {
    free: { ru: 'безлимит записи и расшифровки, ИИ-итоги ограничены', en: 'unlimited recording and transcripts, limited AI summaries' },
    paid: { plan: 'Premium', price: '$20', ru: 'безлимит ИИ-итогов и действий', en: 'unlimited AI summaries and action items' },
  },
  // источник: https://wisprflow.ai/pricing
  'wisprflow.ai': {
    free: { ru: '2000 слов диктовки в неделю', en: '2,000 dictated words a week' },
    paid: { plan: 'Pro', price: '$15', ru: 'безлимитная диктовка', en: 'unlimited dictation' },
  },
  // источник: https://tactiq.io/pricing ; https://help.tactiq.io/en/articles/8649126-understanding-tactiq-plans-and-pricing
  'tactiq.io': {
    free: { ru: '10 расшифровок и 5 ИИ-кредитов в месяц', en: '10 transcripts and 5 AI credits a month' },
    paid: { plan: 'Pro', price: '$12', ru: 'безлимит расшифровок, 10 ИИ-кредитов в месяц', en: 'unlimited transcripts, 10 AI credits a month' },
  },
  // источник: https://www.notta.ai/en/pricing ; https://sonix.ai/resources/notta-pricing/ (помесячная цена)
  'www.notta.ai': {
    free: { ru: '120 минут в месяц, до 3 минут на запись', en: '120 min a month, 3 min per recording' },
    paid: { plan: 'Pro', price: '$13.99', ru: '1800 минут транскрибации в месяц', en: '1,800 transcription minutes a month' },
  },
  // источник: https://tldv.io/pricing/ ; https://intercom.help/tldv/en/articles/8919450-what-are-the-limits-of-the-free-plan
  'tldv.io': {
    free: { ru: 'безлимит записей, ИИ-заметки для 10 встреч разово', en: 'unlimited recordings, AI notes for 10 meetings total' },
    paid: { plan: 'Pro', price: '€29', ru: 'безлимит ИИ-заметок', en: 'unlimited AI notes' },
  },
  // источник: https://magichour.ai/blog/pixverse-pricing (цены сверены 13.09.2026; официальная pixverse.ai/pricing — 404)
  'pixverse.ai': {
    free: { ru: '30 кредитов в день, с водяным знаком', en: '30 credits per day, watermarked' },
    paid: { plan: 'Standard', price: '$10', ru: '1 200 кредитов в месяц + 60 в день', en: '1,200 credits per month + 60 daily' },
  },
  // источник: https://invideo.io/pricing ; https://novoads.ai/en/blog/invideo-pricing
  'invideo.io': {
    free: { ru: 'небольшая недельная квота, с водяным знаком', en: 'small weekly quota, watermarked' },
    paid: { plan: 'Starter', price: '$20', ru: '400 кредитов в месяц', en: '400 credits per month' },
  },
  // источник: https://costbench.com/software/ai-video-generators/wan-video/ ; https://vijaytalksai.com/wan-pricing-explained/ (официальная create.wan.video/pricing рендерится скриптом)
  'wan.video': {
    free: { ru: 'генерации без кредитов в медленной очереди', en: 'credit-free generations in a slow queue' },
    paid: { plan: 'Pro', price: '$10', ru: '300 кредитов в месяц', en: '300 credits per month' },
  },
  // источник: https://costbench.com/software/ai-video-generators/vidu/free-plan/ (сверено 20.10.2026; официальная vidu.com/pricing рендерится скриптом)
  'www.vidu.com': {
    free: { ru: 'стартовые и ежедневные кредиты, с водяным знаком', en: 'starter and daily credits, watermarked' },
    paid: { plan: 'Standard', price: '$10', ru: '800 кредитов в месяц, коммерческое использование', en: '800 credits per month, commercial use' },
  },
  // источник: https://www.synthesia.io/pricing
  'www.synthesia.io': {
    free: { ru: '10 минут видео в месяц, с водяным знаком', en: '10 video minutes per month, watermarked' },
    paid: { plan: 'Starter', price: '$29', ru: '1 250 кредитов в месяц, без водяного знака', en: '1,250 credits per month, no watermark' },
  },
  // источник: https://lumalabs.ai/learning-hub/dream-machine-support-pricing-information
  'lumalabs.ai': {
    free: { ru: 'только картинки 720p, с водяным знаком', en: 'images only, 720p, watermarked' },
    paid: { plan: 'Lite', price: '$9.99', ru: '3 200 кредитов в месяц, видео до 1080p', en: '3,200 credits per month, video up to 1080p' },
  },
  // источник: https://frontdeskreview.com/software/ai-detectors/gptzero.md
  'gptzero.me': {
    free: { ru: '10 000 слов в месяц', en: '10,000 words per month' },
    paid: { plan: 'Essential', price: '$14.99', ru: '150 000 слов в месяц', en: '150,000 words per month' },
  },
  // источник: https://help.languagetool.org/hc/en-us/articles/39254510973335
  'languagetool.org': {
    free: { ru: 'базовая проверка, 3 ИИ-перефраза в день', en: 'basic checks, 3 AI rephrases per day' },
    paid: { plan: 'Premium', price: '€19.90', ru: 'стиль, безлимитный перефраз, длинные тексты', en: 'style checks, unlimited rephrasing, long texts' },
  },
  // источник: https://www.wordtune.com/plans
  'www.wordtune.com': {
    free: { ru: '10 переписываний в день', en: '10 rewrites per day' },
    paid: { plan: 'Advanced', price: '$6.99', ru: '30 переписываний в день, 15 пересказов в месяц', en: '30 rewrites per day, 15 summaries per month' },
  },
  // источник: https://prowritingaid.com/pricing
  'prowritingaid.com': {
    free: { ru: 'проверка 500 слов за раз, 10 перефразов в день', en: '500 words at a time, 10 rephrases per day' },
    paid: { plan: 'Premium', price: '$30', ru: 'без лимита слов, безлимитные отчёты и перефраз', en: 'no word limit, unlimited reports and rephrasing' },
  },
  // источник: https://hemingwayapp.com/premium
  'hemingwayapp.com': {
    free: { ru: 'веб-редактор с подсветкой сложных фраз', en: 'web editor that flags hard sentences' },
    paid: { plan: 'Editor Plus', price: '$10', ru: 'ИИ-правки до 5 000 слов в месяц', en: 'AI fixes for up to 5,000 words per month' },
  },
  // источник: https://novelai.net/
  'novelai.net': {
    free: { ru: 'пробный доступ', en: 'trial access' },
    paid: { plan: 'Tablet', price: '$10', ru: 'безлимитная генерация текста', en: 'unlimited text generation' },
  },
};

// Фильтр FREE / NO VPN по домену сервиса.
//   free  — есть бесплатный тариф без срока (триал и разовые стартовые кредиты не считаются); по PRICING выше
//   noVpn — сайт открывается и работает из России без VPN (оплата не учитывается)
// Проверено: октябрь 2026. В комментарии — уверенность и источник по VPN;
// «сведений не найдено» = блокировки не нашли, считаем доступным.

const FILTERS = {
  'chatgpt.com': { free: true, noVpn: false }, // high: https://help.openai.com/en/articles/7947663-chatgpt-supported-countries
  'claude.ai': { free: true, noVpn: false }, // high: https://www.anthropic.com/supported-countries
  'gemini.google.com': { free: true, noVpn: false }, // high: https://support.google.com/gemini/answer/13575153
  'chat.deepseek.com': { free: true, noVpn: true }, // high: https://vc.ru/ai/2801630-neyroseti-v-rossii-2026
  'www.perplexity.ai': { free: true, noVpn: true }, // medium: https://vc.ru/ai/2918720-perplexity-podpiska-iz-rossii
  'grok.com': { free: true, noVpn: true }, // low: https://vc.ru/ai/3023075-kak-polzovatsya-grok-v-rossii — источники расходятся, часть пишет о блоке по IP с весны 2026
  'alice.yandex.ru': { free: true, noVpn: true }, // high: российский сервис
  'giga.chat': { free: true, noVpn: true }, // high: российский сервис
  'www.grammarly.com': { free: true, noVpn: false }, // high: https://www.grammarly.com/blog/grammarly-stands-with-ukraine/
  'www.deepl.com': { free: true, noVpn: false }, // medium: https://komersant.ua/en/deepl-bilshe-ne-hovoryt-po-rosiysky-populiarnyy-perekladach-prypynyv-robotu-v-rf-ta-bilorusi
  'quillbot.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.notion.com': { free: false, noVpn: false }, // high: https://www.notion.com/help/notion-russia
  'www.jasper.ai': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.sudowrite.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.midjourney.com': { free: false, noVpn: true }, // medium: https://habr.com/ru/articles/1008916
  'ideogram.ai': { free: true, noVpn: true }, // medium: https://habr.com/ru/articles/1008916
  'leonardo.ai': { free: true, noVpn: true }, // medium: https://vc.ru/services/2895078-kak-oplatit-leonardo-ai-iz-rossii
  'firefly.adobe.com': { free: true, noVpn: false }, // high: https://news.adobe.com/news/news-details/2022/adobe-stops-all-new-sales-of-adobe-products-and-services-in-russia
  'bfl.ai': { free: false, noVpn: true }, // low: https://www.sostav.ru/blogs/288620/94850
  'www.krea.ai': { free: true, noVpn: true }, // medium: https://vc.ru/services/2894155-kak-kupit-podpisku-krea-iz-rossii
  'www.recraft.ai': { free: true, noVpn: true }, // medium: https://kod.ru/recraft-v-rossii-kak-polsovatsa-bez-vpn
  'shedevrum.ai': { free: true, noVpn: true }, // high: российский сервис
  'labs.google': { free: true, noVpn: false }, // high: https://support.google.com/labs/answer/14998924
  'klingai.com': { free: true, noVpn: true }, // high: https://kod.ru/kling-v-rossii-kak-ispolzovat-bez-vpn
  'hailuoai.video': { free: false, noVpn: true }, // medium: https://kod.ru/hailuo-v-rossii-kak-polzovatsia-bez-vpn
  'runwayml.com': { free: false, noVpn: false }, // low: https://dtf.ru/howto/4930351-oplata-runway-v-rossii
  'www.heygen.com': { free: true, noVpn: true }, // low: https://dtf.ru/howto/4775136-kak-oplatit-heygen-iz-rossii
  'higgsfield.ai': { free: false, noVpn: true }, // low: https://vc.ru/services/2944539-kak-kupit-higgsfield-ai-iz-rossii
  'pika.art': { free: false, noVpn: true }, // low: https://postium.ru/nejroset-pika-art/
  'www.capcut.com': { free: true, noVpn: true }, // medium: https://dtf.ru/howto/5311103-capcut-v-rossii-kak-oplatit-capcut-pro
  'suno.com': { free: true, noVpn: true }, // low: https://habr.com/ru/companies/tsnis/articles/1054802/ — по kod.ru открывается нестабильно
  'elevenlabs.io': { free: true, noVpn: false }, // high: https://elevenlabs.io/docs/help-center/legal/do-you-restrict-access-to-the-service-and-platform-for-any-specific-countries
  'www.udio.com': { free: true, noVpn: false }, // low: https://dtf.ru/howto/5033891-kak-oplatit-udio-iz-rossii
  'murf.ai': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.descript.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'podcast.adobe.com': { free: true, noVpn: false }, // medium: https://community.adobe.com/t5/adobe-firefly-discussions/your-country-doesn-t-support-this-purchase-adobe-sites-products-and-services-are-not-available-in-a/m-p/15184942
  'mubert.com': { free: true, noVpn: true }, // medium: https://mubert.com/ko/about-us
  'krisp.ai': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'notebooklm.google.com': { free: true, noVpn: false }, // high: https://esports.ru/tekhnologii/news/gemini-okazalsya-nedostupen-v-rossii/
  'gamma.app': { free: false, noVpn: true }, // low: https://vc.ru/services/2974477-besplatnye-neirosseti-dlya-prezentatsiy — источники расходятся
  'www.napkin.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.granola.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'otter.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'fireflies.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.usemotion.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'n8n.io': { free: true, noVpn: false }, // high: https://blog.n8n.io/update-on-n8n-cloud-accounts-in-russia-and-belarus/ — облако закрыто, self-hosted работает
  'manus.im': { free: true, noVpn: false }, // low: https://vc.ru/services/2953180-kak-polzovatsya-neyrosetyu-manus-v-rossii
  'www.make.com': { free: true, noVpn: false }, // low: https://dtf.ru/howto/3923663-oplata-make-v-rossii — официальной политики нет
  'zapier.com': { free: true, noVpn: false }, // high: https://zapier.com/l/us-sanctions
  'www.genspark.ai': { free: true, noVpn: true }, // low: https://www.bitrix24.ru/journal/genspark/
  'www.lindy.ai': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.gumloop.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'relevanceai.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'cursor.com': { free: true, noVpn: false }, // high: https://ru.themoscowtimes.com/2026/09/10/rossiiskim-razrabotchikam-zablokirovali-dostup-k-odnomu-iz-krupneishih-ii-pomoschnikov-dlya-napisaniya-koda-a205758
  'www.claude.com': { free: false, noVpn: false }, // high: https://www.anthropic.com/supported-countries
  'github.com': { free: true, noVpn: true }, // medium: https://vc.ru/ai/2727978-github-copilot-kak-oformit-podpisku-v-rossii
  'lovable.dev': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'v0.app': { free: true, noVpn: true }, // low: https://community.vercel.com/t/vercel-dashboard-stuck-on-were-checking-your-browser-preloader/31394 — связь нестабильна
  'bolt.new': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'replit.com': { free: true, noVpn: true }, // low: https://dtf.ru/howto/5087085-kak-polzovatsya-replit
  'windsurf.com': { free: true, noVpn: false }, // medium: https://qna.habr.com/q/1385498
  'www.figma.com': { free: true, noVpn: true }, // medium: https://www.mentoday.ru/life/news/30-05-2026/v-rossii-zablokirovali-figma-polzovateli-jaluyutsya-na-problemy-s-dostupom-k-servisu/ — с мая 2026 у части пользователей сбои
  'www.canva.com': { free: true, noVpn: false }, // high: https://www.tgu-dpo.ru/news/2026/07/17/canva-onlayn-besplatnyy-redaktor/
  'www.framer.com': { free: true, noVpn: true }, // low: https://skillbox.ru/media/design/figma-to-framer/
  'stitch.withgoogle.com': { free: true, noVpn: false }, // medium: https://discuss.ai.google.dev/t/sorry-stitch-is-unavailable/87225?page=4
  'www.relume.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'uizard.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.photoroom.com': { free: true, noVpn: true }, // low: https://vc.ru/services/2116312-oplata-photoroom-iz-rossii
  'looka.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.duolingo.com': { free: true, noVpn: true }, // high: https://www.fontanka.ru/2026/03/26/76333062/
  'www.khanmigo.ai': { free: false, noVpn: true }, // low: https://blog.khanacademy.org/?p=16634
  'praktika.ai': { free: true, noVpn: true }, // low: https://moge.ai/ru/product/praktika
  'www.speak.com': { free: false, noVpn: true }, // low: https://speakshark.com/best-english-speaking-app-in-russia
  'photomath.com': { free: true, noVpn: true }, // low: https://lifehacker.ru/prilozheniya-dlya-resheniya-zadach/amp/
  'brainly.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'openclaw.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено (ставится локально; модели и Telegram могут требовать обхода)
  'dify.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'skywork.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'turboscribe.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'fish.audio': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'vocalremover.org': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'speechify.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.mureka.ai': { free: true, noVpn: true }, // low: https://timeweb.com/ru/community/articles/mureka-ai-chto-eto-takoe-i-kak-polzovatsya-neyrosetyu-dlya-generacii-muzyki
  'moises.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.voicemod.net': { free: true, noVpn: true }, // low: https://store.epicgames.com/p/voicemod-34bcbe?lang=ru
  'www.lalal.ai': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'character.ai': { free: true, noVpn: true }, // medium: https://practicum.yandex.ru/blog/neyroset-character-ai-kak-polzovatsya/
  'copilot.microsoft.com': { free: true, noVpn: false }, // medium: https://www.comss.ru/page.php?id=15883
  'chat.qwen.ai': { free: true, noVpn: true }, // medium: https://kod.ru/top-7-luchshih-ai-bez-zarubezhnoi-karty-i-vpn
  'www.kimi.com': { free: true, noVpn: true }, // low: https://vc.ru/ai/2912337-kimi-k-dostup-iz-rossii-bez-vpn
  'poe.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'chat.mistral.ai': { free: true, noVpn: true }, // low: https://lifehacker.ru/le-chat-mistral/
  'openai.com': { free: true, noVpn: false }, // high: https://help.openai.com/en/articles/7947663-chatgpt-supported-countries
  'aistudio.google.com': { free: true, noVpn: false }, // high: https://ai.google.dev/available_regions
  'base44.com': { free: true, noVpn: true }, // low: https://vc.ru/services/2960925-base44-ai-kupit-podpisku
  'antigravity.google': { free: true, noVpn: false }, // medium: https://discuss.ai.google.dev/t/using-antigravity-in-russia/142543
  'emergent.sh': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.jetbrains.com': { free: true, noVpn: false }, // medium: https://qna.habr.com/q/1324804
  'opencode.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'kiro.dev': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.trae.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'cline.bot': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.magnific.com': { free: true, noVpn: true }, // medium: https://dtf.ru/howto/5184113-kak-oplatit-freepik-iz-rossii
  'picsart.com': { free: true, noVpn: true }, // low: https://dtf.ru/howto/4085260-kak-oplatit-picsart-v-rossii
  'www.remove.bg': { free: true, noVpn: true }, // medium: https://vc.ru/ai/2919106-neyroseti-dlya-udaleniya-fona
  'www.adobe.com': { free: true, noVpn: false }, // low: https://news.adobe.com/news/news-details/2022/adobe-stops-all-new-sales-of-adobe-products-and-services-in-russia — по аналогии с Firefly/Podcast; прямых данных о блоке Express нет
  'www.pixelcut.ai': { free: true, noVpn: true }, // low: https://vc.ru/services/2142317-oplata-pixelcut-iz-rossii
  'pixlr.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.fotor.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.lovart.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.seaart.ai': { free: true, noVpn: true }, // low: https://seaartai.featurebase.app/p/the-censorship-is-region-based — пользователь из РФ работает без VPN; https://vc.ru/services/3036585-kak-oplatit-seaart-iz-rossii
  'dreamina.capcut.com': { free: true, noVpn: false }, // medium: https://www.iphones.ru/iNotes/dreamina-review — сайт работает через зарубежный IP, видео только с IP отдельных стран
  'quizlet.com': { free: true, noVpn: true }, // low: https://vc.ru/services/2116333-oplata-quizlet-iz-rossii
  'www.gauthmath.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.chegg.com': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
  'elsaspeak.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'clickup.com': { free: true, noVpn: false }, // high: https://3dnews.ru/1110809/servis-upravleniya-proektami-clickup-prekrashchaet-rabotu-v-rossii-s-12-sentyabrya
  'miro.com': { free: true, noVpn: false }, // high: https://ppc.world/news/miro-ogranichila-rossiyanam-dostup-k-akkauntam-saytu-i-podderzhke/
  'www.todoist.com': { free: true, noVpn: true }, // low: https://www.todoist.com/help/articles/making-payments-from-russia-nAHXlBAPn — блок не заявлен, проблемы только с оплатой
  'www.read.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.fathom.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'wisprflow.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'tactiq.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.notta.ai': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'tldv.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'pixverse.ai': { free: true, noVpn: true }, // medium: https://vc.ru/services/2977252-oplata-pixverse-v-rossii — проблема только в оплате, сервис работает
  'invideo.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'wan.video': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'www.vidu.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено; costbench называет бесплатный тариф ограниченным пробным — free под сомнением
  'www.synthesia.io': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено (компания из Великобритании, возможен санкционный блок)
  'lumalabs.ai': { free: true, noVpn: true }, // low: https://dtf.ru/howto/4119469-oplata-luma-v-rossii-i-belarusi — аккаунт создаётся, не проходит только оплата
  'gptzero.me': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'languagetool.org': { free: true, noVpn: true }, // low: https://forum.languagetool.org/t/languagetool-stopped-working/11212 — единичная жалоба на недоступность API из РФ, официального блока нет
  'www.wordtune.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'prowritingaid.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'hemingwayapp.com': { free: true, noVpn: true }, // low: сведений о блоке РФ не найдено
  'novelai.net': { free: false, noVpn: true }, // low: сведений о блоке РФ не найдено
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
    filterLabel: 'Фильтр сервисов',
    freeTip: 'бесплатный тариф, не триал',
    noVpnTip: 'открывается из России без VPN',
    prevPage: 'Предыдущие сервисы',
    nextPage: 'Следующие сервисы',
    page: n => `Страница ${n}`,
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
    filterLabel: 'Filter tools',
    freeTip: 'a free plan, not a trial',
    noVpnTip: 'opens from Russia without a VPN',
    prevPage: 'Previous tools',
    nextPage: 'Next tools',
    page: n => `Page ${n}`,
  },
};
