# XInputDate

Компонент `XInputDate` представляет собой календарь для выбора даты и/или времени, построенный на базе библиотеки
[@vuepic/vue-datepicker](https://vue3datepicker.com/) с кастомизированным дизайном и дополнительной функциональностью.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputDate.vue`

## Пропсы

| Название     | Тип                                                                                        | По умолчанию | Описание                                                                       |
|:-------------|:-------------------------------------------------------------------------------------------|--------------|:-------------------------------------------------------------------------------|
| id           | `string`                                                                                   | -            | Уникальный идентификатор календаря. Если не указан, генерируется автоматически |
| label        | `string`                                                                                   | -            | Текст лейбла календаря                                                         |
| placeholder  | `string`                                                                                   | -            | Подсказка внутри календаря (атрибут`placeholder`)                              |
| title        | `string`                                                                                   | -            | Всплывающая подсказка                                                          |
| required     | `boolean`                                                                                  | `false`      | Флаг обязательности календаря                                                  |
| disabled     | `boolean`                                                                                  | `false`      | Флаг отключения календаря                                                      |
| readonly     | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                         |
| errors       | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                        |
| isRange      | `boolean`                                                                                  | `false	`     | Режим выбора диапазона дат                                                     |
| isTimePicker | `boolean`                                                                                  | `false	`     | Включение выбора времени                                                       |
| minDate      | `string`                                                                                   | -            | Минимальная доступная дата                                                     |
| maxDate      | `string`                                                                                   | -            | Максимальная доступная дата                                                    |
| minTime      | [`PartialTimeObj`](https://vue3datepicker.com/props/time-picker-configuration/#min-time)   | -            | Минимальное доступное время                                                    |
| maxTime      | [`PartialTimeObj`](https://vue3datepicker.com/props/time-picker-configuration/#max-time)   | -            | Максимальное доступное время                                                   |
| dateMask     | `string`                                                                                   | `dd.MM.yyyy` | Формат отображения даты                                                        |
| timeMask     | `string`                                                                                   | `HH:mm`      | Формат отображения времени                                                     |

## v-model

Поддерживаются значения типа:

- Для одиночной даты - `string | null`
- Для диапазона дат - массив строк (при `isRange=true`)

## Использование

Простой выбор даты:

```vue
<script setup lang="ts">
import XInputDate from '@/app/shared/components/inputs/XInputDate.vue';
import { ref } from 'vue';

const birthDate = ref();
</script>

<template>
	<XInputDate
		v-model="birthDate"
		label="Дата рождения"
		placeholder="Выберите дату"
	/>
</template>
```

Диапазон дат:

```vue
<script setup lang="ts">
import XInputDate from '@/app/shared/components/inputs/XInputDate.vue';
import { ref } from 'vue';

const dateRange = ref();
</script>

<template>
	<XInputDate
		v-model="dateRange"
		label="Период"
		placeholder="Выберите период"
		is-range
	/>
</template>
```

С выбором времени:

```vue
<script setup lang="ts">
import XInputDate from '@/app/shared/components/inputs/XInputDate.vue';
import { ref } from 'vue';

const meetingTime = ref();
</script>

<template>
	<XInputDate
		v-model="meetingTime"
		label="Время встречи"
		placeholder="Выберите дату и время"
		is-time-picker
	/>
</template>
```

С ограничениями:

```vue
<script setup lang="ts">
import XInputDate from '@/app/shared/components/inputs/XInputDate.vue';
import { ref } from 'vue';

const deliveryDate = ref();
</script>

<template>
	<XInputDate
		v-model="deliveryDate"
		label="Дата доставки"
		is-time-picker
		min-date="01.01.2020"
		max-date="18.01.2020"
		:min-time="{ hours: 8, minutes: 0 }"
		:max-time="{ hours: 20, minutes: 0 }"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputDate.vue)
- [@vuepic/vue-datepicker](https://vue3datepicker.com/)
