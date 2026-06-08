import type { InternalAxiosRequestConfig } from 'axios';
import { getCaptchaToken } from '@app/shared/captcha/captcha';
import { useApiStore } from '@app/shared/stores/api.store';
import { useBaseStore } from '@app/shared/stores/base.store';
import { objectToFormData } from '@app/shared/utils/objectToFormData';

async function registerRequestInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
	if (!config.key)
		return config;

	const { registerRequest, unregisterRequest } = useApiStore();

	config = registerRequest(config);

	if (config.captcha) {
		try {
			config.headers['X-Captcha-Token'] = await getCaptchaToken(config.url || '');
		}
		catch (e) {
			if (config.key)
				unregisterRequest(config.key, config?.id);
			throw e;
		}
	}

	return config;
}

// Версия API
function apiVersionInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (!config.apiVersion || config.baseURL?.includes(config.apiVersion))
		return config;

	config.baseURL = `${config.baseURL + config.apiVersion}/`;

	return config;
}

// baseURL для авторизации
function internalUrlInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (config.internal)
		config.baseURL = '/api-internal/';
	return config;
}

// CSRF-токен
function csrfTokenInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (config.csrf) {
		const { csrfToken } = useBaseStore();
		config.headers['X-Bitrix-Csrf-Token'] = csrfToken;
	}
	return config;
}

// Преобразование данных в FormData
function dataTypeInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (
		config.method !== 'get'
		&& config.data
		&& config.dataType === 'FormData'
		&& !(config.data instanceof FormData)
	) {
		config.data = objectToFormData({ ...config.data });
	}

	return config;
}

export const requestInterceptors = [
	registerRequestInterceptor,
	apiVersionInterceptor,
	internalUrlInterceptor,
	csrfTokenInterceptor,
	dataTypeInterceptor,
];
