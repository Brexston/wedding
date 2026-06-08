# XInputSearch

Компонент `XInputSearch` представляет собой поле поиска с дополнительной функциональностью: иконкой поиска, кнопкой
очистки, подсказками и обработкой событий.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputSearch.vue`

## Пропсы

| Название    | Тип        | По умолчанию | Описание                                                                    |
|:------------|:-----------|--------------|:----------------------------------------------------------------------------|
| id          | `string`   | -            | Уникальный идентификатор инпута. Если не указан, генерируется автоматически |
| placeholder | `string`   | -            | Подсказка внутри инпута (атрибут `placeholder`)                             |
| name        | `string`   | -            | Имя инпута в форме                                                          |
| title       | `string`   | -            | Всплывающая подсказка                                                       |
| disabled    | `boolean`  | `false`      | Флаг отключения инпута                                                      |
| tooltips    | `string[]` | -            | Массив подсказок для автодополнения                                         |

## События

| Название | Параметры       | Описание                         |
|:---------|:----------------|:---------------------------------|
| search   | `value: string` | Вызывается при выполнении поиска |

## v-model

Поддерживаются значения типа `string`.

## Использование

Обработка по событию `search`:
```vue
<script setup lang="ts">
import XInputSearch from '@/app/shared/components/inputs/XInputSearch.vue';

function onSearch(value: string) {
	console.log(value);
}
</script>

<template>
	<XInputSearch
		placeholder="Поиск..."
		:tooltips="['Товар 1', 'Товар 2', 'Товар 3']"
		@search="onSearch"
	/>
</template>
```

Обработка при изменении значения:
```vue
<script setup lang="ts">
import XInputSearch from '@/app/shared/components/inputs/XInputSearch.vue';
import { ref, watch } from 'vue';

const searchValue = ref('');

watch(searchValue, (value) => {
	console.log(value);
});
</script>

<template>
	<XInputSearch
		v-model="searchValue"
		placeholder="Поиск..."
		:tooltips="['Товар 1', 'Товар 2', 'Товар 3']"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputSearch.vue)
