export interface CartItem {
	id: number;
	product: {
		id: number;
		name: string;
		image: string;
		link: string;
	};
	quantity: number;
}

export interface CartTotalPrice {
	current: number;
	base: number;
	delivery?: number;
}

export interface CartTotal {
	price: CartTotalPrice;
	quantity: number;
}

// TODO: #COUPONS
export interface CartCoupon {
	active: boolean;
	coupon: string;
	discountActiveFrom: string | null;
	discountActiveTo: string | null;
	discountName: string;
	statusText: string;
	status: string;
}
