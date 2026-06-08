# mediaAutoWrapper

Функция для автоматического оборачивания таблиц и видео в контейнеры с соответствующими классами на контентных страницах.

Расположение: `src/app/shared/scripts/mediaAutoWrapper.ts`

## Описание

`initMediaAutoWrapper` автоматически находит все таблицы (`<table>`) и видео (`<iframe>`) внутри элементов с классом `.standard-block`, которые не имеют собственных классов, и оборачивает их в `div`-контейнеры с соответствующими классами для стилизации.

## Поведение

### Таблицы

Все таблицы без классов внутри `.standard-block` оборачиваются в `div` с классом `table-wrap`. Это необходимо для стилизации таблиц в мобильной версии, чтобы добавлять горизонтальный скролл при необходимости:

```html
<!-- До -->
<div class="standard-block">
  <table>
    <!-- содержимое таблицы -->
  </table>
</div>

<!-- После -->
<div class="standard-block">
  <div class="table-wrap">
    <table>
      <!-- содержимое таблицы -->
    </table>
  </div>
</div>
```

### Видео (iframe)

Все `iframe` без классов внутри `.standard-block` оборачиваются в `div` с классом `video-wrap`, а сам `iframe` получает класс `video-wrap__video`:

```html
<!-- До -->
<div class="standard-block">
  <iframe src="..."></iframe>
</div>

<!-- После -->
<div class="standard-block">
  <div class="video-wrap">
    <iframe class="video-wrap__video" src="..."></iframe>
  </div>
</div>
```

## Важные особенности

1. **Обрабатываются только элементы без классов**: Функция ищет элементы с селектором `:not([class])`, поэтому таблицы и `iframe`, у которых уже есть классы, не будут обработаны.

2. **Работает только внутри `.standard-block`**: Функция обрабатывает только элементы, находящиеся внутри контейнеров с классом `standard-block`.

3. **Выполняется один раз**: Функция вызывается при монтировании компонента и обрабатывает существующие на момент вызова элементы.

## Использование

Функция вызывается автоматически в `RootComponent` при монтировании приложения:

```ts
onMounted(() => {
  initMediaAutoWrapper();
  // другие инициализации...
});
```

Если необходимо вызвать функцию вручную (например, после динамической загрузки контента):

```ts
import initMediaAutoWrapper from '@app/shared/scripts/mediaAutoWrapper';

// После загрузки контента
initMediaAutoWrapper();
```

## Примеры

### Базовое использование

Функция подключается в `RootComponent.vue` и автоматически вызывается при монтировании приложения. Она работает с контентными разделами, обрабатывая все таблицы и видео внутри элементов с классом `.standard-block` на странице.

```47:52:src/app/modules/RootComponent.vue
onMounted(() => {
	fillDocs();
	// SCRIPTS
	initMediaAutoWrapper();
	calcAppProperties();
	initScrollToHash();
```

### Динамический контент

Если контент загружается динамически после монтирования компонента, необходимо вызвать функцию повторно:

```vue
<script setup lang="ts">
import initMediaAutoWrapper from '@app/shared/scripts/mediaAutoWrapper';
import { onMounted, nextTick } from 'vue';

async function loadContent() {
  // загрузка контента...
  await nextTick();
  initMediaAutoWrapper(); // повторная обработка после загрузки
}

onMounted(() => {
  loadContent();
});
</script>
```

## Исходный код

```20:37:src/app/shared/scripts/mediaAutoWrapper.ts
export default function initMediaAutoWrapper() {
	const videos = document.querySelectorAll('.standard-block iframe:not([class])');
	const tables = document.querySelectorAll('.standard-block table:not([class])');

	[...Array.from(tables), ...Array.from(videos)].forEach((elem) => {
		const wrapper = document.createElement('div');

		if (elem.tagName === 'TABLE') {
			wrapper.classList.add('table-wrap');
		}
		else if (elem.tagName === 'IFRAME') {
			wrapper.classList.add('video-wrap');
			elem.classList.add('video-wrap__video');
		}

		wrap(elem, wrapper);
	});
}
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/scripts/mediaAutoWrapper.ts)
