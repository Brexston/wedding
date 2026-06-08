# calcAppProperties

Функция для динамического расчета и установки высоты хедера в CSS-переменную.

Расположение: `src/app/shared/scripts/calcProperties.ts`

## Описание

`calcAppProperties` отслеживает изменения размера элемента с классом `.header` и автоматически устанавливает его высоту в CSS-переменную `--header-height` в корневом элементе документа (`:root`). Это позволяет использовать актуальную высоту хедера в стилях для позиционирования контента или создания отступов.

## Поведение

Функция использует `useResizeObserver` из библиотеки VueUse для отслеживания изменений размера хедера. При каждом изменении размера (включая высоту) функция:

1. Находит элемент `.header` в DOM
2. Отслеживает изменения его размеров через `ResizeObserver`
3. Получает высоту элемента из `borderBoxSize[0].blockSize`
4. Устанавливает CSS-переменную `--header-height` в корневой элемент документа

## Использование CSS-переменной

После вызова функции CSS-переменная `--header-height` доступна во всех стилях. Её можно использовать напрямую или в комбинации с функцией `calc()` для вычислений:

```sass
.content
  padding-top: var(--header-height)

.full-height-content
  height: calc(100vh - var(--header-height))

.content-with-offset
  margin-top: calc(var(--header-height) + 20px)
```

```css
.content {
  padding-top: var(--header-height);
}

.full-height-content {
  height: calc(100vh - var(--header-height));
}

.content-with-offset {
  margin-top: calc(var(--header-height) + 20px);
}
```

## Важные особенности

1. **Требуется наличие элемента `.header`**: Функция ищет элемент с классом `.header` в DOM. Если элемент не найден, функция не выполнится.

2. **Автоматическое обновление**: Функция автоматически обновляет значение CSS-переменной при каждом изменении размера хедера, включая:
   - Изменение высоты при скролле
   - Изменение контента внутри хедера
   - Изменение размеров окна браузера
   - Динамическое добавление/удаление элементов

3. **Использует border-box размер**: Функция использует `borderBoxSize`, который включает padding и border элемента.

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

Если необходимо вызвать функцию вручную (например, после динамического добавления хедера):

```ts
import calcAppProperties from '@app/shared/scripts/calcProperties';

// После добавления хедера в DOM
calcAppProperties();
```

## Примеры

### Базовое использование

Функция подключается в `RootComponent.vue` и автоматически вызывается при монтировании приложения. Она начинает отслеживать изменения размера хедера и обновлять CSS-переменную.

### Использование в стилях

CSS-переменная `--header-height` может использоваться для создания фиксированного отступа от верха страницы:

```sass
.main-content
  margin-top: var(--header-height)
```

Для позиционирования элементов относительно хедера:

```sass
.sticky-element
  top: var(--header-height)
  position: sticky
```

Для вычисления высоты контента с учетом хедера с помощью `calc()`:

```sass
.fullscreen-section
  height: calc(100vh - var(--header-height))

.content-wrapper
  min-height: calc(100vh - var(--header-height) - 40px)

.sticky-header-offset
  padding-top: calc(var(--header-height) + 20px)
```

```css
.fullscreen-section {
  height: calc(100vh - var(--header-height));
}

.content-wrapper {
  min-height: calc(100vh - var(--header-height) - 40px);
}

.sticky-header-offset {
  padding-top: calc(var(--header-height) + 20px);
}
```

## Исходный код

```3:11:src/app/shared/scripts/calcProperties.ts
export default function calcAppProperties() {
	const header = document.querySelector('.header') as HTMLElement;
	// https://vueuse.org/core/useResizeObserver/#useresizeobserver
	useResizeObserver(header, (entries) => {
		const entry = entries[0];
		const height = entry.borderBoxSize[0].blockSize;
		document.documentElement.style.setProperty('--header-height', `${height}px`);
	});
}
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/scripts/calcProperties.ts)
- [VueUse - useResizeObserver](https://vueuse.org/core/useResizeObserver/)

