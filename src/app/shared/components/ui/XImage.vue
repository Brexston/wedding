<script lang="ts" setup>
import type { ViewportNames } from '@app/shared/consts/viewport';
import { VIEWPORT_SIZES } from '@app/shared/consts/viewport';

interface Breakpoint {
	src: string;
	mediaQuery: 'max-width' | 'min-width';
	breakpoint: ViewportNames;
	width?: string | number;
	height?: string | number;
}

interface Props {
	src: string;
	width?: string | number;
	height?: string | number;
	alt?: string;
	loading?: 'lazy' | 'eager';
	images?: Breakpoint[];
}

const {
	alt = 'alt',
	loading = 'lazy',
} = defineProps<Props>();
</script>

<template>
	<picture class="img">
		<source
			v-for="(image, key) in images"
			:key
			:srcset="image.src"
			:media="`(${image.mediaQuery}: ${image.mediaQuery === 'max-width' ? VIEWPORT_SIZES[image.breakpoint] / 16 : VIEWPORT_SIZES[image.breakpoint] / 16 + 0.1}em)`"
			:width="image.width"
			:height="image.height"
		>
		<img
			class="img__image"
			:src
			:width
			:height
			:alt
			:loading
		/>
	</picture>
</template>
