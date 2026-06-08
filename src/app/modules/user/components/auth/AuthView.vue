<script setup lang="ts">
import AuthByPassword from '@app/modules/user/components/auth/AuthByPassword.vue';
import ResetPassword from '@app/modules/user/components/auth/ResetPassword.vue';
import SignUp from '@app/modules/user/components/auth/SignUp.vue';
import { ref } from 'vue';

type AuthStep = 'authByPassword' | 'resetPassword' | 'signUp';

const props = withDefaults(
	defineProps<{ initialStep?: AuthStep }>(),
	{ initialStep: 'authByPassword' },
);

const step = ref<AuthStep>(props.initialStep);

function changeStep(value: AuthStep) {
	step.value = value;
}
</script>

<template>
	<div class="auth-view">
		<AuthByPassword v-if="step === 'authByPassword'" @change-step="changeStep" />
		<ResetPassword v-else-if="step === 'resetPassword'" @change-step="changeStep" />
		<SignUp v-else-if="step === 'signUp'" @change-step="changeStep" />
	</div>
</template>

<style lang="sass">
@import '@styles/auth/_index.sass'
</style>
