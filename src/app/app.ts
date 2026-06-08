import type { Component } from 'vue';

import appComponentsGlobal from '@app/app.components.global';
import { useCopyToClipboard } from '@app/shared/composables/useCopyToClipboard';
import ToastOptions from '@app/shared/consts/toastOptions';
import useDirectives from '@app/shared/directives';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Toast from 'vue3-toastify';
import { createYmaps } from 'vue-yandex-maps';
import { useModalsStore } from '@/app/shared/stores/modals.store';
import '@styles/shared/libs/toast.sass';

const APP_DATA: Component = {
	setup() {
		const { openModal } = useModalsStore();
		const { copyToClipboard } = useCopyToClipboard();
		return { copyToClipboard, openModal };
	},
};

const APP = createApp(APP_DATA);

APP
	.use(appComponentsGlobal)
	.use(createPinia())
	.use(Toast, ToastOptions)
	.use(createYmaps({
		apikey: '4e3d6d06-7a05-432b-85fe-6b30b52fa43c',
	}))
;
useDirectives(APP);

export default APP;
