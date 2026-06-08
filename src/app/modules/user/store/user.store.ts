import type { User } from '@app/modules/user/user.types';
import type { AuthPayload, ResetPasswordPayload, SignUpPayload } from '@/app/modules/user/api/user.api.types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { userApi } from '@/app/modules/user/api/user.api';

export const useUserStore = defineStore('user', () => {
	// State
	const isLoggedIn = ref<boolean>(false);
	const userData = ref<User | null>(null);

	// Getters
	const getUserId = computed<number | null>(() => userData.value?.id ?? null);

	// Actions
	async function requestUser() {
		const response = await userApi.requestUser();
		if (response.success)
			userData.value = response.data;

		return response;
	}

	async function requestAuthUser(data: AuthPayload) {
		const response = await userApi.requestAuthUser(data);
		return response;
	}

	async function requestResetPassword(data: ResetPasswordPayload) {
		const response = await userApi.requestResetPassword(data);
		return response;
	}

	async function requestSignUp(data: SignUpPayload) {
		const response = await userApi.requestSignUp(data);
		return response;
	}

	return {
		// State
		isLoggedIn,
		userData,

		// Getters
		getUserId,

		// Actions
		requestUser,
		requestAuthUser,
		requestResetPassword,
		requestSignUp,
	};
});
