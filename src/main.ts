/**
 * Created by laixiangran on 2017/8/29.
 * homepage:http://www.laixiangran.cn.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { hmrBootstrap } from './hmr';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const bootstrap = () => {
	window['CESIUM_BASE_URL'] = environment.cesiumBaseUrl;
	return platformBrowserDynamic().bootstrapModule(AppModule);
};

// 判断是否生产环境
if (environment.production) {
	enableProdMode();
	bootstrap();
} else {
	// 判断是否启用模块热更新
	if (environment.hmr) {
		if (module['hot']) {
			hmrBootstrap(module, bootstrap);
		} else {
			console.error('webpack-dev-server没有启用HMR！你确定在ng serve中设置了--hmr属性？');
		}
	} else {
		bootstrap();
	}
}


