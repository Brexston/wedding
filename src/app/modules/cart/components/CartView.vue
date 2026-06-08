<script setup lang="ts">
import CartAside from '@app/modules/cart/components/CartAside.vue';
import CartEmpty from '@app/modules/cart/components/CartEmpty.vue';
import CartList from '@app/modules/cart/components/CartList.vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../store/cart.store';
// только для верстки
interface Props {
	showItems?: boolean;
}
const { showItems } = defineProps<Props>();

const { cart, total } = storeToRefs(useCartStore());

// только для верстки
if (showItems) {
	total.value = { price: { base: 10000, current: 9000 }, quantity: 3 };
	cart.value = [
		{
			id: 1,
			product: {
				id: 11,
				name: 'Товар 1',
				image: 'https://placehold.co/40x40',
				link: '/',
			},
			quantity: 1,
		},
		{
			id: 2,
			product: {
				id: 22,
				name: 'Товар 2',
				image: 'https://placehold.co/40x40',
				link: '/',
			},
			quantity: 3,
		},
	];
}
</script>

<template>
	<div class="page__section section cart-view">
		<div class="wrapper">
			<div class="cart-view__inner">
				<div class="cart-view__list">
					<CartList v-if="cart.length" />
					<CartEmpty v-else />
				</div>
				<div class="cart-view__aside">
					<CartAside v-if="cart.length" />
				</div>
			</div>
		</div>
	</div>
	<div class="order-section__inner">
	</div>
</template>

<style lang="sass">
.cart-view

	&__inner
		display: grid
		grid-template-columns: minmax(0, 3fr) minmax(0, 1fr)
		align-content: flex-start
		gap: 20px
</style>
