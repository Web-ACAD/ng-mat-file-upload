import {EnvironmentType} from '@webacad/angular-tools';
import {webpackConfigFactory} from '@webacad/angular-tools/webpack';
import * as webpack from 'webpack';
import * as path from 'path';


const environment: EnvironmentType = 'development';

function createWebpackConfig(): webpack.Configuration
{
	return webpackConfigFactory(environment, {
		root: __dirname,
		distDir: path.join(__dirname, 'public', 'dist'),
		publicPath: '/public/dist',
		hmr: true,
		sourceMaps: true,
		angular: {
			entryModule: path.join(__dirname, 'app', 'app.module#AppModule'),
		},
		webpack: {
			entry: {
				polyfills: path.join(__dirname, 'app', 'polyfills.ts'),
				app: path.join(__dirname, 'app', 'main.ts'),
				styles: path.join(__dirname, 'styles', 'index.scss'),
			},
		},
	});
}

export default createWebpackConfig;
