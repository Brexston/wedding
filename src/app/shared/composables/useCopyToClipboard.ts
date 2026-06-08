import { useI18n } from '@app/shared/composables/useI18n/useI18n';
import { toastSuccess } from '@app/shared/utils/toast';
import { useClipboard } from '@vueuse/core';

export function useCopyToClipboard() {
	const { t } = useI18n();
	const { isSupported, copy, copied } = useClipboard();

	async function copyToClipboard(url?: string, message?: string) {
		if (!isSupported)
			return;
		await copy(url || window.location.href);
		if (copied)
			toastSuccess(message || t('sharing.success'));
	}

	return { copyToClipboard };
}
