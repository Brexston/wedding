<script setup lang="ts">
import type { Placement } from '@popperjs/core';
import type { TriggerEvent } from 'floating-vue';
import { Dropdown } from 'floating-vue';

interface Props {
	ariaId?: string;
	distance?: number;
	skidding?: number;
	instantMove?: boolean;
	disposeTimeout?: number;
	flip?: boolean;
	shift?: boolean;
	shiftCrossAxis?: boolean;
	placement?: Placement;
	triggers?: TriggerEvent[];
	popperTriggers?: TriggerEvent[];
	strategy?: 'absolute' | 'fixed';
	delay?: number | PopperDelay;
	autoHide?: boolean;
	overflowPadding?: number;
	arrowPadding?: number;
	arrowOverflow?: boolean;
	positioningDisabled?: boolean;
	theme?: 'default' | 'null' | 'without-arrow';
}

interface PopperDelay {
	show: number;
	hide: number;
}

const {
	ariaId = null,
	distance = 0,
	skidding = 0,
	instantMove = false,
	disposeTimeout = 0,
	flip = true,
	shift = true,
	shiftCrossAxis = false,
	placement = 'auto',
	triggers = ['click'],
	strategy = 'fixed',
	delay = 0,
	autoHide = true,
	overflowPadding = 20,
	arrowPadding = 10,
	arrowOverflow = true,
	positioningDisabled = false,
	theme = 'default',
} = defineProps<Props>();
</script>

<template>
	<Dropdown
		:aria-describedby="ariaId"
		:distance
		:skidding
		:instant-move
		:dispose-timeout
		:flip
		:shift
		:shift-cross-axis
		:placement
		:triggers
		:popper-triggers
		:strategy
		:overflow-padding
		:arrow-padding
		:arrow-overflow
		:delay
		:auto-hide
		:positioning-disabled
		:container="ariaId ? `[aria-describedby='${ariaId}']` : '#modals-container'"
		:theme
		boundary="body"
		auto-boundary-max-size
		prevent-overflow
	>
		<slot />

		<template #popper="{ hide }">
			<slot name="content" :hide />
		</template>
	</Dropdown>
</template>

<style lang="sass" src="@styles/shared/libs/floating-vue.sass" />
