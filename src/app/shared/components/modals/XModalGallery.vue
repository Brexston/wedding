<script setup lang="ts">
import type { GallerySliderSlide } from '@app/shared/components/sliders/XSliderGallery.vue';
import XSliderGallery from '@app/shared/components/sliders/XSliderGallery.vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { useModalsStore } from '@app/shared/stores/modals.store';
import { computed } from 'vue';

interface Props {
	id?: string;
	slides: GallerySliderSlide[];
}

const { id } = defineProps<Props>();

const { getModalData } = useModalsStore();
const modalData = computed(() => getModalData<number>(id || 'modal-gallery'));
</script>

<template>
	<XModal :id="id || 'modal-gallery'" animation="opacity" class-name="modal-gallery">
		<template #default="{ close }">
			<div class="modal-gallery__modal">
				<div class="modal-gallery__header">
					<button class="modal__close" data-dialog-close aria-label="закрыть" @click="close">
						<XIcon class="modal__close-icon" name="close" />
					</button>
				</div>
				<div class="modal-gallery__content">
					<XSliderGallery :current-slide="modalData || 0" :slides class="modal-gallery__slider" />
				</div>
			</div>
		</template>
	</XModal>
</template>

<style lang="sass">
@import '@styles/shared/modals/modal-gallery.sass'
</style>
