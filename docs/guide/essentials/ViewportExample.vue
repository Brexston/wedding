<script setup>
import { useWindowSize } from '@vueuse/core';
import { VIEWPORT_SIZES } from '../../../src/app/shared/consts/viewport.ts'
const { width } = useWindowSize();
</script>

<template>
	<div
		class="example-div"
		:class="{
			red: width <= VIEWPORT_SIZES['tablet'],
			orange: width > VIEWPORT_SIZES['tablet'] && width <= VIEWPORT_SIZES['tablet-xl'],
			yellow: width > VIEWPORT_SIZES['tablet-xl'] && width <= VIEWPORT_SIZES['laptop-xl'],
			green: width > VIEWPORT_SIZES['laptop-xl'] && width <= VIEWPORT_SIZES['laptop-xxl'],
			blue: width > VIEWPORT_SIZES['laptop-xxl'] && width <= VIEWPORT_SIZES['pc'],
			purple: width > VIEWPORT_SIZES['pc'],
			}
		">
		<span>Текущая ширина окна: {{ width }}</span>
	</div>
</template>

<style>
	.example-div { padding: 16px 32px; border-radius: 4px; color: #000000 }
	.red { background-color: #f5a7a6; }
	.red::before { content: '🤯 ' }
	.orange { background-color: #f5cf9f; }
	.orange::before { content: '🤖 ' }
	.yellow { background-color: #fef1ab; }
	.yellow::before { content: '👹 ' }
	.green { background-color: #d8eedf; }
	.green::before { content: '👾 ' }
	.blue { background-color: #d8e5f7; }
	.blue::before { content: '😱 ' }
	.purple { background-color: #d0c3f1; }
	.purple::before { content: '🦁 ' }
</style>
