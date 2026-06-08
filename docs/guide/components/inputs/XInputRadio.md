# XInputRadio

Компонент `XInputRadio` представляет собой стилизованную радио-кнопку с поддержкой валидации и дополнительных функций.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputRadio.vue`

## Пропсы

| Название              | Тип                                                                                        | По умолчанию | Описание                                                                          |
|:----------------------|:-------------------------------------------------------------------------------------------|--------------|:----------------------------------------------------------------------------------|
| id                    | `string`                                                                                   | -            | Уникальный идентификатор радио-кнопки. Если не указан, генерируется автоматически |
| label                 | `string`                                                                                   | -            | Текст лейбла радио-кнопки                                                         |
| name                  | `string`                                                                                   | -            | Имя радио-кнопки в форме                                                          |
| title                 | `string`                                                                                   | -            | Всплывающая подсказка                                                             |
| required              | `boolean`                                                                                  | `false`      | Флаг обязательности радио-кнопки                                                  |
| disabled              | `boolean`                                                                                  | `false`      | Флаг отключения радио-кнопки                                                      |
| readonly              | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                            |
| errors                | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                           |
| text                  | `string`                                                                                   | -            | Текст, отображаемый рядом с радио-кнопкой                                         |
| valueProp<sup>*</sup> | `string`,<br>`number`                                                                      | -            | Значение радио-кнопки                                                             |

<sup>* - обязательный пропс</sup>

## Слоты

| Название | Описание                                                         | Параметры                              |
|:---------|:-----------------------------------------------------------------|----------------------------------------|
| label    | Кастомизация содержимого лейбла                                  | `labelValue` - Значение пропса `label` |
| action   | Дополнительный слот рядом с радио-кнопкой (например, для иконки) | -                                      |

## v-model

Поддерживаются значения типа `string | number`.

## Использование

```vue
<script setup lang="ts">
import XInputRadio from '@/app/shared/components/inputs/XInputRadio.vue';
import { ref } from 'vue';

const options = [
	{ text: 'Вариант 1', value: 1 },
	{ text: 'Вариант 2', value: 2 },
	{ text: 'Вариант 3', value: 3 },
];

const selectedOption = ref();
</script>

<template>
	<XInputRadio
		v-for="option in options"
		:key="option.value"
		v-model="selectedOption"
		:value-prop="option.value"
		:text="option.text"
		name="optionsGroup"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputRadio.vue)
