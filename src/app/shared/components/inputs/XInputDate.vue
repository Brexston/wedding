<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import type { TimeModel } from '@vuepic/vue-datepicker';
import XInputField from '@app/shared/components/inputs/XInputField.vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { getParsedDate } from '@app/shared/utils/getParsedDate';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { ru } from 'date-fns/locale';
import { computed, useId } from 'vue';

interface Props {
	id?: string;
	label?: string;
	placeholder?: string;
	title?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	errors?: string[] | ErrorObject[];
	isRange?: boolean;
	isTimePicker?: boolean;
	minDate?: string;
	maxDate?: string;
	minTime?: TimeModel;
	maxTime?: TimeModel;
	dateMask?: string;
	timeMask?: string;
	multiCalendars?: boolean;
}

const {
	id,
	isRange,
	isTimePicker,
	dateMask = 'dd.MM.yyyy',
	timeMask = 'HH:mm',
} = defineProps<Props>();

const modelValue = defineModel<string | null>();

const dateMaskLocale = dateMask + (isTimePicker ? `, ${timeMask}` : '');

const inputId = id ?? useId();

const getInputMask = computed(() => {
	const datePart = dateMask.replaceAll(/\w/g, '#');
	const timePart = timeMask.replaceAll(/\w/g, '#');
	const singleMask = isTimePicker ? `${datePart}, ${timePart}` : datePart;

	if (isRange) {
		return `${singleMask} - ${singleMask}`;
	}
	return singleMask;
});
</script>

<template>
	<XInputField :id="inputId" :label :errors :required>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<VueDatePicker
			v-model="modelValue"
			:model-type="dateMask"
			:min-date="getParsedDate(minDate)"
			:max-date="getParsedDate(maxDate)"
			:formats="{ input: dateMaskLocale, preview: dateMaskLocale }"
			:range="isRange"
			:multi-calendars="multiCalendars"
			:time-config="{
				enableTimePicker: isTimePicker,
				timePickerInline: isTimePicker,
			}"
			:input-attrs="{ clearable: true }"
			:max-time
			:min-time
			text-input
			auto-apply
			:locale="ru"
		>
			<template #dp-input="{ value, onInput, onEnter, onTab, onFocus, onBlur, onPaste }">
				<div class="input">
					<input
						:id="inputId"
						v-mask
						:data-maska="getInputMask"
						:value
						:placeholder
						:disabled="disabled || readonly"
						:readonly
						:title
						type="text"
						class="input__input input__input--date"
						:class="[{ error: errors?.length }, { disabled }]"
						@input="onInput"
						@keydown.enter="onEnter"
						@keydown.tab="onTab"
						@focus="onFocus"
						@blur="onBlur"
						@paste="onPaste"
					>
					<span v-if="!modelValue?.length" class="input__icon input__icon--date">
						<XIcon class="input__icon-image" name="calendar" />
					</span>
				</div>
			</template>
		</VueDatePicker>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</XInputField>
</template>

<style lang="sass">
/// Документация:
/// https://vue3datepicker.com/customization/theming/#theming

@import '@vuepic/vue-datepicker/dist/main.css'

:root
	// Основное
	--dp-font-family: var(--font-family)
	--dp-border-radius: var(--radius-l)
	--dp-cell-border-radius: var(--radius-m) /* радиус ячейки */
	--dp-common-transition: all 0.3s ease-in /* Общая анимация, для кнопок и ячейек календаря */

	// Размеры
	//--dp-button-height: 35px /* Размер для кнопок в оверлеях */
	//--dp-month-year-row-height: 35px /* Высота строки выбора месяца и года */
	//--dp-month-year-row-button-size: 35px /* Определенная высота для кнопок next/prev */
	--dp-button-icon-height: 16px /* Размер иконок в кнопках */
	--dp-cell-size: 40px /* Ширина и высота ячейки календаря */
	--dp-cell-padding: 0 /* Отступы между ячейками */
	//--dp-common-padding: 10px /* Общий отступ */
	--dp-menu-min-width: 320px /* Настройка минимальной ширины меню */
	//--dp-action-buttons-padding: 2px 5px /* Настройте отступы для кнопок действий в строке действий */
	--dp-row-margin: 4px 0 /* Настройка расстояния между строками в календаре */
	//--dp-calendar-header-cell-padding:  0.5rem /* Настройка отступов в ячейках заголовка календаря */
	//--dp-two-calendars-spacing: 10px /* Промежуток между несколькими календарями */
	//--dp-overlay-col-padding: 3px /* Отступы в колонке оверлея */
	//--dp-time-inc-dec-button-size: 32px /* Изменение размера кнопок со стрелками в устройстве выбора времени */
	--dp-menu-padding: fluid(20, 8) /* Отступы в меню */

	// Font size
	--dp-font-size: 16px
	--dp-preview-font-size: 16px /* Размер шрифта для предварительного просмотра даты в строке действий */
	--dp-time-font-size: 16px /* Размер шрифта в окне выбора времени */

	// Transitions
	//--dp-animation-duration: 0.1s
	//--dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1)
	//--dp-transition-timing: ease-out

.dp
	&__theme_light
		// Background
		--dp-background-color: var(--color-neutral-100)
		--dp-hover-color: var(--color-neutral-200)
		--dp-disabled-color: var(--di-bg-disabled)
		// Text
		--dp-text-color: var(--color-neutral-900)
		--dp-hover-text-color: var(--color-neutral-900)
		--dp-disabled-color-text: var(--di-color-disabled)
		// Active color
		--dp-primary-color: var(--color-primary-500)
		--dp-primary-text-color: var(--color-neutral-100)
		--dp-primary-disabled-color: var(--di-color-disabled)
		// Border
		--dp-border-color: transparent
		--dp-border-color-hover: transparent
		--dp-border-color-focus: transparent
		--dp-menu-border-color: var(--di-border-color)
		// Scrollbar
		--dp-scroll-bar-background: var(--scrollbar-color-background)
		--dp-scroll-bar-color: var(--scrollbar-color-thumb)
		--dp-success-color: var(--color-positive)
		--dp-success-color-disabled: var(--color-positive)
		// Icon
		--dp-icon-color: var(--color-neutral-900)
		--dp-hover-icon-color: var(--color-neutral-900)
		--dp-danger-color: var(--color-negative)
		//--dp-marker-color: #ff6f60
		//--dp-tooltip-color: #fafafa
		//--dp-highlight-color: rgb(25 118 210 / 10%)
		//--dp-secondary-color: #c0c4cc
		// Range
		//--dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3)
		//--dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121)
		//--dp-range-between-border-color: var(--dp-hover-color, #f3f3f3)

	&__overlay_container
		scrollbar-width: thin

	&__calendar_header
		color: var(--color-neutral-900)
		font-weight: 400

	&__calendar_header_item
		display: flex
		align-items: center
		justify-content: center

	&__time_picker_inline_container
		width: 100%
		padding-bottom: 10px

	&__input_icons
		position: absolute
		right: var(--di-px)
		width: var(--di-icon-size)
		height: var(--di-icon-size)
		padding: 0
</style>
