<script setup lang="ts">
import { useCartStore } from '@app/modules/cart/store/cart.store';
import { storeToRefs } from 'pinia';

const { cart, total, cartDiscount } = storeToRefs(useCartStore());
</script>

<template>
	<div v-if="total && cart?.length" class="cart-summary">
		<div class="order-aside__title title title--h4">
			<span>ВАШ ЗАКАЗ</span>
		</div>

		<div class="b">
			<span class="">Базовая цена</span>
			<span class="">{{ total.price.base.toLocaleString() }} ₽</span>
		</div>

		<div class="b">
			<span>Скидка</span>
			<span>{{ cartDiscount.toLocaleString() }} ₽</span>
		</div>

		<div class="b">
			<span class="">Итого</span>
			<span class="">{{ total.price.current.toLocaleString() }} ₽</span>
		</div>

		<a href="/order" class="btn btn--color-primary">
			<span class="btn__text">Перейти к оформлению</span>
		</a>
	</div>
</template>

<style lang="sass">
.cart-summary
	display: grid
	align-content: flex-start
	gap: 16px
	padding: 20px
	background-color: var(--color-neutral-300)

.b
	display: grid
	align-content: flex-start
	gap: 4px
</style>
