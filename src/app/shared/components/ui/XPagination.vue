<script setup lang="ts">
import type { PaginationProps } from '@app/modules/pagination/pagination.types.ts';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { computed } from 'vue';

interface Props extends PaginationProps {}

const {
	totalItems,
	limitItems,
	maxButtons = 5,
	showNavigation = true,
	showEllipsis = true,
	showShowMore = true,
	theme = 'default',
} = defineProps<Props>();
const emit = defineEmits<{ setPage: [page?: number] }>();

const modelValue = defineModel<number>({ default: 1 });

const totalPages = computed(() => Math.ceil(totalItems / limitItems));
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1));

const visiblePages = computed(() => {
	const half = Math.floor(maxButtons / 2);
	let start = Math.max(1, modelValue.value - half);
	const end = Math.min(totalPages.value, start + maxButtons - 1);

	start = Math.max(1, end - maxButtons + 1);
	return pages.value.slice(start - 1, end);
});

const showStartPage = computed(() => showEllipsis && visiblePages.value[0]! > 1);
const showEndPage = computed(() => showEllipsis && visiblePages.value.at(-1)! < totalPages.value);
const showLeftEllipsis = computed(() => showEllipsis && visiblePages.value[0]! > 2);
const showRightEllipsis = computed(() => showEllipsis && visiblePages.value.at(-1)! < totalPages.value - 1);

function setPage(page?: number) {
	if (page) {
		if (page >= 1 && page <= totalPages.value) {
			modelValue.value = page;
			emit('setPage', modelValue.value);
		}
	}
	else {
		modelValue.value++;
		emit('setPage');
	}
}

function onEllipsisClick(direction: 'left' | 'right') {
	if (direction === 'left')
		setPage(visiblePages.value[0]! - 1);
	else
		setPage(visiblePages.value.at(-1)! + 1);
}
</script>

<template>
	<div class="pagination-block">
		<button
			v-if="showShowMore && (modelValue !== totalItems)"
			class="pagination-block__btn btn"
			@click="setPage(modelValue + 1)"
		>
			<span class="btn__text">Показать ещё</span>
			<XIcon name="arrow-down" class="btn__icon" />
		</button>

		<div class="pagination-block__pagination">
			<div class="pagination" :class="`pagination--${theme}`">
				<button
					v-if="showNavigation"
					:disabled="modelValue === 1"
					class="pagination__button pagination__button--navigation"
					@click="setPage(modelValue - 1)"
				>
					<XIcon name="chevron-left" class="pagination__icon" />
				</button>

				<button
					v-if="showStartPage"
					class="pagination__button"
					@click="setPage(1)"
				>
					1
				</button>

				<button
					v-if="showLeftEllipsis"
					class="pagination__button pagination__button--ellipsis"
					@click="onEllipsisClick('left')"
				>
					...
				</button>

				<button
					v-for="page in visiblePages"
					:key="page"
					class="pagination__button"
					:class="{ active: modelValue === page }"
					@click="setPage(page)"
				>
					{{ page }}
				</button>

				<button
					v-if="showRightEllipsis"
					class="pagination__button pagination__button--ellipsis"
					@click="onEllipsisClick('right')"
				>
					...
				</button>

				<button
					v-if="showEndPage"
					class="pagination__button"
					@click="setPage(totalPages)"
				>
					{{ totalPages }}
				</button>

				<button
					v-if="showNavigation"
					:disabled="modelValue === totalPages"
					class="pagination__button pagination__button--navigation"
					@click="setPage(modelValue + 1)"
				>
					<XIcon name="chevron-right" class="pagination__icon" />
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
.pagination-block
	display: flex
	align-items: center
	justify-content: space-between
	gap: var(--g-m)

	@include media('max', 'mobile-xl')
		display: flex
		flex-direction: column

	&__btn
		@include media('max', 'mobile-xl')
			order: 2

	&__pagination
		margin-left: auto

