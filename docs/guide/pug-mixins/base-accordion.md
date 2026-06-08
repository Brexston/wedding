# base-accordion (Pug)

Pug-миксин для создания раскрывающихся аккордеонов.

Расположение: `src/templates/shared/accordions/base-accordion.pug`

::: tip Особенности
Миксин удобен тем, что можно передать ему массив объектов, и на основе каждого объекта будет отрисован аккордеон. `base-accordion` использует vue-компонент [XAccordion](/guide/components/ui/XAccordion.html), позволяя пробросить пропс, сразу открывающий его контент. Если нужен один аккордеон, то можно использовать как pug-миксин, так и сам vue-компонент.
:::

## Аргументы

| Название | Тип      | По умолчанию | Описание                    |
|:---------|:---------|:-------------|:----------------------------|
| `items`  | `array`  | []           | Массив объектов<sup>*</sup> |

<sup>*</sup> объекты вида `{ title: '', content: ''}`

## Использование

```pug
+base-accordion([{ title: 'Заголовок', content: 'Контент аккордеона' }])
```

Пример:

```pug
+base-accordion(
	[
		{
			title: 'Что есть что?',
			content: 'У ученых нет однозначного ответа.'
		},
		{
			title: 'Быть или не быть?',
			content: 'Вот в чем вопрос.'
		}
	]
)(opened).faq-accordion
```

Этот код вставит на страницу два аккордеона, добавит каждому класс `faq-accordion`, и раскроет их содержимое.

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/templates/shared/accordions/base-accordion.pug)
