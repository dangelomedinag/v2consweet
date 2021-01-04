const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: SveltePreprocess({
		postcss: {
			plugins: [require("autoprefixer")()]
		},
		babel: {
			presets: [
				[
					'@babel/preset-env',
					{
						loose: true,
						// No need for babel to resolve modules
						modules: false,
						targets: {
							// ! Very important. Target es6+
							esmodules: true,
						},
					},
				],
			],
		}
	})
  // ...other svelte options
};