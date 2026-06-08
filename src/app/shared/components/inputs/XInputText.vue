<script setup lang="ts">
import type { AutocompleteTypes } from '@app/shared/types/autocomplete.types';
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
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
	inputmode?: 'text' | 'email' | 'tel' | 'numeric' | 'url' | 'none' | 'decimal' | 'search';
	autocomplete?: AutocompleteTypes;
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
				:inputmode="inputmode ? inputmode : type"
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
