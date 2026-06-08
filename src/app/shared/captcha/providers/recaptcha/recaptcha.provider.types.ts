declare global {
	interface Window {
		grecaptcha?: ReCaptchaInstance;
		captchaOnLoad?: () => void;
	}
}

export interface ReCaptchaExecuteOptions {
	action: string;
}

export interface ReCaptchaRenderOptions {
	sitekey: string;
	size: 'invisible';
}

export interface ReCaptchaInstance {
	ready: (cb: () => unknown) => void;
	execute: (siteKey: string, options?: ReCaptchaExecuteOptions) => Promise<string>;
	render: (id: string, options: ReCaptchaRenderOptions) => unknown;
}
