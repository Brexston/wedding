# XInputSwitch

Компонент `XInputSwitch` представляет собой стилизованный переключатель (toggle) с возможностью кастомизации значений и
меток. Построен на базе библиотеки [@vueform/toggle](https://github.com/vueform/toggle).

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputSwitch.vue`

## Пропсы

| Название   | Тип                                                                                        | По умолчанию | Описание                                                                      |
|:-----------|:-------------------------------------------------------------------------------------------|--------------|:------------------------------------------------------------------------------|
| id         | `string`                                                                                   | -            | Уникальный идентификатор элемента. Если не указан, генерируется автоматически |
| label      | `string`                                                                                   | -            | Текст лейбла элемента                                                         |
| name       | `string`                                                                                   | -            | Имя элемента в форме                                                          |
| required   | `boolean`                                                                                  | `false`      | Флаг обязательности элемента                                                  |
| disabled   | `boolean`                                                                                  | `false`      | Флаг отключения элемента                                                      |
| errors     | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                       |
| trueValue  | `string`,<br>`number`,<br>`boolean`                                                        | `true`       | Значение при включенном состоянии                                             |
| falseValue | `string`,<br>`number`,<br>`boolean`                                                        | `false`      | Значение при выключенном состоянии                                            |
| onLabel    | `string`                                                                                   | -            | Текст заголовка для включенного состояния                                     |
| offLabel   | `string`                                                                                   | -            | Текст заголовка для выключенного состояния                                    |

## Слоты

| Название   | Описание                                                           | Параметры                              |
|:-----------|:-------------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                                    | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с элементом ввода (например, для иконки) | -                                      |

## v-model

Поддерживаются значения типа `boolean` (по умолчанию), `string` или `number`.

## Использование

Базовое использование:

```vue
<script setup lang="ts">
import XInputSwitch from '@/app/shared/components/inputs/XInputSwitch.vue';
import { ref } from 'vue';

const enabled = ref(false);
</script>

<template>
	<XInputSwitch
		v-model="enabled"
		label="Уведомления"
		on-label="Вкл"
		off-label="Выкл"
	/>
</template>
```

С кастомными значениями:

```vue
<script setup lang="ts">
import XInputSwitch from '@/app/shared/components/inputs/XInputSwitch.vue';
import { ref } from 'vue';

const status = ref<'active' | 'inactive'>('inactive');
</script>

<template>
	<XInputSwitch
		v-model="status"
		label="Статус"
		true-value="active"
		false-value="inactive"
		on-label="Активно"
		off-label="Неактивно"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputSwitch.vue)
- [@vueform/toggle](https://github.com/vueform/toggle)
