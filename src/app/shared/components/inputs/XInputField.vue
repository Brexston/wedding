//TODO: сделать, чтобы не появлялся блок с ошибками при ошибке, если нет текста ошибки
<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import XSkeleton from '@app/shared/components/ui/XSkeleton.vue';

interface Props {
	id?: string;
	label?: string;
	required?: boolean;
	loading?: boolean;
	errors?: string[] | ErrorObject[];
	tag?: 'label' | 'span';
}

const {
	tag = 'label',
	errors = [],
} = defineProps<Props>();
</script>

<template>
	<XSkeleton :loading>
		<div class="default-input" :class="{ required }">
			<Component :is="tag" v-if="label" :for="id" class="default-input__label">
				<slot name="label" :label-value="label">
					<span class="default-input__label-text">{{ label }}</span>
				</slot>
			</Component>
			<div class="default-input__input">
				<slot />
				<slot name="action" />
			</div>
			<ul v-if="errors?.[0]" class="default-input__errors">
				<li class="default-input__error">
					{{ typeof errors[0] === 'string' ? errors[0] : errors[0].$message }}
				</li>
			</ul>
			<div v-if="$slots.underInput" class="default-input__bottom">
				<slot name="underInput" />
			</div>
		</div>
	</XSkeleton>
</template>
