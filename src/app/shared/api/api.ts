import { registerInterceptors } from '@app/shared/api/interceptors/api.interceptors';
import axios from 'axios';

export const api = axios.create({
	baseURL: '/api/',
	timeout: 10000,
	adapter: 'fetch',

	dataType: 'FormData',
	internal: false,
	csrf: true,
	captcha: false,
	errorToast: true,
});

registerInterceptors(api);
