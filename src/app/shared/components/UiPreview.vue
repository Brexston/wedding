<script setup lang="ts">
import XInputCheckbox from '@app/shared/components/inputs/XInputCheckbox.vue';
import XInputCode from '@app/shared/components/inputs/XInputCode.vue';
import XInputDate from '@app/shared/components/inputs/XInputDate.vue';
import XInputFile from '@app/shared/components/inputs/XInputFile.vue';
import XInputRadio from '@app/shared/components/inputs/XInputRadio.vue';
import XInputRange from '@app/shared/components/inputs/XInputRange.vue';
import XInputSearch from '@app/shared/components/inputs/XInputSearch.vue';
import XInputSelect from '@app/shared/components/inputs/XInputSelect.vue';
import XInputSwitch from '@app/shared/components/inputs/XInputSwitch.vue';
import XInputText from '@app/shared/components/inputs/XInputText.vue';
import XInputTextarea from '@app/shared/components/inputs/XInputTextarea.vue';
import XTransitionFade from '@app/shared/components/transitions/XTransitionFade.vue';
import XLoader from '@app/shared/components/ui/XLoader.vue';
import XSkeleton from '@app/shared/components/ui/XSkeleton.vue';
import { useI18n } from '@app/shared/composables/useI18n/useI18n';
import { toastError, toastInfo, toastSuccess, toastWarning } from '@app/shared/utils/toast';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useBaseStore } from '@/app/shared/stores/base.store';

interface Props {
	tab: string;
}
defineProps<Props>();

// DATA
const firstLoaderShown = ref<boolean>(false);
const secondLoaderShown = ref<boolean>(false);

// METHODS
function loaderTestShow() {
	firstLoaderShown.value = true;

	setTimeout(() => {
		firstLoaderShown.value = false;
	}, 3000);
}
function loaderTestShowSecond() {
	secondLoaderShown.value = true;

	setTimeout(() => {
		secondLoaderShown.value = false;
	}, 3000);
}

// I18N
const { t } = useI18n();
const { docs } = storeToRefs(useBaseStore());

const { BASE_URL } = import.meta.env;
</script>

