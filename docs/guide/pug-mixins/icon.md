# icon (Pug)

Pug-миксин для отображения SVG-иконок из общего спрайта.

Расположение: `src/templates/shared/ui/icon.pug`

## Аргументы

| Название            | Тип      | По умолчанию | Описание   |
|:--------------------|:---------|:-------------|:-----------|
| `name` <sup>*</sup> | `string` | -            | Имя иконки |

<sup>* - обязательный аргумент</sup>

## Использование

```pug
+icon('plus')
```

Пример с кнопкой:

```pug
button.btn
	+icon('plus').btn__icon
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/templates/shared/ui/icon.pug)
