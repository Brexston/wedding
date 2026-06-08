<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import Multiselect from '@vueform/multiselect';
import { useId } from 'vue';

type MultiselectProps = InstanceType<typeof Multiselect>['$props'];

interface Props {
	id?: string;
	label?: string;
	placeholder?: MultiselectProps['placeholder'];
	required?: boolean;
	disabled?: MultiselectProps['disabled'];
	loading?: boolean;
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	options?: MultiselectProps['options'];
	mode?: MultiselectProps['mode'];
	groups?: MultiselectProps['groups'];
	searchable?: MultiselectProps['searchable'];
	loadingSelect?: MultiselectProps['loading'];
	labelProp?: MultiselectProps['label'];
	valueProp?: MultiselectProps['valueProp'];
	canClear?: MultiselectProps['canClear'];
	canDeselect?: MultiselectProps['canDeselect'];
	delay?: MultiselectProps['delay'];
	filterResults?: MultiselectProps['filterResults'];
	resolveOnLoad?: MultiselectProps['resolveOnLoad'];
}

const {
	id,
	searchable = false,
	loadingSelect = false,
	mode = 'single',
	groups = false,
} = defineProps<Props>();

const modelValue = defineModel<string | string[] | number | number[] | null>();

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :errors :required :loading>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<Multiselect
			:id="inputId"
			v-model="modelValue"
			data-shimmer-no-children
			class="input-select"
			:class="[{ 'is-error': errors?.length }, { 'is-readonly': readonly }, { 'is-multiple': mode === 'multiple' || mode === 'tags' }]"
			:placeholder
			:options
			:mode
			:groups
			:hide-selected="false"
			:caret="!loadingSelect"
			:searchable
			:disabled="disabled || readonly"
			:loading="loadingSelect"
			:label="labelProp"
			:value-prop="valueProp"
			:can-clear
			:can-deselect
			:delay
			:filter-results
			:resolve-on-load
			no-results-text="Ничего не найдено"
			no-options-text="Нет вариантов для выбора"
			:multiple-label="(values: string[] | number[]) => `Выбрано: ${values.length}`"
		/>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput" />
		</template>
	</XInputField>
</template>
