import type { DefaultTheme } from 'vitepress';
import { nav } from './nav';
import { sidebar } from './sidebar';

export const themeConfig: DefaultTheme.Config = {
	logo: {
		src: '/img/logo.svg',
		width: 20,
		height: 20,
	},
	siteTitle: 'Frontend Шаблон',
	search: {
		provider: 'local',
		options: {
			translations: {
				button: {
					buttonText: 'Поиск',
					buttonAriaLabel: 'Поиск'
				},
				modal: {
					noResultsText: 'Ничего не найдено',
					resetButtonTitle: 'Сбросить фильтр',
					footer: {
						selectText: 'выбрать',
						navigateText: 'перемещаться',
						closeText: 'закрыть',
					}
				}
			}
		}
	},
	lastUpdated: {
		text: 'Обновлено',
		formatOptions: {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			forceLocale: true,
		}
	},
	outline: {
		level: [2, 3],
		label: 'На этой странице',
	},
	docFooter: {
		prev: 'Предыдущая страница',
		next: 'Следующая страница',
	},
	nav,
	sidebar,
};
