<script setup lang="ts">
import type { PhantomUiAttributes } from '@aejkatappaja/phantom-ui';
import '@aejkatappaja/phantom-ui';

interface Props {
	loading?: PhantomUiAttributes['loading'];
	animation?: PhantomUiAttributes['animation'];
	stagger?: PhantomUiAttributes['stagger'];
	reveal?: PhantomUiAttributes['reveal'];
	count?: PhantomUiAttributes['count'];
	countGap?: PhantomUiAttributes['count-gap'];
	shimmerDirection?: PhantomUiAttributes['shimmer-direction'];
	shimmerColor?: PhantomUiAttributes['shimmer-color'];
	backgroundColor?: PhantomUiAttributes['background-color'];
	duration?: PhantomUiAttributes['duration'];
	fallbackRadius?: PhantomUiAttributes['fallback-radius'];
	debug?: PhantomUiAttributes['debug'];
}

const {
	loading = false,
	animation = 'shimmer',
	stagger = 0,
	reveal = 0,
	count = 1,
	countGap = 0,
	shimmerDirection = 'ltr',
	shimmerColor = 'var(--color-neutral-100)',
	backgroundColor = 'var(--color-neutral-200)',
	duration = 1.5,
	fallbackRadius = 4,
	debug = false,
} = defineProps<Props>();
</script>

<template>
	<phantom-ui
		:loading
		:animation
		:stagger
		:reveal
		:count
		:count-gap
		:shimmer-direction
		:shimmer-color
		:background-color
		:duration
		:fallback-radius
		:debug
		class="skeleton"
	>
		<slot />
	</phantom-ui>
</template>
