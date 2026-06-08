# XInputText

Компонент `XInputText` представляет собой текстовое поле ввода с поддержкой различных типов ввода, валидации и
дополнительных функций.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputText.vue`

## Пропсы

| Название          | Тип                                                                                                                                               | По умолчанию | Описание                                                                    |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|--------------|:----------------------------------------------------------------------------|
| id                | `string`                                                                                                                                          | -            | Уникальный идентификатор инпута. Если не указан, генерируется автоматически |
| label             | `string`                                                                                                                                          | -            | Текст лейбла инпута                                                         |
| placeholder       | `string`                                                                                                                                          | -            | Подсказка внутри инпута (атрибут `placeholder`)                             |
| name              | `string`                                                                                                                                          | -            | Имя инпута в форме                                                          |
| title             | `string`                                                                                                                                          | -            | Всплывающая подсказка                                                       |
| required          | `boolean`                                                                                                                                         | `false`      | Флаг обязательности инпута                                                  |
| disabled          | `boolean`                                                                                                                                         | `false`      | Флаг отключения инпута                                                      |
| loading           | `boolean`                                                                                                                                         | `false`      | Флаг состояния загрузки                                                     |
| readonly          | `boolean`                                                                                                                                         | `false`      | Флаг только для чтения                                                      |
| errors            | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html)                                                                                                             | -            | Массив ошибок валидации                                                     |
| type              | `'text'`,<br>`'email'`,<br>`'tel'`,<br>`'numeric'`                                                                                                | `text`       | Тип инпута                                                                  |
| inputmode         | `'text'`,<br>`'email'`,<br>`'tel'`,<br>`'numeric'`,<br>`'url'`,<br>`'none'`,<br>`'decimal'`,<br>`'search'`                                        | `text`       | Тип инпута                                                                  |
| autocomplete      | [`AutoComplete`](#autocomplete)                                                                                                                             | `off`        | Тип автозаполнения инпута                                                   |
| unmaskAsNumber    | `boolean`                                                                                                                                         | `false`      | Преобразовывать вводимое значение в число                                   |
### Тип AutoComplete {#autocomplete}

Поддерживаемые значения для автозаполнения (см. [HTML attribute: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)):

```ts
export type AutoComplete =
	'on' |
	'sex' |
	'honorific-prefix' |
	'given-name' |
	'additional-name' |
	'family-name' |
	'nickname' |
	'email' |
	'username' |
	'new-password' |
	'current-password' |
	'one-time-code' |
	'organization-title' |
	'organization' |
	'street-address' |
	'address-level4' |
	'address-level3' |
	'address-level2' |
	'address-level1' |
	'country' |
	'country-name' |
	'postal-code' |
	'cc-name' |
	'cc-given-name' |
	'cc-additional-name' |
	'cc-family-name' |
	'cc-number' |
	'cc-exp' |
	'cc-exp-month' |
	'cc-exp-year' |
	'cc-csc' |
	'cc-type' |
	'transaction-amount' |
	'tel' |
	'tel-local' |
	'url' |
	'off'
;
```

## Слоты

| Название   | Описание                                                       | Параметры                              |
|:-----------|:---------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с полем ввода (например, для иконки) | -                                      |
| underInput | Слот под полем ввода для дополнительного контента              | -                                      |

## v-model

Поддерживаются значения типа `string | number`.

## Использование

Простой текстовый инпут:

```vue
<script setup lang="ts">
import XInputText from '@/app/shared/components/inputs/XInputText.vue';
import { ref } from 'vue';

const username = ref('');
</script>

<template>
	<XInputText
		v-model="username"
		label="Имя пользователя"
		placeholder="Введите ваш логин"
		required
		autocomplete="username"
	/>
</template>
```

Номер телефона:

```vue
<script setup lang="ts">
import XInputText from '@/app/shared/components/inputs/XInputText.vue';
import { phoneMask } from '@/app/shared/consts/masks';
import { ref } from 'vue';

const phone = ref();
</script>

<template>
	<XInputText
		v-model="phone"
		v-mask="phoneMask"
		label="Номер телефона"
		type="tel"
		autocomplete="tel"
	/>
</template>
```

Числовой:

```vue
<script setup lang="ts">
import XInputText from '@/app/shared/components/inputs/XInputText.vue';
import { integerMask } from '@/app/shared/consts/masks';
import { ref } from 'vue';

const age = ref();
</script>

<template>
	<XInputText
		v-model="age"
		v-mask="integerMask"
		label="Возраст"
		type="numeric"
		unmask-as-number
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputText.vue)
