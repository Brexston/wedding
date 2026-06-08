# 📄 env.d.ts

Файл `env.d.ts` описывает типы переменных окружения для TypeScript.
Он расширяет стандартные определения `vite/client`, чтобы редактор и компилятор знали о доступных переменных.

## Содержимое

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_NAME: string;
	readonly VITE_APP_DOCS_NAME: string;
	readonly VITE_APP_BASE_URL: string;
	readonly VITE_APP_INITIAL_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
```


## Что это даёт

- **Подсказки в IDE**: при обращении к `import.meta.env.VITE_APP_NAME` доступны автодополнение и документация.
- **Типобезопасность**: если обратиться к переменной, которой нет в `.env` и в интерфейсе, TypeScript выдаст ошибку.
- **Явная спецификация**: разработчики сразу видят, какие именно переменные окружения поддерживаются проектом.

## Зачем нужен

- Делает работу с `.env` предсказуемой.
- Предотвращает баги из-за опечаток в именах переменных.
- Повышает удобство разработки в редакторах с поддержкой TypeScript.
