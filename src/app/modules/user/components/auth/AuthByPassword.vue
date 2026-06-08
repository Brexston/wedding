<script setup lang="ts">
import { UserApiKeys } from '@app/modules/user/api/user.api';
import XInputPassword from '@app/shared/components/inputs/XInputPassword.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import { getValidationRules } from '@app/shared/utils/getValidationRules';
import useVuelidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { useUserStore } from '@/app/modules/user/store/user.store';
import { useApiStore } from '@/app/shared/stores/api.store';

const emit = defineEmits(['changeStep']);
const { isPending } = useApiStore();

const { requestAuthUser } = useUserStore();

const initialData = {
	email: '',
	password: '',
};
const formData = reactive({ ...initialData });
const rules = computed(() => ({
	formData: {
		email: getValidationRules('email'),
		password: getValidationRules('password'),
	},
}));

const v$ = useVuelidate(rules, { formData }, {});

async function onSubmit() {
	const validation = await v$.value.$validate();
	if (!validation)
		return;
	const response = await requestAuthUser(formData);
	if (!response.success)
		return;

	window.location.href = '/account/';
}

const isLoading = computed(() => isPending(UserApiKeys.AUTH_USER));
</script>

<template>
	<form class="auth form" :inert="isLoading" @submit.prevent="onSubmit">
		<div class="auth__top">
			<h1 class="auth__title title title--h3">
				Авторизация
			</h1>
			<p class="auth__description">
				Введите ваш e-mail и пароль для авторизации
			</p>
		</div>
		<div class="auth__form">
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
				<XInputPassword
					v-model="formData.password"
					class="form__item"
					name="password"
					placeholder="Введите пароль"
					autocomplete="current-password"
					:errors="v$.formData.password.$errors"
				>
					<template #underInput>
						<button
							class="link link--color-primary"
							type="button"
							@click="emit('changeStep', 'resetPassword');"
						>
							Забыли пароль?
						</button>
					</template>
				</XInputPassword>
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
					<span class="btn__text">Войти</span>
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
</template>
