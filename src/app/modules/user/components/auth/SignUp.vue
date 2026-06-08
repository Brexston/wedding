<script setup lang="ts">
import { UserApiKeys } from '@app/modules/user/api/user.api';
import XInputCheckbox from '@app/shared/components/inputs/XInputCheckbox.vue';
import XInputCode from '@app/shared/components/inputs/XInputCode.vue';
import XInputPassword from '@app/shared/components/inputs/XInputPassword.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import { phoneMask } from '@app/shared/consts/masks';
import { useBaseStore } from '@app/shared/stores/base.store';
import { getValidationRules } from '@app/shared/utils/getValidationRules';
import { toastSuccess } from '@app/shared/utils/toast';
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref, watch } from 'vue';
import { useUserStore } from '@/app/modules/user/store/user.store';
import { useTimer } from '@/app/shared/composables/useTimer';
import { useApiStore } from '@/app/shared/stores/api.store';

const emit = defineEmits(['changeStep']);
const { isPending } = useApiStore();
const { docs } = useBaseStore();
const { requestSignUp } = useUserStore();
const { startTimer, formattedTime, time } = useTimer();

const formStep = ref('waitSendData' as 'waitSendData' | 'waitSendCode');

const initialData = {
	email: '',
	last_name: '',
	name: '',
	phone_number: '',
	password: '',
	confirm_password: '',
	email_code: '',
};
const formData = reactive({ ...initialData });
const agreementData = reactive({
	privacyPolicy: false,
});

const rules = computed(() => {
	const rules = {
		formData: {
			email: getValidationRules('email'),
			last_name: getValidationRules('string'),
			name: getValidationRules('string'),
			phone_number: getValidationRules('phone'),
			password: getValidationRules('password'),
			confirm_password: getValidationRules('passwordConfirm', true, formData.password),
			email_code: {},
		},
		agreementData: {
			privacyPolicy: getValidationRules('checkbox'),
		},
	};

	if (formStep.value === 'waitSendCode') {
		rules.formData.email_code = getValidationRules('code');
	}
	return rules;
});

const v$ = useVuelidate(rules, { formData, agreementData }, {});

async function onSubmitSendData() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;
	// TODO: Раскомментировать после добавления API
	// const data = { ...formData, email_code: '' };
	// const response = await requestSignUp(data);
	// if (!response.success)
	// 	return;
	// formData.email_code = '';
	// v$.value.formData.email_code.$reset();
	formStep.value = 'waitSendCode';
	startTimer(60);
}

async function onSubmitReSendData() {
	const data = { ...formData, email_code: '' };

	const response = await requestSignUp(data);
	if (!response.success)
		return;
	startTimer(60);
}

async function onSubmitSendCode() {
	const validation = await v$.value.formData.email_code.$validate();
	if (!validation)
		return;

	const response = await requestSignUp(formData);
	if (!response.success)
		return;
	emit('changeStep', 'authByPassword');
	toastSuccess('Вы успешно зарегистрированы, теперь вы можете войти');
}

watch(() => formData.email_code, (value) => {
	if (value.length === 6) {
		onSubmitSendCode();
	}
});

const isLoading = computed(() => isPending(UserApiKeys.SIGN_UP));
</script>

<template>
	<form v-if="formStep === 'waitSendData'" class="auth" :inert="isLoading" @submit.prevent="onSubmitSendData">
		<div class="auth__top">
			<h1 class="auth__title title title--h3">
				Регистрация
			</h1>
		</div>

		<div class="auth__content">
			<div class="auth__form form">
				<div class="form__items">
					<XInputText
						v-model="formData.last_name"
						class="form__item"
						type="text"
						placeholder="Введите фамилию *"
						autocomplete="family-name"
						:errors="v$.formData.last_name.$errors"
					/>
					<XInputText
						v-model="formData.name"
						class="form__item"
						type="text"
						placeholder="Введите имя *"
						autocomplete="given-name"
						:errors="v$.formData.name.$errors"
					/>
					<XInputText
						v-model="formData.email"
						class="form__item"
						type="text"
						inputmode="email"
						placeholder="Введите e-mail *"
						autocomplete="email"
						:errors="v$.formData.email.$errors"
					/>
					<XInputText
						v-model="formData.phone_number"
						v-mask="phoneMask"
						class="form__item"
						type="text"
						inputmode="tel"
						placeholder="+7 (___) ___ __ __"
						autocomplete="tel"
						:errors="v$.formData.phone_number.$errors"
					/>
					<XInputPassword
						v-model="formData.password"
						class="form__item"
						name="password"
						placeholder="Придумайте пароль *"
						autocomplete="current-password"
						:errors="v$.formData.password.$errors"
					/>
					<XInputPassword
						v-model="formData.confirm_password"
						class="form__item"
						name="password"
						placeholder="Повторите пароль *"
						autocomplete="new-password"
						:errors="v$.formData.confirm_password.$errors"
					/>
				</div>
			</div>
		</div>

		<div class="auth__bottom">
			<div class="auth__agreements">
				<XInputCheckbox
					v-model="agreementData.privacyPolicy"
					:errors="v$.agreementData.privacyPolicy.$errors"
				>
					Ознакомлен с
					<a :href="docs.privacyPolicy" class="link link--color-primary" target="_blank">Политикой конфиденциальности</a>
				</XInputCheckbox>
			</div>
			<div class="auth__actions">
				<button
					class="btn btn--size-l"
					type="submit"
					:disabled="v$.$error && v$.$dirty"
					:loading="isLoading"
				>
					<span class="btn__text">Зарегистрироваться</span>
				</button>
			</div>
			<div class="auth__info">
				Уже зарегистрированы?
				<button
					class="link link--color-primary"
					type="button"
					@click="emit('changeStep', 'authByPassword');"
				>
					Зарегистрироваться
				</button>
			</div>
		</div>
	</form>

	<form v-if="formStep === 'waitSendCode'" class="auth" :inert="isLoading" @submit.prevent="onSubmitSendCode">
		<div class="auth__top">
			<button class="auth__top-link link link--color-secondary" type="button" @click="formStep = 'waitSendData'">
				<XIcon name="chevron-left-sm" class="link__icon" />
				<span class="link__text">Назад</span>
			</button>

			<h1 class="auth__title title title--h3">
				Подтверждение регистрации
			</h1>
			<p class="auth__description">
				На e-mail <span inert class="link link--color-primary">{{ formData.email }}</span> выслан код подтверждения. Введите код из письма в поле ниже
			</p>
		</div>
		<div class="auth__content">
			<div class="auth__form form">
				<div class="form__items">
					<XInputCode
						v-model="formData.email_code"
						:errors="v$.formData.email_code.$errors"
						:num-inputs="6"
					>
						<template #underInput>
							<div class="auth__info">
								<div v-if="time" class="auth__info-text text text-neutral">
									Отправить повторно {{ formattedTime }}
								</div>
								<template v-else>
									<div class="auth__info-text">
										Не пришёл код?
									</div>
									<button class="auth__info-link link link--color-primary link--size-m" type="button" @click="onSubmitReSendData()">
										Отправить повторно
									</button>
								</template>
							</div>
						</template>
					</XInputCode>
				</div>
			</div>
		</div>
		<div class="auth__bottom">
			<div class="auth__actions">
				<button
					class="btn btn--size-l"
					type="submit"
					:disabled="v$.$error && v$.$dirty"
					:loading="isLoading"
				>
					<span class="btn__text">Подтвердить</span>
				</button>
			</div>
		</div>
	</form>
</template>
