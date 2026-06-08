import type { AxiosInstance } from 'axios';
import { requestInterceptors } from '@app/shared/api/interceptors/api.interceptors.request';
import { responseInterceptors } from '@app/shared/api/interceptors/api.interceptors.response';

export function registerInterceptors(instance: AxiosInstance) {
	// request
	requestInterceptors.forEach((interceptor) => {
		instance.interceptors.request.use(interceptor);
	});

	// response
	const [successInterceptor, errorInterceptor] = responseInterceptors;
	instance.interceptors.response.use(successInterceptor, errorInterceptor);
}
