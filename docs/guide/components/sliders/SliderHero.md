# SliderHero

Vue-компонент для создания hero-слайдера с эффектами и миниатюрами на основе библиотеки [Swiper](https://swiperjs.com/).

Расположение: `src/app/shared/components/sliders/SliderHero.vue`

## Слоты

| Название | Описание                                   |
|:---------|:-------------------------------------------|
| default  | Основное содержимое слайдов                |
| thumbs   | Содержимое для слайдера с миниатюрами      |

## Использование

Пример для Pug:

```jade
section.page__section.section.hero-section
	slider-hero.hero-section__slider
		-for(let i = 0; i < 5; i ++)
			.swiper-slide
				article.hero-section__slide
					.hero-section__bg
						+image(
							{
								src: 'img/content/banner.jpg',
								width: '1140',
								height: '641',
								alt: 'banner',
								lazy: false
							}
						).hero-section__bg-image

					.hero-section__wrapper.wrapper
						.hero-section__title.title.title--h1 Заголовок <br> баннера
						.hero-section__text Возможно краткое <br> описание, утп
						a(href="#").hero-section__btn.btn.btn--color-secondary Подробнее

		template(#thumbs)
			-for(let i = 0; i < 5; i ++)
				.swiper-slide
					+image(
						{
							src: 'img/content/banner.jpg',
							width: '1140',
							height: '641',
						}
					).hero-section__thumb
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/sliders/XSliderHero.vue)
- [Swiper](https://swiperjs.com/)
