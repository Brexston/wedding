# XAccordion

Компонент `XAccordion` предоставляет функциональность аккордеона с плавной анимацией раскрытия/скрытия контента.

Расположение: `src/app/shared/components/ui/XAccordion.vue`

## Пропсы

| Название | Тип       | По умолчанию | Описание                    |
|----------|-----------|--------------|-----------------------------|
| opened   | `boolean` | `false`      | Аккордеон изначально открыт |

## Слоты

| Название | Описание                                                     | Параметры                                                                         |
|:---------|:-------------------------------------------------------------|-----------------------------------------------------------------------------------|
| default  | Используется для отрисовки заголовка/кнопки аккордеона       | `isOpen` - текущее состояние,<br/>`onToggle` - функция для переключения состояния |
| body     | Содержимое аккордеона, которое будет раскрываться/скрываться | -                                                                                 |

## Использование

Пример для Vue:

```vue
<script setup lang="ts">
import XAccordion from '@/app/shared/components/ui/XAccordion.vue';
</script>

<template>
	<XAccordion>
		<template #default="{ isOpen, onToggle }">
			<button class="btn" @click="onToggle">
				{{ isOpen ? 'Скрыть' : 'Показать' }} детали
			</button>
		</template>

		<template #body>
			<div class="accordion-content">
				<p>Детальная информация...</p>
			</div>
		</template>
	</XAccordion>
</template>
```

Пример для Pug:

```jade
x-accordion
    template(#default="{ isOpen, onToggle }")
        button(@click="onToggle")
            | {{ isOpen ? 'Скрыть' : 'Показать' }} детали

    template(#body)
        .accordion-content
            p Детальная информация...
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XAccordion.vue)
