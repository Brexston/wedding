<script setup lang="ts">
import { useBaseStore } from '@app/shared/stores/base.store';
import { useCookies } from '@vueuse/integrations/useCookies';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const { isCookieConfirmed } = useBaseStore();
const { docs } = storeToRefs(useBaseStore());

const cookieShown = ref(false);

onMounted(() => {
	checkCookie();
});

function checkCookie() {
	if (!isCookieConfirmed) {
		setTimeout(() => {
			cookieShown.value = true;
		}, 5000);
	}
}

// https://vueuse.org/integrations/useCookies/
const { set: setCookie } = useCookies();
function onConfirmCookie() {
	setCookie('cookieConfirmed', 'Y', {
		path: '/',
		expires: new Date(Date.now() + 2592000000),
	});
	cookieShown.value = false;
}
</script>

<template>
	<teleport to="#modals-container" defer>
		<transition name="cookie" :duration="450" appear>
			<dialog v-if="cookieShown" :open="cookieShown" class="cookie-toast-wrapper wrapper">
				<div class="cookie-toast">
					<div class="cookie-toast__body">
						<span class="cookie-toast__text">Этот сайт использует файлы cookie. Продолжая пользоваться сайтом, вы <a class="l cookie-toast__link" :href="docs.privacyPolicy">соглашаетесь </a> с этим.</span>
						<button class="cookie-toast__btn btn btn--size-s" @click="onConfirmCookie">
							<span class="btn__text">Принять</span>
						</button>
					</div>
				</div>
			</dialog>
		</transition>
	</teleport>
</template>

<style scoped lang="sass">
.cookie-toast-wrapper
	position: fixed
	right: 0
	bottom: 40px
	left: 0
	z-index: var(--z-index-modal)

	display: flex
	justify-content: center

	padding: 0 var(--wrapper-padding)

	border: none
	background: none

	pointer-events: none

	@include media('max', 'mobile-xl')
		width: 100%

.cookie-toast
	padding: 14px
	border: none
	border-radius: var(--radius-m)

	background-color: var(--color-neutral-100)
	box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.2)
	pointer-events: all

	@include media('max', 'mobile-xl')
		width: 100%

	&__body
		display: flex
		align-items: center
		justify-content: space-between
		gap: 14px

		@include media('max', 'mobile-xl')
			flex-direction: column

	&__text
		max-width: 270px
		font-size: var(--font-size-text-m)
		line-height: var(--line-height-m)
		text-wrap: balance

		@include media('max', 'mobile-xl')
			max-width: 100%

	&__btn
		@include media('max', 'mobile-xl')
			width: 100%

	&__link
		color: var(--color-primary-500)

.cookie-enter-active,
.cookie-leave-active
	transition: opacity 0.3s ease, transform 0.3s ease

.cookie-enter-from,
.cookie-leave-to
	opacity: 0
	transform: translateY(8px)
</style>
