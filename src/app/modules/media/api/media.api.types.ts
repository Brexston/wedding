import type { MediaItem } from '@app/modules/media/media.types';
import type { PaginationState } from '@app/modules/pagination/pagination.types.ts';

export interface MediaResponse {
	items: MediaItem[];
	pagination: PaginationState;
}
