import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {hmrBootstrap} from '@webacad/angular-tools/hmr';

import {AppModule} from './app.module';


Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');


hmrBootstrap(module, () => {
	return platformBrowserDynamic().bootstrapModule(AppModule);
});
