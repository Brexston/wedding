<script setup lang=ts>
</script>

<template>
	<div class="cart-empty">
		<div class="cart-empty__inner">
			<span class="cart-empty__title title title--h5 cart-empty__title ">
				В вашей корзине пока нет товаров
			</span>
			<a href="/catalog" class="btn">
				<span class="btn__text">Перейти в каталог</span>
			</a>
		</div>
	</div>
</template>

<style lang="sass">
.cart-empty
	display: flex
	padding: 40px
	background-color: var(--color-neutral-300)

	&__inner
		display: grid
		align-content: flex-start
		gap: 20px
</style>
