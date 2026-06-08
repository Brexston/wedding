import type { SmartCaptchaCallback } from '@app/shared/captcha/providers/yacaptcha/yacaptcha.provider.types';

const CONTAINER_ID = 'captcha-container';
const callbacks: SmartCaptchaCallback[] = [];
let captchaPromiseReject: ((reason?: string) => void) | null = null;

function ensureContainer() {
	if (!document.getElementById(CONTAINER_ID)) {
		const div = document.createElement('div');
		div.id = CONTAINER_ID;
		div.style.display = 'none';
		document.body.appendChild(div);
	}
}

export function initYacaptcha(captchaKey: string) {
	ensureContainer();

	window.onLoadYacaptcha = () => {
		if (!window.smartCaptcha)
			return;

		const widgetId = window.smartCaptcha.render(CONTAINER_ID, {
			sitekey: captchaKey,
			invisible: true,
			hideShield: true,
			test: true,
			callback: (token) => {
				while (callbacks.length)
					callbacks.shift()?.(token);
			},
		});

		window.smartCaptcha.subscribe(
			widgetId,
			'challenge-hidden',
			() => {
				if (captchaPromiseReject)
					captchaPromiseReject('Проверка SmartCaptcha не пройдена');
			},
		);
	};

	const scriptElement = document.createElement('script');
	scriptElement.src = 'https://smartcaptcha.cloud.yandex.ru/captcha.js?onload=onLoadYacaptcha&render=onload';
	scriptElement.defer = true;
	scriptElement.onerror = () => console.error('Ошибка загрузки скрипта SmartCaptcha');
	document.head.appendChild(scriptElement);
}

export async function getYacaptchaToken(): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!window.smartCaptcha)
			reject(new Error('SmartCaptcha не инициализирована'));

		captchaPromiseReject = reject;
		callbacks.push((token) => {
			resolve(token);
		});

		window.smartCaptcha?.reset();
		window.smartCaptcha?.execute();
	});
}
