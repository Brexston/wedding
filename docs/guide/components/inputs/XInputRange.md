# XInputRange

Компонент `XInputRange` представляет собой двойной слайдер для выбора диапазона значений или одиночного значения с
возможностью ввода чисел вручную. Построен на базе библиотеки [@vueform/slider](https://github.com/vueform/slider).

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputRange.vue`

## Пропсы

| Название        | Тип                                                                                        | По умолчанию | Описание                                                                      |
|:----------------|:-------------------------------------------------------------------------------------------|--------------|:------------------------------------------------------------------------------|
| id              | `string`                                                                                   | -            | Уникальный идентификатор слайдера. Если не указан, генерируется автоматически |
| label           | `string`                                                                                   | -            | Текст лейбла слайдера                                                         |
| name            | `string`                                                                                   | -            | Имя слайдера в форме                                                          |
| title           | `string`                                                                                   | -            | Всплывающая подсказка                                                         |
| required        | `boolean`                                                                                  | `false`      | Флаг обязательности слайдера                                                  |
| disabled        | `boolean`                                                                                  | `false`      | Флаг отключения слайдера                                                      |
| readonly        | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                        |
| errors          | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                       |
| min             | `number`                                                                                   | `0`          | Минимальное значение диапазона                                                |
| max             | `number`                                                                                   | `100`        | Максимальное значение диапазона                                               |
| step            | `number`                                                                                   | `1`          | Шаг изменения значений                                                        |
| tooltips        | `boolean`                                                                                  | -            | Показывать подсказки со значениями                                            |
| tooltipMerge    | `number`                                                                                   | `-1`         | Порог слияния подсказок (в пикселях)                                          |
| tooltipFormat   | [`TooltipFormat`](#tooltipformat)                                                          | -            | Форматирование значений в подсказках                                          |
| tooltipPosition | `'top'`,<br>`'bottom'`,<br>`'left'`,<br>`'right'`                                          | `'bottom'`   | Позиция подсказок                                                             |
| suffix          | `string`                                                                                   | `''`         | Суффикс для числовых значений                                                 |
| mask            | [`MaskOptions`](https://beholdr.github.io/maska/v3/#/options?id=mask-options)              | -            | Маска для ввода чисел                                                         |

### Тип TooltipFormat {#tooltipformat}

```ts
type TooltipFormat =
	((value: number) => string | number)
	| FormatTooltipsObject;

interface FormatTooltipsObject {
	suffix?: string;
	decimals?: number;
	thousands?: string;
}
```

## Слоты

| Название   | Описание                                                      | Параметры                              |
|:-----------|:--------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                               | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом со слайдером (например, для иконки) | -                                      |

## v-model

Поддерживаются значения типа:

- Для одиночного значения: `number`
- Для диапазона: `[number, number]`

## Использование

Одиночное значение:

```vue
<script setup lang="ts">
import XInputRange from '@/app/shared/components/inputs/XInputRange.vue';
import { ref } from 'vue';

const discount = ref(0);
</script>

<template>
	<XInputRange
		v-model="discount"
		label="Скидка"
		:min="0"
		:max="100"
		:step="5"
		suffix="%"
	/>
</template>
```

Диапазон значений:

```vue
<script setup lang="ts">
import XInputRange from '@/app/shared/components/inputs/XInputRange.vue';
import { ref } from 'vue';

const priceRange = ref([0, 10000]);
</script>

<template>
	<XInputRange
		v-model="priceRange"
		label="Цена"
		:min="0"
		:max="10000"
		:step="100"
		suffix="₽"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputRange.vue)
- [@vueform/slider](https://github.com/vueform/slider)