.pagination
	--pagination-gap: var(--g-xs)
	// -----------------
	--pagination-button-size: 32px
	--pagination-button-px: var(--p-xs)
	--pagination-button-py: var(--p-xs)
	--pagination-button-gap: var(--g-xs)
	// -----------------
	--pagination-font-family: var(--font-family-primary)
	--pagination-font-size: var(--font-size-text-l)
	--pagination-line-height: 1
	--pagination-letter-spacing: inherit
	--pagination-font-weight: 400
	--pagination-text-transform: none
	// -----------------
	--pagination-color: inherit
	--pagination-color-hover: inherit
	--pagination-color-disabled: inherit
	--pagination-color-active: inherit
	--pagination-color-active-hover: inherit
	--pagination-color-active-disabled: inherit
	// -----------------
	--pagination-bg: transparent
	--pagination-bg-hover: transparent
	--pagination-bg-disabled: transparent
	--pagination-bg-active: transparent
	--pagination-bg-active-hover: transparent
	--pagination-bg-active-disabled: transparent
	// -----------------
	--pagination-border-size: 0
	--pagination-border-color: transparent
	--pagination-border-color-hover: transparent
	--pagination-border-color-disabled: transparent
	--pagination-border-color-active: transparent
	--pagination-border-color-active-hover: transparent
	--pagination-border-color-active-disabled: transparent
	// -----------------
	--pagination-radius: var(--radius-s)
	// -----------------
	--pagination-icon-size: 24px

	display: flex
	align-items: center
	justify-content: center
	gap: var(--pagination-gap)

	&__button
		display: inline-flex
		align-items: center
		justify-content: center
		gap: var(--pagination-button-gap)

		min-width: var(--pagination-button-size)
		min-height: var(--pagination-button-size)
		padding: var(--pagination-button-py) var(--pagination-button-px)

		border: var(--pagination-border-size) solid var(--pagination-border-color)
		border-radius: var(--pagination-radius)

		background-color: var(--pagination-bg)

		color: var(--pagination-color)

		font-family: var(--pagination-font-family)
		font-size: var(--pagination-font-size)
		font-weight: var(--pagination-font-weight)
		letter-spacing: var(--pagination-letter-spacing)
		line-height: var(--pagination-line-height)

		text-align: center
		text-decoration: none

		text-transform: var(--pagination-text-transform)

		transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease

		cursor: pointer

		@include hover
			border-color: var(--pagination-border-color-hover)
			background-color: var(--pagination-bg-hover)
			color: var(--pagination-color-hover)

		&:active,
		&.active
			border-color: var(--pagination-border-color-active)
			background-color: var(--pagination-bg-active)
			color: var(--pagination-color-active)

			@include hover
				border-color: var(--pagination-border-color-active-hover)
				background-color: var(--pagination-bg-active-hover)
				color: var(--pagination-color-active-hover)

			&.disabled,
			&:disabled
				border-color: var(--pagination-border-color-active-disabled)
				background-color: var(--pagination-bg-active-disabled)
				color: var(--pagination-color-active-disabled)

		&:disabled,
		&.disabled
			border-color: var(--pagination-border-color-disabled)
			background-color: var(--pagination-bg-disabled)
			color: var(--pagination-color-disabled)
			pointer-events: none

	&__icon
		display: block
		flex: none
		width: var(--pagination-icon-size)
		height: var(--pagination-icon-size)
		color: currentcolor

	&--default
		--pagination-color: var(--color-neutral-900)
		--pagination-color-hover: var(--color-neutral-900)
		--pagination-color-disabled: var(--color-neutral-500)
		--pagination-color-active: var(--color-neutral-100)
		--pagination-color-active-hover: var(--color-neutral-100)
		--pagination-color-active-disabled: var(--color-neutral-100)
		// -----------------
		--pagination-bg: transparent
		--pagination-bg-hover: var(--color-neutral-200)
		--pagination-bg-disabled: transparent
		--pagination-bg-active: var(--color-primary-500)
		--pagination-bg-active-hover: var(--color-primary-400)
		--pagination-bg-active-disabled: var(--color-neutral-300)

	&--light
		--pagination-color: var(--color-neutral-100)
		--pagination-color-hover: var(--color-neutral-100)
		--pagination-color-disabled: rgba(var(--color-neutral-900-trans), 0.5)
		--pagination-color-active: var(--color-primary-500)
		--pagination-color-active-hover: var(--color-primary-500)
		--pagination-color-active-disabled: var(--color-primary-500)
		// -----------------
		--pagination-bg: transparent
		--pagination-bg-hover: rgba(var(--color-neutral-100-trans), 0.1)
		--pagination-bg-disabled: transparent
		--pagination-bg-active: var(--color-neutral-100)
		--pagination-bg-active-hover: rgba(var(--color-neutral-900-trans), 0.8)
		--pagination-bg-active-disabled: rgba(var(--color-neutral-900-trans), 0.3)
</style>
