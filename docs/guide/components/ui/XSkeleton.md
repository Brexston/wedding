# XSkeleton

Компонент `XSkeleton` показывает состояние загрузки для уже сверстанного блока: пока `loading` равен `true`, содержимое
заменяется skeleton-представлением, а после загрузки возвращается реальная разметка.

Компонент является оберткой над [`phantom-ui`](https://aejkatappaja.github.io/phantom-ui/) и использует его подход:
skeleton строится по DOM-структуре содержимого, поэтому базовая форма заглушки повторяет фактическую верстку компонента.

Расположение: `src/app/shared/components/ui/XSkeleton.vue`

::: info Инпуты
`XSkeleton` по умолчанию используется для состояния загрузки у всех инпутов через компонент
[`XInputField`](/guide/components/inputs/XInputField). Для input-компонентов обычно достаточно передать пропс `loading`
в сам инпут.
:::

## Пропсы

| Название         | Тип                               | По умолчанию                 | Описание                                                                    |
|:-----------------|:----------------------------------|------------------------------|:----------------------------------------------------------------------------|
| loading          | `boolean`                         | `false`                      | Включает skeleton-состояние                                                 |
| animation        | `'shimmer'`,<br/>`'pulse'`,<br/>`'breathe'`,<br/>`'solid'` | `'shimmer'` | Тип анимации загрузки                                                       |
| stagger          | `number`                          | `0`                          | Задержка между анимациями вложенных элементов                               |
| reveal           | `number`                          | `0`                          | Задержка перед показом реального содержимого после отключения загрузки      |
| count            | `number`                          | `1`                          | Количество повторений содержимого в skeleton-состоянии                      |
| countGap         | `number`                          | `0`                          | Расстояние между повторениями при `count > 1`, в пикселях                   |
| shimmerDirection | `'ltr'`,<br/>`'rtl'`,<br/>`'ttb'`,<br/>`'btt'` | `'ltr'`      | Направление shimmer-анимации                                                |
| shimmerColor     | `string`                          | `'var(--color-neutral-100)'` | Цвет блика shimmer-анимации                                                 |
| backgroundColor  | `string`                          | `'var(--color-neutral-200)'` | Основной цвет skeleton-заглушки                                             |
| duration         | `number`                          | `1.5`                        | Длительность анимации в секундах                                            |
| fallbackRadius   | `number`                          | `4`                          | Радиус скругления fallback-заглушек, в пикселях                             |
| debug            | `boolean`                         | `false`                      | Включает отладочный режим `phantom-ui`                                      |

## Слоты

| Название | Описание                                      | Параметры |
|:---------|:----------------------------------------------|-----------|
| default  | Содержимое, по которому будет построен skeleton | -         |

## Использование

Простой пример:

```vue
<script setup lang="ts">
import XSkeleton from '@/app/shared/components/ui/XSkeleton.vue';
import { ref } from 'vue';

const loading = ref(true);
</script>

<template>
	<XSkeleton :loading="loading">
		<article class="news-card">
			<img class="news-card__image" src="/img/content/news.jpg" alt="">
			<h3 class="news-card__title">Заголовок новости</h3>
			<p class="news-card__text">Краткое описание новости.</p>
		</article>
	</XSkeleton>
</template>
```

Пример с повторением элементов:

```vue
<script setup lang="ts">
import XSkeleton from '@/app/shared/components/ui/XSkeleton.vue';
import { ref } from 'vue';

const loading = ref(true);
</script>

<template>
	<XSkeleton :loading="loading" :count="4" count-gap="24px">
		<article class="product-card">
			<div class="product-card__image" />
			<h3 class="product-card__title">Название товара</h3>
			<p class="product-card__price">12 000 ₽</p>
		</article>
	</XSkeleton>
</template>
```

## Загрузка данных из API

Если данные приходят из API и заранее неизвестно, сколько элементов будет в ответе и какого размера будет контент,
не стоит строить skeleton по пустому списку или по реальным данным, которых еще нет. В таком случае используйте
fallback-верстку: стабильный шаблон, который визуально похож на будущий контент и не зависит от ответа API.

```vue
<script setup lang="ts">
import XSkeleton from '@/app/shared/components/ui/XSkeleton.vue';
import { onMounted, ref } from 'vue';

interface Article {
	id: number;
	title: string;
	description: string;
}

const { isPending } = useApiStore();
const { requestNews } = useBlogStore();
const { articles } = storeToRefs(useBlogStore());

requestArticles();

const isLoading = computed(() => isLoading(BlogApiKeys.ARTICLES));
</script>

<template>
	<XSkeleton v-if="isLoading" loading :count="3" count-gap="20px">
		<article class="article-card article-card--fallback">
			<div class="article-card__preview" />
			<h3 class="article-card__title">Заголовок материала</h3>
			<p class="article-card__description">
				Короткое описание материала в две строки.
			</p>
		</article>
	</XSkeleton>

	<div v-else class="articles-list">
		<article v-for="article in articles" :key="article.id" class="article-card">
			<h3 class="article-card__title">{{ article.title }}</h3>
			<p class="article-card__description">{{ article.description }}</p>
		</article>
	</div>
</template>
```

Fallback-разметка должна быть близка к финальной структуре: карточка для карточки, строка таблицы для таблицы, пункт
списка для списка. Размеры изображений, аватаров, кнопок и основных текстовых блоков лучше задавать явно классами,
чтобы skeleton не прыгал при переключении `loading`.

Для input-компонентов отдельная fallback-верстка обычно не нужна:

```vue
<script setup lang="ts">
import XInputText from '@/app/shared/components/inputs/XInputText.vue';
import { ref } from 'vue';

const loading = ref(true);
const name = ref('');
</script>

<template>
	<XInputText
		v-model="name"
		:loading="loading"
		label="Имя"
		placeholder="Введите имя"
	/>
</template>
```

## Рекомендации

- Используйте `XSkeleton` для блоков, у которых уже есть понятная финальная разметка.
- Для неизвестного API-ответа показывайте fallback-верстку с ожидаемой структурой и примерным количеством элементов.
- Не привязывайте количество skeleton-элементов к пустому массиву данных. Для этого есть пропс `count`.
- Задавайте стабильные размеры у ключевых элементов fallback-разметки, чтобы избежать скачков интерфейса.
- Для точной настройки атрибутов и поведения сверяйтесь с документацией [`phantom-ui`](https://aejkatappaja.github.io/phantom-ui/).

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/components/ui/XSkeleton.vue)
- [phantom-ui](https://aejkatappaja.github.io/phantom-ui/)
