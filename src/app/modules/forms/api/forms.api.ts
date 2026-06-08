import type { ContactFormPayload, VacancyPayload } from '@/app/modules/forms/api/forms.api.types';
import type { BaseResponse } from '@/app/shared/api/api.types';
import { api } from '@app/shared/api/api';

export const FormsApyKeys = {
	CONTACT_FORM: 'requestContactForm',
	VACANCY_FORM: 'requestVacancyForm',
} as const;

const endpoint = 'form';

export const formsApi = {
	// Связаться с нами
	async requestContactForm(data: ContactFormPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/contact`,
			data,
			{ key: FormsApyKeys.CONTACT_FORM, captcha: true },
		);
		return response.data;
		// Убрать если бэк не присылает ошибки по полям
		// for test validation external results
		// return {
		// 	status: 'error',
		// 	success: false,
		// 	data: null,
		// 	message: 'Ошибка',
		// 	errors: [
		// 		{
		// 			code: 'name',
		// 			message: 'Некорректное имя',
		// 		},
		// 		{
		// 			code: 'phone',
		// 			message: 'Некорректный телефон',
		// 		},
		// 	],
		// };
	},

	// Откликнуться на вакансию
	async requestVacancyForm(data: VacancyPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/vacancy`,
			data,
			{ key: FormsApyKeys.VACANCY_FORM, captcha: true },
		);
		return response.data;
	},
};
