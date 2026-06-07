---
name: mini-site-architecture
description: Архитектура Next.js mini-site — тонкие компоненты, module.scss, shared/UI, shared/widgets, views с components/hooks/helpers/store. Используй при любой работе в mini-site/ — создание страниц, секций, UI, рефакторинг, стили.
---

# mini-site Architecture Skill

Применяй эти правила **всегда** при работе в `mini-site/`.

---

## Quick decision tree

```
Новый код?
├─ Атом UI (кнопка, текст, иконка)           → shared/UI/{Name}/
├─ Блок на 2+ страницах (header, card)       → shared/widgets/{Name}/
├─ Секция одной страницы                     → views/{page}/components/{Section}/
│   └─ Подблок секции                         → .../components/{Sub}/
├─ React state/effects/handlers                → views/{page}/hooks/ или shared/hooks/
├─ Pure functions, constants, mappers          → views/{page}/helpers/ или shared/helpers/
├─ Client state (cart, modal, filters)       → views/{page}/store/ или shared/store/
└─ Route entry                                → app/{route}/page.tsx → import view
```

---

## Thin component rule

**Компонент = glue-код.** Максимум JSX + props + 1 hook call.

| Если в компоненте… | Действие |
|--------------------|----------|
| > 50 строк TSX | Разбить на subcomponents |
| `useState` / `useEffect` | → `useFeatureName.ts` |
| `.map` с тяжёлой логикой | → helper + тонкий map в JSX |
| Константы массивов/объектов | → `helpers/constants.ts` |
| Форматирование строк/дат | → `helpers/format*.ts` |
| State для 2+ sibling components | → `store/useXStore.ts` |

### ✅ Good — thin section

```tsx
// views/home/components/HitsSection/HitsSection.tsx
export function HitsSection() {
  return (
    <section id="hits" className={styles.section}>
      <Container>
        <HitsHeader />
        <HitsDescription />
        <HitsGrid />
        <HitsAction />
      </Container>
    </section>
  );
}
```

### ❌ Bad — fat section

```tsx
// НЕ ДЕЛАТЬ: 150 строк JSX + useState + fetch + formatPrice inline
export function HitsSection() {
  const [items, setItems] = useState([]);
  useEffect(() => { /* fetch */ }, []);
  // ... 100 lines of markup and logic
}
```

---

## Folder template

### UI atom

```
shared/UI/Button/
├── Button.tsx
├── Button.module.scss
└── index.ts          // export { Button } from './Button'
```

### Widget

```
shared/widgets/ProductCard/
├── ProductCard.tsx
├── ProductCard.module.scss
└── index.ts
```

### Page view

```
views/home/
├── HomePage.tsx              // только сборка секций + layout page
├── HomePage.module.scss
├── index.ts
├── components/
│   └── Hero/
│       ├── Hero.tsx
│       ├── Hero.module.scss
│       ├── index.ts
│       └── components/
│           ├── HeroContent/
│           └── HeroDecorations/
├── hooks/
│   ├── usePackagingSlider.ts
│   ├── useActiveSection.ts
│   └── index.ts              // named exports only
├── helpers/
│   ├── constants.ts
│   ├── formatPhone.ts
│   └── index.ts
└── store/                    // optional
    ├── useCartStore.ts
    └── index.ts
```

---

## Styling

- **Only** `*.module.scss` per component.
- Import tokens:

```scss
@use '../../styles/variables' as *;   // from shared/UI or shared/widgets
@use '../../../../shared/styles/mixins' as *;  // from views/.../Section/
```

- Responsive: `@include respond(tablet)` / `@include respond(mobile)`.

---

## Store guidelines

Use when:
- State shared across unrelated components on a page
- Global UI state (cart count, auth modal, theme)

```
Page-local:  views/{page}/store/useCartStore.ts
Global:      shared/store/useAppStore.ts
```

Prefer **Zustand** (or existing project choice). Keep store thin — actions in store, selectors exported as hooks.

Do **not** put store logic inside components.

---

## Hooks guidelines

- One hook = one concern (`usePackagingSlider`, `useActiveSection`).
- Return minimal API: `{ index, prev, next }` not entire component state.
- Page-specific → `views/{page}/hooks/`.
- Reused by 2+ pages/widgets → `shared/hooks/`.

---

## Helpers guidelines

- Pure functions only — no React, no hooks.
- `constants.ts` — static data (NAV_ITEMS, products, copy).
- `format*.ts`, `map*.ts`, `parse*.ts` — transformations.
- No side effects.

---

## Server vs Client

| Need | Directive |
|------|-----------|
| Static markup, images | Server (default) |
| onClick, useState, useEffect | `'use client'` |
| IntersectionObserver, window | `'use client'` |
| Zustand store | `'use client'` |

Place `'use client'` on the **lowest** component that needs it.

---

## Imports

```typescript
import { Button } from '@/shared/UI/Button';
import { Header } from '@/shared/widgets/Header';
import { HITS_PRODUCTS } from '@/views/home/helpers';
import { usePackagingSlider } from '@/views/home/hooks';
import { useCartStore } from '@/views/home/store';
```

---

## Anti-patterns (never)

- ❌ `src/pages/` for view components (Next.js conflict)
- ❌ Single 300-line component file
- ❌ Inline styles / globals.css for components
- ❌ Logic in `shared/UI`
- ❌ Copy-paste helpers between pages
- ❌ `export *` in view helpers/hooks index files

---

## Refactor checklist

When touching existing code:

1. Can this block become a subcomponent? → extract to `components/`
2. Can logic move to a hook? → extract
3. Can data/constants move to helpers? → extract
4. Is parent still thin? → if not, continue splitting
5. Styles only in module.scss? → verify
6. `npm run build` passes? → run before done
