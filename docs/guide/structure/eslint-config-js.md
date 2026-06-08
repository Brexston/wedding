# 📄 eslint.config.js

Файл отвечает за конфигурацию **ESLint** с использованием современного **Flat Config** формата.
В основе лежит пресет [`@antfu/eslint-config`](https://github.com/antfu/eslint-config), который сразу подтягивает
оптимальные настройки для TypeScript, Vue и современного JavaScript.

## Содержимое

```js
import antfu from '@antfu/eslint-config';

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true,
	},

	rules: {
		'eslint-comments/no-unlimited-disable': 'off',
		'vue/html-self-closing': 'off',
		'no-console': 'warn',
		'node/prefer-global/process': 'off',
		'ts/no-redeclare': 'off',
	},

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: true,
	jsonc: false,
	yaml: false,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'docs/*/**',
	],
});
```

## Ключевые моменты

- `antfu()` — базовый конфиг от Anthony Fu (автора Vite/VueUse/UnoCSS).
- `stylistic` — задаёт правила стиля (табуляция, кавычки, точки с запятой).
- `rules` — локальные переопределения:
	- разрешён `console`, но с предупреждением,
	- отключены строгие правила `eslint-comments`, `node/prefer-global/process` и дублирование `ts/no-redeclare`,
	- снято ограничение на самозакрывающийся HTML в Vue.
- **Поддержка Vue и TS** — включена явно для предсказуемости.
- `ignores` — исключает папку `docs` из линтинга (Flat Config не использует `.eslintignore`).

## Что это даёт

- Единый стиль кода во всём проекте.
- Минимум конфликтов с правилами благодаря готовому конфигу.
- Современная конфигурация ESLint (Flat Config), которая постепенно заменяет старый `.eslintrc`.
- Автоматическая поддержка TypeScript и Vue.
