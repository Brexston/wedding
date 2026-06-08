declare global {
	interface Window {
		smartCaptcha?: SmartCaptchaInstance;
		onLoadYacaptcha?: () => void;
	}
}

type WidgetId = number;

type SmartCaptchaRenderFn = (
	// Контейнер для виджета. Можно передать DOM-элемент или идентификатор контейнера.
	container: HTMLElement | string,
	// Объект с параметрами для капчи
	params: {
		// Ключ клиентской части.
		sitekey: string;
		// Функция-обработчик.
		callback?: (token: string) => void;
		// Язык виджета
		hl?: 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr';
		// Включение работы капчи в режиме тестирования. Пользователь всегда будет получать задание.
		// Используйте это свойство только для отладки и тестирования.
		test?: boolean;
		// Запуск капчи в WebView. Используется для повышения точности оценки пользователей при добавлении
		// капчи в мобильные приложения с помощью WebView.
		webview?: boolean;
		// Невидимая капча.
		invisible?: boolean;
		// Расположение блока с уведомлением об обработке данных.
		shieldPosition?: `top-left` | `center-left` | `bottom-left` | `top-right` | `center-right` | `bottom-right`;
		// Скрыть блок с уведомлением об обработке данных.
		hideShield?: boolean;
	},
) => WidgetId;

// Аргумент widgetId — уникальный идентификатор виджета.
// Если аргумент не передан, будет использован первый отрисованный виджет.
type SmartCaptchaGetResponseFn = (widgetId?: WidgetId) => string;
type SmartCaptchaExecuteFn = (widgetId?: WidgetId) => void;
type SmartCaptchaResetFn = (widgetId?: WidgetId) => void;
type SmartCaptchaDestroyFn = (widgetId?: WidgetId) => void;

type SmartCaptchaSubscribeFn = (
	widgetId: WidgetId,
	event: 'challenge-visible' | 'challenge-hidden' | 'network-error' | 'javascript-error' | 'success' | 'token-expired',
	callback: () => void,
) => () => void;

export interface SmartCaptchaInstance {
	// Метод render служит для отрисовки виджета.
	render: SmartCaptchaRenderFn;
	// Метод getResponse возвращает текущее значение токена пользователя.
	getResponse: SmartCaptchaGetResponseFn;
	// Метод execute запускает проверку пользователя. Используется, чтобы начать проверку
	// невидимой капчи при каком-то событии, например, при нажатии на кнопку отправки формы аутентификации.
	execute: SmartCaptchaExecuteFn;
	// Метод reset сбрасывает состояние виджета до начального.
	reset: SmartCaptchaResetFn;
	// Метод destroy удаляет виджет и созданные им обработчики.
	destroy: SmartCaptchaDestroyFn;
	// Метод subscribe позволяет подписывать обработчики на определенные события виджета.
	subscribe: SmartCaptchaSubscribeFn;
}

export type SmartCaptchaCallback = (token: string) => void;
