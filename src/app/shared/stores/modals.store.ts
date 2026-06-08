import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useModalsStore = defineStore('modals', () => {
	// State
	const modalsRegister = ref<Set<string>>(new Set());
	const openedModals = ref<Set<string>>(new Set());
	const bodyLocked = ref(false);
	const modalData = ref<Map<string, unknown>>(new Map());

	// Getters
	const isModalOpened = (modalName: string) => openedModals.value.has(modalName);
	const hasActiveModals = computed(() => openedModals.value.size > 0);

	// Actions
	function registerModal(modalName: string) {
		if (modalsRegister.value.has(modalName))
			throw new Error(`${modalName}: has already been registered`);

		modalsRegister.value.add(modalName);
	}

	function unregisterModal(modalName: string) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName}: has not been registered`);

		if (openedModals.value.has(modalName))
			closeModal(modalName);

		modalsRegister.value.delete(modalName);
	}

	function openModal(modalName: string, data?: unknown) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName}: has not been registered`);

		if (openedModals.value.has(modalName)) {
			console.error(`${modalName} : has already been opened`);
			return;
		}

		openedModals.value.add(modalName);
		if (data)
			modalData.value.set(modalName, data);

		if (!bodyLocked.value)
			_lockBody();
	}

	function closeModal(modalName: string) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName}: has not been registered`);

		if (!openedModals.value.has(modalName)) {
			console.error(`${modalName} : has not been opened`);
			return;
		}

		openedModals.value.delete(modalName);
		modalData.value.delete(modalName);

		if (!hasActiveModals.value && bodyLocked.value) {
			setTimeout(() => {
				_unlockBody();
			}, 450);
		}
	}

	function getModalData<T = unknown>(modalName: string): T | undefined {
		return modalData.value.get(modalName) as T | undefined;
	}

	function _lockBody() {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.setProperty('--scrollbar-compensate', `${scrollbarWidth}px`);
		document.body.classList.add('modal-lock');
		bodyLocked.value = true;
	}

	function _unlockBody() {
		document.body.style.removeProperty('--scrollbar-compensate');
		document.body.classList.remove('modal-lock');
		bodyLocked.value = false;
	}

	return {
		// State
		modalsRegister,
		openedModals,
		bodyLocked,
		modalData,

		// Getters
		isModalOpened,
		hasActiveModals,

		// Actions
		registerModal,
		unregisterModal,
		openModal,
		closeModal,
		getModalData,
	};
});
