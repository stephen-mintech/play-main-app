const fs = require('fs');
const glob = require('glob');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const resolve = (dir) => path.join(__dirname, dir);

// 页面入口配置
const generatePages = () => {
	let pages = {};
	let entries = glob('src/pages/*/*.js', {
		sync: true
	});

	console.log('entries', entries);

	entries.forEach(filepath => {
		const index = filepath.lastIndexOf('.');

		let filename = filepath.substring(filepath.lastIndexOf('/') + 1, index);

		let pageHtml = filepath.substring(0, index) + `.html`;

		if (!fs.existsSync(pageHtml)) pageHtml = 'src/pages/default.html';

		pages[filename] = {
			entry: filepath,
			template: pageHtml,
			filename: `${filename}.html`,
			chunks: ['chunk-vendors', 'chunk-common', filename]
		};
	});

	return pages;
}

module.exports = {
	publicPath: '',
	outputDir: 'app',
	assetsDir: 'dist',
	pages: generatePages(),
   productionSourceMap: false,
   filenameHashing: false,
   css: {
      sourceMap: isDev
   },
	chainWebpack: config => {
		config.module.rules.delete('eslint');
	// 	config.module
   //  .rule('svg')
   //    .use('svg-sprite-loader')
   //    .loader('svg-sprite-loader')
	},
	configureWebpack: config => {
		Object.assign(config, {
			// 开发生产共同配置
			resolve: {
				alias: {
					vue$: 'vue/dist/vue.esm.js',
					'@': resolve('src')
				},
				extensions: ['.js', '.vue', '.json']
			},
			externals: {
				mui: 'window.mui',
				'page-manager': 'window.PageManager'
			}
		});
	},
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		open: false,
		contentBase: resolve('app')
	}
}