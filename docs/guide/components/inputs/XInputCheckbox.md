# XInputCheckbox

Компонент `XInputCheckbox` представляет собой стилизованный чекбокс с поддержкой всех основных функций, включая валидацию
и различные состояния.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputCheckbox.vue`

## Пропсы

| Название | Тип                                                                                        | По умолчанию | Описание                                                                      |
|:---------|:-------------------------------------------------------------------------------------------|--------------|:------------------------------------------------------------------------------|
| id       | `string`                                                                                   | -            | Уникальный идентификатор чекбокса. Если не указан, генерируется автоматически |
| label    | `string`                                                                                   | -            | Текст лейбла чекбокса                                                         |
| name     | `string`                                                                                   | -            | Имя чекбокса в форме                                                          |
| title    | `string`                                                                                   | -            | Всплывающая подсказка                                                         |
| required | `boolean`                                                                                  | `false`      | Флаг обязательности чекбокса                                                  |
| disabled | `boolean`                                                                                  | `false`      | Флаг отключения чекбокса                                                      |
| readonly | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                        |
| errors   | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                       |
| text     | `string`                                                                                   | -            | Текст, отображаемый рядом с чекбоксом                                         |

## Слоты

| Название | Описание                                                     | Параметры                              |
|:---------|:-------------------------------------------------------------|----------------------------------------|
| label    | Кастомизация содержимого лейбла                              | `labelValue` - Значение пропса `label` |
| action   | Дополнительный слот рядом с чекбоксом (например, для иконки) | -                                      |

## v-model

Поддерживаются значения типа `boolean`.

## Использование

```vue
<script setup lang="ts">
import XInputCheckbox from '@/app/shared/components/inputs/XInputCheckbox.vue';
import { ref } from 'vue';

const agree = ref(false);
</script>

<template>
	<XInputCheckbox
		v-model="agree"
		text="Я согласен с условиями пользовательского соглашения"
		required
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputCheckbox.vue)
