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
