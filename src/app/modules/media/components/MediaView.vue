<script setup lang="ts">
import type { MediaItem } from '@app/modules/media/media.types';
import type { PaginationState } from '@app/modules/pagination/pagination.types.ts';
import { MediaApiKeys } from '@app/modules/media/api/media.api';
import MediaCard from '@app/modules/media/components/MediaCard.vue';
import { useMediaStore } from '@app/modules/media/store/media.store';
import PaginationBlock from '@app/modules/pagination/components/PaginationBlock.vue';
import XLoader from '@app/shared/components/ui/XLoader.vue';
import { useApiStore } from '@app/shared/stores/api.store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

interface Props {
	items: MediaItem[];
	pagination: PaginationState;
}

const props = defineProps<Props>();

const { isPending } = useApiStore();
const { items: cards, appliedFilters, pagination } = storeToRefs(useMediaStore());
const { requestMedia } = useMediaStore();

cards.value = props.items;

if (props.pagination)
	pagination.value = props.pagination;

const isLoading = computed(() => isPending(MediaApiKeys.MEDIA));
</script>

<template>
	<XLoader v-if="isLoading" />
	<template v-if="items.length">
		<div class="media-list">
			<MediaCard v-for="card in cards" :key="card.id" :item="card" />
		</div>

		<PaginationBlock
			:fetch-data="requestMedia"
			:applied-filters
			:pagination
		/>
	</template>
	<p v-else>
		Новостей нет
	</p>
</template>

<style lang="sass" scoped>
.media-list
	display: grid
	grid-template-columns: repeat(3, minmax(0, 1fr))
	align-content: flex-start
	gap: 20px
</style>
