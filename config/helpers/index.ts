import { readdirSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';

const htmlPugRegex = /\.(html|pug)$/;
const leadingSlashRegex = /^\//;

function searchDirectory(dir: string, includePath = true, excludeDir = ''): string[] {
	const files = readdirSync(dir);
	let result: string[] = [];

	files.forEach((file) => {
		const filePath = join(dir, file);
		const fileStat = statSync(filePath);

		if (fileStat.isDirectory() && file !== excludeDir)
			result = result.concat(searchDirectory(filePath, includePath, excludeDir));
		else if (fileStat.isFile())
			result.push(includePath ? filePath : file);
	});

	return result;
}

function getAllPages(pagesDir: string): Record<string, string> {
	const pages = searchDirectory(pagesDir);

	return pages
		.filter(file => file.match(htmlPugRegex))
		.reduce<Record<string, string>>((acc, page) => {
			const name = page
				.replace(pagesDir, '')
				.replace(htmlPugRegex, '')
				.replace(leadingSlashRegex, '');
			acc[name] = page;
			return acc;
		}, {});
}

function getFonts(folderPath: string): Record<string, { src: string }> {
	const fonts: Record<string, { src: string }> = {};
	const fontFiles = readdirSync(folderPath);

	fontFiles.forEach((file) => {
		const fontName = parse(file).name;
		fonts[fontName] = { src: `./public/fonts/${fontName}/**/*.{otf,ttf,woff,woff2}` };
	});
	return fonts;
}

export { getAllPages, getFonts, searchDirectory };
