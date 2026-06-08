import type { UseFileInputFiles } from '@app/shared/composables/useFileInput';

// Связаться с нами
export interface ContactFormPayload {
	name: string;
	phone: string;
	comment?: string;
	agreement: boolean;
}

// Откликнуться на вакансию
export interface VacancyPayload {
	name: string;
	phone: string;
	email?: string;
	city?: number | null;
	price?: string;
	vacancy: number | null;
	file?: UseFileInputFiles;
	link?: string;
}
