<script setup lang="ts">
import CartCoupon from '@app/modules/cart/components/CartCoupon.vue';
import CartSummary from '@app/modules/cart/components/CartSummary.vue';
</script>

<template>
	<div class="cart-aside">
		<CartSummary />
		<CartCoupon />
	</div>
</template>

<style scoped lang="sass">
.cart-aside
	display: grid
	align-content: flex-start
	gap: 40px
</style>
