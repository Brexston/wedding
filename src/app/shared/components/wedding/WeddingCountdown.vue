<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
	targetDate?: string;
}>(), {
	targetDate: '2026-09-12T16:00:00+05:00',
});

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const timeLeft = ref<TimeLeft>({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});

const units = computed(() => [
	{ value: timeLeft.value.days, label: 'дней' },
	{ value: timeLeft.value.hours, label: 'часов' },
	{ value: timeLeft.value.minutes, label: 'минут' },
	{ value: timeLeft.value.seconds, label: 'секунд' },
]);

function pad(value: number) {
	return String(value).padStart(2, '0');
}

function updateCountdown() {
	const target = new Date(props.targetDate).getTime();
	const diff = Math.max(0, target - Date.now());

	timeLeft.value = {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

useIntervalFn(updateCountdown, 1000, { immediate: true });
</script>

<template>
	<div class="countdown-section__timer" role="timer" aria-live="polite">
		<div
			v-for="unit in units"
			:key="unit.label"
			class="countdown-section__unit"
		>
			<span class="countdown-section__value">{{ pad(unit.value) }}</span>
			<span class="countdown-section__label">{{ unit.label }}</span>
		</div>
	</div>
</template>
