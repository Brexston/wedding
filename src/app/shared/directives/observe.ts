import type { Directive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

interface ObserveElement extends HTMLElement {
	_stop?: () => void;
	_callback?: (entry: IntersectionObserverEntry) => void;
	_threshold?: number;
}

function createObserver(
	element: ObserveElement,
	callback: (entry: IntersectionObserverEntry) => void,
	threshold: number,
) {
	return useIntersectionObserver(
		element,
		([entry]) => {
			if (!entry)
				return;

			if (entry.isIntersecting) {
				callback(entry);
			}
		},
		{ threshold },
	);
}

/**
 * @description
 * Директива для наблюдения за пересечением элемента с viewport
 * @example
 * <div v-observe="callback" v-observe:0.5="callback"></div>
 * @param {HTMLElement} el
 * @param {object} binding
 * @param {Function} binding.value - Callback функция при пересечении
 * @param {number} binding.arg - Порог пересечения (по умолчанию 0.1)
 */
const observe: Directive<ObserveElement, (entry: IntersectionObserverEntry) => void> = {
	mounted: (el, binding) => {
		const threshold = binding.arg ? Number(binding.arg) : 0.1;
		el._callback = binding.value;
		el._threshold = threshold;
		el._stop = createObserver(el, binding.value, threshold).stop;
	},
	updated: (el, binding) => {
		const threshold = binding.arg ? Number(binding.arg) : 0.1;

		if (el._threshold !== threshold) {
			el._stop?.();
			el._threshold = threshold;
			el._stop = createObserver(el, binding.value, threshold).stop;
		}

		el._callback = binding.value;
	},
	unmounted: (el) => {
		el._stop?.();
		delete el._stop;
		delete el._callback;
		delete el._threshold;
	},
};

export default observe;
