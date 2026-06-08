<script setup>
import ViewportExample from './ViewportExample.vue'
</script>

# Использование viewport в компонентах

В шаблоне есть файл [viewport.ts](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/consts/viewport.ts), содержащий данные о текущих брейкпоинтах. Он позволяет централизованно изменять состояния компонентов в зависимости от текущей ширины экрана и не использовать магические значения. Так вёрстка и компоненты ведут себя более предсказуемо и логично.

Расположение: `src/app/shared/consts/viewport.ts`

Файл содержит две константы:
- `ViewportNames` со строковыми названиями вьюпортов
- `VIEWPORT_SIZES` с соответствующими числовыми значениями (в пикселях)

## Сводная таблица (для примера)<sup>*</sup>

| Название     | Значение |
|--------------|----------|
| `mobile`     | 320      |
| `mobile-xl`  | 480      |
| `tablet`     | 768      |
| `tablet-xl`  | 992      |
| `laptop`     | 1024     |
| `laptop-xl`  | 1280     |
| `laptop-xxl` | 1440     |
| `container`  | 1315     |
| `pc`         | 1600     |

\* значения в шаблоне или конкретном проекте могут поменятся

## Использование

### В примере ниже в компонент:
- импортируется константа `VIEWPORT_SIZES`
- импортируется хук `useWindowSize`, который следит за шириной окна и хранит значение в переменной `width`
- внутри `template` в элементе `div` динамически отслеживаются условия `:class`
- если `width` находится в нужном диапазоне, то к элементу `div` применяется соответствующий цветовой класс
- при изменении ширины экрана класс меняется на подходящий

### Результат:
<br>

<ViewportExample />

### Код:

```vue
<script setup>
import { useWindowSize } from '@vueuse/core';
import { VIEWPORT_SIZES } from '../../../src/app/shared/consts/viewport.ts'
const { width } = useWindowSize();
</script>

<template>
	<div
		class="example-div"
		:class="{
			red: width <= VIEWPORT_SIZES['tablet'],
			orange: width > VIEWPORT_SIZES['tablet'] && width <= VIEWPORT_SIZES['tablet-xl'],
			yellow: width > VIEWPORT_SIZES['tablet-xl'] && width <= VIEWPORT_SIZES['laptop-xl'],
			green: width > VIEWPORT_SIZES['laptop-xl'] && width <= VIEWPORT_SIZES['laptop-xxl'],
			blue: width > VIEWPORT_SIZES['laptop-xxl'] && width <= VIEWPORT_SIZES['pc'],
			purple: width > VIEWPORT_SIZES['pc'],
			}
		">
		<span>Текущая ширина окна: {{ width }}</span>
	</div>
</template>

<style>
	.box { padding: 8px; border-radius: 4px; color: #000000 }
	.red { background-color: #f5a7a6; }
	.orange { background-color: #f5cf9f; }
	.yellow { background-color: #fef1ab; }
	.green { background-color: #d8eedf; }
	.blue { background-color: #d8e5f7; }
	.purple { background-color: #d0c3f1; }
</style>
```

## Другие примеры
Vue-компонент [X-Image](../components/ui/XImage.md) использует `VIEWPORT_SIZES` для генерации медизапросов внутри тега `<picture>`.
