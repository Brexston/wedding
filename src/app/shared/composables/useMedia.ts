import type { ViewportNames } from '@app/shared/consts/viewport';
import type { MaybeRefOrGetter } from 'vue';
import { VIEWPORT_SIZES } from '@app/shared/consts/viewport';
import { useMediaQuery } from '@vueuse/core';
import { toValue } from 'vue';

type UseMediaQueryType = MaybeRefOrGetter<'min' | 'max'>;
type UseMediaBreakpoint = MaybeRefOrGetter<ViewportNames>;

export function useMedia(queryType: UseMediaQueryType, breakpoint: UseMediaBreakpoint) {
	switch (toValue(queryType)) {
		case 'min':
			return useMediaQuery(
				`(${toValue(queryType)}-width: calc(${VIEWPORT_SIZES[toValue(breakpoint)] / 16}em + 0.1px))`,
			);
		case 'max':
			return useMediaQuery(
				`(${toValue(queryType)}-width: ${VIEWPORT_SIZES[toValue(breakpoint)] / 16}em)`,
			);
	}
}
