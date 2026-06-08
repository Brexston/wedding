<script setup lang="ts">
import type { VacancyPayload } from '@app/modules/forms/api/forms.api.types';
import { formsApi, FormsApyKeys } from '@app/modules/forms/api/forms.api';
import XInputCheckbox from '@app/shared/components/inputs/XInputCheckbox.vue';
import XInputFile from '@app/shared/components/inputs/XInputFile.vue';
import XInputSelect from '@app/shared/components/inputs/XInputSelect.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import { phoneMask, priceMask } from '@app/shared/consts/masks';
import { useApiStore } from '@app/shared/stores/api.store';
import { useBaseStore } from '@app/shared/stores/base.store';
import { getNoun } from '@app/shared/utils/getNoun';
import { getValidationRules } from '@app/shared/utils/getValidationRules';
import { toastSuccess } from '@app/shared/utils/toast';
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref } from 'vue';

const { cities, vacancies } = defineProps<Props>();

const initialData = {
	name: '',
	phone: '',
	email: '',
	city: null,
	vacancy: null,
	file: undefined,
	link: '',
	price: '',
} as VacancyPayload;

interface Props {
	cities: {
		value: number;
		label: string;
	}[];
	vacancies: {
		value: number;
		label: string;
	}[];
}

const formData = reactive({ ...initialData });
const agreement = ref(false);

const rules = computed(() => ({
	formData: {
		name: getValidationRules('string', true),
		phone: getValidationRules('phone', true),
		email: getValidationRules('email', true),
		vacancy: getValidationRules('text', false),
	},
	agreement: getValidationRules('checkbox', true),
}));
const v$ = useVuelidate(rules, { formData, agreement });

const { docs } = useBaseStore();
const { isPending } = useApiStore();

async function onSubmit() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;

	const response = await formsApi.requestVacancyForm(formData);
	if (!response.success)
		return;

	v$.value.formData.$reset();
	Object.assign(formData, initialData);
	toastSuccess('Резюме успешно отправлено. В ближайшее время мы свяжемся с вами.');
}

const isLoading = computed(() => isPending(FormsApyKeys.VACANCY_FORM));
</script>

<template>
	<form :inert="isLoading" class="form" @submit.prevent="onSubmit">
		<div class="form__items form__items--column-2">
			<XInputText
				v-model="formData.name"
				label="Имя"
				placeholder="Введите имя"
				required
				:errors="v$.formData.name.$errors"
				autocomplete="name"
				class="form__item form__item--full"
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
			<XInputText
				v-model="formData.email"
				label="E-mail"
				placeholder="Введите E-mail"
				:errors="v$.formData.email.$errors"
				required
				inputmode="email"
				type="text"
				autocomplete="email"
				class="form__item"
			/>
			<XInputSelect
				v-model="formData.city"
				:options="cities"
				label="Город"
				placeholder="Выберите из списка"
				class="form__item form__item--full"
			>
				<template #underInput>
					{{ cities.length }} {{ getNoun(cities.length, { single: 'город', dual: 'города', many: 'городов' }) }}
				</template>
			</XInputSelect>
			<XInputSelect
				v-model="formData.vacancy"
				:options="vacancies"
				label="Вакансия"
				placeholder="Выберите вакансию"
				required
				:errors="v$.formData.vacancy.$errors"
				class="form__item form__item--full"
			/>
			<XInputFile
				v-model="formData.file"
				:accept="[
					'application/pdf',
					'application/msword',
					'application/rtf',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				]"
				label="Резюме"
				placeholder="Загрузите файл"
				class="form__item form__item--full"
			/>
			<XInputText
				v-model="formData.link"
				label="Ссылка на резюме"
				inputmode="url"
				placeholder="Можете указать ссылку на резюме"
				class="form__item form__item--full"
			/>

			<XInputText
				v-model="formData.price"
				v-mask="priceMask"
				label="Желаемая зарплата"
				inputmode="numeric"
				placeholder="50 000"
				class="form__item form__item--full"
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
</template>
