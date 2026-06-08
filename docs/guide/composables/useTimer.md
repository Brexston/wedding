# useTimer

Composable-функция для создания таймера обратного отсчета с форматированным отображением времени.

Расположение: `src/app/shared/composables/useTimer.ts`

## Аргументы

| Название             | Тип                  | По умолчанию | Описание     |
|:---------------------|:---------------------|--------------|:-------------|
| options              | `UseTimerOptions`    | `{}`         | Объект опций |

#### `options`

| Название       | Тип                     | По умолчанию | Описание                                         |
|:---------------|:------------------------|--------------|:-------------------------------------------------|
| stopOnUnmount  | `boolean`               | `false`      | Остановить таймер при размонтировании компонента |

## Возвращаемое значение

| Название       | Тип                                           | Описание                                       |
|:---------------|:----------------------------------------------|:-----------------------------------------------|
| time           | `Ref<number>`                                 | Текущее значение таймера в секундах            |
| formattedTime  | `ComputedRef<string>`                         | Отформатированное время в формате "MM:SS"      |
| startTimer     | `(timeout: MaybeRefOrGetter<number>) => void` | Запуск таймера с указанным временем в секундах |
| stopTimer      | `() => void`                                  | Остановка таймера                              |

## Типы

```ts
interface UseTimerOptions {
	stopOnUnmount?: boolean;
}

interface UseTimerReturn {
	time: Ref<number>;
	formattedTime: ComputedRef<string>;
	startTimer: (timeout: MaybeRefOrGetter<number>) => void;
	stopTimer: () => void;
}
```

## Использование

Базовое использование таймера с отображением форматированного времени.

```vue
<script setup lang="ts">
import { useTimer } from '@app/shared/composables/useTimer';
import { ref } from 'vue';

const { time, formattedTime, startTimer, stopTimer } = useTimer();
</script>

<template>
	<div>
		<button @click="startTimer(60)">Запустить таймер</button>
		<button @click="stopTimer">Остановить таймер</button>
		<p>Осталось времени: {{ formattedTime }}</p>
	</div>
</template>
```

### Автоматическая остановка при размонтировании

Если нужно, чтобы таймер автоматически останавливался при размонтировании компонента, используй опцию `stopOnUnmount`.

```vue
<script setup lang="ts">
import { useTimer } from '@app/shared/composables/useTimer';

const { time, formattedTime, startTimer } = useTimer({
	stopOnUnmount: true,
});

// Запуск таймера на 2 минуты
startTimer(120);
</script>

<template>
	<div>
		<p>Осталось времени: {{ formattedTime }}</p>
	</div>
</template>
```

## Источники

- [GitHub](https://github.com/XpageTeam/frontend-template/blob/main/src/app/shared/composables/useTimer.ts)
