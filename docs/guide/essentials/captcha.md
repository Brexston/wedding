# Captcha

Модуль для работы с капчей.

Расположение: `src/app/shared/captcha`

## Конфигурация

Бэкенд-разработчик должен передать в пропсы компонента `RootComponent.vue` объект типа `CaptchaConfig`:

```ts
export interface CaptchaConfig {
	key: string;
	type: 'recaptcha' | 'yacaptcha';
}
```

где `key` — ключ клиентской части, а `type` — тип капчи.

:::info Модуль поддерживает два типа капчи:
`recaptcha` — Google ReCAPTCHA  
`yacaptcha` — Yandex SmartCaptcha
:::

Затем этот объект сохраняется в `base.store` шаблона и уже через стор используется в самом модуле.

## Подключение

Для подключения капчи в `RootComponent.vue` необходимо 
вызвать метод `initCaptcha` после монтирования компонента.

```vue
<script setup lang="ts">
import { initCaptcha } from '@app/shared/captcha/captcha';
import { onMounted } from 'vue';

onMounted(() => {
	initCaptcha();
});
</script>
```

## Использование в запросах

Капча интегрирована в api-клиент через запросный интерсептор.
Чтобы включить её для конкретного запроса, в конфиге нужно указать свойство `captcha: true`:

```ts
api.post(`${this.endpoint}/contact/`, body, { captcha: true });
```

В этом случае перед отправкой запроса будет вызван метод `getCaptchaToken`, 
а токен автоматически добавится в заголовки:

```http
X-Captcha-Token: <token>
```

## Внутреннее устройство

Модуль устроен по провайдерному принципу:

- `captcha.ts` — единая точка входа. Определяет, какой провайдер использовать (Google или Yandex).
- `providers/recaptcha` — провайдер Google reCAPTCHA v3.
- `providers/yacaptcha` — провайдер Яндекс SmartCaptcha.
- .`types.ts` файлы — декларации глобальных типов (`window.grecaptcha`, `window.smartCaptcha` и т. д.).

Каждый провайдер умеет:

- подключать внешний скрипт (`initXcaptcha`)
- запрашивать токен (`getXcaptchaToken`)

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/captcha)
- [Google reCAPTCHA](https://developers.google.com/recaptcha/docs/v3)
- [Yandex SmartCaptcha](https://yandex.cloud/ru/docs/smartcaptcha/quickstart)
