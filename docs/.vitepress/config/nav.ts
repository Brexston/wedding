import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
	{
		text: 'Документация',
		items: [
			{ text: 'Введение', link: '/guide/introduction/what-is-it' },
			{ text: 'Основы', link: '/guide/essentials/pages' },
			{ text: 'Vue-компоненты', link: '/guide/components/inputs/XInputCheckbox' },
			{ text: 'Composables', link: '/guide/composables/useFileInput' },
			{ text: 'Pug-миксины', link: '/guide/pug-mixins/base-accordion' },
			{ text: 'Sass-миксины', link: '/guide/sass-mixins/icon' },
			{ text: 'Файловая структура', link: '/guide/structure/github' },
			{ text: 'Scripts', link: '/guide/scripts/calcProperties' },
			{ text: 'Директивы', link: '/guide/directives/observe' },
		],
	},
	{ text: 'Шаблон на GitHub', link: 'https://github.com/XpageTeam/frontend-template' },
	{ text: 'Wiki', link: 'https://space.xpage.ru/wiki/' },
];
