/**
 * Created by Hllinc on 2016-10-25 11:53.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

if (!environment.dev) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
