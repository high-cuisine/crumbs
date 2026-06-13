# CLAUDE.md — mini-site (WOW! CRUMBS)

Next.js App Router landing. Читай это перед любым изменением в `mini-site/`.

## Команды

```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Архитектура (обязательно соблюдать)

### Слои

| Путь | Что кладём |
|------|------------|
| `src/shared/UI/` | Атомы: Button, Typography, Icon, Badge, Container… |
| `src/shared/widgets/` | Крупные блоки: Header, Footer, ProductCard, PackagingSlider |
| `src/shared/styles/` | `_variables.scss`, `_mixins.scss` |
| `src/shared/helpers/` | Pure functions, общие для проекта |
| `src/shared/hooks/` | Хуки, общие для 2+ страниц/виджетов |
| `src/shared/store/` | Глобальный клиентский state |
| `src/views/{page}/` | Страница целиком (НЕ `src/pages/`) |
| `src/views/{page}/components/` | Секции + вложенные подкомпоненты |
| `src/views/{page}/hooks/` | Хуки только этой страницы |
| `src/views/{page}/helpers/` | constants, formatters, mappers |
| `src/views/{page}/store/` | State только этой страницы |
| `src/app/` | Только layout, page, API routes |

### Тонкие компоненты — главное правило

**Компонент = композиция. Логика живёт в hooks/helpers/store.**

1. **~40–50 строк max** в одном `.tsx` — иначе декомпозируй.
2. **JSX-only** в секциях: импорт дочерних компонентов, без больших блоков разметки inline.
3. **`useState` / `useEffect` / handlers** → `hooks/use*.ts`.
4. **Форматирование, фильтры, маппинг, константы** → `helpers/`.
5. **Shared client state** → `store/` (page-local или `shared/store/`).
6. **Секция** = папка с `components/` для подблоков (пример: `Hero/components/HeroContent/`).

Пример тонкой секции:

```tsx
// views/home/components/Hero/Hero.tsx — только композиция
export function Hero() {
  return (
    <section className={styles.hero}>
      <HeroDecorations />
      <Container>
        <HeroContent />
        <HeroAction />
      </Container>
    </section>
  );
}
```

### Стили

- **Только** `*.module.scss` рядом с компонентом.
- Reset/fonts — `app/layout.module.scss`.
- Цвета/шрифты из `shared/styles/_variables.scss`.

### Client / Server

- Server Component по умолчанию.
- `'use client'` — только где нужны hooks/events/browser/store.
- Ставить `'use client'` на **минимально глубокий** компонент.

### Импорты

```typescript
import { Button } from '@/shared/UI/Button';
import { ProductCard } from '@/shared/widgets/ProductCard';
import { SITE, NAV_ITEMS } from '@/views/home/helpers';
import { usePackagingSlider } from '@/views/home/hooks';
```

### Новая страница

```
src/views/catalog/
├── CatalogPage.tsx
├── CatalogPage.module.scss
├── index.ts
├── components/
├── hooks/
├── helpers/
└── store/          # при необходимости
```

Подключение: `src/app/catalog/page.tsx` → `import { CatalogPage } from '@/views/catalog'`.

### Новый UI-атом

```
src/shared/UI/NewAtom/
├── NewAtom.tsx
├── NewAtom.module.scss
└── index.ts
```

### Запрещено

- `src/pages/` для view-компонентов
- Монолитные компоненты (UI + логика + данные в одном файле)
- Стили вне module.scss
- Бизнес-логика в `shared/UI`
- `export *` в helpers/hooks index (named exports)

## Figma / ассеты

- Изображения: `public/images/`
- Логотип и продукты уже выгружены из Figma

## Skill

При работе с архитектурой подключай skill: `skills/mini-site-architecture/SKILL.md`

## CMS / Админка (управление контентом)

Весь видимый контент витрины редактируется в `/admin` (без правок кода).

### Слой `src/server/` (server-only)

| Путь | Что |
|------|-----|
| `src/server/store/` | Хранилище: `better-sqlite3` (основной) + JSON-файл (авто-фолбэк, если нативный модуль не загрузился). Выбор в `getStore()`. |
| `src/server/content/schema.ts` | zod-схемы контента по ключам страниц: `common, home, hits, boxes, delivery, cart`. Типы (`HomeContent`, `CommonContent`…) — отсюда. |
| `src/server/content/defaults.ts` | Дефолтный контент = текущий сайт. Возвращается, если в БД пусто. |
| `src/server/content/repository.ts` | `getPageContent(key)` / `savePageContent(key, data)` (zod-валидация). |
| `src/server/auth/session.ts` | HMAC-cookie (WebCrypto) + `verifyPassword`. |
| `src/server/media/storage.ts` | Загрузка файлов в `UPLOADS_DIR`. |

`src/proxy.ts` (НЕ middleware.ts — Next 16) гейтит `/admin` и `/api/admin`.

### Правила

1. **Контент течёт пропсами сверху вниз.** Page-компонент (`views/**/*Page.tsx`,
   server) вызывает `getPageContent(...)` и раздаёт срезы в секции/листья (включая
   клиентские). НЕ читать контент из листьев и НЕ хардкодить тексты/картинки в JSX.
2. Импорт типов контента в клиентские компоненты — только `import type` из
   `@/server/content/schema`.
3. Публичные контент-страницы — `export const dynamic = 'force-dynamic'`.
4. Новое редактируемое поле: добавь в `schema.ts` + `defaults.ts` + прокинь пропсом.
   Админка (`src/views/admin/components/ContentEditor`) рендерит форму автоматически
   по структуре данных (строка/число/массив/объект; картинки — по расширению/имени ключа).
5. Next 16: `cookies()` async, `params`/`searchParams` — Promise, route handlers на Node-runtime.

Подробности запуска и Docker — в [README.md](./README.md).
