# XDropdown

Компонент-обертка над [`Dropdown`](https://floating-vue.starpad.dev/guide/component#dropdown) из
библиотеки [Floating Vue](https://floating-vue.starpad.dev/), предоставляющий расширенные настройки всплывающего меню с
удобными пропсами и слотами для настройки триггера и содержимого.

Расположение: `src/app/shared/components/ui/XDropdown.vue`

## Пропсы

| Название            | Тип                                                                 | По умолчанию | Описание                                                              |
|---------------------|---------------------------------------------------------------------|--------------|-----------------------------------------------------------------------|
| ariaId              | `string`,<br/>`null`                                                | `null`       | Идентификатор для привязки aria-describedby и контейнера              |
| distance            | `number`                                                            | `0`         | Расстояние между триггером и всплывающим меню                         |
| skidding            | `number`                                                            | `0`          | Смещение поперек основного направления размещения                     |
| instantMove         | `boolean`                                                           | `false`      | Мгновенное перемещение вместо анимированного                          |
| disposeTimeout      | `number`                                                            | `0`          | Таймаут удаления dropdown после скрытия (мс)                          |
| flip                | `boolean`                                                           | `true`       | Автоматический переворот dropdown при нехватке места                  |
| shift               | `boolean`                                                           | `true`       | Смещение dropdown при нехватке места                                  |
| shiftCrossAxis      | `boolean`                                                           | `false`      | Смещение вдоль перпендикулярной оси                                   |
| placement           | [`Placement`](https://popper.js.org/docs/v2/constructors/#options)  | `'auto'`     | Начальная позиция всплывающего меню относительно триггера             |
| triggers            | [`TriggerEvent[]`](https://floating-vue.starpad.dev/api/#triggers)  | `['click']`  | События для открытия всплывающего меню                                |
| popperTriggers      | [`TriggerEvent[]`](https://floating-vue.starpad.dev/api/#triggers)  | -            | Альтернативные события для управления popper отдельно от триггера     |
| strategy            | `'absolute'`,<br/>`'fixed'`                                         | `'fixed'`    | Стратегия позиционирования popper                                     |
| delay               | `number`,<br/>`PopperDelay`                                         | `0`          | Задержка открытия/закрытия (мс) или объект с задержками для show/hide |
| autoHide            | `boolean`                                                           | `true`       | Автоматическое скрытие dropdown при потере фокуса                     |
| overflowPadding     | `number`                                                            | `20`         | Отступ от границ контейнера при переполнении                          |
| arrowPadding        | `number`                                                            | `10`         | Отступ стрелки от краёв dropdown                                      |
| arrowOverflow       | `boolean`                                                           | `true`       | Разрешить стрелке выходить за пределы popper                          |
| positioningDisabled | `boolean`                                                           | `false`      | Отключить динамическое позиционирование всплывающего меню             |
| theme               | `'default'`,<br/>`'null'`,<br/>`'without-arrow'`,<br/>`'secondary'` | `'default'`  | Тема оформления всплывающего меню                                     |

## Слоты

| Название | Описание                                      | Параметры                              |
|----------|-----------------------------------------------|----------------------------------------|
| default  | Слот для контента триггера (например, кнопки) | –                                      |
| content  | Слот для содержимого всплывающего меню        | `hide` - функция для скрытия дропдауна |

## Использование

Простой пример с кнопкой:

```vue
<script setup lang="ts">
import XDropdown from '@/app/shared/components/ui/XDropdown.vue';
</script>

<template>
	<XDropdown>
		<button class="btn">
			Открыть дропдаун
		</button>

		<template #content>
			<div class="dropdown-content">
				<p>Контент дропдауна</p>
			</div>
		</template>
	</XDropdown>
</template>
```

Открытие по ховеру и закрытие по кнопке:

```vue
<script setup lang="ts">
import XDropdown from '@/app/shared/components/ui/XDropdown.vue';
</script>

<template>
	<XDropdown :triggers="['hide']">
		<button class="btn">
			Открыть дропдаун
		</button>

		<template #default="{ hide }">
			<div class="dropdown-content">
				<p>Контент дропдауна</p>
				<button class="btn" @click="hide">
					Закрыть
				</button>
			</div>
		</template>
	</XDropdown>
</template>
```

Пример для Pug:

```jade
x-dropdown
	button.btn Открыть дропдаун

	template(#content)	
		.dropdown-content
			p Контент дропдауна
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XDropdown.vue)
- [Floating Vue](https://floating-vue.starpad.dev/)
- [popperjs](https://popper.js.org/docs/v2/)
