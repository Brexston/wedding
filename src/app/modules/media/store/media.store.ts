import type { MediaItem } from '@app/modules/media/media.types';
import type { PaginationState, Params } from '@app/modules/pagination/pagination.types.ts';
import { mediaApi } from '@app/modules/media/api/media.api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMediaStore = defineStore('media', () => {
	// State
	const items = ref<MediaItem[]>([]);
	const pagination = ref<PaginationState | null>(null);
	const appliedFilters = ref<Params>({
		page: pagination.value ? pagination.value.pageCurrent : 1,
	});
	const currentTag = ref<string>('all');

	// Actions
	async function requestMedia(showMore?: boolean) {
		const params = {
			...appliedFilters.value,
		};

		const response = await mediaApi.requestMedia(params);
		if (response.data) {
			if (showMore)
				items.value.push(...response.data.items);
			else
				items.value = response.data.items;
			pagination.value = response.data.pagination;
		}

		return response;
	}

	return {
		// State
		items,
		pagination,
		appliedFilters,
		currentTag,

		// Actions
		requestMedia,
	};
});
