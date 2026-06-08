<script setup lang="ts">
import type { PasswordAutocompleteTypes } from '@app/shared/types/autocomplete.types';
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { ref, useId } from 'vue';

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
	autocomplete?: PasswordAutocompleteTypes;
}

const {
	id,
	autocomplete = 'current-password',
} = defineProps<Props>();

const modelValue = defineModel<string | number>();

const passShown = ref(false);

function togglePassShown(): void {
	passShown.value = !passShown.value;
}

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<div class="input">
			<input
				:id="inputId"
				v-model="modelValue"
				:placeholder
				:disabled="disabled || readonly"
				:readonly
				:autocomplete
				:title
				:name
				:type="passShown ? 'text' : 'password'"
				class="input__input input__input--password"
				:class="[
					{ error: errors?.length },
				]"
			>
			<span aria-hidden="true" tabindex="0" role="button" class="input__icon input__icon--pass" :class="{ active: passShown }" @click="togglePassShown" @keydown.enter="togglePassShown">
				<XIcon class="input__icon-image" :name="passShown ? 'pass-hide' : 'pass-show'" />
			</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput" />
		</template>
	</XInputField>
</template>
