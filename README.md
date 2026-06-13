# mini-site — WOW! CRUMBS

Next.js landing по Figma.

## Запуск

```bash
npm install
npm run dev
```

## Правила для AI

| Файл | Для кого |
|------|----------|
| [AGENTS.md](./AGENTS.md) | Cursor / Codex / любые агенты |
| [CLAUDE.md](./CLAUDE.md) | Claude Code |
| [.cursor/rules/](./.cursor/rules/) | Cursor (auto-apply) |
| [skills/mini-site-architecture/SKILL.md](./skills/mini-site-architecture/SKILL.md) | Skill — декомпозиция, тонкие компоненты |

**Главное:** компоненты максимально тонкие → логика в `hooks/`, pure code в `helpers/`, state в `store/`.

## Структура

```
src/shared/UI/          — атомы
src/shared/widgets/     — крупные блоки
src/views/{page}/       — страницы (components, hooks, helpers, store)
src/server/             — серверный слой CMS (БД, контент, авторизация, медиа)
src/views/admin/        — UI админки
```

Подробности — в skill и CLAUDE.md.

## Админка / управление контентом

Весь контент витрины (тексты, ссылки, списки товаров/коробок/галерей и **изображения**)
редактируется в админке `/admin` без правок кода.

- **Вход:** `/admin/login`, пароль из `ADMIN_PASSWORD`.
- **Хранилище:** SQLite (`better-sqlite3`) в `DATA_DIR`. Если нативный модуль недоступен
  (например, локально без сборки) — автоматический фолбэк на JSON-файл `data/content.json`.
- **Изображения:** загрузка файлов в `UPLOADS_DIR` (по умолчанию `public/uploads`),
  отдаются как `/uploads/...`.
- Публичные страницы — `force-dynamic`, читают контент из БД на каждый запрос;
  правки видны сразу после «Сохранить».

### Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `ADMIN_PASSWORD` | пароль входа в админку |
| `ADMIN_SESSION_SECRET` | секрет подписи cookie-сессии (длинная случайная строка) |
| `DATA_DIR` | каталог БД/JSON (по умолчанию `./data`) |
| `UPLOADS_DIR` | каталог загрузок (по умолчанию `./public/uploads`) |

Локально можно создать `.env` по образцу [.env.example](./.env.example).

## Docker

```bash
docker compose up --build
```

`better-sqlite3` собирается внутри образа (Linux). БД и загруженные изображения
хранятся в volume'ах `wc_data` и `wc_uploads` — переживают пересборку.
Перед продакшеном задайте `ADMIN_PASSWORD` и `ADMIN_SESSION_SECRET`.
