<script setup lang="ts">
import type { CartItem } from '@app/modules/cart/cart.types';
import { CartApiKeys } from '@app/modules/cart/api/cart.api';
import CartCounter from '@app/modules/cart/components/CartCounter.vue';
import { useCartStore } from '@app/modules/cart/store/cart.store';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import XImage from '@app/shared/components/ui/XImage.vue';
import { useApiStore } from '@app/shared/stores/api.store';
import { computed } from 'vue';

export interface Props {
	item: CartItem;
}
const { item } = defineProps<Props>();

const { requestRemoveFromCart } = useCartStore();
const { isPending } = useApiStore();

const isLoading = computed(() => isPending(CartApiKeys.REMOVE_FROM_CART + item.id));
</script>

<template>
	<div class="cart-item">
		<div class="cart-item__product">
			<XImage class-name="cart-item__product-image" :src="item.product.image" width="40" height="40" />
			<div class="cart-item__product-info">
				<span class="cart-item__product-name">{{ item.product.name }}</span>
				<span class="cart-item__product-article">Арт. {{ item.product.id }}</span>
			</div>
			<CartCounter :cart-item="item" />
		</div>
		<div class="cart-item__body">
			<div class="cart-item__delete">
				<button
					class="btn btn--icon"
					:loading="isLoading"
					@click="requestRemoveFromCart(item.id)"
				>
					<XIcon class="cart-item__prices-delete-icon btn__icon" name="close" />
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
.cart-item
	display: flex
	align-items: center
	padding: 20px
	background-color: var(--color-neutral-300)

	&__product
		display: grid
		align-content: flex-start
		gap: 20px

		&-image
			--width: 40px
			--aspect-ratio: 1
			--object-fit: contain

		&-info
			display: grid
			align-content: flex-start
			gap: 8px

	&__body
		display: flex
		align-items: center
		gap: 40px
		margin-left: auto
</style>
