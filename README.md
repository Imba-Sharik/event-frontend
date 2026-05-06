# event-frontend

Фронтенд проекта event.

## Стек

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4** + `tw-animate-css`
- **shadcn/ui** поверх **Base UI** (`@base-ui/react`)
- **lucide-react** — иконки
- **ESLint 9** (`eslint-config-next`)
- **pnpm** — пакетный менеджер

## Требования

- Node.js 20+
- pnpm 9+ (`npm i -g pnpm`)

## Установка и запуск

```bash
pnpm install
pnpm dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда       | Что делает                       |
| ------------- | -------------------------------- |
| `pnpm dev`    | Dev-сервер с hot reload          |
| `pnpm build`  | Production-сборка                |
| `pnpm start`  | Запуск production-сборки         |
| `pnpm lint`   | ESLint                           |

## Архитектура — Feature-Sliced Design

Проект следует [FSD](https://feature-sliced.design/). Слои сверху вниз, импортировать можно **только из нижележащих**:

```
src/
├── app/          # Next.js App Router: роуты, layout, providers
├── widgets/      # композиции из features/entities (например, Header, EventCard)
├── features/     # пользовательские сценарии (создание события, фильтры)
├── entities/     # бизнес-сущности (Event, User) — модель + UI сущности
└── shared/       # переиспользуемое, не привязанное к домену
    ├── ui/       # shadcn + базовые компоненты
    ├── lib/      # утилиты (cn, форматтеры)
    ├── api/      # http-клиент, сгенерированный API
    ├── config/   # константы, env
    └── hooks/    # переиспользуемые хуки
```

**Правила:**
- `app/` — единственный слой, который знает о роутинге Next.js.
- Слайсы (папки внутри слоя) общаются через **public API** — `index.ts` слайса.
- Cross-imports между слайсами одного слоя запрещены: `features/a` не импортирует из `features/b`.

> ⚠️ В Next.js App Router папка `src/app/` зарезервирована под роуты. FSD-слой `app` (providers, глобальные стили) живёт там же.

## Добавление shadcn-компонентов

```bash
pnpm dlx shadcn@latest add <component>
```

Компоненты ставятся в `src/shared/ui/` (настроено в `components.json`).

## Дизайн-система

### Цвета

CSS-переменные в `src/app/globals.css` → доступны в Tailwind как `bg-*` / `text-*`:

| Токен | Значение | Использование |
| --- | --- | --- |
| `--brand` | `rgb(55 215 75)` | Зелёный акцент (бейдж «Интересно», подзаголовок «Mice») |
| `--brand-foreground` | `oklch(0.145 0 0)` | Текст на brand-фоне |

Прозрачные оттенки задаём через `bg-brand/55`, `text-black/26` и т.д.

### Шрифты

Подключены через `next/font/google` в `src/app/layout.tsx`:

| Класс | Шрифт | Применение |
| --- | --- | --- |
| `font-sans` (по умолчанию) | Geist | Основной текст |
| `font-open-sans` | Open Sans | Заголовки карточек, подзаголовки, бейджи, табы |
| `font-display` _(TODO)_ | NauryzRedKeds | Декоративные заголовки секций («КОНЦЕРТЫ», «ВЫСТАВКИ»). **Ждём файл от дизайнера.** |

### Спейсинг

Все отступы — **кратно 4px** (Tailwind 4-сетка: `gap-1`=4, `gap-2`=8, `gap-3`=12, `gap-4`=16…). Если в макете значение не кратно 4 (например, 13px / 17px / 18px) — округляем до ближайшей ступеньки. Хардкодить произвольные пиксели нельзя.

### Контейнер

Все секции оборачиваются в `<Container>` (`shared/ui/container`) — `max-width: 1200px` + адаптивные горизонтальные отступы. Сами `<section>` могут быть на всю ширину (для full-bleed фонов / glow), а `Container` ограничивает контент внутри.

### Подводные камни

- **Не используем `backdrop-filter: blur()` под текстом.** Chrome промотит элемент в композитный слой, текст рендерится через grayscale-AA вместо LCD-AA → размытость на 100% зуме. Если нужно «стекло» — берём плотный полупрозрачный фон (`bg-black/40` и т.п.).
- **`tailwind-merge` не всегда сводит кастомные theme-цвета** (например, `text-primary-foreground` из shadcn vs `text-zinc-900`). Если нужен железный приоритет — используем `!` (Tailwind v4 syntax: `text-zinc-900!`).

## Workflow

Договорённости в команде (без формальной защиты ветки):

- В `main` **не пушим напрямую** — только через Pull Request.
- На каждую задачу — отдельная ветка от свежего `main`:
  ```bash
  git checkout main
  git pull
  git checkout -b feat/event-card
  ```
- Префиксы веток:
  - `feat/` — новая фича
  - `fix/` — багфикс
  - `refactor/` — рефакторинг без изменения поведения
  - `chore/` — инфраструктура, конфиги, зависимости
- Перед открытием PR локально прогнать:
  ```bash
  pnpm lint
  pnpm build
  ```
- PR мержим после апрува второго разработчика. Тривиальные правки (опечатки, конфиги) — можно после согласования в чате.
- Коммиты — в стиле [Conventional Commits](https://www.conventionalcommits.org/): `feat: ...`, `fix: ...`, `chore: ...`.
- После мержа удаляем ветку (локально и на GitHub).

## Важно

В `AGENTS.md` указано, что Next.js в этом проекте может содержать breaking changes относительно публичных доков. При сомнениях — смотреть `node_modules/next/dist/docs/`.
