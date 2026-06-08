import type { Middleware } from '@app/shared/router/middleware/types.ts';
import type { RouteNames } from '@app/shared/router/types.ts';
import { useUserStore } from '@app/modules/user/store/user.store.ts';
import { routeNames } from '@app/shared/router/types.ts';
import { storeToRefs } from 'pinia';

const isLogouted: Middleware = async ({ from, next, abort }) => {
	const publicRoutes: RouteNames[] = [routeNames.REGISTER_PAGE, routeNames.AUTH_PAGE];

	if (
		from.meta.loginFailed
		|| (from.name && publicRoutes.includes(from.name as RouteNames))
	) {
		next();
		return;
	}

	const { requestUser } = useUserStore();
	const { isLoggedIn } = storeToRefs(useUserStore());

	if (isLoggedIn) {
		abort({ name: routeNames.MAIN_PAGE });
	}
	else {
		const request = await requestUser();
		if (request.success) {
			abort({ name: routeNames.MAIN_PAGE });
		}
		else {
			next();
		}
	}
};

export default isLogouted;
