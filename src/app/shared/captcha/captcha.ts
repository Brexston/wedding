import { useBaseStore } from '@app/shared/stores/base.store';

export async function initCaptcha() {
	const { captcha } = useBaseStore();

	switch (captcha.type) {
		case 'recaptcha': {
			const { initRecaptcha } = await import('@app/shared/captcha/providers/recaptcha/recaptcha.provider');
			return initRecaptcha(captcha.key);
		}
		case 'yacaptcha': {
			const { initYacaptcha } = await import('@app/shared/captcha/providers/yacaptcha/yacaptcha.provider');
			return initYacaptcha(captcha.key);
		}
	}
}

export async function getCaptchaToken(action: string) {
	const { captcha } = useBaseStore();

	switch (captcha.type) {
		case 'recaptcha': {
			const { getRecaptchaToken } = await import('@app/shared/captcha/providers/recaptcha/recaptcha.provider');
			return getRecaptchaToken(captcha.key, action);
		}
		case 'yacaptcha': {
			const { getYacaptchaToken } = await import('@app/shared/captcha/providers/yacaptcha/yacaptcha.provider');
			return getYacaptchaToken();
		}
	}
}
