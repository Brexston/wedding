import type { IconType, ToastOptions } from 'vue3-toastify';
import { toast } from 'vue3-toastify';
import ErrorUse from '@/assets/icons/error.svg?use';
import InfoUse from '@/assets/icons/info.svg?use';
import SuccessUse from '@/assets/icons/success.svg?use';
import WarningUse from '@/assets/icons/warning.svg?use';

type OmitTypeToastOption = Omit<ToastOptions, 'type' | 'disabledEnterTransition'>;

function toastError(message: string, options?: OmitTypeToastOption) {
	toast.error(message, {
		icon: ErrorUse as IconType,
		...options,
	});
}

function toastInfo(message: string, options?: OmitTypeToastOption) {
	toast.info(message, {
		icon: InfoUse as IconType,
		...options,
	});
}

function toastSuccess(message: string, options?: OmitTypeToastOption) {
	toast.success(message, {
		icon: SuccessUse as IconType,
		...options,
	});
}

function toastWarning(message: string, options?: OmitTypeToastOption) {
	toast.warning(message, {
		icon: WarningUse as IconType,
		...options,
	});
}

export {
	toastError,
	toastInfo,
	toastSuccess,
	toastWarning,
};
