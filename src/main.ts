/**
 * Created by laixiangran on 2017/8/29.
 * homepage:http://www.laixiangran.cn.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { hmrBootstrap } from './hmr';

// 判断是否开发环境
if (!environment.dev) {
	enableProdMode();
}

// 判断是否启用模块热更新
const bootstrap = () => {
	return platformBrowserDynamic().bootstrapModule(AppModule);
};
if (environment.hmr) {
	if (module['hot']) {
		hmrBootstrap(module, bootstrap);
	} else {
		console.error('webpack-dev-server没有启用HMR！');
		console.log('你确定在ng serve中设置了--hmr属性？');
	}
} else {
	bootstrap();
}
