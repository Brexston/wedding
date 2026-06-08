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
}

const { id } = defineProps<Props>();

const modelValue = defineModel<boolean>();

const inputId = id ?? useId();
</script>

<template>
	<XInputField :label :errors :required tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<label
			class="input-check input-check--checkbox"
			:title
			:class="[
				{ active: modelValue },
				{ error: errors?.length },
				{ disabled },
				{ readonly },
			]"
		>
			<input
				:id="inputId"
				v-model="modelValue"
				type="checkbox"
				:disabled="disabled || readonly"
				:name
				:readonly
				class="input-check__input"
			>
			<span class="input-check__checkmark input-check__checkmark--checkbox" />
			<span v-if="$slots.default" class="input-check__value">
				<slot></slot>
			</span>
			<span v-else class="input-check__value" v-html="text"></span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>
