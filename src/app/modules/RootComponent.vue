<script setup lang="ts">
import type { CaptchaConfig } from '@app/shared/captcha/captcha.types';
import type { Locale } from '@app/shared/composables/useI18n/useI18n';
import ModalCallback from '@app/shared/components/modals/ModalCallback.vue';
// import { initCaptcha } from '@app/shared/captcha/captcha';
import XCookie from '@app/shared/components/ui/XCookie.vue';
// import { useI18n } from '@app/shared/composables/useI18n/useI18n';
import calcAppProperties from '@app/shared/scripts/calcProperties';
import initMediaAutoWrapper from '@app/shared/scripts/mediaAutoWrapper';
import { initScrollToHash } from '@app/shared/scripts/scrollToHash';
import { useBaseStore } from '@app/shared/stores/base.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

interface Doc {
	code: string;
	link: string;
}

interface Props {
	csrfToken: string;
	captcha?: CaptchaConfig;
	locale?: Locale;
	docs: Doc[];
}
const props = defineProps<Props>();
const { csrfToken, captcha, docs } = storeToRefs(useBaseStore());

csrfToken.value = props.csrfToken;
if (props.captcha)
	captcha.value = props.captcha;

function fillDocs() {
	props.docs?.forEach((doc: Doc) => {
		if (doc.code === 'user-agreement')
			docs.value.userAgreement = doc.link;
		if (doc.code === 'privacy-policy')
			docs.value.privacyPolicy = doc.link;
	});
}

// #I18N
// const { initI18n } = useI18n();

// #CART
// const { requestCart } = useCartStore();

onMounted(() => {
	fillDocs();
	// SCRIPTS
	initMediaAutoWrapper();
	calcAppProperties();
	initScrollToHash();

	// if (captcha.value.key)
	// 	initCaptcha();

	// #I18N
	// initI18n(props.locale || 'ru');

	// #CART
	// requestCart();
});
</script>

<template>
	<slot />

	<XCookie />
	<ModalCallback />
</template>
