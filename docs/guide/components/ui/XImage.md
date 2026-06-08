# XImage

Компонент-обертка для `<picture>` и `<img>`, позволяющий удобно подключать адаптивные изображения с использованием
медиазапросов и разных источников для разных размеров экранов.

Расположение: `src/app/shared/components/ui/XImage.vue`<br>
Аналоги: pug-mixin [image](../../pug-mixins/image.md)

## Пропсы

| Название        | Тип                           | По умолчанию | Описание                                                     |
|-----------------|-------------------------------|--------------|--------------------------------------------------------------|
| src<sup>*</sup> | `string`                      | –            | Основной путь к изображению                                  |
| width           | `string`,<br/>`number`        | –            | Ширина изображения                                           |
| height          | `string`,<br/>`number`        | –            | Высота изображения                                           |
| alt             | `string`                      | `'alt'`      | Альтернативный текст для изображения                         |
| loading         | `'lazy'`,<br/>`'eager'`       | `'lazy'`     | Способ загрузки изображения: отложенная или немедленная      |
| images          | [`Breakpoint[]`](#breakpoint) | –            | Массив дополнительных изображений с условиями медиазапросов  |

<sup>* - обязательный пропс</sup>

### Тип Breakpoint {#breakpoint}

```ts
interface Breakpoint {
	src: string;
	mediaQuery: 'max-width' | 'min-width';
	breakpoint: ViewportNames;
}
```

## Использование

Простой пример:

```vue
<script setup lang="ts">
import XImage from '@/app/shared/components/ui/XImage.vue';
</script>

<template>
	<XImage
		src="/img/content/banner.jpg"
		width="1920"
		height="1080"
		alt="banner"
	/>
</template>
```

Пример с адаптивными изображениями:

```vue
<script setup lang="ts">
import XImage from '@/app/shared/components/ui/XImage.vue';
</script>

<template>
	<XImage
		src="/img/desktop.jpg"
		width="1920"
		height="1080"
		alt="banner"
		:images="[
			{
				src: '/img/mobile.jpg',
				mediaQuery: 'max-width',
				breakpoint: 'mobile',
				width: 320,
				height; 540,
			},
			{
				src: '/img/tablet.jpg',
				mediaQuery: 'max-width',
				breakpoint: 'tablet',
				width: 560,
				height; 720,
			},
		]"
	/>
</template>
```

::: warning Важно
Нужно корректно заполнить все поля ```width``` и ```height```, так-как эти данные используются специалистами бэкенд-отдела для настройки ресайза.

Для мобильных изображений также важно прописывать эти размеры
:::

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XImage.vue)
