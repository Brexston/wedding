<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import { useTextareaAutosize } from '@vueuse/core';
import { onMounted, useId, useTemplateRef } from 'vue';

interface Props {
	id?: string;
	label?: string;
	placeholder?: string;
	name?: string;
	title?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	autosize?: boolean;
}

const { id, autosize } = defineProps<Props>();

const modelValue = defineModel<string>({ default: '' });

const textarea = useTemplateRef('textarea');

onMounted(() => {
	if (autosize)
		useTextareaAutosize({ element: textarea, input: modelValue });
});

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<div class="input">
			<textarea
				:id="inputId"
				ref="textarea"
				v-model="modelValue"
				:placeholder
				:disabled
				:readonly
				:title
				:name
				class="input__input input__input--textarea"
				:class="{ 'input__input--textarea-autosize': autosize, 'error': errors?.length }"
			/>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>
