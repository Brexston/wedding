# XSlider

Vue-компонент для создания базового слайдера на основе библиотеки [Swiper](https://swiperjs.com/).

Расположение: `src/app/shared/components/sliders/XSlider.vue`

## Пропсы

| Название       | Тип                    | По умолчанию | Описание                                          |
|:---------------|:-----------------------|--------------|:--------------------------------------------------|
| id<sup>*</sup> | `string`               | -            | Идентификатор слайдера, используется для навигации |
| slidesPerView  | `number \| 'auto'`     | `1`          | Количество отображаемых слайдов                   |
| breakpoints    | `object`               | -            | Настройки адаптивности слайдера                   |
| centeredSlides | `boolean`              | -            | Центрирование активного слайда                    |
| loop           | `boolean`              | -            | Бесконечная прокрутка слайдов                     |
| spaceBetween   | `number`               | `8`          | Расстояние между слайдами в пикселях              |

<sup>* - обязательный пропс</sup>

## Использование

Пример для Vue:

```vue
<script setup lang="ts">
import XSlider from '@/app/shared/components/sliders/XSlider.vue';
import XImage from '@/app/shared/components/ui/XImage.vue';
</script>

<template>
	<XSlider 
		id="default-slider"
		:slides-per-view="2"
		:space-between="10"
		:breakpoints="{
			1: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			481: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1280: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		}"
		class="section-slider__slider"
	>
		<div class="swiper-slide">
			<XImage 
				src="img/content/photo.jpg"
				width="270"
				height="152"
			/>
		</div>
	</XSlider>
</template>
```

Пример для Pug:

```jade
x-slider(id="default-slider" :slides-per-view="2" :space-between="10" :breakpoints="{ 1: { slidesPerView: 2, spaceBetween: 10 }, 481: { slidesPerView: 3, spaceBetween: 10 }, 1280: { slidesPerView: 5, spaceBetween: 20 } }").section-slider__slider
	-for (let i = 0; i < 9; i++)
		.swiper-slide(style="background-color: var(--color-primary-300)")
			+image(
				{
					src: 'img/content/photo.jpg',
					width: '270',
					height: '152',
				}
			)
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/sliders/XSlider.vue)
- [Swiper](https://swiperjs.com/)
