import { getUrlExtension } from '@app/shared/utils/files/getUrlExtension';
import { isImage } from '@app/shared/utils/files/isImage';

export interface FileInfo {
	name: string;
	ext: string;
	url: string;
	type: string;
	isImage: boolean;
}

export function getFileInfo(file: File | string): FileInfo {
	if (typeof file === 'string') {
		const { fileName, fileExtension } = getUrlExtension(file);
		return {
			name: fileName,
			ext: fileExtension || '',
			url: file,
			type: 'url',
			isImage: isImage(fileExtension || ''),
		};
	}

	const { name, type } = file;
	return {
		name,
		ext: name.split('.').pop() || '',
		url: isImage(type) ? URL.createObjectURL(file) : '',
		type: 'file',
		isImage: isImage(type),
	};
}
