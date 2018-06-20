import {EnvironmentType} from '@webacad/angular-tools';
import {createServer} from '@webacad/angular-tools/expressjs';
import createWebpackConfig from '../webpack.config';
import * as path from 'path';


const environment: EnvironmentType = 'development';

createServer(environment, createWebpackConfig(), {
	index: path.join(__dirname, 'views', 'index.handlebars'),
	port: 20000,
	hmr: true,
});
