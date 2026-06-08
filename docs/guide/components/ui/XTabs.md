# XTabs

Шаблонный компонент для реализации табов (вкладок). Отвечает за управление активной вкладкой и предоставляет
вспомогательные данные и методы через scoped-слот. Компонент не содержит разметки самих вкладок — вся визуальная часть
реализуется через слоты.

Расположение: `src/app/shared/components/ui/XTabs.vue`

## Пропсы

| Название    | Тип                    | По умолчанию | Описание                                                                |
|-------------|------------------------|--------------|-------------------------------------------------------------------------|
| activeClass | `string`               | –            | CSS-класс, применяемый к активному табу                                 |
| initialTab  | `number`,<br/>`string` | -            | Таб, который будет активным по умолчанию                                |
| isHover     | `boolean`              | -            | Если `true`, переключение табов происходит по наведению, а не по клику. |

## Слоты

| Название | Описание                                                           | Параметры                                                                                                                                                                                                      |
|----------|--------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default  | Основной слот, через который передаётся шаблон вкладок и контента  | `activeTab` - текущий активный таб<br/>`tabEvents` - возвращает объект событий (`click` или `mouseover`) для таба<br/>`getActiveClass` - возвращает значение пропса `activeClass`, если переданный таб активен |

## Использование

```vue
<script setup lang="ts">
import XTabs from '@app/shared/components/ui/XTabs.vue';
</script>

<template>
	<XTabs active-class="tab--active" initial-tab="tab1">
		<template #default="{ activeTab, getActiveClass }">
			<div class="tabs">
				<button
					v-for="tab in ['tab1', 'tab2', 'tab3']"
					:key="tab"
					class="tab"
					:class="getActiveClass(tab)"
				>
					{{ tab }}
				</button>
			</div>

			<div class="tab-content">
				<div v-if="activeTab === 'tab1'">
					Контент вкладки 1
				</div>
				<div v-else-if="activeTab === 'tab2'">
					Контент вкладки 2
				</div>
				<div v-else-if="activeTab === 'tab3'">
					Контент вкладки 3
				</div>
			</div>
		</template>
	</XTabs>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XTabs.vue)
