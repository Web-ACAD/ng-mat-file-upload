const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');


const port = 8080;
const root = __dirname;


// todo: remove when https://github.com/angular/angular/issues/21560 is implemented
const stats = {
	warningsFilter: /System.import/,
};


module.exports = {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	context: root,
	entry: {
		app: path.join(root, 'app', 'main.ts'),
		polyfills: path.join(root, 'app', 'polyfills.ts'),
	},
	output: {
		path: path.join(root, 'public'),
		filename: '[name].dev.js',
		chunkFilename: '[id].dev.chunk.js',
		publicPath: '/public/',
	},
	module: {
		rules: [
			{
				test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
				use: ['@ngtools/webpack'],
			},
			{
				test: /\.html$/,
				use: ['raw-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					'raw-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new AngularCompilerPlugin({
			tsConfigPath: path.join(root, 'tsconfig.json'),
			entryModule: path.join(root, 'app', 'app.module#AppModule'),
			sourceMap: true,
		}),
	],
	stats: stats,
	serve: {
		port: port,
		content: root,
		clipboard: false,
		open: true,
		devMiddleware: {
			publicPath: '/public/',
			stats: stats,
			watchOptions: {
				ignored: [/node_modules/],
			},
		},
		hotClient: {
			hmr: true,
			stats: {
				// does not work: https://github.com/webpack-contrib/webpack-hot-client/issues/78#issuecomment-406690603
				// todo: remove when https://github.com/angular/angular/issues/21560 is implemented
				warnings: false,
			},
		},
	},
};
