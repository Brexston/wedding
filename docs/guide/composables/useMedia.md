# useMedia

Composable-функция для создания реактивного медиазапроса на основе заданного брейкпоинта и типа условия (`min` или
`max`). Аналог Sass-миксина `media`.  

Использует [useMediaQuery](https://vueuse.org/core/useMediaQuery/) из библиотеки [VueUse](https://vueuse.org/).

Расположение: `src/app/shared/composables/useMedia.ts`

## Аргументы

| Название   | Тип                                | По умолчанию | Описание                                                                  |
|:-----------|:-----------------------------------|--------------|:--------------------------------------------------------------------------|
| queryType  | `MaybeRefOrGetter<'min' \| 'max'>` | —            | Тип медиазапроса: `min` — минимальная ширина, `max` — максимальная ширина |
| breakpoint | `MaybeRefOrGetter<ViewportNames>`  | —            | Название брейкпоинта из `VIEWPORT_SIZES`                                  |

## Возвращаемое значение

Функция возвращает `Ref<boolean>`, указывающий на соответствие текущей ширины экрана заданному медиазапросу.

| Тип            | Описание                                                            |
|:---------------|:--------------------------------------------------------------------|
| `Ref<boolean>` | `true`, если текущее окно соответствует медиазапросу, иначе `false` |

## Использование

```vue
<script setup lang="ts">
import { useMedia } from '@app/shared/composables/useMedia';
</script>

<template>
	<p v-if="useMedia('max', 'mobile-xl')">Мобильный текст</p>
</template>
```

Если медиазапрос используется несколько раз, то лучше сохранять его в переменную и использовать её:

```vue
<script setup lang="ts">
import { useMedia } from '@app/shared/composables/useMedia';

const fromTablet = useMedia('min', 'tablet');

function onClick() {
	if (fromTablet.value)
		console.log('Десктопный клик');
	else
		console.log('Мобильный клик');
}
</script>

<template>
	<div>		
		<p v-if="fromTablet">Десктопный текст</p>
		<p v-else>Мобильный текст</p>
		
		<button @click="onClick">Кнопка</button>
	</div>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/composables/useMedia.ts)
- [useMediaQuery](https://vueuse.org/core/useMediaQuery/)
