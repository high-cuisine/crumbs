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
```

Подробности — в skill и CLAUDE.md.
