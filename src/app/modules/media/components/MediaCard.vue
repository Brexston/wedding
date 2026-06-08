<script setup lang="ts">
import type { MediaItem } from '@app/modules/media/media.types';

interface Props {
	item: MediaItem;
}

defineProps<Props>();
</script>

<template>
	<article class="media-card">
		<div class="media-card__title title title--h4">
			{{ item.name }}
		</div>
		<div class="media-card__bottom">
			<time class="media-card__date text">{{ item.date }}</time>
		</div>
		<a class="media-card__link" :href="item.url"></a>
	</article>
</template>

<style lang="sass" scoped>
.media-card
	display: grid
	align-content: flex-start
	gap: 20px
	background-color: var(--color-neutral-300)
</style>
