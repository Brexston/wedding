import type { MediaResponse } from '@app/modules/media/api/media.api.types';
import type { Params } from '@app/modules/pagination/pagination.types.ts';
import type { BaseResponse } from '@app/shared/api/api.types';
import { api } from '@app/shared/api/api';

export const MediaApiKeys = {
	MEDIA: 'requestMedia',
} as const;

export const mediaApi = {
	async requestMedia(params: Params): Promise<BaseResponse<MediaResponse>> {
		const response = await api.get(
			`${window.location.origin}${window.location.pathname}`,
			{
				params,
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				key: MediaApiKeys.MEDIA,
			},
		);
		return response.data;
	},
};
