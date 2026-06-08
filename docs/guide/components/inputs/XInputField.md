# XInputField

Базовый компонент для построения компонентов ввода. Предоставляет универсальную разметку для лейбла, поля ввода, вывода
ошибок и дополнительных действий. Используется как обёртка для специфичных input-компонентов.

Расположение: `src/app/shared/components/inputs/XInputField.vue`

## Пропсы

| Название | Тип                             | По умолчанию | Описание                                                                |
|----------|---------------------------------|--------------|-------------------------------------------------------------------------|
| id       | `string`                        | –            | Идентификатор для привязки лейбла к полю ввода через `for`              |
| label    | `string`                        | –            | Текст лейбла, который отображается над полем ввода                      |
| required | `boolean`                       | –            | Отмечает, что поле обязательное (добавляется класс `required`)          |
| loading  | `boolean`                       | –            | Показывает, что поле в состоянии загрузки (добавляется класс `loading`) |
| errors   | `string[]`,<br/>`ErrorObject[]` | `[]`         | Массив ошибок валидации, отображается первая ошибка                     |
| tag      | `'label'`,<br/>`'span'`         | `'label'`    | HTML-тег, который используется для обёртки заголовка                    |

## Слоты

| Название   | Описание                                                       | Параметры                              |
|------------|----------------------------------------------------------------|----------------------------------------|
| default    | Слот для самого поля ввода или вложенных компонентов           | –                                      |
| label      | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с полем ввода (например, для иконки) | –                                      |
| underInput | Слот под полем ввода для дополнительного контента              | –                                      |

## Использование

Пример использования в компоненте [`XInputText`](/guide/components/inputs/XInputText):

```vue
<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@/app/shared/components/inputs/XInputField.vue';
import { useId } from 'vue';

interface Props {
	id?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	title?: string;
	required?: boolean;
	disabled?: boolean;
	loading?: boolean;
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	type?: 'text' | 'email' | 'tel' | 'numeric';
	autocomplete?: AutoComplete;
	unmaskAsNumber?: boolean;
}

const {
	id,
	unmaskAsNumber,
	type = 'text',
	autocomplete = 'off',
} = defineProps<Props>();

const modelValue = defineModel<string | number>({
	set: v => unmaskAsNumber ? Number.parseFloat(String(v)) : v,
});

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required :loading>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<div class="input">
			<input
				:id="inputId"
				v-model="modelValue"
				:placeholder
				:disabled
				:readonly
				:inputmode="type"
				:autocomplete
				:title
				:name
				:type
				class="input__input input__input--text"
				:class="[{ error: errors?.length }]"
			>
		</div>
		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput" />
		</template>
	</XInputField>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputField.vue)
