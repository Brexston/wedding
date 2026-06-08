import type { CaptchaConfig } from '@app/shared/captcha/captcha.types';
import type { Docs } from '@app/shared/types/docs.types';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBaseStore = defineStore('base', () => {
	const { get: getCookie } = useCookies();

	// State
	const cookieConfirmed = ref(getCookie('cookieConfirmed') ?? 'N');
	const csrfToken = ref('');
	const captcha = ref<CaptchaConfig>({
		key: '',
		type: 'yacaptcha',
	});
	const docs = ref<Docs>({
		userAgreement: '',
		privacyPolicy: '',
	});

	// Getters
	const isCookieConfirmed = computed(() => cookieConfirmed.value === 'Y');

	return {
		// State
		cookieConfirmed,
		csrfToken,
		captcha,
		docs,

		// Getters
		isCookieConfirmed,
	};
});
