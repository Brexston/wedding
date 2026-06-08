import type {
	AddToCartPayload,
	CartResponse,
	CouponApplyPayload,
	UpdateCartPayload,
} from '@app/modules/cart/api/cart.api.types';
import type { BaseResponse } from '@app/shared/api/api.types';
import { api } from '@app/shared/api/api';

export const CartApiKeys = {
	CART: 'requestCart',
	ADD_TO_CART: 'requestAddToCart',
	UPDATE_CART: 'requestUpdateCart',
	REMOVE_FROM_CART: 'requestRemoveFromCart',
	CLEAR_CART: 'requestClearCart',
	APPLY_COUPON: 'requestApplyCoupon',
	DELETE_COUPON: 'requestDeleteCoupon',
} as const;

const endpoint = 'cart';

export const cartApi = {
	async requestCart(): Promise<BaseResponse<CartResponse>> {
		const response = await api.get(
			`${endpoint}`,
			{ key: CartApiKeys.CART },
		);
		return response.data;
	},

	async requestAddToCart(data: AddToCartPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/add`,
			data,
			{ key: CartApiKeys.ADD_TO_CART },
		);
		return response.data;
	},

	async requestUpdateCart(data: UpdateCartPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`${endpoint}/update`,
			data,
			{ key: CartApiKeys.UPDATE_CART + data.itemId },
		);
		return response.data;
	},

	async requestRemoveFromCart(id: number): Promise<BaseResponse<null>> {
		const response = await api.delete(
			`${endpoint}/remove/${id}`,
			{ key: CartApiKeys.REMOVE_FROM_CART + id },
		);
		return response.data;
	},

	async requestClearCart(): Promise<BaseResponse<null>> {
		const response = await api.delete(
			`${endpoint}/clear`,
			{ key: CartApiKeys.CLEAR_CART },
		);
		return response.data;
	},

	async requestApplyCoupon(data: CouponApplyPayload): Promise<BaseResponse<null>> {
		const response = await api.post(
			`coupon/apply`,
			data,
			{ key: CartApiKeys.APPLY_COUPON },
		);
		return response.data;
	},

	async requestDeleteCoupon(name: string): Promise<BaseResponse<null>> {
		const response = await api.delete(
			`coupon/remove/${name}`,
			{ key: CartApiKeys.DELETE_COUPON },
		);
		return response.data;
	},
};
