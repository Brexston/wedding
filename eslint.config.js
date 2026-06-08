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
		// antfu v8 стал проверять именованные параметры в типах/интерфейсах и declare global.
		// args: 'none' — не проверять имена параметров в сигнатурах (в типах это просто документация).
		// varsIgnorePattern расширен для Window — false positive при declare global { interface Window }.
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^(_|[A-Z])',
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
	},

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: true,
	jsonc: false,
	yaml: false,
	// @eslint/markdown@8.x не реализует getLoc() из нового API ESLint 10, отключено до выхода патча
	markdown: false,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'docs/*/**',
	],
});
