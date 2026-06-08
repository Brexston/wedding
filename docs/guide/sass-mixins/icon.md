# icon (Sass)

Sass-миксин для отображения SVG-иконок из общего спрайта.

Расположение: `src/styles/base/mixins/icon.sass`

## Аргументы

| Название             | Тип                          | По умолчанию | Описание                                                |
|:---------------------|:-----------------------------|--------------|:--------------------------------------------------------|
| `$name` <sup>*</sup> | `string`                     | -            | Имя иконки                                              |
| `$mode`              | `'mask'`<br>`\|'background'` | `'mask'`     | Способ (CSS-свойство), которым будет вставляться иконка |

<sup>* - обязательный аргумент</sup>

## Использование

```sass
.foo
	@include icon('plus')
```

Отображение CSS-свойством `background`:

```sass
.foo
	@include icon('plus', 'background')
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/templates/shared/ui/icon.pug)
