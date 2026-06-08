# XInputCode

Компонент `XInputCode` представляет собой поле ввода кода подтверждения (OTP) с возможностью настройки количества полей
и их внешнего вида. Построен на базе библиотеки [vue3-otp-input](https://github.com/ejirocodes/vue3-otp-input).

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputCode.vue`

## Пропсы

| Название         | Тип                                                                                        | По умолчанию | Описание                                                                  |
|:-----------------|:-------------------------------------------------------------------------------------------|--------------|:--------------------------------------------------------------------------|
| id               | `string`                                                                                   | -            | Уникальный идентификатор поля. Если не указан, генерируется автоматически |
| label            | `string`                                                                                   | -            | Текст лейбла поля                                                         |
| placeholder      | `string[]`                                                                                 | `[]`         | Подсказка внутри полей ввода (массив для каждого поля)                    |
| name             | `string`                                                                                   | -            | Имя поля в форме                                                          |
| title            | `string`                                                                                   | -            | Всплывающая подсказка                                                     |
| required         | `boolean`                                                                                  | `false`      | Флаг обязательности поля                                                  |
| disabled         | `boolean`                                                                                  | `false`      | Флаг отключения поля                                                      |
| readonly         | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                    |
| errors           | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                   |
| numInputs        | `number`                                                                                   | `4`          | Количество полей для ввода кода                                           |
| separator        | `string`                                                                                   | -            | Разделитель между полями ввода                                            |
| inputType        | `string`                                                                                   | `'tel'`      | Тип инпута (`text`, `tel`, `password` и т.д.)                             |
| inputmode        | `string`                                                                                   | `'numeric'`  | Режим ввода для мобильных клавиатур                                       |
| shouldAutoFocus  | `boolean`                                                                                  | `false`      | Автоматический фокус на первом поле при монтировании                      |
| shouldFocusOrder | `boolean`                                                                                  | `false`      | Последовательный переход фокуса между полями при вводе                    |

## Слоты

| Название | Описание                                                       | Параметры                              |
|:---------|:---------------------------------------------------------------|----------------------------------------|
| label    | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action   | Дополнительный слот рядом с полем ввода (например, для иконки) | –                                      |

## v-model

Поддерживаются значения типа `string`.

## Использование

Базовое использование:

```vue
<script setup lang="ts">
import XInputCode from '@/app/shared/components/inputs/XInputCode.vue';
import { ref } from 'vue';

const code = ref('');
</script>

<template>
	<XInputCode
		v-model="code"
		label="Код подтверждения"
		required
	/>
</template>
```

С нестандартными параметрами:

```vue
<script setup lang="ts">
import XInputCode from '@/app/shared/components/inputs/XInputCode.vue';
import { ref } from 'vue';

const code = ref('');
</script>

<template>
	<XInputCode
		v-model="code"
		label="Код из SMS"
		:num-inputs="6"
		separator="-"
		input-type="text"
		should-auto-focus
		should-focus-order
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputCode.vue)
- [vue3-otp-input](https://github.com/ejirocodes/vue3-otp-input)
