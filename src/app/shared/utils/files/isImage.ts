import { IMAGE_TYPES } from '@app/shared/consts/utils';

export function isImage(fileType: string) {
	return IMAGE_TYPES.some(imageType => fileType.includes(imageType));
}
