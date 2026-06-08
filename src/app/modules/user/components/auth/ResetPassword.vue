<script setup lang="ts">
import { UserApiKeys } from '@app/modules/user/api/user.api';
import XInputCode from '@app/shared/components/inputs/XInputCode.vue';
import XInputPassword from '@app/shared/components/inputs/XInputPassword.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import { getValidationRules } from '@app/shared/utils/getValidationRules';
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/app/modules/user/store/user.store';
import { useTimer } from '@/app/shared/composables/useTimer';
import { useApiStore } from '@/app/shared/stores/api.store';

const emit = defineEmits(['changeStep']);
const { isPending } = useApiStore();
const { startTimer, formattedTime, time } = useTimer();

const { requestResetPassword } = useUserStore();
const formStep = ref('waitSendData' as 'waitSendData' | 'waitSendNewPassword' | 'Success');

const initialData = {
	email: '',
	code: undefined,
	password: '',
	confirm_password: '',
};
const formData = reactive({ ...initialData });

const rules = computed(() => {
	const rules = {
		formData: {
			email: getValidationRules('email'),
			code: {},
			password: {},
			confirm_password: {},
		},
	};

	if (formStep.value === 'waitSendNewPassword') {
		rules.formData.code = getValidationRules('code');
		rules.formData.password = getValidationRules('password');
		rules.formData.confirm_password = getValidationRules('passwordConfirm', true, formData.password);
	}
	return rules;
});

const v$ = useVuelidate(rules, { formData }, {});

async function onSubmit() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;
	// TODO: Раскомментировать после добавления API
	// const response = await requestResetPassword({ email: formData.email });
	// if (!response.success)
	// 	return;
	formStep.value = 'waitSendNewPassword';
	startTimer(60);
}

async function onSubmitReSendData() {
	const response = await requestResetPassword({ email: formData.email });
	if (!response.success)
		return;
	startTimer(60);
}

async function onSubmitNewPassword() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;
	// TODO: Раскомментировать после добавления API
	// const response = await requestResetPassword(formData);
	// if (!response.success)
	// 	return;
	formStep.value = 'Success';
}

const isLoading = computed(() => isPending(UserApiKeys.RESET_PASSWORD));
</script>

<template>
	<form v-if="formStep === 'waitSendData'" class="auth" :inert="isLoading" @submit.prevent="onSubmit">
		<div class="auth__top">
			<button class="auth__top-link link link--color-secondary" type="button" @click="emit('changeStep', 'authByPassword')">
				<XIcon name="chevron-left-sm" class="link__icon" />
				<span class="link__text">Назад</span>
			</button>
			<h1 class="auth__title title title--h3">
				Забыли пароль?
			</h1>
			<p class="auth__description">
				Введите ваш e-mail, и мы направим данные для входа в аккаунт
			</p>
		</div>

		<div class="auth__content">
			<div class="auth__form form">
				<div class="form__items">
					<XInputText
						v-model="formData.email"
						class="form__item"
						type="text"
						inputmode="email"
						placeholder="Введите ваш e-mail"
						autocomplete="email"
						:errors="v$.formData.email.$errors"
					/>
				</div>
			</div>
		</div>

		<div class="auth__bottom">
			<div class="auth__actions">
				<button
					class="btn"
					type="submit"
					:disabled="v$.$error && v$.$dirty"
					:loading="isLoading"
				>
					<span class="btn__text">Отправить</span>
				</button>
			</div>
			<div class="auth__info">
				Впервые на сайте?
				<button
					class="link link--color-primary"
					type="button"
					@click="emit('changeStep', 'signUp');"
				>
					Зарегистрироваться
				</button>
			</div>
		</div>
	</form>

	<form v-if="formStep === 'waitSendNewPassword'" class="auth" :inert="isLoading" @submit.prevent="onSubmitNewPassword">
		<div class="auth__top">
			<button class="auth__top-link link link--color-secondary" type="button" @click="formStep = 'waitSendData'">
				<XIcon name="chevron-left-sm" class="link__icon" />
				<span class="link__text">Назад</span>
			</button>

			<h1 class="auth__title title title--h3">
				Изменить пароль
			</h1>
			<p class="auth__description">
				На e-mail <span inert class="link link--color-primary">{{ formData.email }}</span> выслан код сброса пароля. Введите код из письма в поле ниже и задайте новый пароль
			</p>
		</div>
		<div class="auth__content">
			<div class="auth__form form">
				<div class="form__items">
					<XInputCode
						v-model="formData.code"
						class="form__item form__item--full"
						:errors="v$.formData.code.$errors"
						:num-inputs="6"
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
					</XInputPassword>
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
					<span class="btn__text">Изменить пароль</span>
				</button>
			</div>
		</div>
	</form>

	<div v-else-if="formStep === 'Success'" class="auth">
		<div class="auth__top">
			<h1 class="auth__title title title--h3">
				Пароль успешно обновлён
			</h1>
			<p class="auth__description">
				Вы можете войти в аккаунт с новым паролем <br>и продолжить пользоваться всеми возможностями
			</p>
		</div>
		<div class="auth__bottom">
			<div class="auth__actions">
				<button class="btn btn--size-l" @click="emit('changeStep', 'authByPassword')">
					<span class="btn__text">Войти в аккаунт</span>
				</button>
			</div>
		</div>
	</div>
</template>
