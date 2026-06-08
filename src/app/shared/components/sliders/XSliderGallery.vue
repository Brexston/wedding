<script setup lang="ts">
import type { NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import XImage from '@app/shared/components/ui/XImage.vue';
import { Keyboard, Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import { ref } from 'vue';

export interface GallerySliderSlide {
	src: string;
	poster: string;
	alt?: string;
}

interface GallerySliderProps {
	currentSlide: number;
	slides: GallerySliderSlide[];
}

defineProps<GallerySliderProps>();

const slider = ref<SwiperInstance | null>(null);
const thumbsSlider = ref<SwiperInstance | null>(null);
const preload = 1;
const preloadedSlides = ref(new Set());
const preloadedThumbs = ref(new Set());
const navigation: NavigationOptions = {
	nextEl: '#gallery-slider .swiper__nav-btn--next',
	prevEl: '#gallery-slider .swiper__nav-btn--prev',
	addIcons: false,
};
const pagination: PaginationOptions = {
	el: '#gallery-slider .gallery-slider__pagination',
	type: 'fraction',
	renderFraction(currentClass, totalClass) {
		return `
			<span class="${currentClass}"></span>
			<span>-</span>
			<span class="${totalClass}"></span>
		`;
	},
};

function onSwiper(swiper: SwiperInstance) {
	slider.value = swiper;

	initSlideMedia();
}

function setThumbsSlider(swiper: SwiperInstance) {
	thumbsSlider.value = swiper;

	initThumbs();
}

function onSlideChange() {
	if (!slider.value)
		return;

	initSlideMedia();
	initThumbs();
}

function initSlideMedia() {
	if (!slider.value)
		return;

	const activeSlideIndex = slider.value.activeIndex;

	const minSlide = activeSlideIndex - preload < 0 ? 0 : activeSlideIndex - preload;
	const maxSlide = activeSlideIndex + preload > slider.value.slides.length + 1 ? slider.value.slides.length + 1 : activeSlideIndex + preload;

	for (let i = minSlide; i <= maxSlide; i++) {
		preloadedSlides.value.add(i);
	}
}

function initThumbs() {
	if (!thumbsSlider.value)
		return;

	const thumbs = thumbsSlider.value.slides;

	thumbs.forEach((thumb: HTMLElement, i) => {
		if (!preloadedThumbs.value.has(i)) {
			const x = thumb.getBoundingClientRect().x;
			if (x > 0 && x < window.innerWidth)
				preloadedThumbs.value.add(i);
		}
	});
}
</script>

<template>
	<div id="gallery-slider" class="gallery-slider">
		<Swiper
			class="gallery-slider__slider"
			:modules="[Navigation, Pagination, Thumbs, Keyboard, Zoom]"
			:thumbs="{ swiper: thumbsSlider }"
			:slides-per-view="1"
			:space-between="12"
			:navigation
			:pagination
			:speed="500"
			:initial-slide="currentSlide || 0"
			:keyboard="{
				enabled: true,
			}"
			:zoom="{
				toggle: true,
			}"
			@swiper="onSwiper"
			@slide-change="onSlideChange"
		>
			<template #wrapper-start>
				<div
					v-for="(slide, key) in slides"
					:key
					class="swiper-slide gallery-slider__slide"
					:data-hash="`gallery&slide-${key}`"
				>
					<div class="swiper-zoom-container">
						<XImage
							v-if="preloadedSlides.has(key)"
							:src="slide.src"
							class="gallery-slider__media swiper-zoom-target"
						/>
					</div>
					<div class="swiper-lazy-preloader"></div>
				</div>
			</template>

			<template v-if="slides.length > 1" #container-end>
				<div class="gallery-slider__pagination" />
				<div class="swiper__nav">
					<button class="swiper__nav-btn swiper__nav-btn--prev link">
						<XIcon class="swiper__nav-icon link__icon" name="chevron-left" />
					</button>
					<button class="swiper__nav-btn swiper__nav-btn--next link">
						<XIcon class="swiper__nav-icon link__icon" name="chevron-right" />
					</button>
				</div>
			</template>
		</Swiper>

		<Swiper
			v-if="slides.length > 1"
			class="gallery-slider__thumbs"
			:modules="[Thumbs]"
			:space-between="12"
			slides-per-view="auto"
			:speed="500"
			@swiper="setThumbsSlider"
			@slider-move="initThumbs"
		>
			<template #wrapper-start>
				<div v-for="(slide, key) in slides" :key class="gallery-slider__thumb swiper-slide">
					<XImage
						class="gallery-slider__thumb-img"
						:src="slide.poster"
						:alt="slide.alt"
						width="96"
						height="64"
					/>
					<div class="swiper-lazy-preloader"></div>
				</div>
			</template>
		</Swiper>
	</div>
</template>

<style lang="sass">
@import '@styles/shared/ui/gallery-slider.sass'
</style>
