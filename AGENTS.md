# AGENTS.md — mini-site

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Проект

Next.js 16 App Router, TypeScript, SCSS modules. Landing WOW! CRUMBS.

Полные правила архитектуры: [CLAUDE.md](./CLAUDE.md) и `.cursor/rules/architecture.mdc`.

## Обязательные правила для агента

### 1. Тонкие компоненты

- Компонент **не хранит** бизнес-логику, тяжёлые вычисления и большие константы.
- Разметка секции собирается из **дочерних компонентов**, не inline.
- Логика → `hooks/`, pure code → `helpers/`, state → `store/`.

### 2. Декомпозиция

```
shared/UI          → атомы (Button, Icon…)
shared/widgets     → Header, Footer, ProductCard…
views/{page}/components/{Section}/components/…  → подблоки секций
views/{page}/hooks | helpers | store
```

### 3. Стили

Только `*.module.scss`. Токены в `shared/styles/`.

### 4. Пути

- Views: `src/views/` (не `src/pages/`)
- Импорты: `@/shared/...`, `@/views/...`

### 5. Перед коммитом

```bash
npm run build
```

## Skill

`skills/mini-site-architecture/SKILL.md` — детальный гайд по декомпозиции.
