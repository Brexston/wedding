import type { CartCoupon, CartItem, CartTotal } from '@app/modules/cart/cart.types';

export interface CartResponse {
	items: CartItem[];
	total: CartTotal;
	// #COUPONS
	coupons: CartCoupon[];
}

export interface AddToCartPayload {
	productId: number;
	quantity: number;
}

export interface UpdateCartPayload {
	itemId: number;
	quantity: number;
}

// #COUPONS
export interface CouponApplyPayload {
	coupon: string;
}
