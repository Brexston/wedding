# XInputSelect

Компонент `XInputSelect` представляет собой стилизованное поле выбора на основе библиотеки
[@vueform/multiselect](https://github.com/vueform/multiselect) с поддержкой одиночного и множественного выбора,
группировки опций и поиска.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputSelect.vue`

## Пропсы

| Название      | Тип                                                                                        | По умолчанию | Описание                                                                     |
|:--------------|:-------------------------------------------------------------------------------------------|--------------|:-----------------------------------------------------------------------------|
| id            | `string`                                                                                   | -            | Уникальный идентификатор селекта. Если не указан, генерируется автоматически |
| label         | `string`                                                                                   | -            | Текст лейбла селекта                                                         |
| placeholder   | `string`                                                                                   | -            | Подсказка внутри селекта (атрибут `placeholder`)                             |
| required      | `boolean`                                                                                  | `false`      | Флаг обязательности селекта                                                  |
| disabled      | `boolean`                                                                                  | `false`      | Флаг отключения селекта                                                      |
| loading       | `boolean`                                                                                  | `false`      | Флаг загрузки всего компонента                                               |
| readonly      | `boolean`                                                                                  | `false`      | Флаг только для чтения                                                       |
| errors        | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -            | Массив ошибок валидации                                                      |
| options       | `any[]`,<br>`object`,<br>`Function`                                                        | -            | Опции для выбора                                                             |
| mode          | `'single'`,<br>`'multiple'`,<br>`'tags'`                                                   | `'single'`   | Режим выбора (одиночный/множественный)                                       |
| groups        | `boolean`                                                                                  | `false`      | Флаг группировки опций                                                       |
| searchable    | `boolean`                                                                                  | `false`      | Возможность поиска по опциям                                                 |
| loadingSelect | `boolean`                                                                                  | `false`      | Флаг загрузки опций                                                          |
| labelProp     | `string`                                                                                   | -            | Название поля выбранного объекта для отображения в селекте                   |
| valueProp     | `string`                                                                                   | -            | Название поля выбранного объекта для возвращаемого значения                  |
| canClear      | `boolean`                                                                                  | -            | Возможность очистить выбор                                                   |
| delay         | `number`                                                                                   | -            | Задержка при поиске (мс)                                                     |
| filterResults | `boolean`                                                                                  | -            | Фильтрация результатов поиска                                                |
| resolveOnLoad | `boolean`                                                                                  | -            | Загрузка начальных значений при инициализации                                |

## v-model

Поддерживаются значения типа:

- Для `mode='single'` - `string`
- Для `mode='multiple'` - `string[]`

## Использование

С массивом строк в качестве `options` и возможностью поиска:

```vue
<script setup lang="ts">
import XInputSelect from '@/app/shared/components/inputs/XInputSelect.vue';
import { ref } from 'vue';

const options = ['Товар 1', 'Товар 2', 'Товар 3'];

const selectedValue = ref('Товар 1');
</script>

<template>
	<XInputSelect
		v-model="selectedValue"
		:options
		searchable
	/>
</template>
```

С массивом объектов в качестве `options`:

```vue
<script setup lang="ts">
import XInputSelect from '@/app/shared/components/inputs/XInputSelect.vue';
import { ref } from 'vue';

const options = [
	{ name: 'Товар 1', code: 'product-1' },
	{ name: 'Товар 2', code: 'product-2' },
	{ name: 'Товар 3', code: 'product-3' },
];

const selectedValue = ref('product-1');
</script>

<template>
	<XInputSelect
		v-model="selectedValue"
		:options
		label-prop="name"
		value-prop="code"
	/>
</template>
```

Ассихорнный поиск по опциям с запросом:

```vue
<script setup lang="ts">
import { useExampleStore } from '@/app/modules/example/store/example.store';
import XInputSelect from '@/app/shared/components/inputs/XInputSelect.vue';
import { ref } from 'vue';

const selectedValue = ref();

const { requestOptions } = useExampleStore();
</script>

<template>
	<XInputSelect
		v-model="selectedValue"
		:options="async (query: string) => await requestOptions(query)"
		searchable
		:resolve-on-load="false"
		:filter-results="false"
		:delay="600"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputSelect.vue)
- [@vueform/multiselect](https://github.com/vueform/multiselect)
