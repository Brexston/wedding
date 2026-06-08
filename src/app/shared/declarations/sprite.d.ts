// https://spiriitlabs.github.io/vite-plugin-svg-spritemap/guide/vue.html
// Декларация для ?view (рендерит SVG как обычный Vue-компонент)
declare module '*.svg?view' {
	import type { DefineComponent } from 'vue';

	const component: DefineComponent<any, any, any>;
	export default component;
}

// Декларация для ?use (использует SVG через элемент <use> для спрайтов)
declare module '*.svg?use' {
	import type { DefineComponent } from 'vue';

	const component: DefineComponent<any, any, any>;
	export default component;
}
