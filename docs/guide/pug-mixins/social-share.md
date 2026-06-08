# social-share (Pug)

Pug-миксин для отображения блока, позволяющего поделиться ссылкой в соц. сетях.

Расположение: `src/templates/shared/social-share.pug`

## Аргументы

Аргументы передаются в объекте.

| Название            | Тип      | По умолчанию               | Описание                 |
|:--------------------|:---------|:---------------------------|:-------------------------|
| `title`             | `string` | -                          | Заголовок блока кнопок   |
| `url` <sup>*</sup>  | `string` | ссылка на текущую страницу | Ссылка                   |
| `text` <sup>*</sup> | `string` | пустая строка              | Текст с описанием ссылки |

<sup>* - обязательный аргумент</sup>

## Использование

```pug
+social-share({title: 'Поделиться', url: 'https://www.xpage.ru', text: 'Интегратор цифровых продуктов'})
```


## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/templates/shared/social-share.pug)
