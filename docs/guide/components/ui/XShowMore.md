# XShowMore

Шаблонный компонент, скрывающий избыточный контент и предоставляющий возможность раскрытия/сворачивания по действию
пользователя. Автоматически определяет, превышает ли содержимое доступную высоту, и в зависимости от этого
отображает/скрывает внешний триггер. Поддерживает два режима отображения — для текста и блочного контента.

Расположение: `src/app/shared/components/ui/XShowMore.vue`

## Пропсы

| Название | Тип                     | По умолчанию | Описание                                                                                         |
|----------|-------------------------|--------------|--------------------------------------------------------------------------------------------------|
| mode     | `'text',`<br/>`'block'` | `'text'`     | Режим отображения контента: `text` — с обрезкой текста, `block` — с ограничением по высоте блока |

## Слоты

| Название | Описание                                                                                 | Параметры                                                                                                                                                     |
|----------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default  | Основной контент, который будет скрываться и показываться                                | –                                                                                                                                                             |
| trigger  | Слот для кастомной кнопки/ссылки "Показать больше/меньше". Показывается при переполнении | `hasOverflow` - показывает, есть ли переполнение контента<br/>`isActive` - состояние раскрыт/не раскрыт<br/>`toggleActive` - переключает состояние компонента |

## Использование

Пример для текстового контента:

```vue
<script setup lang="ts">
import XShowMore from '@app/shared/components/ui/XShowMore.vue';
</script>

<template>
	<XShowMore class="content">
		<template #default>
			<p class="content__text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non cursus nisi. Duis eget porta mauris.
				Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
			</p>
		</template>

		<template #trigger="{ isActive, toggleActive }">
			<button class="content__show-more" @click="toggleActive">
				{{ isActive ? 'Скрыть' : 'Показать больше' }}
			</button>
		</template>
	</XShowMore>
</template>

<style scoped lang="sass">
.content
	--cut-string-value: 5 // по умолчанию - 3
</style>
```

Пример для блочного контента:

```vue
<script setup lang="ts">
import XShowMore from '@app/shared/components/ui/XShowMore.vue';
</script>

<template>
	<XShowMore mode="block" class="content">
		<template #default>
			<div class="content__block">
				<!-- длинный блок с вложенными элементами -->
				<div v-for="i in 20" :key="i" class="content__item">
					Элемент {{ i }}
				</div>
			</div>
		</template>

		<template #trigger="{ hasOverflow, toggleActive, isActive }">
			<button v-if="hasOverflow" class="content__show-more" @click="toggleActive">
				{{ isActive ? 'Свернуть' : 'Развернуть' }}
			</button>
		</template>
	</XShowMore>
</template>

<style scoped lang="sass">
	.content
		--block-height: 200px // по умолчанию - 100px
</style>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XShowMore.vue)
