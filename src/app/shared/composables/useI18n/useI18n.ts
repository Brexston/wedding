import type ru from './locales/ru';
import type { KeyPaths, ValueByPath } from './useI18n.types';
import { ref } from 'vue';

export type Messages = typeof ru;
export type I18nKey = KeyPaths<Messages>;
export type Locale = 'ru' | 'en';

const messages = ref<Record<string, any>>({});
const locale = ref<'ru' | 'en'>('ru'); // текущая локаль по умолчанию

export function useI18n() {
	async function initI18n(code: Locale) {
		// сохраняем текущую локаль (например чтобы отключать маску для инпутов телефона)
		locale.value = code;

		messages.value = await import(`./locales/${code}.ts`)
			.then(m => m.default)
			.catch((err) => {
				console.error('i18n load error', err);
				return {};
			});
	}

	// строго типизированный перевод
	function t<K extends I18nKey>(
		...args: ValueByPath<Messages, K> extends (...fnArgs: any) => any
			? [key: K, params: Parameters<ValueByPath<Messages, K>>[0]] // функция → 2 аргумента
			: [key: K] // строка → 1 аргумент
	):
	ValueByPath<Messages, K> extends (...fnArgs: any) => any
		? ReturnType<ValueByPath<Messages, K>>
		: ValueByPath<Messages, K> {
		const [key, params] = args as [string, any];

		if (!Object.keys(messages.value).length)
			return '' as any;

		const value = key.split('.').reduce(
			(acc: any, part) => acc?.[part],
			messages.value,
		);

		if (typeof value === 'function') {
			return value(params) as any;
		}

		return value as any;
	}

	return { t, initI18n, locale };
}
