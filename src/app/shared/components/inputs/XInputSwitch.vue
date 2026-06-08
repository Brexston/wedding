<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import Toggle from '@vueform/toggle';
import { useId } from 'vue';

export interface Props {
	id?: string;
	label?: string;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: string[] | ErrorObject[];
	trueValue?: string | number | boolean;
	falseValue?: string | number | boolean;
	onLabel?: string;
	offLabel?: string;
}

const {
	id,
	disabled,
	trueValue = true,
	falseValue = false,
} = defineProps<Props>();

const modelValue = defineModel<string | number | boolean>();

function setValue(value: string | number | boolean) {
	if (disabled)
		return;
	modelValue.value = value;
}

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<div
			class="input-switch"
			:class="[{ disabled }, { error: errors?.length }, { active: modelValue === trueValue }]"
		>
			<span
				v-if="offLabel"
				class="input-switch__label input-switch__label--off"
				@click="setValue(falseValue)"
			>{{ offLabel }}</span>
			<Toggle
				:id="inputId"
				v-model="modelValue"
				:disabled
				:name
				:true-value
				:false-value
				class="input-switch__switch"
			/>
			<span
				v-if="onLabel"
				class="input-switch__label input-switch__label--on"
				@click="setValue(trueValue)"
			>{{ onLabel }}</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>

<style lang="sass">
@import '@vueform/toggle/themes/default.css'

.input-switch
	display: flex
	align-items: center
	gap: 16px
	cursor: pointer

	&.error
		& .input-switch
			&__switch
				--toggle-ring-color: var(--di-border-color-error)

				& .toggle
					outline-width: 2px

	&.active
		& .input-switch
			&__switch

				&:focus-visible
					--toggle-ring-color: var(--color-primary-300)

				@include hover
					--toggle-ring-color: var(--color-primary-300)

	&.disabled
		cursor: not-allowed

		& .input-switch
			&__switch
				pointer-events: none

			&__label
				color: var(--di-color-disabled)
				pointer-events: none

	&__label
		color: var(--di-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

	&__switch
		--toggle-width: 68px
		--toggle-height: 32px
		--toggle-border: 4px
		--toggle-font-size: var(--di-font-size)
		--toggle-duration: 150ms
		--toggle-bg-on: var(--color-primary-500)
		--toggle-bg-off: var(--color-neutral-300)
		--toggle-bg-on-disabled: var(--color-primary-300)
		--toggle-bg-off-disabled: var(--color-neutral-200)
		--toggle-border-on: transparent
		--toggle-border-off: transparent
		--toggle-border-on-disabled: transparent
		--toggle-border-off-disabled: transparent
		--toggle-ring-width: 4px
		--toggle-ring-color: var(--color-neutral-200)
		--toggle-text-on: var(--di-color)
		--toggle-text-off: var(--di-color)
		--toggle-text-on-disabled: var(--color-neutral-500)
		--toggle-text-off-disabled: var(--color-neutral-500)
		--toggle-handle-enabled: var(--di-bg)
		--toggle-handle-disabled: var(--di-bg)

		&:focus
			outline: none
			box-shadow: none

		&:focus-visible
			& .toggle
				outline-width: var(--toggle-ring-width)

		@include hover
			--toggle-bg-on: var(--color-primary-400)
			--toggle-ring-color: var(--color-neutral-400)

			& .toggle
				outline-width: 2px

		& .toggle
			outline: var(--toggle-ring-color) solid 0
			transition: background-color 0.3s ease, border-color 0.3s ease
</style>
