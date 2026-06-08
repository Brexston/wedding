import type { MimeTypes } from '@app/shared/types/mime.types';
import type { FileInfo } from '@app/shared/utils/files/getFileInfo';
import type { ErrorObject } from '@vuelidate/core';
import type { ComputedRef, MaybeRefOrGetter, ModelRef, Ref, ShallowRef } from 'vue';
import { getFileInfo } from '@app/shared/utils/files/getFileInfo';
import { toastError } from '@app/shared/utils/toast';
import { useDropZone } from '@vueuse/core';
import { computed, ref, toValue, watch, watchEffect } from 'vue';

export interface UseFileInputOptions {
	model?: ModelRef<UseFileInputFiles>;
	multiple?: boolean;
	accept?: MimeTypes[];
	maxSizeMb?: number;
	dropZone?: MaybeRefOrGetter<HTMLElement | null>;
	toastOnError?: boolean;
	externalErrors?: MaybeRefOrGetter<UseFileInputErrors>;
}

export interface UseFileInputReturn {
	files: Ref<UseFileInputFiles>;
	filesInfo: ComputedRef<FileInfo[]>;
	isEmpty: ComputedRef<boolean>;
	errors: Ref<UseFileInputErrors>;
	isOverDropZone: ShallowRef<boolean>;
	deleteFile: (deletingFile: FileInfo) => void;
}

export type UseFileInputFiles = string[] | FileList | null;
export type UseFileInputErrors = string[] | ErrorObject[];

export function useFileInput(
	input: MaybeRefOrGetter<HTMLInputElement | null>,
	options: UseFileInputOptions = {},
): UseFileInputReturn {
	const {
		model,
		accept = [],
		multiple = false,
		maxSizeMb = 5,
		dropZone,
		toastOnError = false,
		externalErrors,
	} = options;

	const files = ref<UseFileInputFiles>(null);
	const errors = ref<UseFileInputErrors>([]);

	const filesInfo = computed<FileInfo[]>(() => {
		if (!files.value)
			return [];

		if (files.value instanceof FileList)
			return Array.from(files.value).map(file => ({ ...getFileInfo(file) }));

		return (files.value as string[]).map(file => ({ ...getFileInfo(file) }));
	});

	const isEmpty = computed(() => !files.value || !files.value.length);

	function checkMimeType(file: File) {
		return !accept.length || accept.includes(file.type as MimeTypes);
	}

	function checkMaxSize(file: File) {
		return file.size / (1024 * 1024) <= maxSizeMb;
	}

	function validateFiles(selectedFiles: FileList) {
		const dataTransfer = new DataTransfer();
		const validationErrors: string[] = [];

		Array.from(selectedFiles).forEach((file) => {
			if (!checkMimeType(file)) {
				const { ext } = getFileInfo(file);
				validationErrors.push(`Недопустимый формат файла: ${ext}`);
			}
			else if (!checkMaxSize(file)) {
				validationErrors.push(`Размер файла превышает ${maxSizeMb} Мб`);
			}
			else {
				dataTransfer.items.add(file);
			}
		});

		if (toastOnError && validationErrors.length) {
			validationErrors.forEach(error => toastError(error));
		}

		errors.value = validationErrors;
		return dataTransfer.files.length && !validationErrors.length ? dataTransfer.files : null;
	}

	function onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const selectedFiles = target.files;
		files.value = selectedFiles ? validateFiles(selectedFiles) : null;
	}

	function onDrop(selectedFiles: File[] | null) {
		if (!selectedFiles || !selectedFiles?.[0])
			return;

		const dataTransfer = new DataTransfer();

		if (!multiple)
			dataTransfer.items.add(selectedFiles[0]);
		else
			selectedFiles.forEach(file => dataTransfer.items.add(file));

		files.value = validateFiles(dataTransfer.files);
	}

	function deleteFile(deletingFile: FileInfo) {
		if (!files.value)
			return;

		if (deletingFile.type === 'url') {
			files.value = (files.value as string[]).filter(item => item !== deletingFile.url);
			return;
		}

		const { name } = deletingFile;
		const newFiles = Array.from(files.value as FileList).filter(file => file.name !== name);
		const dataTransfer = new DataTransfer();
		newFiles.forEach(file => dataTransfer.items.add(file));

		files.value = dataTransfer.files;
	}

	watchEffect(() => {
		const inputEl = toValue(input);
		if (!inputEl || inputEl.type !== 'file')
			return;

		inputEl.accept = accept.join(', ');
		inputEl.multiple = multiple;

		inputEl.removeEventListener('change', onChange);
		inputEl.addEventListener('change', onChange);
	});

	const { isOverDropZone } = useDropZone(dropZone, {
		onDrop,
	});

	if (model) {
		watch(files, (newFiles) => {
			model.value = newFiles;
		});

		watch(model, (newModelValue) => {
			files.value = newModelValue;
		});
	}

	if (externalErrors) {
		watchEffect(() => {
			const newExternalErrors = toValue(externalErrors);
			if (!errors.value.length && (newExternalErrors.length))
				errors.value = newExternalErrors;
		});
	}

	return {
		files,
		filesInfo,
		isEmpty,
		errors,
		isOverDropZone,
		deleteFile,
	};
}
