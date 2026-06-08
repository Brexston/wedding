import type { User } from '@app/modules/user/user.types';

export type RegisterPayload = Pick<User, 'name' | 'phone'>;

export type UpdatePayload = Omit<User, 'id' | 'active'>;

export interface AuthPayload {
	email: string;
	password: string;
}

export interface ResetPasswordPayload {
	email: string;
	code?: number | undefined;
	password?: string;
	confirm_password?: string;
}

export interface SignUpPayload {
	name: string;
	last_name: string;
	email: string;
	phone_number: string;
	password: string;
	confirm_password: string;
	phone_code?: string;
	email_code?: string;
}
