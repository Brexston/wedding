<script setup lang="ts">
import type { Params } from '@app/modules/filters/filters.types';
import type { PaginationState } from '@app/modules/pagination/pagination.types.ts';
import type { BaseResponse } from '@app/shared/api/api.types.ts';
import { useFilters } from '@app/modules/filters/useFilters.ts';
import XPagination from '@app/shared/components/ui/XPagination.vue';
import { computed } from 'vue';

interface Props {
	fetchData: ((showMore?: boolean) => Promise<BaseResponse<unknown>>);
	appliedFilters: Params;
	pagination: PaginationState | null;
	isLoading?: boolean;
	isLoadingShowMore?: boolean;
}
const { fetchData, appliedFilters, pagination: paginationProps } = defineProps<Props>();
const { onUpdateFilters } = useFilters();
const pagination = computed<PaginationState | null>(() => {
	if (paginationProps) {
		return { ...paginationProps };
	}

	return null;
});

async function setPage(page?: number) {
	if (!pagination.value)
		return;

	if (page) {
		pagination.value.pageCurrent = page;
		onUpdateFilters(appliedFilters, { field: 'page', value: page });
		await fetchData();
		window.scrollTo(0, 0);
	}
	else {
		pagination.value.pageCurrent++;
		onUpdateFilters(appliedFilters, { field: 'page', value: pagination.value.pageCurrent });
		await fetchData(true);
	}
}
</script>

<template>
	<!--  TODO: Добавить лоадер для показать еще и скелетон	-->
	<XPagination
		v-if="pagination"
		:total-items="pagination.totalItems"
		:limit-items="pagination.limitItems"
		:page-current="pagination.pageCurrent"
		:show-show-more="pagination.showShowMore"
		@set-page="setPage"
	/>
</template>
