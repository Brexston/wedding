import type { Config } from 'svgo';

const config: Config = {
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					cleanupNumericValues: false,
				},
				cleanupIDs: {
					minify: false,
					remove: false,
				},
				convertPathData: false,
			},
		},
		'sortAttrs',
		{
			name: 'addAttributesToSVGElement',
			params: {
				attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
			},
		},
		'removeDimensions',
	],
};

export default config;
