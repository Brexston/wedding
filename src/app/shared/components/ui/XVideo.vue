<script lang="ts" setup>
import type { ViewportNames } from '@app/shared/consts/viewport';
import type { ImgHTMLAttributes, SourceHTMLAttributes, VideoHTMLAttributes } from 'vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { VIEWPORT_SIZES } from '@app/shared/consts/viewport';
import { computed, ref, useTemplateRef } from 'vue';

export interface VideoSource {
	src: string;
	type: SourceHTMLAttributes['type']; // 'video/webm' | 'video/mp4'
	mediaQuery?: 'max-width' | 'min-width';
	breakpoint?: ViewportNames;
}

export interface Video {
	poster: VideoHTMLAttributes['poster'];
	sources: VideoSource[];
}

interface Props {
	video: Video;
	width: string | number;
	height: string | number;
	loading?: ImgHTMLAttributes['loading'];
	muted?: VideoHTMLAttributes['muted'];
	controls?: VideoHTMLAttributes['controls'];
	autoplay?: VideoHTMLAttributes['autoplay'];
	loop?: VideoHTMLAttributes['loop'];
	isHover?: boolean;
}

const {
	video,
	width,
	height,
	autoplay,
	loading = 'lazy',
	muted = true,
} = defineProps<Props>();

const videoRef = useTemplateRef<HTMLVideoElement>('video');
const isPlaying = ref(false);
const isErrored = ref(false);
const widthStyle = `${Number(width) / 16}rem`;
const aspectRatio = `${width} / ${height}`;

function playVideo() {
	if (!videoRef.value)
		return;

	if (isPlaying.value)
		videoRef.value.pause();
	else
		videoRef.value.play();
}

function stopVideo() {
	if (!videoRef.value)
		return;

	if (isPlaying.value) {
		videoRef.value.pause();
		videoRef.value.currentTime = 0;
	}
}

const mediaQueries = computed(() => {
	return video.sources.map((source) => {
		if (!source.breakpoint || !source.mediaQuery)
			return '';

		const size = VIEWPORT_SIZES[source.breakpoint] / 16; // Получаем размер в rem
		return `(${source.mediaQuery}: ${source.mediaQuery === 'max-width' ? `${size}em` : `${size + 0.1}em`})`;
	});
});
</script>

<template>
	<div
		class="video"
		:class="{ 'video--playing': isPlaying }"
		@mouseenter="!isHover || playVideo()"
		@mouseleave="!isHover || stopVideo()"
	>
		<video
			ref="video"
			class="video__video"
			:poster="video.poster"
			:loading
			:controls
			:muted="muted || isHover || autoplay"
			:loop
			:autoplay
			:playsinline="autoplay"
			preload="metadata"
			@play="isPlaying = true"
			@pause="isPlaying = false"
			@error="isErrored = true"
		>
			<source
				v-for="(source, key) in video.sources"
				:key
				:src="source.src"
				:type="source.type"
				:media="mediaQueries[key]"
			>
		</video>
		<button v-if="!isHover && !isErrored && !autoplay" class="btn video__action" @click="playVideo()">
			<XIcon class="btn__icon" :name="isPlaying ? 'pause' : 'play'" />
		</button>
		<span v-if="isErrored" class="video__error">Ошибка загрузки видео</span>
	</div>
</template>

<style scoped lang="sass">
.video
	--width: v-bind(widthStyle)
	--aspect-ratio: v-bind(aspectRatio)
	--radius: 0
	--object-fit: cover
	--object-position: center
	//-----------------
	position: relative
	isolation: isolate

	width: var(--width)
	max-width: 100%
	height: auto
	aspect-ratio: var(--aspect-ratio)

	overflow: hidden

	border-radius: var(--radius)

	&.video--playing
		@include hover
			.video
				&__action
					opacity: 1

		.video
			&__action
				opacity: 0

	&__video
		display: block
		width: 100%
		height: 100%
		object-fit: var(--object-fit)
		object-position: var(--object-position)

	&__action
		position: absolute
		top: 50%
		left: 50%
		z-index: var(--z-index-above)

		width: 64px
		height: 64px

		transform: translate(-50%, -50%)
		transition: opacity 0.3s

		.btn__icon
			width: 24px
			height: 24px
			color: currentcolor

	&__error
		position: absolute
		top: 50%
		left: 50%
		z-index: var(--z-index-above)

		color: var(--color-white)
		font-size: var(--font-size-text-s)
		line-height: var(--line-height-s)

		text-align: center
		text-transform: uppercase

		transform: translate(-50%, -50%)
</style>
