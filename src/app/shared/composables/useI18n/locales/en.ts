import type ru from '@app/shared/composables/useI18n/locales/ru';
import type { SameKeys } from '../useI18n.types';
import { getNoun } from '@app/shared/utils/getNoun';

export default {
	test: {
		hello: 'Hello, ',
		jobTitle: 'frontend developer',
		applesCount: ({ count }: { count: number }) => `${count} ${getNoun(5, { single: 'apple', dual: 'apples', many: 'apples' })}`,
	},
	sharing: {
		success: 'Link copied to clipboard',
	},
	agreement: ({ policy, personal }: { policy: string; personal: string }): string => `I agree <a href=“${policy}” class=“link” target=“_blank”>with privacy policy</a> and <a href=“${personal}” class=“link” target=“_blank”>user agreement</a>`,
} as const satisfies SameKeys<typeof ru, typeof ru>;
