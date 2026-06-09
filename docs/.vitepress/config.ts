
import { join } from 'node:path';
import { defineConfig } from 'vitepress';
import { PROJECT_DOCS_NAME, SOURCE_DIR } from '../../project.config';
import { head } from './config/head';
import { themeConfig } from './config/theme';

const IS_DEPLOY_DOCS = process.argv.includes('deploy');

export default defineConfig({
	lang: 'ru-RU',
	title: 'Frontend Шаблон',
	base: IS_DEPLOY_DOCS ? `/${PROJECT_DOCS_NAME}/` : '/',
	head,
	themeConfig,
	vite: {
		resolve: {
			alias: {
				'@': SOURCE_DIR,
				'@app': join(SOURCE_DIR, 'app'),
			},
		}
	}
});
