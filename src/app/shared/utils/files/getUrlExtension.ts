const urlExtensionRegex = /([^/]+?)\.(?:([^/]+)|$)/;

export function getUrlExtension(url: string) {
	const match = url.match(urlExtensionRegex);
	if (match) {
		const fileNameWithoutExtension = match[1];
		const fileExtension = match[2];
		const fileName = `${fileNameWithoutExtension}.${fileExtension}`;

		return {
			fileName,
			fileExtension,
			fileNameWithoutExtension,
		};
	}
	return {
		fileName: '',
		fileExtension: '',
		fileNameWithoutExtension: '',
	};
}
