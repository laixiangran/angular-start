/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (!environment.dev) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
