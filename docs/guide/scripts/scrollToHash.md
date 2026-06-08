# scrollToHash

Функция для автоматической прокрутки к элементу по hash в URL при загрузке страницы.

Расположение: `src/app/shared/scripts/scrollToHash.ts`

## Описание

`initScrollToHash` проверяет наличие hash-фрагмента в URL и автоматически прокручивает страницу к элементу с соответствующим `id`. Это полезно для работы с якорными ссылками и навигацией по странице.

## Поведение

Функция выполняет следующие действия:

1. Проверяет наличие hash в URL (`location.hash`)
2. Если hash отсутствует, функция завершает работу
3. Ищет элемент в DOM с `id`, соответствующим hash
4. Если элемент найден, прокручивает к нему страницу с помощью `scrollIntoView()`

## Важные особенности

1. **Работает только при наличии hash**: Функция выполняется только если в URL присутствует hash-фрагмент (например, `#section`).

2. **Требуется наличие элемента**: Если элемент с соответствующим `id` не найден в DOM, функция завершает работу без ошибок.

3. **Выполняется один раз**: Функция вызывается при монтировании компонента и обрабатывает hash, присутствующий на момент вызова.

## Использование

Функция вызывается автоматически в `RootComponent` при монтировании приложения:

```47:52:src/app/modules/RootComponent.vue
onMounted(() => {
	fillDocs();
	// SCRIPTS
	initMediaAutoWrapper();
	calcAppProperties();
	initScrollToHash();
```

Если необходимо вызвать функцию вручную (например, после динамической загрузки контента):

```ts
import { initScrollToHash } from '@app/shared/scripts/scrollToHash';

// После загрузки контента
initScrollToHash();
```

## Примеры

### Базовое использование

Функция подключается в `RootComponent.vue` и автоматически вызывается при монтировании приложения. Если в URL присутствует hash (например, `https://example.com/page#section`), страница автоматически прокрутится к элементу с `id="section"`.

### Работа с якорными ссылками

Функция работает с обычными якорными ссылками:

```html
<a href="#section">Перейти к разделу</a>

<section id="section">
  <!-- контент раздела -->
</section>
```

При переходе по ссылке и загрузке страницы функция автоматически прокрутит к нужному разделу.

## Исходный код

```1:11:src/app/shared/scripts/scrollToHash.ts
export function initScrollToHash() {
	const hash = location.hash;
	if (!hash)
		return;

	const targetElement = document.querySelector(hash);
	if (!targetElement)
		return;

	targetElement.scrollIntoView();
}
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/scripts/scrollToHash.ts)

