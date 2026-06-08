<script setup lang="ts">
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { useModalsStore } from '@app/shared/stores/modals.store';
import { computed } from 'vue';

interface TestData {
	title: string;
	description: string;
}

const { getModalData } = useModalsStore();
const modalData = computed(() => getModalData<TestData>('modal-callback'));
</script>

<template>
	<XModal id="modal-callback">
		<template #default="{ close }">
			<section class="modal">
				<button class="modal__close" data-dialog-close aria-label="закрыть" @click="close">
					<XIcon class="modal__close-icon" name="close" />
				</button>
				<div class="modal__wrapper">
					<h2 class="modal__title title title--h4">
						{{ modalData?.title || 'Заказать звонок' }}
					</h2>
					<p v-if="modalData?.description" class="modal__text">
						{{ modalData.description }}
					</p>
					<div class="modal__content">
						<FormContact />
					</div>
				</div>
			</section>
		</template>
	</XModal>
</template>
