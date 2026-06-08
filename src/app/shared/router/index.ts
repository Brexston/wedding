import type { RouteRecordRaw } from 'vue-router';
import type { Middleware } from '@/app/shared/router/middleware/types';
import { createRouter, createWebHistory } from 'vue-router';
import middlewarePipeline from '@/app/shared/router/middleware/middlewarePipeline';

// import isLoggedIn from '@scripts/router/middleware/isLoggedIn';
// import isLogouted from '@scripts/router/middleware/isLogouted';
// import { layoutNames, routeNames } from '@scripts/router/types';

const routes: RouteRecordRaw[] = [
	// {
	// 	path: '/',
	// 	name: routeNames.MAIN_PAGE,
	// 	component: () => import('@/views/MainView.vue'),
	// 	meta: {
	// 		name: 'Главная',
	// 		middleware: [isLoggedIn],
	// 	},
	// },
	// {
	// 	path: '/auth/',
	// 	name: routeNames.AUTH_PAGE,
	// 	component: () => import('@/views/AuthView.vue'),
	// 	meta: {
	// 		name: 'Авторизация',
	// 		layout: layoutNames.AUTH_LAYOUT,
	// 		middleware: [isLogouted],
	// 	},
	// },
	// {
	// 	path: '/register/',
	// 	name: routeNames.REGISTER_PAGE,
	// 	component: () => import('@/views/RegisterView.vue'),
	// 	meta: {
	// 		name: 'Регистрация',
	// 		layout: layoutNames.AUTH_LAYOUT,
	// 		middleware: [isLogouted],
	// 	},
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeResolve((to, _, next) => {
	if (to.meta.name)
		document.title = to.meta.name;

	next();
});

router.beforeEach((to, from, next) => {
	const additionalMiddleware: Array<Middleware> = to.meta.middleware || [];
	const middlewares = [...additionalMiddleware];

	const context = {
		to,
		from,
		next,
		abort: next,
	};

	if (middlewares.length === 0 || !middlewares?.[0]) {
		next();
	}
	else {
		middlewares[0]({
			...context,
			next: middlewarePipeline(context, middlewares, 1),
		});
	}
});
export default router;
