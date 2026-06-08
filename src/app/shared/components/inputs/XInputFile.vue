<script setup lang="ts">
import type { UseFileInputFiles } from '@app/shared/composables/useFileInput';
import type { MimeTypes } from '@app/shared/types/mime.types';
import type { ErrorObject } from '@vuelidate/core';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { useFileInput } from '@app/shared/composables/useFileInput';
import { computed, useId, useTemplateRef } from 'vue';

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
	accept: MimeTypes[];
	multiple?: boolean;
	maxSizeMb?: number;
}

const {
	id,
	multiple,
	placeholder = 'Прикрепить файл',
	accept,
	maxSizeMb = 5,
	errors,
} = defineProps<Props>();

const modelValue = defineModel<UseFileInputFiles>({ default: null });

const input = useTemplateRef<HTMLInputElement>('input');
const dropZone = useTemplateRef<HTMLElement>('dropZone');

const {
	filesInfo,
	isEmpty,
	isOverDropZone,
	deleteFile,
	errors: fileErrors,
} = useFileInput(input, {
	model: modelValue,
	multiple,
	accept,
	maxSizeMb,
	dropZone,
	externalErrors: errors,
	toastOnError: true,
});

const canDeleteFile = computed(() => filesInfo.value.length && !multiple);

const inputId = id ?? useId();
</script>

<template>
	<XInputField :id="inputId" :label :required :errors="fileErrors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<div class="input">
			<label
				ref="dropZone"
				tabindex="0"
				class="input__input input__input--file"
				:class="[{ error: fileErrors?.length }, { disabled }, { readonly }]"
				@keydown.enter="input?.click()"
			>
				<input
					:id="inputId"
					ref="input"
					:multiple
					:disabled="disabled || readonly"
					:name
					:title
					type="file"
					class="input-file"
				>
				<span v-if="isEmpty || multiple" class="input__placeholder">
					{{ isOverDropZone ? 'Перетащите один или несколько файлов в это поле' : placeholder }}
				</span>
				<template v-else>
					<span
						v-for="file in filesInfo.slice(0, 1)"
						:key="file.name"
						:title="file.name"
						class="input__value"
					>
						{{ file.name }}
					</span>
				</template>
			</label>
			<span class="input__icon input__icon--file">
				<XIcon
					:name="canDeleteFile ? 'close' : 'clip'"
					class="input-file__clip"
					:class="{ 'input-file__clip--delete': canDeleteFile }"
					@click.prevent="canDeleteFile && filesInfo[0] && deleteFile(filesInfo[0])"
				/>
			</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>

		<template v-if="multiple" #underInput>
			<div class="files-preview">
				<div
					v-for="file in filesInfo"
					:key="file.name"
					:title="file.name"
					class="files-preview__item file-preview"
				>
					<img v-if="file.isImage" class="file-preview__img" :src="file.url" :alt="file.name">
					<span v-if="file.ext" class="file-preview__ext">.{{ file.ext }}</span>
					<button
						v-if="!readonly"
						tabindex="0"
						class="file-preview__del"
						@click="deleteFile(file)"
						@keydown.enter="deleteFile(file)"
					>
						<span class="file-preview__del-icon" />
					</button>
				</div>
			</div>
		</template>
	</XInputField>
</template>
