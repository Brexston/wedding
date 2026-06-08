# XInputTextarea

Компонент `XInputTextarea` представляет собой многострочное текстовое поле ввода с поддержкой валидации и базовых функций
текстовых областей.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputTextarea.vue`

## Пропсы

| Название    | Тип                                                                                        | По умолчанию | Описание                                                                  |
|:------------|:-------------------------------------------------------------------------------------------|--------------|:--------------------------------------------------------------------------|
| id          | `string`                                                                                   | -            | Уникальный идентификатор поля. Если не указан, генерируется автоматически |
| label       | `string`                                                                                   | -            | Текст лейбла поля                                                         |
| placeholder | `string`                                                                                   | -            | Подсказка внутри поля (атрибут `placeholder`)                             |
| name        | `string`                                                                                   | -            | Имя поля в форме                                                          |
| title       | `string`                                                                                   | -            | Всплывающая подсказка                                                     |
| required    | `boolean`                                                                                  | `false`      | Флаг обязательности поля                                                  |
| disabled    | `boolean`                                                                                  | `false`      | Флаг отключения поля                                                      |
| readonly    | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                    |
| errors      | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                   |

## Слоты

| Название   | Описание                                                       | Параметры                              |
|:-----------|:---------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с полем ввода (например, для иконки) | –                                      |

## v-model

Поддерживаются значения типа `string`.

## Использование

```vue
<script setup lang="ts">
import XInputTextarea from '@/app/shared/components/inputs/XInputTextarea.vue';
import { ref } from 'vue';

const review = ref('');
</script>

<template>
	<XInputTextarea
		v-model="review"
		label="Отзыв"
		placeholder="Оставьте отзыв"
		required
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputTextarea.vue)
