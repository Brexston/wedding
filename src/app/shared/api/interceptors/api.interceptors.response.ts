import type { BaseResponse } from '@app/shared/api/api.types';
import type { AxiosError, AxiosResponse } from 'axios';
import { api } from '@app/shared/api/api';
import { useApiStore } from '@app/shared/stores/api.store';
import { useBaseStore } from '@app/shared/stores/base.store';
import { toastError } from '@app/shared/utils/toast';
import { storeToRefs } from 'pinia';

// Обработка успешного ответа
function successInterceptor<T>(response: AxiosResponse<BaseResponse<T>>): AxiosResponse<BaseResponse<T>> | Promise<AxiosResponse<BaseResponse<T>>> {
	if (!response.config.key)
		return response;

	const { unregisterRequest } = useApiStore();
	unregisterRequest(response.config.key, response.config?.id);

	return response;
}

// Обработка ошибок
function errorInterceptor(error: AxiosError<BaseResponse<null>>) {
	// Остановка загрузки
	if (error.config?.key) {
		const { unregisterRequest } = useApiStore();
		unregisterRequest(error.config.key, error.config?.id);
	}

	// Если ошибка CSRF-токена, то обновляем токен и повторяем запрос
	if (error.config && error.response?.data?.message === 'Invalid csrf token') {
		const { csrfToken } = storeToRefs(useBaseStore());

		const errors = error.response.data.errors;
		const newCsrfToken = errors?.[0]?.customData?.csrf;

		if (newCsrfToken) {
			csrfToken.value = String(newCsrfToken);
			error.config.headers['X-Bitrix-Csrf-Token'] = csrfToken.value;
			return api.request(error.config);
		}
	}

	// Обработка тайм-аута
	if ((error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') && error.message.includes('timeout')) {
		if (error.response?.config.errorToast)
			toastError('Время ожидания истекло. Попробуйте снова.');
		return Promise.reject(error);
	}

	if (!error.response)
		return Promise.reject(error);

	let message = error.response.data.message || error.message || '';
	if (error.response.config.errorToast && message) {
		message = message
			.replace(/<\/?br>/g, ' ')
			.replace(/\n/g, ' ')
			.trim();
		toastError(message);
	}

	return Promise.reject(error);
}

export const responseInterceptors: [typeof successInterceptor, typeof errorInterceptor] = [
	successInterceptor,
	errorInterceptor,
];
