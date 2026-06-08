# XModal

Компонент модального окна, встроенный в систему управления модалками через глобальное хранилище `modals.store`.
Автоматически регистрируется и удаляется при монтировании/размонтировании. Отображается через `teleport` в
`#modals-container`, поддерживает анимации появления и закрытия.

Расположение: `src/app/shared/components/modals/XModal.vue`

## Пропсы

| Название       | Тип                                   | По умолчанию   | Описание                                                                                               |
|----------------|---------------------------------------|----------------|--------------------------------------------------------------------------------------------------------|
| id<sup>*</sup> | `string`                              | –              | Уникальный идентификатор модального окна. Используется для управления показом/скрытием через хранилище |
| className      | `string`                              | –              | Дополнительный CSS-класс, добавляемый к диалогу                                                        |
| animation      | `'fade-in-up'`,<br/>`'fade-in-right'` | `'fade-in-up'` | Тип анимации появления модального окна                                                                 |

<sup>* - обязательный пропс</sup>

## Слоты

| Название | Описание                          | Параметры                       |
|----------|-----------------------------------|---------------------------------|
| default  | Основной контент модального окна. | `close` — функция закрытия окна |

## Использование

```vue
<script setup lang="ts">
import XModal from '@/app/shared/components/templates/XModal.vue';
</script>

<template>
	<XModal>
		<template #default="{ close }">
			<div class="my-modal">
				<p class="my-modal__text">
					Текст модального окна.
				</p>
				<button class="my-modal__close" @click="close">
					Закрыть
				</button>
			</div>
		</template>
	</XModal>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/modals/XModal.vue)
