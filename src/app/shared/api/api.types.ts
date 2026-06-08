export interface BaseResponse<T> {
	status: 'success' | 'error';
	data: T;
	errors?: ResponseError[];
	message: string;
	success: boolean;
}

export interface ResponseError {
	message: string;
	code: number;
	customData?: Record<string, string | number>;
}
