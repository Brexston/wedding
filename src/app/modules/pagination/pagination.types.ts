export interface PaginationState {
	totalItems: number;
	limitItems: number;
	pageCurrent: number;
	showShowMore?: boolean;
}

export interface PaginationProps extends PaginationState {
	maxButtons?: number;
	showNavigation?: boolean;
	showEllipsis?: boolean;
	theme?: 'default' | 'light';
}

export interface Params {
	[key: string]: unknown;
}
