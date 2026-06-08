import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		id?: ReturnType<typeof crypto.randomUUID>;
		key?: string;
		apiVersion?: 'v1' | string & {};
		dataType?: 'FormData' | 'JSON';
		internal?: boolean;
		csrf?: boolean;
		captcha?: boolean;
		cancelPrevious?: boolean;
		errorToast?: boolean;
	}
}
