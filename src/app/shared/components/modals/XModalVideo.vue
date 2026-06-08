<script setup lang="ts">
import type { Video } from '@app/shared/components/ui/XVideo.vue';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import XVideo from '@app/shared/components/ui/XVideo.vue';
import { useModalsStore } from '@app/shared/stores/modals.store';
import { computed } from 'vue';

interface Iframe {
	src: string;
}

interface VideoData {
	title: string;
	date: string;
	video?: Video;
	iframe?: Iframe;
}

const { getModalData } = useModalsStore();
const modalData = computed(() => getModalData<VideoData>('modal-video'));
</script>

<template>
	<XModal id="modal-video" animation="opacity">
		<template #default="{ close }">
			<section class="modal modal--video">
				<button class="modal__close" data-dialog-close aria-label="закрыть" @click="close">
					<XIcon class="modal__close-icon" name="close" />
				</button>
				<div v-if="modalData" class="modal-video">
					<div class="modal-video__inner">
						<XVideo
							v-if="modalData.video"
							class="modal-video__preview"
							:video="{
								poster: modalData.video.poster,
								sources: modalData.video.sources,
							}"
							:width="1280"
							:height="800"
							controls
						/>
						<div v-if="modalData.iframe" class="modal-video__preview img">
							<iframe
								class="img__image"
								:src="modalData.iframe.src"
								frameborder="0"
								scrolling="no"
								allow="autoplay; fullscreen; picture-in-picture; encrypted-media; screen-wake-lock"
							/>
						</div>
						<div class="modal-video__bottom">
							<div class="modal-video__info">
								<div class="modal-video__title title title--h5" v-html="modalData.title"></div>
								<div class="modal-video__caption">
									{{ modalData.date }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</template>
	</XModal>
</template>

<style lang="sass">
@import '@styles/shared/modals/modal-video.sass'
</style>
