# 📄 package.json

Файл `package.json` описывает метаданные проекта, его зависимости, используемые инструменты и набор удобных скриптов для
сборки, разработки, деплоя и проверки качества кода.

## Основная информация

```json
{
	"name": "frontend-template",
	"version": "3.0.3",
	"type": "module",
	"private": true,
	"engineStrict": true,
	"engines": {
		"node": ">=22"
	}
}
```

- **name** — название проекта.
- **version** — текущая версия шаблона (следует семантическому версионированию).
- **type** — используется модульный тип (`module`), что включает поддержку ES-модулей.
- **private** — проект приватный, не предназначен для публикации в npm.
- **engines** — задаёт минимально поддерживаемую версию Node.js (22 и выше).

## Скрипты

```json
{
	"scripts": {
		"dev": "vite",
		"watch": "vite build --watch",
		"build": "time npm run lint && vite build",
		"build-initial": "npm run lint && vite build -m initial",
		"deploy-layout": "dotenv -- sh -c 'time npm run lint && vite build -m deploy && time rsync -az --delete --progress dist/ html.xpager.ru@html.xpager.ru:/srv/www/html.xpager.ru/htdocs/public/$VITE_APP_NAME'",
		"lint": "eslint --fix && vue-tsc --noEmit && stylelint . --fix",
		"docs:dev": "vitepress dev docs",
		"docs:build": "vitepress build docs",
		"docs:deploy": "dotenv -- sh -c 'time vitepress build -m deploy docs && time rsync -az --delete --progress docs/.vitepress/dist/ html.xpager.ru@html.xpager.ru:/srv/www/html.xpager.ru/htdocs/public/$VITE_APP_DOCS_NAME'"
	}
}
```

- **dev** — запуск режима разработки через Vite.
- **watch** — сборка в режиме отслеживания изменений.
- **build** — линтинг + финальная сборка проекта.
- **build-initial** — сборка с пресетом `initial` (в папку `/dist` для переноса оттуда вёрстки в бэкендерские шаблоны).
- **deploy-layout** — деплой собранного фронтенда на сервер с помощью rsync.
- **lint** — проверка кода (ESLint + Vue TSC + Stylelint).
- **docs:dev** — запуск документации в dev-режиме через VitePress.
- **docs:build** — сборка документации.
- **docs:deploy** — деплой документации на сервер.

## Зависимости

**Runtime (production):**

Используются только во время выполнения проекта:

- **Vue, Vue Router, Pinia** — ядро фреймворка.
- **@vueuse/core, @vueuse/integrations** — утилиты и интеграции для Vue.
- **Axios** — HTTP-клиент.
- **Vuelidate** — валидация форм.
- **UI-библиотеки**: `@vueform/multiselect`,` @vueform/slider`, `@vueform/toggle`, `@vuepic/vue-datepicker`, `floating-vue`.
- **Vue Toastification** — уведомления.
- **Swiper** — слайдер.
- **Maska** — маскирование инпутов.
- **vue3-otp-input** — ввод одноразовых кодов.
- **lodash-es, universal-cookie** — утилиты.

**Dev-зависимости:**

Используются только для разработки:

- **Vite** + плагины (`@vitejs/plugin-vue`, `unplugin-fonts`, `vite-plugin-svg-spritemap`, `vite-plugin-juice`).
- **TypeScript** + типы (`@types/*`).
- **ESLint** + конфиг `@antfu/eslint-config`.
- **Stylelint** + SCSS/Vue конфиги.
- **VitePress** — генератор документации.
- **Sass (sass-embedded), Pug, PostCSS** (с плагинами `autoprefixer`, `postcss-pxtorem`, `postcss-functions`, `postcss-sass`, `sugarss`).
- **dotenv-cli** — работа с `.env` в скриптах.
- **svgo, terser, lightningcss** — оптимизация ресурсов.
- **vue-tsc** — проверка типов Vue-компонентов.

## Browserslist

Задаёт список поддерживаемых браузеров.  
Используется инструментами вроде Autoprefixer и Babel.

## Ключевые особенности

- Современный стек: **Vue + Vite + TypeScript**.
- Строгие проверки качества: **ESLint + Stylelint + Vue TSC**.
- Поддержка документации на **VitePress**.
- Оптимизация фронтенда: PostCSS, Sass, Pug, SVGO, Terser, LightningCSS.
- Готовые скрипты для деплоя проекта и документации.
- Прозрачная политика Node.js (только **>=22**).
