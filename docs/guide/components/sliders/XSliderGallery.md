# XSliderGallery

Vue-компонент для создания слайдера-галереи

Расположение: `src/app/shared/components/sliders/XSliderGallery.vue`

## Пропсы

| Название             | Тип                    | По умолчанию | Описание                                          |
|:---------------------|:-----------------------|--------------|:--------------------------------------------------|
| `currentSlide`       | `number`               | `0`          | Индекс слайда, открываемого при появлении галереи |
| `slides`<sup>*</sup> | `GallerySliderSlide[]` | -            | Массив слайдов                                    |

<sup>* - обязательный пропс</sup>

### Тип GallerySliderSlide
```ts
export interface GallerySliderSlide {
	src: string;
	poster: string;
	alt?: string;
}
```

## Использование
Слайдер использует встроенный в swiper прелоадер изображенией с лоадером
```vue
<script setup lang="ts">
import XSliderGallery from '@/app/shared/components/sliders/XSliderGallery.vue';

const slides = [
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
	{ poster: 'https://lipsum.app/id/9/450x300', src: 'https://lipsum.app/id/9/1800x1200', alt: 'alt' },
]
</script>

<template>
	<div class="container">
		<XSliderGallery :current-slide="3" :slides />
	</div>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/sliders/XSliderGallery.vue)
