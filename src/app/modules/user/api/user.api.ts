import type { User } from '@app/modules/user/user.types';
import type { AuthPayload, ResetPasswordPayload, SignUpPayload } from '@/app/modules/user/api/user.api.types';
import type { BaseResponse } from '@/app/shared/api/api.types';
import { api } from '@app/shared/api/api';

export const UserApiKeys = {
	USER: 'requestUser',
	AUTH_USER: 'requestAuthUser',
	RESET_PASSWORD: 'requestResetPassword',
	SIGN_UP: 'requestSignUp',
} as const;

const endpoint = 'user';

export const userApi = {
	async requestUser(): Promise<BaseResponse<User>> {
		const response = await api.get(
			`${endpoint}/data`,
			{ key: UserApiKeys.USER },
		);
		return response.data;
	},

	async requestAuthUser(data: AuthPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/login`,
			data,
			{ key: UserApiKeys.AUTH_USER, internal: true, captcha: true },
		);
		return response.data;
	},

	async requestResetPassword(data: ResetPasswordPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/password/recovery`,
			data,
			{ key: UserApiKeys.RESET_PASSWORD, internal: true, captcha: true },
		);
		return response.data;
	},

	async requestSignUp(data: SignUpPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/register`,
			{ fields: { ...data } },
			{ key: UserApiKeys.SIGN_UP, internal: true, captcha: true },
		);
		return response.data;
	},
};
