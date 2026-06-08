# useFileInput

Composable-функция для управления `<input type="file">` с поддержкой drag-and-drop, валидацией типов и размеров файлов,
реактивным состоянием ошибок и поддержки внешних моделей.

Расположение: `src/app/shared/composables/useFileInput.ts`

## Аргументы

| Название             | Тип                                          | По умолчанию | Описание                |
|:---------------------|:---------------------------------------------|--------------|:------------------------|
| input<sup>*</sup>    | `MaybeRefOrGetter<HTMLInputElement \| null>` | -            | Ссылка на input-элемент |
| options              | `UseFileInputOptions`                        | -            | Объект опций            |

<sup>* - обязательный аргумент</sup>

#### `options`

| Название       | Тип                                     | По умолчанию | Описание                                |
|:---------------|:----------------------------------------|--------------|:----------------------------------------|
| model          | `ModelRef<UseFileInputFiles>`           | -            | Внешний `v-model` инпута                |
| multiple       | `boolean`                               | `false`      | Множественный выбор файлов              |
| accept         | `MimeTypes[]`                           | `[]`         | Список допустимых MIME-типов            |
| maxSizeMb      | `number`                                | `5`          | Максимальный размер файла в Мб          |
| dropZone       | `MaybeRefOrGetter<HTMLElement \| null>` | -            | Зона для drag-and-drop                  |
| toastOnError   | `boolean`                               | `false`      | Показывать тост-уведомления при ошибках |
| externalErrors | `MaybeRefOrGetter<UseFileInputErrors>`  | -            | Внешние ошибки для отображения          |

## Возвращаемое значение

| Название       | Тип                        | Описание                                                         |
|:---------------|:---------------------------|:-----------------------------------------------------------------|
| files          | `Ref<UseFileInputFiles>`   | Текущее значение файлов                                          |
| filesInfo      | `ComputedRef<FileInfo[]>`  | Массив метаданных о файлах (имя, размер, расширение, MIME и пр.) |
| isEmpty        | `ComputedRef<boolean>`     | True, если `files` пуст или `null`                               |
| errors         | `Ref<UseFileInputErrors>`  | Ошибки валидации (локальные или внешние)                         |
| isOverDropZone | `ShallowRef<boolean>`      | Находится ли файл над drop-зоной                                 |
| deleteFile     | `(file: FileInfo) => void` | Удаление файла из списка по метаданным                           |

## Типы

```ts
type UseFileInputFiles = string[] | FileList | null;

type UseFileInputErrors = string[] | ErrorObject[];

interface UseFileInputOptions {
	model?: ModelRef<UseFileInputFiles>;
	multiple?: boolean;
	accept?: MimeTypes[];
	maxSizeMb?: number;
	dropZone?: MaybeRefOrGetter<HTMLElement | null>;
	toastOnError?: boolean;
	externalErrors?: MaybeRefOrGetter<UseFileInputErrors>;
}

interface UseFileInputReturn {
	files: Ref<UseFileInputFiles>;
	filesInfo: ComputedRef<FileInfo[]>;
	isEmpty: ComputedRef<boolean>;
	errors: Ref<UseFileInputErrors>;
	isOverDropZone: ShallowRef<boolean>;
	deleteFile: (deletingFile: FileInfo) => void;
}
```

## Использование

### Минимальный работающий пример

Чтобы использовать `useFileInput` необходимо первым аргументом передать в него элемент `<input type="file">`.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { files } = useFileInput(input);
</script>

<template>
	<input ref="input" type="file"/>
</template>
```

:::info Примечание
Удобнее получать элемент с помощью
[`useTemplateRef`](https://vuejs.org/guide/essentials/template-refs#accessing-the-refs), но можно использовать и стандартный
`document.querySelector`, однако в таком случае вызывать `useFileInput` нужно будет внутри `onMounted`.
:::

### Связывание с `v-model`

Чтобы связать `modelValue` инпута со значением `files` возвращаемым из `useFileInput`, нужно передать параметр `model` 
в объект опций. Это может быть полезно для компонентов по типу `InputFile` и для прокидывания дефолтных значений.

```vue
<script setup lang="ts">
import type { UseFileInputFiles } from '@app/shared/composables/useFileInput';
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const modelValue = defineModel<UseFileInputFiles>({ default: null });

