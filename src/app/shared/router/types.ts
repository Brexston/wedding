export const routeNames = {
	MAIN_PAGE: 'MainView',
	AUTH_PAGE: 'AuthView',
	REGISTER_PAGE: 'RegisterView',
} as const;
export type RouteNames = (typeof routeNames)[keyof typeof routeNames];

export const layoutNames = {
	MAIN_LAYOUT: 'MainLayout',
	AUTH_LAYOUT: 'AuthLayout',
} as const;
export type BaseLayouts = (typeof layoutNames)[keyof typeof layoutNames];
