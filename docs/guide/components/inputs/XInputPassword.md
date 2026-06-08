# XInputPassword

Компонент `XInputPassword` представляет собой поле ввода пароля с возможностью переключения видимости введенного текста.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputPassword.vue`

## Пропсы

| Название     | Тип                                                                                        | По умолчанию       | Описание                                                                    |
|:-------------|:-------------------------------------------------------------------------------------------|--------------------|:----------------------------------------------------------------------------|
| id           | `string`                                                                                   | -                  | Уникальный идентификатор инпута. Если не указан, генерируется автоматически |
| label        | `string`                                                                                   | -                  | Текст лейбла инпута                                                         |
| placeholder  | `string`                                                                                   | -                  | Подсказка внутри инпута (атрибут `placeholder`)                             |
| name         | `string`                                                                                   | -                  | Имя инпута в форме                                                          |
| title        | `string`                                                                                   | -                  | Всплывающая подсказка                                                       |
| required     | `boolean`                                                                                  | `false`            | Флаг обязательности инпута                                                  |
| disabled     | `boolean`                                                                                  | `false`            | Флаг отключения инпута                                                      |
| readonly     | `boolean`                                                                                  | `false`            | Флаг только для чтения                                                      |
| errors       | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -                  | Массив ошибок валидации                                                     |
| autocomplete | [`PasswordAutocompleteTypes`](#passautocomplete)                                           | `current-password` | Тип автозаполнения инпута                                                   |

### Тип PasswordAutocompleteTypes {#passautocomplete}

Поддерживаемые значения для автозаполнения пароля (
см. [HTML attribute: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)):

```ts
export type PasswordAutocompleteTypes =
	'on' |
	'new-password' |
	'current-password' |
	'off'
;
```

## Слоты

| Название   | Описание                                                       | Параметры                              |
|:-----------|:---------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с полем ввода (например, для иконки) | –                                      |
| underInput | Слот под полем ввода для дополнительного контента              | –                                      |

## v-model

Поддерживаются значения типа `string | number`.

## Использование

```vue
<script setup lang="ts">
import XInputPassword from '@/app/shared/components/inputs/XInputPassword.vue';
import { ref } from 'vue';

const password = ref('');
</script>

<template>
	<XInputPassword
		v-model="password"
		label="Пароль"
		placeholder="Введите пароль"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputPassword.vue)
