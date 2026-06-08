import type { Directive } from 'vue';

interface StickyHeaderHTMLElement extends HTMLElement {
	_scrollHandler?: () => void;
	_lastScrollY?: number;
	_ticking?: boolean;
	_cleanupStickyHeader?: () => void;
}

/** Общая логика sticky-шапки: вешает скролл и возвращает функцию снятия. */
export function setupStickyHeader(el: StickyHeaderHTMLElement): () => void {
	el._lastScrollY = window.scrollY;

	function getHeaderHeight(): number {
		const value = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
		return value ? Number.parseFloat(value) || 0 : 0;
	}

	function updateHeaderClass() {
		const currentScrollY = window.scrollY;
		const headerHeight = getHeaderHeight();
		if (currentScrollY <= headerHeight) {
			el.classList.remove('sticky-hidden');
			el.classList.remove('sticky-active');
		}
		else if (currentScrollY > (el._lastScrollY ?? 0)) {
			el.classList.add('sticky-hidden');
			el.classList.remove('sticky-active');
		}
		else {
			el.classList.remove('sticky-hidden');
			el.classList.add('sticky-active');
		}
		el._lastScrollY = currentScrollY;
		el._ticking = false;
	}

	const onScroll = () => {
		if (!el._ticking) {
			window.requestAnimationFrame(updateHeaderClass);
			el._ticking = true;
		}
	};

	updateHeaderClass();
	window.addEventListener('scroll', onScroll, { passive: true });
	el._scrollHandler = onScroll;

	return () => {
		if (el._scrollHandler) {
			window.removeEventListener('scroll', el._scrollHandler);
		}
	};
}

const fixedHeader: Directive<StickyHeaderHTMLElement> = {
	mounted(el) {
		el._cleanupStickyHeader = setupStickyHeader(el);
	},
};

export default fixedHeader;
