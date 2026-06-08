import type { HeadConfig } from 'vitepress';

export const head: HeadConfig[] = [
	['link', { rel: 'icon', href: '/favicons/favicon.ico' }],
	['link', { rel: 'icon', href: '/frontend-template-docs/favicons/favicon.ico' }],

	['meta', { property:'og:url', content:'https://html.xpager.ru/frontend-template-docs/'}],
	['meta', { property: 'og:type', content:'website' }],
	['meta', { property:'og:title', content:'Frontend Шаблон'}],
	['meta', { property:'og:description', content:'Для верстки сайтов и веб-приложений. Он идеален во всём'}],
	['meta', { property:'og:image', content:'https://html.xpager.ru/frontend-template-docs/img/content/og.webp'}],

	['meta', { name:'twitter:card', content:'summary_large_image'}],
	['meta', { property:'twitter:domain', content:'html.xpager.ru'}],
	['meta', { property:'twitter:url', content:'https://html.xpager.ru/frontend-template-docs/'}],
	['meta', { name:'twitter:title', content:'Frontend Шаблон'}],
	['meta', { name:'twitter:description', content:'Для верстки сайтов и веб-приложений. Он идеален во всём'}],
	['meta', { name:'twitter:image', content:'https://html.xpager.ru/frontend-template-docs/img/content/og.webp'}],
];
