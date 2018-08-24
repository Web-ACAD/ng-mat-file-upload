import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {hmrBootstrap} from './hmr';
import {AppModule} from './app.module';


require('zone.js/dist/zone-error');


const bootstrap = () => {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch((err) => console.log(err));
};


hmrBootstrap(module, bootstrap);
