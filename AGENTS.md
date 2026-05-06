<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Стек

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS **v4** (синтаксис `@theme`, `@utility`, `@layer` — не v3!)
- shadcn/ui-стиль (компоненты копируются в `src/shared/ui/`, не библиотека)
- Base UI (`@base-ui-components/react`) для примитивов
- pnpm

# Архитектура — FSD

```
src/
  app/       — Next.js routing + globals.css + layout
  widgets/   — секции страниц (header, hero, exhibitions-section, ...)
  entities/  — бизнес-сущности (content-card)
  shared/
    ui/      — переиспользуемые компоненты (Button, Container, Grid, ContentCard...)
    lib/     — утилиты (cn)
```

Каждый слой может импортировать только из слоёв ниже: `widgets → entities → shared`.

# Дизайн-система

## Сетка

12 колонок, **container 1264px**. Токены в `globals.css`:

```css
--container-page: 1264px;
--grid-col: 80px;
--grid-gap: 24px;
```

Использование: `<Container>` (`max-w-page`) + `<Grid>` (`grid-cols-12 gap-x-6 gap-y-8`). Карточки внутри `<Grid>` сами расставляют `col-span` через проп `span`.

## ContentCard

Размер задаётся через `span: 3 | 4 | 6 | 8` — это И количество колонок, И aspect-ratio картинки. Адаптив зашит внутрь карточки, не расставляется на родителе.

## Caption (12px текст)

Использовать `className="caption"` (12px / weight **500** / line-height 17px). **Не делать font-semibold на 12px кириллице** — на Windows Chrome (DirectWrite) ломается рендеринг. Это правило системы, потолок веса для caption — 500.

## Кнопки

Чёрные pill-кнопки лендинга — `<Button variant="pill" size="pill">` (или `buttonVariants({ variant: "pill", size: "pill" })` для `<Link>`). Не делать одноразовые pill-стили инлайн-классами.

# Шрифты

Open Sans подключён через **`@fontsource/open-sans`** (статические `.woff2` из node_modules), а не `next/font/google`. Причина: оптимизации Next ([vercel/next.js#78118](https://github.com/vercel/next.js/issues/78118)) ломают рендер кириллицы на Windows. Не возвращать на `next/font/google`.

`--font-sans` задаётся на `:root` в `globals.css` + `html { font-family: "Open Sans", system-ui, sans-serif }` напрямую.

**Nauryz RedKeds** (декоративные заголовки) — self-hosted `.woff2` в `public/`, объявлен через `@font-face` с `font-weight: 700`. Использовать через `className="font-display"` + `font-bold` (запрос 700 совпадёт с объявленным весом). Загружено одно начертание — не использовать `font-display` без `font-bold`, иначе браузер синтезирует «лёгкую» версию.

# Линтер — известные грабли

- shadcn-сниппеты часто отстают от свежих правил `eslint-plugin-react-hooks`. Если правило `react-hooks/set-state-in-effect` ругается — переписывать на `useSyncExternalStore`, не подавлять (см. `carousel.tsx`).

# Коммиты

- Conventional commits на русском (`feat(scope): ...`, `fix(scope): ...`)
- **Никогда** не добавлять `Co-Authored-By: Claude`
