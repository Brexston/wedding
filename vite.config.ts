import { join, resolve } from 'node:path';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import vue from '@vitejs/plugin-vue';
import juice from '@vituum/vite-plugin-juice';
import autoprefixer from 'autoprefixer';
import postcssFunctions from 'postcss-functions';
import pxtorem from 'postcss-pxtorem';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import { getAllPages, getFonts } from './config/helpers';
import vitePluginPug from './config/plugins/pug/vite-plugin-pug';

import {
	em,
	fluid,
	percent,
} from './config/postcss/functions';
import {
	BASE_PORT,
	INITIAL_OUTPUT_DIR,
	OUTPUT_DIR,
	PROJECT_INITIAL_URL,
	PROJECT_NAME,
	PROJECT_TITLE,
	PROJECT_URL,
	SOURCE_DIR,
	VIEWS_DIR,
} from './project.config';
import svgoConfig from './svgo.config';

const cssFileRegex = /\.css$/;
const fontFileRegex = /\.(?:woff2|woff)$/;
const imageFileRegex = /\.(?:ico|jpg|png|webp|avif|svg)$/;

export default defineConfig(({ mode }) => {
	const IS_DEV = mode === 'development';
	const IS_PRODUCTION = mode === 'production';
	const IS_INITIAL = mode === 'initial';
	const IS_DEPLOY_LAYOUT = mode === 'deploy';
	const IS_BUILD = IS_PRODUCTION;
	const IS_WATCH = process.argv.includes('--watch');

	let BASE_URL = '/';

	if (IS_DEPLOY_LAYOUT)
		BASE_URL = `/${PROJECT_NAME}/`;

	else if (IS_BUILD)
		BASE_URL = PROJECT_URL;

	else if (IS_INITIAL)
		BASE_URL = PROJECT_INITIAL_URL;

	const PAGES = getAllPages(VIEWS_DIR);
	const FONTS = getFonts(`${SOURCE_DIR}/public/fonts`);

	return {
		base: BASE_URL,
		server: {
			host: '0.0.0.0',
			port: BASE_PORT,
			// Для работы api
			// proxy: {
			// 	'/api': {
			// 		target: '', // Пример: http://space.xpage.ru.192.168.88.128.nip.io
			// 		changeOrigin: true,
			// 		secure: false,
			// 		cookieDomainRewrite: {
			// 			'*': '',
			// 		},
			// 	},
			// },
		},
		root: SOURCE_DIR,
		envDir: '../',
		build: {
			minify: IS_WATCH ? false : 'terser',
			cssMinify: IS_WATCH ? false : 'lightningcss',
			manifest: IS_BUILD,
			outDir: IS_PRODUCTION ? OUTPUT_DIR : INITIAL_OUTPUT_DIR,
			rollupOptions: {
				checks: {
					pluginTimings: false,
				},
				input: IS_BUILD
					? resolve(SOURCE_DIR, 'app/main.ts')
					: {
							index: resolve(SOURCE_DIR, 'index.pug'),
							...PAGES,
						},

				output: {
					chunkFileNames: 'scripts/[name]-chunk-[hash].js',
					entryFileNames: 'scripts/index-[hash].js',
					assetFileNames: ({ names }) => {
						// Проверка на CSS файлы
						if (names.some(name => cssFileRegex.test(name))) {
							// Проверяем, есть ли среди имен файлов те, что входят в ваш список PAGES
							const isPageIndex = names.some((name) => {
								const cleanName = name.split('.')[0];
								return Object.keys(PAGES).includes(cleanName);
							});

							if (isPageIndex) {
								return 'styles/index-[hash][extname]';
							}
							return 'styles/[name]-[hash][extname]';
						}

						// Проверка на шрифты
						if (names.some(name => fontFileRegex.test(name))) {
							return 'fonts/[name][extname]';
						}

						// Проверка на изображения
						if (names.some(name => imageFileRegex.test(name))) {
							return 'img/[name][extname]';
						}

						// Все остальное
						return 'assets/[name]-[hash][extname]';
					},
				},
			},
			emptyOutDir: true,
		},
		css: {
			devSourcemap: IS_DEV,
			preprocessorOptions: {
				sass: {
					additionalData: `
						$isDev: ${IS_DEV}\n
						$BASE_URL: "${BASE_URL}"\n
						@import '@styles/base/mixins/_index.sass'\n
					`,
					silenceDeprecations: ['import'],
				},
			},
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						propList: [
							'*',
							'!line-height',
							'!letter-spacing',
						],
					}),
					postcssFunctions({
						functions: {
							fluid,
							em,
							percent,
						},
					}),
				],
			},
		},
		resolve: {
			alias: {
				'vue': 'vue/dist/vue.esm-bundler.js',
				'@': SOURCE_DIR,
				'@app': join(SOURCE_DIR, 'app'),
				'@styles': join(SOURCE_DIR, 'styles'),
				'@img': join(SOURCE_DIR, 'assets/img'),
			},
		},
		plugins: [
			Unfonts({
				custom: {
					display: 'swap',
					families: FONTS,
				},
			}),
			juice({
				paths: [`${SOURCE_DIR}/views/emails`],
			}),
			vue({
				features: {
					prodDevtools: IS_WATCH,
				},
			}),
			vitePluginPug({
				serve: {
					options: {
						basedir: `${SOURCE_DIR}/templates`,
					},
					locals: {
						PROJECT_TITLE,
						IS_DEV,
						BASE_URL,
					},
				},
				build: {
					options: {
						basedir: `${SOURCE_DIR}/templates`,
						pretty: true,
					},
					locals: {
						PROJECT_TITLE,
						IS_DEV,
						BASE_URL,
					},
				},
			}),
			VitePluginSvgSpritemap(`./assets/icons/**/*.svg`, {
				prefix: 'icon-',
				injectSvgOnDev: true,
				output: {
					filename: '../img/icons.[hash].svg',
				},
				svgo: {
					...svgoConfig,
				},
			}),
		],
	};
});
