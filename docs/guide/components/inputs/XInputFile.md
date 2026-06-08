# XInputFile

Компонент `XInputFile` предоставляет функциональность загрузки файлов с поддержкой drag-and-drop, валидации и
предпросмотра. Компонент поддерживает как одиночную загрузку файлов, так и множественную.

Использует компонент-обертку [`XInputField`](/guide/components/inputs/XInputField).

Расположение: `src/app/shared/components/inputs/XInputFile.vue`

## Пропсы

| Название           | Тип                                                                                        | По умолчанию        | Описание                                                                    |
|:-------------------|:-------------------------------------------------------------------------------------------|---------------------|:----------------------------------------------------------------------------|
| id                 | `string`                                                                                   | -                   | Уникальный идентификатор инпута. Если не указан, генерируется автоматически |
| label              | `string`                                                                                   | -                   | Текст лейбла инпута                                                         |
| placeholder        | `string`                                                                                   | `'Прикрепить файл'` | Подсказка внутри инпута (атрибут `placeholder`)                             |
| name               | `string`                                                                                   | -                   | Имя инпута в форме                                                          |
| title              | `string`                                                                                   | -                   | Всплывающая подсказка                                                       |
| required           | `boolean`                                                                                  | `false`             | Флаг обязательности инпута                                                  |
| disabled           | `boolean`                                                                                  | `false`             | Флаг отключения инпута                                                      |
| readonly           | `boolean`                                                                                  | `false`             | Флаг только для чтения                                                      |
| errors             | `string[]`,<br>[`ErrorObject[]`](https://vuelidate-next.netlify.app/api/error_object.html) | -                   | Массив ошибок валидации                                                     |
| accept<sup>*</sup> | [`MIMETypes[]`](#mimetypes)                                                                | -                   | Разрешенные MIME-типы файлов                                                |
| multiple           | `boolean`                                                                                  | `false`             | Флаг множественной загрузки файлов                                          |
| maxSizeMb          | `number`                                                                                   | `5`                 | Максимальный размер файла в мегабайтах                                      |

### Тип MIMETypes {#mimetypes}

Поддерживаемые типы файлов (см. [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types)):

```ts
export type MIMETypes =
	// Text types
	| 'text/css'
	| 'text/html'
	| 'text/javascript'
	| 'text/plain'
	| 'text/xml'

	// Image types
	| 'image/gif'
	| 'image/jpeg'
	| 'image/png'
	| 'image/svg+xml'
	| 'image/webp'

	// Audio types
	| 'audio/midi'
	| 'audio/mpeg'
	| 'audio/ogg'
	| 'audio/wav'
	| 'audio/webm'

	// Video types
	| 'video/mp4'
	| 'video/mpeg'
	| 'video/ogg'
	| 'video/webm'

	// Application types
	| 'application/json'
	| 'application/ld+json'
	| 'application/msword'
	| 'application/pdf'
	| 'application/vnd.ms-excel'
	| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	| 'application/vnd.mozilla.xul+xml'
	| 'application/x-www-form-urlencoded'
	| 'application/zip'
	| 'application/octet-stream'
	| 'application/rtf'

	// Font types
	| 'font/otf'
	| 'font/ttf'
	| 'font/woff'
	| 'font/woff2'

	// Multipart types
	| 'multipart/form-data'

	// Other
	| 'application/x-rar-compressed'
	| 'application/x-tar'
;
```

## Слоты

| Название   | Описание                                                       | Параметры                              |
|:-----------|:---------------------------------------------------------------|----------------------------------------|
| label      | Кастомизация содержимого лейбла                                | `labelValue` - Значение пропса `label` |
| action     | Дополнительный слот рядом с полем ввода (например, для иконки) | –                                      |
| underInput | Слот под полем ввода для дополнительного контента              | –                                      |

## v-model

Поддерживаются значения типа:

- Для одиночного файла - `File | null`
- Для множественных файлов - `FileList | null`

## Использование

Загрузка одного изображения:

```vue
<script setup lang="ts">
import XInputFile from '@/app/shared/components/inputs/XInputFile.vue';
import { ref } from 'vue';

const avatar = ref<File | null>(null);
</script>

<template>
	<XInputFile
		v-model="avatar"
		label="Аватар"
		:accept="['image/jpeg', 'image/png']"
		:max-size-mb="2"
	/>
</template>
```

Множественная загрузка документов:

```vue
<script setup lang="ts">
import XInputFile from '@/app/shared/components/inputs/XInputFile.vue';
import { ref } from 'vue';

const documents = ref<FileList | null>(null);
</script>

<template>
	<XInputFile
		v-model="documents"
		label="Документы"
		multiple
		:accept="['application/pdf', 'application/msword']"
		:max-size-mb="10"
	/>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/inputs/XInputFile.vue)
