const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
		postcss: {
			plugins: [require("autoprefixer")()]
		},
		babel: {
			presets: [
				[
					'@babel/preset-env',
					{
						loose: true,
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
};