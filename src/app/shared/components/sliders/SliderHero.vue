<script setup lang="ts">
import type { CreativeEffectOptions, NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';
import { EffectCreative, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import { ref } from 'vue';

const slider = ref<SwiperInstance | null>(null);
const thumbsSwiper = ref<SwiperInstance | null>(null);
const modules = [Navigation, Pagination, Thumbs, EffectCreative];

const navigation: NavigationOptions = {
	nextEl: '.hero-section .swiper-button-next',
	prevEl: '.hero-section .swiper-button-prev',
	addIcons: false,
};
const pagination: PaginationOptions = {
	el: '.swiper-pagination',
};

const creativeEffect: CreativeEffectOptions = {
	prev: {
		shadow: true,
		translate: ['-20%', 0, -1],
	},
	next: {
		translate: ['100%', 0, 0],
	},
};

function setThumbsSwiper(swiper: SwiperInstance) {
	thumbsSwiper.value = swiper;
}
function onSwiper(swiper: SwiperInstance) {
	slider.value = swiper;
}
</script>

<template>
	<Swiper
		:class="$attrs.class"
		:modules="modules"
		:thumbs="{ swiper: thumbsSwiper }"
		:slides-per-view="1"
		:space-between="10"
		:speed="500"
		effect="creative"
		:creative-effect
		:navigation
		:pagination
		@swiper="onSwiper"
	>
		<template #wrapper-start>
			<slot />
		</template>
	</Swiper>

	<div class="hero-section__bottom wrapper">
		<Swiper
			class="hero-section__thumbs"
			:modules="[Thumbs]"
			:space-between="10"
			:speed="500"
			slides-per-view="auto"
			:watch-slides-progress="true"
			@swiper="setThumbsSwiper"
		>
			<template #wrapper-start>
				<slot name="thumbs" />
			</template>
		</Swiper>
		<div class="hero-section__actions">
			<div class="swiper-pagination"></div>
			<div class="swiper-buttons">
				<button class="swiper-button swiper-button-prev"></button>
				<button class="swiper-button swiper-button-next"></button>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
@import 'swiper/css/effect-creative'
</style>
