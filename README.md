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

## Workflow

- Ветка `main` — стабильная.
- Работа ведётся в фича-ветках, мерж через Pull Request.
- Перед коммитом: `pnpm lint`.

## Важно

В `AGENTS.md` указано, что Next.js в этом проекте может содержать breaking changes относительно публичных доков. При сомнениях — смотреть `node_modules/next/dist/docs/`.
