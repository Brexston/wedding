# XIcon

Vue-компонент для отображения SVG-иконок из общего спрайта.

Расположение: `src/app/shared/components/ui/XIcon.vue`

## Пропсы

| Название         | Тип      | По умолчанию | Описание   |
|:-----------------|:---------|--------------|:-----------|
| name<sup>*</sup> | `string` | -            | Имя иконки |

<sup>* - обязательный пропс</sup>

## Использование

```vue
<script setup lang="ts">
import XIcon from '@/app/shared/components/XIcon.vue';
</script>

<template>
	<XIcon name="plus" />
</template>
```

Пример с кнопкой:

```vue
<script setup lang="ts">
import XIcon from '@/app/shared/components/XIcon.vue';
</script>

<template>
	<button class="btn">
		<XIcon name="plus" class="btn__icon" />
	</button>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XIcon.vue)
