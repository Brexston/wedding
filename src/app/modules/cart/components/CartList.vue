<script setup lang="ts">
import { CartApiKeys } from '@app/modules/cart/api/cart.api';
import CartItem from '@app/modules/cart/components/CartItem.vue';
import { useCartStore } from '@app/modules/cart/store/cart.store';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { useApiStore } from '@app/shared/stores/api.store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { cart } = storeToRefs(useCartStore());
const { requestClearCart } = useCartStore();
const { isPending } = useApiStore();

const isLoading = computed(() => isPending(CartApiKeys.CLEAR_CART));
</script>

<template>
	<div v-if="cart?.length" class="cart-list">
		<div class="cart-list__list">
			<CartItem v-for="item in cart" :key="item.id" :item />
		</div>

		<button
			:loading="isLoading"
			class="link link--color-primary"
			@click="requestClearCart"
		>
			<XIcon class="link__icon link__icon--pale" name="del" />
			<span class="link__text">Очистить корзину</span>
		</button>
	</div>
</template>

<style lang="sass">
.cart-list
	&__list
		display: grid
		align-content: flex-start
		gap: 16px
</style>
