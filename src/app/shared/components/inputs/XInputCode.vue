<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import { useId } from 'vue';
import OtpInput from 'vue3-otp-input';

type InputOtpProps = InstanceType<typeof OtpInput>['$props'];

interface Props {
	id?: string;
	label?: string;
	placeholder?: InputOtpProps['placeholder'];
	name?: string;
	title?: string;
	required?: boolean;
	disabled?: InputOtpProps['isDisabled'];
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	numInputs?: InputOtpProps['numInputs'];
	separator?: InputOtpProps['separator'];
	inputType?: InputOtpProps['inputType'];
	inputmode?: InputOtpProps['inputmode'];
	shouldAutoFocus?: InputOtpProps['shouldAutoFocus'];
	shouldFocusOrder?: InputOtpProps['shouldFocusOrder'];
}

const {
	id,
	numInputs = 4,
	inputType = 'tel',
	inputmode = 'numeric',
	shouldAutoFocus = false,
	shouldFocusOrder = false,
	placeholder = [],
	disabled = false,
} = defineProps<Props>();

const modelValue = defineModel<string>({ default: '' });

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<OtpInput
			v-model:value="modelValue"
			:num-inputs
			:separator
			:input-type
			:inputmode
			:should-auto-focus
			:should-focus-order
			:placeholder
			:is-disabled="disabled"
			class="input-code"
			input-classes="input-code__field"
		/>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>