const input = useTemplateRef<HTMLInputElement>('input');

useFileInput(input, {
	model: modelValue,
});
</script>

<template>
	<input ref="input" type="file"/>
</template>
```

:::info Примечание
`useFileInput` будет следить `files` и `model`, и при изменении одного — актуализирует другое.
:::

### Множественный выбор файлов

Параметр `multiple` отвечает за возможность прикрепить сразу несколько файлов.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { files } = useFileInput(input, {
	multiple: true,
});
</script>

<template>
	<input ref="input" type="file"/>
</template>
```

### Drag & Drop

Для работы Drag & Drop необходимо передать элемент `dropZone` в объект опций. Он будет работать над передаваемым
элементом.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');
const dropZone = useTemplateRef<HTMLElement>('dropZone');

const { files, errors } = useFileInput(input, {
	dropZone,
});
</script>

<template>
	<label ref="dropZone">
		<input ref="input" type="file"/>
	</label>
</template>
```

:::info Примечание
Если параметр `multiple` равен `false`, то при попытке перекинуть несколько файлов будет прикрепляться первый.
:::

### Установка ограничений

Форматы и размеры можно ограничить с помощью параметров `accept`, который принимает себя массив MIME-типов файлов, и 
`maxSizeMb`, который принимает максимальное число мегабайт для одного файла. В массив `errors` попадут ошибки валидации 
файлов.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { files, errors } = useFileInput(input, {
	multiple: true,
	accept: ['image/jpeg', 'image/png'],
	maxSizeMb: 10,
});
</script>

<template>
	<input ref="input" type="file"/>
</template>
```

### Прокидывание ошибок извне

С помощью параметра `externalErrors` можно передать в `useFileInput` дополнительные ошибки. Это может быть полезно для
валидации через Vuelidate. Параметр поддерживает наши стандартные типы ошибок: `string[] | ErrorObject[]`.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';
import { ErrorObject } from "@vuelidate/core";

interface Props {
	errors?: string[] | ErrorObject[];
}

const props = defineProps<Props>();

const input = useTemplateRef<HTMLInputElement>('input');

const { files, errors: fileErrors } = useFileInput(input, {
	accept: ['image/jpeg', 'image/png'],
	maxSizeMb: 10,
	externalErrors: props.errors,
});
</script>

<template>
	<input ref="input" type="file"/>
	<div class="errors">
		<span v-for="error in fileErrors" class="error">
			{{ error }}
		</span>
	</div>
</template>
```

### Показ уведомления об ошибке

Помимо простого вывода ошибок из массива `errors`, с помощью параметра `toastOnError` можно включить показ ошибок в
toast-уведомлениях.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { files } = useFileInput(input, {
	accept: ['image/jpeg', 'image/png'],
	maxSizeMb: 10,
	toastOnError: true,
});
</script>

<template>
	<input ref="input" type="file"/>
</template>
```

### FilesInfo

`FilesInfo` - массив объектов типа `FileInfo`, каждый из которых содержит в себе информацию о прикрепленном файле 
(название, расширение и т.п.). Используется для более удобного отображении информации в компонентах.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { filesInfo } = useFileInput(input, {
	accept: ['image/jpeg', 'image/png'],
	maxSizeMb: 10,
});
</script>

<template>
	<input ref="input" type="file"/>
	
	<div class="files">
		<div v-for="file in filesInfo" class="file">
			<span>{{ file.name }}</span>
		</div>
	</div>
</template>
```

### Удаление файлов

Для удаления файлов есть метод `deleteFile`. Он принимает объект типа `FileInfo`.

```vue
<script setup lang="ts">
import { useFileInput } from '@app/shared/composables/useFileInput';
import { useTemplateRef } from 'vue';

const input = useTemplateRef<HTMLInputElement>('input');

const { filesInfo, deleteFile } = useFileInput(input, {
	accept: ['image/jpeg', 'image/png'],
	maxSizeMb: 10,
});
</script>

<template>
	<input ref="input" type="file"/>
	
	<div class="files">
		<div v-for="file in filesInfo" class="file">
			<span>{{ file.name }}</span>
			<button @click="deleteFile(file)">Удалить файл</button>
		</div>
	</div>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/composables/useFileInput.ts)
