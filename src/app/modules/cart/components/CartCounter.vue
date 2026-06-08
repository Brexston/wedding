<script setup lang="ts">
import type { CartItem } from '@app/modules/cart/cart.types';
import { CartApiKeys } from '@app/modules/cart/api/cart.api';
import { useCartStore } from '@app/modules/cart/store/cart.store';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { cartCounterMask } from '@app/shared/consts/masks';
import { useApiStore } from '@app/shared/stores/api.store';
import { computed, ref, useTemplateRef, watch } from 'vue';

interface Props {
	cartItem: CartItem;
}
const { cartItem } = defineProps<Props>();
const LIMIT = 1000;

const input = useTemplateRef('input');

const quantity = ref(cartItem.quantity);

const { requestUpdateCart, requestCart } = useCartStore();

watch(() => cartItem.quantity, (newValue) => {
	if (+newValue === +quantity.value)
		return;
	quantity.value = newValue;
});

const { isPending } = useApiStore();

async function onChangeQuantity(value: number | string) {
	const newValue = +value > LIMIT ? LIMIT : +value;
	if (quantity.value === newValue || newValue < 1) {
		if (input.value)
			input.value.value = String(quantity.value);
		return;
	}

	const response = await requestUpdateCart({ itemId: cartItem.id, quantity: newValue });
	if (response) {
		quantity.value = newValue;
		await requestCart();
	}
}

const isLoading = computed(() => isPending(CartApiKeys.UPDATE_CART + cartItem.id));
</script>

<template>
	<div
		v-if="cartItem"
		class="cart-counter"
		:inert="isLoading"
		:class="{ loading: isLoading }"
	>
		<button
			class="btn btn--color-border btn--size-circle"
			:disabled="cartItem.quantity === 1"
			@click="onChangeQuantity(quantity - 1)"
		>
			<XIcon class="btn__icon" name="minus" />
		</button>
		<input
			ref="input"
			v-mask="cartCounterMask"
			:value="quantity"
			class="cart-counter__input"
			@change="(e) => onChangeQuantity((e.target as HTMLInputElement).value)"
		>

		<button
			class="btn btn--color-border btn--size-circle"
			:disabled="cartItem.quantity >= LIMIT"
			@click="onChangeQuantity(quantity + 1)"
		>
			<XIcon class="btn__icon" name="plus" />
		</button>
	</div>
</template>

<style scoped lang="sass">
.cart-counter
	display: flex
	align-items: center
	gap: 24px
</style>
