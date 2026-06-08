import type { CartCoupon, CartItem, CartTotal } from '@app/modules/cart/cart.types';
import type { AddToCartPayload, CouponApplyPayload, UpdateCartPayload } from '../api/cart.api.types';
import { cartApi } from '@app/modules/cart/api/cart.api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
	// state
	const cart = ref<CartItem[]>([]);
	const total = ref<CartTotal | null>(null);
	// #COUPONS
	const coupons = ref<CartCoupon[]>([]);

	// getters
	const cartDiscount = computed(() => {
		if (total.value)
			return total.value.price.current - total.value.price.base;
		return 0;
	});
	// #COUPONS
	const activeCoupons = computed(() => {
		const result: string[] = [];
		coupons.value.forEach((coupon) => {
			result.push(coupon.coupon);
		});
		return result.join(', ');
	});

	// actions
	async function requestCart() {
		const response = await cartApi.requestCart();
		if (response.success) {
			cart.value = response.data.items;
			total.value = response.data.total;
			coupons.value = response.data.coupons;
		}

		return response;
	}

	async function requestAddToCart(data: AddToCartPayload) {
		const response = await cartApi.requestAddToCart(data);
		if (response)
			await requestCart();

		return response;
	}

	async function requestRemoveFromCart(id: number) {
		const response = await cartApi.requestRemoveFromCart(id);
		if (response)
			await requestCart();

		return response;
	}

	async function requestUpdateCart(data: UpdateCartPayload) {
		const response = await cartApi.requestUpdateCart(data);
		if (response)
			await requestCart();

		return response;
	}

	async function requestClearCart() {
		const response = await cartApi.requestClearCart();
		if (response.success) {
			cart.value = [];
			total.value = null;
		}

		return response;
	}
	// #COUPONS
	async function requestApplyCoupon(data: CouponApplyPayload) {
		const response = await cartApi.requestApplyCoupon(data);
		if (response)
			await requestCart();

		return response;
	}

	async function requestDeleteCoupon(name: string) {
		const response = await cartApi.requestDeleteCoupon(name);
		if (response)
			await requestCart();

		return response;
	}

	return {
		// State
		cart,
		total,
		coupons,

		// Getters
		cartDiscount,
		activeCoupons,

		// Actions
		requestCart,
		requestAddToCart,
		requestRemoveFromCart,
		requestUpdateCart,
		requestClearCart,
		requestApplyCoupon,
		requestDeleteCoupon,
	};
});
