export function initRecaptcha(captchaKey: string) {
	const script = document.createElement('script');
	script.src = `https://www.google.com/recaptcha/api.js?render=${captchaKey}`;
	script.async = true;
	script.defer = true;
	script.onerror = () => {
		console.error('Error load recaptcha script');
	};
	document.head.appendChild(script);
}

export async function getRecaptchaToken(captchaKey: string, action: string) {
	if (!window.grecaptcha)
		return '';

	let result = '';

	try {
		result = await window.grecaptcha.execute(captchaKey, { action }) || '';
	}
	catch (e) {
		console.error('Error getting reCAPTCHA token:', e);
	}

	return result;
}
