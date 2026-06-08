# v-observe

Директива для наблюдения за пересечением элемента с viewport с использованием Intersection Observer API.

Расположение: `src/app/shared/directives/observe.ts`

Использует [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/) из библиотеки [VueUse](https://vueuse.org/).

## Описание

Директива `v-observe` позволяет отслеживать момент, когда элемент входит в область видимости (viewport) или выходит из неё. Это полезно для реализации ленивой загрузки контента, анимаций при появлении элементов, аналитики и других задач, связанных с видимостью элементов на странице.

## Параметры

| Название      | Тип                                                              | По умолчанию | Описание                                                                 |
|:--------------|:------------------------------------------------------------------|--------------|:-------------------------------------------------------------------------|
| `binding.value` | `(entry: IntersectionObserverEntry) => void`                    | —            | Callback-функция, которая вызывается при пересечении элемента с viewport |
| `binding.arg`   | `number`                                                          | `0.1`        | Порог пересечения (от 0 до 1), определяющий процент видимости элемента  |

## Поведение

1. При монтировании элемента создаётся `IntersectionObserver` с заданным порогом
2. При пересечении элемента с viewport вызывается callback-функция
3. При изменении `threshold` (аргумента директивы) observer пересоздаётся
4. При изменении callback-функции она обновляется без пересоздания observer
5. При размонтировании элемента observer автоматически останавливается и очищается

## Использование

### Базовое использование

```vue
<script setup lang="ts">
function handleIntersection(entry: IntersectionObserverEntry) {
	console.log('Элемент виден:', entry.isIntersecting);
}
</script>

<template>
	<div v-observe="handleIntersection">
		Контент, который отслеживается
	</div>
</template>
```

### С кастомным порогом

Порог можно задать через аргумент директивы:

```vue
<script setup lang="ts">
function handleIntersection(entry: IntersectionObserverEntry) {
	if (entry.isIntersecting) {
		console.log('Элемент виден на 50%');
	}
}
</script>

<template>
	<div v-observe:0.5="handleIntersection">
		Элемент будет считаться видимым при 50% пересечения
	</div>
</template>
```

### Ленивая загрузка изображений

```vue
<script setup lang="ts">
import { ref } from 'vue';

const imageSrc = ref<string | null>(null);

function loadImage(entry: IntersectionObserverEntry) {
	if (entry.isIntersecting && !imageSrc.value) {
		imageSrc.value = 'https://example.com/image.jpg';
	}
}
</script>

<template>
	<div v-observe="loadImage">
		<img v-if="imageSrc" :src="imageSrc" alt="Lazy loaded image" />
		<div v-else>Загрузка...</div>
	</div>
</template>
```

### Анимация при появлении

```vue
<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);

function onVisible(entry: IntersectionObserverEntry) {
	if (entry.isIntersecting) {
		isVisible.value = true;
	}
}
</script>

<template>
	<div
		v-observe="onVisible"
		:class="{ 'fade-in': isVisible }"
	>
		Анимированный контент
	</div>
</template>
```

### Пример для Pug

```jade
div(v-observe="handleIntersection")
    p Контент, который отслеживается

div(v-observe:0.5="handleIntersection")
    p Элемент виден при 50% пересечения
```

## Важные особенности

1. **Порог по умолчанию**: Если аргумент не указан, используется порог `0.1` (10% видимости элемента)

2. **Оптимизация**: Observer пересоздаётся только при изменении порога. Callback-функция обновляется без пересоздания observer

3. **Автоматическая очистка**: При размонтировании элемента observer автоматически останавливается, что предотвращает утечки памяти

4. **Тип callback**: Callback получает объект `IntersectionObserverEntry`, который содержит информацию о пересечении (например, `isIntersecting`, `intersectionRatio`, `boundingClientRect` и т.д.)

## Исходный код

```1:63:src/app/shared/directives/observe.ts
import type { Directive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

interface ObserveElement extends HTMLElement {
	_stop?: () => void;
	_callback?: (entry: IntersectionObserverEntry) => void;
	_threshold?: number;
}

function createObserver(
	element: ObserveElement,
	callback: (entry: IntersectionObserverEntry) => void,
	threshold: number,
) {
	return useIntersectionObserver(
		element,
		([entry]) => {
			if (entry.isIntersecting) {
				callback(entry);
			}
		},
		{ threshold },
	);
}

/**
 * @description
 * Директива для наблюдения за пересечением элемента с viewport
 * @example
 * <div v-observe="callback" v-observe:0.5="callback"></div>
 * @param {HTMLElement} el
 * @param {object} binding
 * @param {Function} binding.value - Callback функция при пересечении
 * @param {number} binding.arg - Порог пересечения (по умолчанию 0.1)
 */
const observe: Directive<ObserveElement, (entry: IntersectionObserverEntry) => void> = {
	mounted: (el, binding) => {
		const threshold = binding.arg ? Number(binding.arg) : 0.1;
		el._callback = binding.value;
		el._threshold = threshold;
		el._stop = createObserver(el, binding.value, threshold).stop;
	},
	updated: (el, binding) => {
		const threshold = binding.arg ? Number(binding.arg) : 0.1;

		if (el._threshold !== threshold) {
			el._stop?.();
			el._threshold = threshold;
			el._stop = createObserver(el, binding.value, threshold).stop;
		}

		el._callback = binding.value;
	},
	unmounted: (el) => {
		el._stop?.();
		delete el._stop;
		delete el._callback;
		delete el._threshold;
	},
};

export default observe;
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/directives/observe.ts)
- [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

