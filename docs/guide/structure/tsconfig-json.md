# 📄 tsconfig.json

Конфигурация TypeScript для проекта на **Vue 3** с использованием Vite.

## Основные настройки

* **compilerOptions** — ключевые параметры компилятора:
  - `"target": "esnext"` — генерируемый JavaScript использует последние возможности ES.
  - `"jsx": "preserve"` — JSX оставляется без трансформации (для Vue).
  - `"lib": ["esnext", "dom"]` — подключение стандартных библиотек ES и DOM.
  - `"useDefineForClassFields": true` — использование стандартного поведения `define` для полей классов.
  - `"module": "esnext"` — ECMAScript модули.
  - `"moduleResolution": "bundler"` — разрешение модулей под bundler (Vite).
  - `"baseUrl": "."` — базовая директория для относительных импортов.
  - `"paths"` — алиасы для упрощения импорта:
	  ```json
	  {
		"@/*": ["src/*"],
		"@app/*": ["src/app/*"],
		"@styles/*": ["src/styles/*"],
		"@img/*": ["src/assets/img/*"]
	  }
	  ```
  - `"resolveJsonModule": true` — возможность импортировать JSON как модуль.
  - `"types": ["vite/client"]` — подключение типов Vite.
  - `"strict": true` — включение всех строгих проверок TypeScript.
  - `"noImplicitThis": true` — запрет на неявное использование `this`.
  - `"importHelpers": true` — использование вспомогательных функций tslib для уменьшения размера.
  - `"sourceMap": true` — генерация карт исходников.
  - `"allowSyntheticDefaultImports": true` — разрешение синтетических default-импортов.
  - `"esModuleInterop": true` — совместимость с CommonJS модулями.
  - `"isolatedModules": true` — каждый файл обрабатывается как модуль.
  - `"skipLibCheck": true` — пропуск проверки типов для `node_modules` (ускоряет компиляцию).
* **references** — ссылки на другие конфиги, например `tsconfig.node.json`.
* **include** — файлы, которые компилируются:
	```json
	[
		"src/**/*.ts",
		"src/**/*.d.ts",
		"src/**/*.tsx",
		"src/**/*.vue"
	]
	```
* exclude — файлы, которые исключаются из компиляции:
	```json
	[
		"node_modules",
		"vite.config.ts"
	]
	```

## Зачем нужен

* Обеспечивает строгую типизацию и корректную работу TypeScript с Vue и Vite.
* Поддерживает алиасы для удобного импорта модулей.
* Совместим с современным JavaScript и настройками сборщика.
