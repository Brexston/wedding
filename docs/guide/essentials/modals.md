# Работа с модалкми

Функционирование модалок осуществляется через:
- компонент [XModal](/guide/components/modals/XModal.html)
- стор `useModalsStore`, предоставляющий общую систему управления модалками

Расположение файла стора: `src/app/shared/stores/modals.store.ts`

## Базовый функционал

Как и любой стор, `useModalsStore` хранит состояние, в нём есть геттеры и экшены. Практически вся работа происходит под капотом и для большинства случаев нужны лишь эти 3 его экшена:
- `openModal(modalName, data)` - открывает указанное модальное окно и передаёт данные в стор
- `closeModal(modalName)` - закрывает указанное модальное окно
- `getModalData(modalName)` - возвращает данные, связанные с модальным окном.

## Использование

### Простые модалки

![Простая модалка](/img/content/essentials/modals-0.webp)

Для работы модалки её нужно создать и "зарегистрировать".

- если модалка создаётся как компонент `Vue`, как например `ModalCallback`, то компонету `XModal` внутри неё нужно задать уникальный `id` и записать её имя и путь в файл `app.components.global.ts`.
- если модалка создаётся в `pug`, как например `modal-callback`, то её нужно включить в файл `_modals.pug` 

Файлы можно посмотреть здесь:
| Название | Путь      |
|:---------|:---------|
| `ModalCallback`  | `src/app/shared/components/modals/ModalCallback.vue`  |
| `app.components.global.ts`  | `src/app/app.components.global.ts`  |
| `modal-callback`  | `src/templates/shared/modals/modal-callback.pug`  |
| `_modals.pug`  | `src/templates/base/_modals.pug`  |

Для стандартной модалки нужно всего два метода:

- метод `openModal` (по умолчанию импортируется из стора в файле `app.ts` и доступен во всём приложении)
- метод `closeModal` (уже висит на кнопке закрытия базовой модалки закрывает её)

После создания и регистрации модалки можно открыть её, выполнив js-код `openModal('имя-модалки')`, например можно повесить на кнопку vue-директиву `@click` с методом `openModal` и именем нужной модалки:

```pug
button.btn(@click="openModal('example-modal')") Открыть модалку
```

### Сложные модалки

![Непростая модалка](/img/content/essentials/modals-1.webp "Ты наверняка попробовал полистать слайды 😂")

Если в модальном окне нужно отобразить компонент, который работает с динамическими данными (например фотогалерею), то в метод `openModal` вторым аргументом нужно передать эти данные, например:

```pug
button.btn(@click="openModal('example-modal', ['picture-0.webp', 'picture-1.webp'])") Открыть модалку
```

Этот код откроет модалку, а в стор запишет данные, которые она передала (массив с картинками). В самом компоненте галереи нужно импортировать `useModalsStore` и использовать его метод `getModalData('example-modal')` для получения данных из стора.

## Пример

Задача: есть страница с миниатюрами картинок, нужно по клику открывать модалку с этой же картинкой, но большого размера.

Создаем компонент модалки, который показывает картинку; задаём компоненту XModal уникальный id `image-modal`; не забываем "зарегистрировать" модалку в `app.components.global.ts`

```vue
<script setup lang="ts">
import XModal from '@app/shared/components/modals/XModal.vue';
import { useModalsStore } from '@app/shared/stores/modals.store';
import { computed } from 'vue';

const { getModalData } = useModalsStore();
const modalData = computed(() => getModalData<string>('example-modal'));
</script>

<template>
	<teleport to="#modals-container">
		<XModal id="image-modal" animation="opacity">
			<template #default="{ close }">
				<section class="modal">
					<button class="modal__close" @click="close">Закрыть</button>
					<div v-if="modalData" class="modal__inner">
						<img :src="modalData" />
					</div>
				</section>
			</template>
		</XModal>
	</teleport>
</template>

```

Вешаем на клик по миниаитюре картинки открытие модалки и передаём вторым аргументом ссылку на картинку

```pug
img(src='/images/picture.webp')(@click="openModal('image-modal', '/images/picture.webp')")
```

Итого:
- на странице вместо множества модалок (для каждой картинки) всего одна
- по клику на мини-картинку ссылка передаётся в стор
- открывается модалка, она берёт из стора ссылку и подставляет его в атрибут `src` картинки
