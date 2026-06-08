# Начало работы

## Добавление в GitLab

Выполни следующие действия перед началом работы над новым проектом:
1. Скачай шаблон из [GitHub-репозитория](https://github.com/XpageTeam/frontend-template);
2. Удали папки `.git` и `.github` из скачанного шаблона, если они есть;
3. Найди и склонируй репозиторий проекта на [GitLab](https://gitlab.in-progress.ru/), если его нет — создай;
4. Перемести `frontend-template` в склонированный проект;
5. Переименуй `frontend-template` в `client-app`;
6. Выгрузи изменения в GitLab-репозиторий проекта.

По итогу должно выглядеть так:

![gitlab.png](/img/content/gitlab.png)

## Установка зависимостей

Шаблон требует **[Node.js](https://nodejs.org/en/) версии 22** и выше. Убедись, что у тебя установлена подходящая версия.

```sh
npm install
```

## Настройка IDE

При работе над проектом, склонированным из GitLab-репозитория, **важно** открывать в редакторе папку `client-app` и
работать именно в ней, а не во всём проекте. Это позволит IDE автоматически подтянуть все необходимые настройки и
правила.

::: details WebStorm
Если WebStorm по какой-то причине не подтянул настройки из шаблона, выполни следующие действия в настройках:
1. Перейди в `Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
	- выбери `Automatic ESLint configuration`
    - поставь галочку напротив `Run eslint --fix on save`
2. Перейди в `Languages & Frameworks > Node.js`
	- в `Node interpreter` выбери установленную у тебя верисию Node.js
3. Перейди в `Languages & Frameworks > Style Sheets > Stylelint`
	- поставь галочку напротив `Enable`
    - в `Run for files` укажи `**/*.{css,sass,vue}`
    - поставь галочку напротив `Run stylelint --fix on save`
:::

::: warning ВАЖНО
Убедись, что у тебя в редакторе используются **ТАБЫ**, а не пробелы!
:::

## Env-файл

В файле `.env` нужно указать название проекта в переменных `VITE_APP_TITLE` и `VITE_APP_NAME` .

Пример:

```dotenv
VITE_APP_TITLE="DDA Real Estate"
VITE_APP_NAME="dda-real-estate"
```

## Начало работы

Для запуска локального dev-сервера выполни команду:
```sh
npm run dev
```
