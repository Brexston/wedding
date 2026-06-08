import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue';
import { computed, onUnmounted, ref, toValue } from 'vue';

export interface UseTimerOptions {
	stopOnUnmount?: boolean;
}

export interface UseTimerReturn {
	time: Ref<number>;
	formattedTime: ComputedRef<string>;
	startTimer: (timeout: MaybeRefOrGetter<number>) => void;
	stopTimer: () => void;
}

export function useTimer(options: UseTimerOptions = {}): UseTimerReturn {
	const {
		stopOnUnmount = false,
	} = options;

	let instance: ReturnType<typeof setInterval> | null = null;
	const time = ref(0);

	function startTimer(timeout: MaybeRefOrGetter<number>) {
		if (instance)
			stopTimer();

		time.value = toValue(timeout);
		instance = setInterval(() => {
			time.value -= 1;
			if (time.value <= 0)
				stopTimer();
		}, 1000);
	}

	function stopTimer() {
		if (instance) {
			clearInterval(instance);
			instance = null;
		}
	}

	const formattedTime = computed(() => {
		const minutes = Math.floor(time.value / 60).toString().padStart(2, '0');
		const seconds = (time.value % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	});

	if (stopOnUnmount)
		onUnmounted(stopTimer);

	return {
		time,
		formattedTime,
		startTimer,
		stopTimer,
	};
}
