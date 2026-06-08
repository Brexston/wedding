<script setup lang="ts">
import type { ContactFormPayload } from '@app/modules/forms/api/forms.api.types';
import { formsApi, FormsApyKeys } from '@app/modules/forms/api/forms.api';
import XInputCheckbox from '@app/shared/components/inputs/XInputCheckbox.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import XInputTextarea from '@app/shared/components/inputs/XInputTextarea.vue';
import { phoneMask } from '@app/shared/consts/masks';
import { useApiStore } from '@app/shared/stores/api.store';
import { useBaseStore } from '@app/shared/stores/base.store';
import { getExternalResults } from '@app/shared/utils/getExternalResults';
import { getValidationRules } from '@app/shared/utils/getValidationRules';
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref } from 'vue';

const initialData = {
	name: '',
	phone: '',
	comment: '',
} as ContactFormPayload;

const formData = reactive({ ...initialData });
const $externalResults = ref({});

const rules = computed(() => ({
	formData: {
		name: getValidationRules('string', true),
		phone: getValidationRules('phone', true),
		comment: getValidationRules('text', false),
	},
	agreement: getValidationRules('checkbox', true),
}));

const agreement = ref(false);
const v$ = useVuelidate(rules, { formData, agreement }, { $externalResults });

const { docs } = useBaseStore();
const { isPending } = useApiStore();
const isFinished = ref(false);

async function onSubmit() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;

	const response = await formsApi.requestContactForm(formData);

	if (response.errors?.length)
		$externalResults.value = getExternalResults(response.errors);

	if (response.success)
		return;

	v$.value.formData.$reset();
	Object.assign(formData, initialData);
	isFinished.value = true;
}

const isLoading = computed(() => isPending(FormsApyKeys.CONTACT_FORM));
</script>

<template>
	<form v-show="!isFinished" :inert="isLoading" class="form" @submit.prevent="onSubmit">
		<div class="form__items form__items--column-2">
			<XInputText
				v-model="formData.name"
				label="Имя"
				placeholder="Введите имя"
				required
				:errors="v$.formData.name.$errors"
				autocomplete="name"
				class="form__item"
			/>
			<XInputText
				v-model="formData.phone"
				v-mask="phoneMask"
				label="Телефон"
				placeholder="+7 (___) ___ __ __"
				required
				:errors="v$.formData.phone.$errors"
				type="tel"
				inputmode="numeric"
				autocomplete="tel"
				class="form__item"
			/>
			<XInputTextarea
				v-model="formData.comment"
				label="Комментарий"
				placeholder="Напишите комментарий"
				:errors="v$.formData.comment.$errors"
				class="form__item form__item--full"
				autosize
			/>
			<XInputCheckbox
				v-model="agreement"
				required
				:errors="v$.agreement.$errors"
				class="form__item form__item--full"
			>
				Я соглашаюсь с
				<a :href="docs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и
				<a :href="docs.userAgreement" target="_blank">пользовательским соглашением</a>
			</XInputCheckbox>
		</div>

		<div class="form__bottom">
			<div class="form__actions">
				<button
					type="submit"
					:loading="isLoading"
					:disabled="v$.$error && v$.$dirty"
					class="btn"
				>
					<span class="btn__text">
						Отправить
					</span>
				</button>
			</div>
		</div>
	</form>

	<div v-show="isFinished" class="form-sent">
		<div class="form-sent__info">
			<span class="form__title">
				Форма отправлена
			</span>
			<p class="form-sent__text">
				Мы свяжемся с вами в ближайшее время
			</p>
		</div>
	</div>
</template>
