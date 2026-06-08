# Работа с API

В проекте реализован модуль `api`, построенный на базе [axios](https://axios-http.com/ru/docs/intro) и дополненный
кастомными параметрами, упрощающими работу с запросами.

Расположение: `src/app/shared/api`

## Конфигурация

Каждый запрос может принимать объект с дополнительными опциями:

| Название       | Тип                       | По умолчанию | Описание                                                                                                                                                                |
|:---------------|:--------------------------|--------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| internal       | `boolean`                 | `false`      | Использование `'/api-internal/'` в качестве [`baseURL`](https://axios-http.com/docs/config_defaults) запроса. Необходимо для запросов, связанных с авторизацией         |
| apiVersion     | `'v1'`,<br>`string`       | -            | Добавляет версию API к [`baseURL`](https://axios-http.com/docs/config_defaults), например `'/api/v1/'`                                                                  |
| csrf           | `boolean`                 | `true`       | Автоматическая отправка CSRF-токена в заголовке запроса                                                                                                                 |
| captcha        | `boolean`                 | `false`      | Перед запросом выполняется проверка капчи, Captcha-токен добавляется в заголовки                                                                                        |
| dataType       | `'FormData'`,<br>`'JSON'` | `'FormData'` | Определяет формат отправки данных (`FormData` или JSON)                                                                                                                 |
| errorToast     | `boolean`                 | `true`       | Показывает toast-уведомление с текстом ошибки из ответа сервера                                                                                                         |
| key            | `string`                  | -            | Ключ для регистрации запроса в `useApiStore`. Используется для отслеживания состояния, автоматического снятия состояния загрузки и отмены запросов                       |
| cancelPrevious | `boolean`                 | `false`      | При запуске нового запроса с тем же `key` отменяет предыдущие активные запросы по этому ключу. Работает только вместе с `key`                                           |

Все дефолтные значения задаются в конфигурации: `src/app/shared/api/api.ts`

### Примеры использования опций

```ts
import { api } from '@app/shared/api/api';

// Использование internal
await api.get('/user', { internal: true });

// Версия API
await api.get('/catalog', { apiVersion: 'v1' });

// Отключение CSRF
await api.post('/form', data, { csrf: false });

// Включение капчи
await api.post('/feedback', data, { captcha: true });

// Отправка в формате JSON
await api.post('/profile', data, { dataType: 'JSON' });

// Отключение ошибок в toast
await api.get('/unstable-endpoint', { errorToast: false });

// Отслеживание загрузки
await api.get('/products', { key: 'PRODUCTS_LIST' });

// Отмена предыдущего активного запроса с таким же key
await api.get('/search', { key: 'SEARCH', cancelPrevious: true });
```

## Правила организации

Для каждого модуля создаётся папка `api`:

1. **Файл с запросами** — `moduleName/api/moduleName.api.ts`  
   Содержит функции-запросы для конкретного модуля.
2. **Файл с типами для запросов** — `moduleName/api/moduleName.api.types.ts`  
   Описывает интерфейсы и типы для параметров и ответов API.
3. **Разделение ответственности:**
	- `*.api.ts` — только код запросов.
	- `*.api.types.ts` — только типы данных.
	- Общие типы, не относящиеся к API, выносятся отдельно (`.types.ts` или `store/*.store.types.ts`).

## Создание объекта

Все запросы должны быть сгруппированы в объект по модулю.
`endpoint` хранится в отдельной переменной рядом с объектом.

```ts [foo.api.ts]
const endpoint = 'foo';

export const fooApi = {
	// здесь будут запросы
};
```

## Создание запросов

Пример модуля с GET и POST-запросами.

::: code-group

```ts [foo.api.ts]
import type { CreateFooPayload, CreateFooResponse, FooResponse } from '@app/modules/foo/api/foo.api.types';
import type { BaseResponse } from '@app/shared/api/api.types';
import { api } from '@app/shared/api/api';

const endpoint = 'foo';

export const fooApi = {
	async requestFoo(): Promise<BaseResponse<FooResponse>> {
		const response = await api.get(`${endpoint}`);
		return response.data;
	},

	async requestCreateFoo(data: CreateFooPayload): Promise<BaseResponse<CreateFooResponse>> {
		const response = await api.post(`${endpoint}/create`, data);
		return response.data;
	},
};
```

```ts [foo.api.types.ts]
export interface FooResponse {
	id: number;
	bar: string;
}

export interface CreateFooPayload {
	bar: string;
}

export interface CreateFooResponse {
	id: number;
	bar: string;
}
```

:::

## Использование запросов

::: code-group

```vue [LoadFooButton.vue]
<script setup lang="ts">
import { fooApi } from '@app/modules/foo/api/foo.api';

async function onClick() {
	const response = await fooApi.requestFoo();

	if (response.success)
		console.log(response.data);
}
</script>

<template>
	<button @click="onClick">Загрузить</button>
</template>
```

```vue [CreateFooForm.vue]

<script setup lang="ts">
import { fooApi } from '@app/modules/foo/api/foo.api';
import { reactive } from 'vue';

const formData = reactive({
	bar: '',
});

async function onSubmit() {
	const response = await fooApi.requestCreateFoo(formData);

	if (response.success)
		console.log(response.data);
}
</script>

<template>
	<form @submit.prevent="onSubmit">
		<input v-model="formData.bar" type="text"/>
		<button type="submit">Создать</button>
	</form>
</template>
```

:::

## Отслеживание загрузки

Для отслеживания состояния загрузки можно использовать `key` в опциях запроса.
Ключи удобно хранить в отдельном объекте:

```ts [foo.api.ts]
import type { CreateFooPayload, CreateFooResponse, FooResponse } from '@app/modules/foo/api/foo.api.types';
import type { BaseResponse } from '@app/shared/api/api.types';
import { api } from '@app/shared/api/api';

export const FooApiKeys = { // [!code focus]
	FOO: 'requestFoo', // [!code focus]
	CREATE_FOO: 'requestCreateFoo', // [!code focus]
} as const; // [!code focus]

const endpoint = 'foo';

export const fooApi = {
	async requestFoo(): Promise<BaseResponse<FooResponse>> {
		const response = await api.get(
			`${endpoint}`,
			{ key: FooApiKeys.FOO }, // [!code focus]
		);
		return response.data;
	},

	async requestCreateFoo(data: CreateFooPayload): Promise<BaseResponse<CreateFooResponse>> {
		const response = await api.post(
			`${endpoint}/create`,
			data,
			{ key: FooApiKeys.CREATE_FOO }, // [!code focus]
		);
		return response.data;
	},
};
```

Использование в компоненте:

```vue [GET]

<script setup lang="ts">
import { fooApi, FooApiKeys } from '@app/modules/foo/api/foo.api';
import { useApiStore } from '@app/shared/stores/api.store';
import { computed } from 'vue';

const { isPending } = useApiStore(); // [!code focus]
const isLoading = computed(() => isPending(FooApiKeys.FOO)); // [!code focus]

async function onClick() {
	const response = await fooApi.requestFoo();

	if (response.success)
		console.log(response.data);
}
</script>

<template>
	<button :loading="isLoading" @click="onClick">Загрузить</button> <!-- [!code focus] -->
</template>
```

::: tip Примечание

Чтобы отследить несколько запросов, нужно передать массив ключей, в таком случае вернётся `true` если хотя бы один из запросов выполняется:
```ts
isPending([FooApiKeys.FOO, FooApiKeys.CREATE_FOO])
```

:::

Если одновременно выполняется несколько запросов с одинаковым `key`, `useApiStore` хранит их как отдельные записи с уникальными `id`.
Состояние `isPending(key)` останется `true`, пока не завершатся все активные запросы по этому ключу.

## Отмена запросов

Запросы, у которых указан `key`, автоматически регистрируются в `useApiStore` и получают `AbortController`.
Это позволяет отменять конкретную группу запросов или все активные запросы сразу.

```ts
import { useApiStore } from '@app/shared/stores/api.store';

const { abortRequest, abortAllRequests } = useApiStore();

// Отменить все активные запросы с указанным key
abortRequest(FooApiKeys.FOO);

// Отменить все зарегистрированные запросы
abortAllRequests();
```

Чтобы при запуске нового запроса автоматически отменить предыдущие активные запросы с тем же `key`, используйте опцию `cancelPrevious`:

```ts [foo.api.ts]
async requestSearch(params: SearchParams): Promise<BaseResponse<SearchResponse>> {
	const response = await api.get(
		`${endpoint}/search`,
		{
			params,
			key: FooApiKeys.SEARCH,
			cancelPrevious: true,
		},
	);

	return response.data;
}
```

::: tip Примечание

`cancelPrevious` удобно использовать для поиска, фильтров и других запросов, которые могут быстро запускаться повторно.
В таких сценариях старый ответ уже не нужен, а отмена защищает интерфейс от гонок между устаревшим и актуальным запросом.
Отменённый запрос отклоняет `Promise`, поэтому при необходимости его нужно обработать в вызывающем коде.

:::

## Сохранение ответа

Если необходимо сохранить ответ сервера, то следует продублировать нужный запрос в сторе модуля и сохранить его ответ там:

::: code-group

```ts [foo.store.ts]
import { defineStore } from 'pinia';
import { FooResponse } from '@app/modules/foo/api/foo.api.types';
import { fooApi } from '@app/modules/foo/api/foo.api';
import { ref } from 'vue';

export const useFooStore = defineStore('foo', () => {
	const foo = ref<FooResponse | null>(null);
	
	async function requestFoo() {
		const response = await fooApi.requestFoo();
		if (response.data)
			foo.value = response.data;
		
		return response;
	}
	
	return {
		foo,
		requestFoo,
	}
});
```
```vue [LoadFooButton.vue]
<script setup lang="ts">
import { useFooStore } from '@app/modules/foo/store/foo.store';
import { storeToRefs } from 'pinia';

const { requestFoo } = useFooStore();
const { foo } = storeToRefs(useFooStore());

async function onClick() {
	const response = await requestFoo();
	
	if (response.success)
		console.log(response.data);
}
</script>

<template>
	{{ foo.bar }}
	<button @click="onClick">Загрузить</button>
</template>
```
:::

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/api/api.ts)
- [axios](https://axios-http.com/ru/docs/intro)
