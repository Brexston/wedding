<script setup>
import { useI18n } from '@/app/shared/composables/useI18n/useI18n.ts';
import { ref } from 'vue';

const { t, initI18n } = useI18n();
const lang = ref('ru');

function initLanguage() {
	lang.value === 'ru' ? (lang.value = 'en') : (lang.value = 'ru');
	initI18n(lang.value);
}

initI18n(lang.value);
</script>

<template>
	<div class="use-i18n-example-div">
		<button class="btn" @click="initLanguage">Поменять язык на {{ lang === 'ru' ? '🇬🇧' : '🇷🇺' }}</button>
		<h4>{{ t('test.hello') }}{{ t('test.jobTitle') }}</h4>
	</div>
</template>

<style scoped lang="sass">
.use-i18n-example-div
	padding: 16px 0
	.btn
		padding: 4px 8px
		background-color: #d8e5f7
		border-radius: 4px
		color: #000000
</style>
