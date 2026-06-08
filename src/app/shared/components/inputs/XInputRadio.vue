<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import { useId } from 'vue';

interface Props {
	id?: string;
	label?: string;
	name?: string;
	title?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	text?: string;
	valueProp: string | number;
}

const { id } = defineProps<Props>();

const modelValue = defineModel<string | number>();

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<label
			class="input-check input-check--radio"
			:title
			:class="[
				{ active: modelValue === valueProp },
				{ error: errors?.length },
				{ disabled },
				{ readonly },
			]"
		>
			<input
				:id="inputId"
				v-model="modelValue"
				type="radio"
				:disabled="disabled || readonly"
				:readonly
				:name
				:value="valueProp"
				class="input-check__input"
			>
			<span class="input-check__checkmark input-check__checkmark--radio" />
			<span class="input-check__value">
				{{ text || valueProp }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>