<template>
	<div class="pv-blocks pv-blocks--list">
		<slot />

		<template v-if="['All', 'Inputs'].includes(tab)">
			<div class="pv-block">
				<h3 class="pv-block__title">
					Inputs
				</h3>
				<div class="pv-block__preview">
					<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
						<XInputText placeholder="Type here" label="Default Input" />
						<XInputText
							label="Инпут с блоком рядом"
						>
							<template #action>
								<button class="input-btn btn btn--color-primary">
									<span class="btn__text">Подтвердить</span>
								</button>
							</template>
						</XInputText>
						<XInputText
							label="Инпут с блоком снизу"
						>
							<template #underInput>
								<a class="link link--color-primary">Получить код</a>
							</template>
						</XInputText>
						<XInputText placeholder="Type here" label="Default Input" />
						<XInputText placeholder="Type here" label="Disabled Input" disabled />
						<XInputText placeholder="Type here" label="Readonly Input" readonly />
						<XInputText placeholder="Type here" label="Disabled Input" :errors="['Some Error']" />
						<XInputText placeholder="Type here" label="Loading Input" loading />
					</div>
				</div>
			</div>

			<div class="pv-block pv-block--dark">
				<h3 class="pv-block__title">
					Inputs
				</h3>
				<div class="pv-block__preview">
					<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
						<XInputText placeholder="Type here" label="Default Input" />
						<XInputText
							label="Инпут с блоком рядом"
						>
							<template #action>
								<button class="input-btn btn">
									<span class="btn__text">Подтвердить</span>
								</button>
							</template>
						</XInputText>
						<XInputText
							label="Инпут с блоком снизу"
						>
							<template #underInput>
								<a class="link">Получить код</a>
							</template>
						</XInputText>
						<XInputText placeholder="Type here" label="Default Input" />
						<XInputText placeholder="Type here" label="Disabled Input" disabled />
						<XInputText placeholder="Type here" label="Readonly Input" readonly />
						<XInputText placeholder="Type here" label="Disabled Input" :errors="['Some Error']" />
						<XInputText placeholder="Type here" label="Loading Input" loading />
					</div>
				</div>
			</div>
		</template>

		<div v-if="['All', 'Textarea'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Textarea
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputTextarea placeholder="Type here" label="Default textarea" />
					<XInputTextarea placeholder="Type here" label="Textarea autosize" autosize />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Select'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Select
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputSelect placeholder="Select option" label="Default Select" :options="['Option 1', 'Extremely Long Option 2', 'Option 3']" />
					<XInputSelect placeholder="Select option" label="Disabled Select" disabled :options="['Option 1', 'Option 2', 'Option 3']" />
					<XInputSelect placeholder="Select option" label="ReadOnly Select" readonly :options="['Option 1', 'Option 2', 'Option 3']" />
					<XInputSelect placeholder="Select option" label="Unvalid Select" :errors="['Some Other Error']" :options="['Option 1', 'Option 2', 'Option 3']" />
					<XInputSelect :model-value="['Option 1']" placeholder="Select option" label="Tags Select" mode="tags" :options="['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10']" />
					<XInputSelect :model-value="['Option 1', 'Option 3']" placeholder="Select option" label="Multiple Select" mode="multiple" :options="['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10']" />
					<XInputSelect placeholder="Select option" label="Loading Select" loading-select :options="['Option 1', 'Option 2', 'Option 3']" />
					<XInputSelect placeholder="Select option" label="Group Select" mode="multiple" groups :options="[{ label: 'Group 1', options: ['Option 1', 'Option 2', 'Option 3'] }, { label: 'Group 2', options: ['Option 4', 'Option 5', 'Option 6'] }]" />
					<XInputSelect placeholder="Select option" label="Searchable Select" searchable :options="['Option 1', 'Option 2', 'Option 3']" />
					<XInputSelect placeholder="Select option" label="Default Select" :options="['Option 1', 'Extremely Long Option 2', 'Option 3']" loading />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Checkbox'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Checkbox
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputCheckbox label="Default Checkbox" text="Default Checkbox" />
					<XInputCheckbox label="Checked Checkbox" :model-value="true" text="Checked Checkbox" />
					<XInputCheckbox label="Disabled Checkbox" disabled text="Disabled Checkbox" />
					<XInputCheckbox label="Disabled-checked Checkbox" disabled :model-value="true" text="Disabled-checked Checkbox" />
					<XInputCheckbox label="Readonly Checkbox" readonly :model-value="true" text="Readonly Checkbox" />
					<XInputCheckbox label="Unvalid Checkbox" :errors="['Some error']" text="Unvalid Checkbox" />
					<XInputCheckbox text="No label Checkbox" />
					<XInputCheckbox text="No label Checkbox" loading />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Radio'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Radio
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputRadio name="radio-preview" label="Default Radio" value-prop="Default Radio" />
					<XInputRadio name="radio-preview" label="Checked Radio" value-prop="Checked Radio" />
					<XInputRadio name="radio-preview" label="Disabled Radio" disabled value-prop="Disabled Radio" />
					<XInputRadio name="radio-preview" label="Readonly Radio" readonly value-prop="Readonly Radio" />
					<XInputRadio name="radio-preview" label="Unvalid Radio" :errors="['Some error']" value-prop="Unvalid Radio" />
					<XInputRadio name="radio-preview" value-prop="No label Radio" />
					<XInputRadio name="radio-preview" :loading="true" value-prop="No label Radio" />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Switch'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Switch
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputSwitch label="Default Switch" on-label="On text" off-label="Off text" />
					<XInputSwitch :model-value="true" label="Active Switch" on-label="On text" off-label="Off text" />
					<XInputSwitch label="Disabled Switch" disabled on-label="On text" off-label="Off text" />
					<XInputSwitch label="Unvalid Switch" :errors="['Some error']" on-label="On text" off-label="Off text" />
					<XInputSwitch label="No text Switch" />
					<XInputSwitch on-label="No label Switch" />
					<XInputSwitch :loading="true" on-label="No label Switch" />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Search'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Search
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputSearch placeholder="Search here" :tooltips="['First tooltip', 'Second tooltip']" />
					<XInputSearch placeholder="Disabled search" disabled :tooltips="['First tooltip', 'Second tooltip']" />
				</div>
			</div>
		</div>

		<div v-if="['All', 'Date'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Date
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputDate placeholder="Select date" label="Default Date" />
					<XInputDate placeholder="Select date" label="Disabled Date" disabled />
					<XInputDate placeholder="Select date" label="Unvalid Date" :errors="['Some error']" />
					<XInputDate placeholder="Select date" label="Selected Date" model-value="01.01.2020" />
					<XInputDate placeholder="Select date" label="Readonly Date" readonly model-value="01.01.2020" />
					<XInputDate placeholder="Select date" label="Custom Format (YY/MM/DD)" date-mask="yy/MM/dd" model-value="2020/01/01" />
					<XInputDate placeholder="Select date" label="Max/Min Date" min-date="01.01.2020" max-date="18.01.2020" model-value="01.01.2020" />
					<XInputDate placeholder="Select dates" label="Range Date" is-range />
					<XInputDate placeholder="Select dates" label="Multi Calendars + is-range" is-range multi-calendars />
					<XInputDate placeholder="Select date" label="Time Date" is-time-picker />
					<XInputDate placeholder="Select date" :loading="true" label="Loading" is-time-picker />
				</div>
			</div>
		</div>

		<div v-if="['All', 'File'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Inputs Files
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputFile
						placeholder="Choose file"
						label="Default File"
						:accept="['image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']"
					/>
					<XInputFile
						placeholder="Choose file"
						label="Filled File"
						:accept="['image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']"
						multiple
						:model-value="[`${BASE_URL}img/content/rmk-arena.jpg`, `${BASE_URL}img/content/traktor.jpg`]"
					/>
					<XInputFile
						placeholder="Choose file"
						label="Disabled File"
						:accept="['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']"
						disabled
					/>
					<XInputFile
						placeholder="Choose file"
						label="Readonly File"
						:accept="['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']"
						readonly
						multiple
						:model-value="[`${BASE_URL}img/content/rmk-arena.jpg`, `${BASE_URL}img/content/traktor.jpg`]"
					/>
					<XInputFile
						placeholder="Choose file"
						label="Unvalid File"
						:accept="['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']"
						:errors="['Some error']"
					/>
				</div>
			</div>
		</div>

		<div v-if="['All', 'Range'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Inputs Range
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<XInputRange label="Default Range" suffix="%" />
					<XInputRange label="Decimal Range" suffix="%" :step="-1" />
					<XInputRange label="Tooltip Range" suffix="%" :model-value="75" tooltips />
					<XInputRange label="Double File" suffix="$" :model-value="[50, 100]" />
					<XInputRange label="Readonly Range" suffix="%" :model-value="35" readonly />
					<XInputRange label="Unvalid Range" suffix="%" :errors="['Some error']" />
				</div>
			</div>
		</div>

		<template v-if="['All', 'Code Input'].includes(tab)">
			<div class="pv-block">
				<h3 class="pv-block__title">
					Code Input
				</h3>
				<div class="pv-block__preview">
					<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
						<XInputCode label="Введите код" />
					</div>
				</div>
			</div>
		</template>

		<div v-if="['All', 'Loaders'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Loaders
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<div class="pv-block__item">
						<button class="btn btn--color-primary btn--size-small" @click="loaderTestShow()">
							<span class="btn__text">Show Fullscreen Loader</span>
						</button>
						<XTransitionFade>
							<XLoader v-if="firstLoaderShown" color-scheme="dark" />
						</XTransitionFade>
					</div>
					<div class="pv-block__item">
						<button class="btn btn--color-primary btn--size-small" @click="loaderTestShowSecond()">
							<span class="btn__text">Static Loader</span>
						</button>
						<XLoader color-scheme="dark" position="static" />
					</div>
				</div>
			</div>
		</div>

		<div v-if="['All', 'Skeletons'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Skeletons
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<div class="pv-block__item">
						<XSkeleton loading>
							<article class="skeleton-preview-card">
								<div class="skeleton-preview-card__image" />
								<h4 class="skeleton-preview-card__title">
									Карточка материала
								</h4>
								<p class="skeleton-preview-card__text">
									Описание материала в несколько строк для примера skeleton-состояния.
								</p>
								<button class="btn btn--color-primary btn--size-small">
									<span class="btn__text">Подробнее</span>
								</button>
							</article>
						</XSkeleton>
					</div>
					<div class="pv-block__item">
						<XSkeleton loading :count="3" :count-gap="16">
							<div class="skeleton-preview-row">
								<div class="skeleton-preview-row__avatar" />
								<div class="skeleton-preview-row__content">
									<strong class="skeleton-preview-row__title">Название элемента</strong>
									<span class="skeleton-preview-row__text">Дополнительное описание элемента</span>
								</div>
							</div>
						</XSkeleton>
					</div>
					<div class="pv-block__item">
						<XSkeleton loading animation="pulse" :count="2" :count-gap="20">
							<article class="skeleton-preview-api-card">
								<div class="skeleton-preview-api-card__media" />
								<div class="skeleton-preview-api-card__content">
									<h4 class="skeleton-preview-api-card__title">
										Fallback для данных из API
									</h4>
									<p class="skeleton-preview-api-card__text">
										Используется, когда неизвестно количество и размер будущих данных.
									</p>
								</div>
							</article>
						</XSkeleton>
					</div>
				</div>
			</div>
		</div>

		<div v-if="['All', 'Toasts'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				Toasts
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row pv-block__items--align-start">
					<button class="btn btn--color-primary btn--size-small" @click="toastSuccess('Ваш запрос успешно отправлен.')">
						<span class="btn__text">Success</span>
					</button>
					<button class="btn btn--border-primary btn--size-small" @click="toastWarning('Извините, что-то произошло с вашим запросом.')">
						<span class="btn__text">Warning</span>
					</button>
					<button class="btn btn--border-primary btn--size-small" @click="toastError('Произошла ошибка. Ваш запрос не был отправлен.')">
						<span class="btn__text">Error</span>
					</button>
					<button class="btn btn--border-primary btn--size-small" @click="toastInfo('Здесь есть что-то что может показаться вам интересным.')">
						<span class="btn__text">Info</span>
					</button>
				</div>
			</div>
		</div>

		<div v-if="['All', 'I18n'].includes(tab)" class="pv-block">
			<h3 class="pv-block__title">
				i18n
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items">
					<b>Для теста нужно раскомментировать три строчки в RootComponent</b>
					<span>{{ t('test.hello') }}</span>
					<br>
					<span>{{ t('test.applesCount', { count: 5 }) }}</span>
					<br>
					<p v-html="t('agreement', { policy: docs.privacyPolicy, personal: docs.userAgreement })"></p>
				</div>
			</div>
		</div>
	</div>
	<XModalVideo />
</template>
