/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { LoginService } from '../pages/login/login.service';

/**
 * @name AuthGuard
 * @description 路由拦截服务（包括路由守卫、路由预加载）
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, Resolve<any> {
	constructor(public router: Router,
				public loginService: LoginService,
				public authService: AuthService) {}

	/**
	 * 路由进入守卫
	 * @param {ActivatedRouteSnapshot} route 即将被激活的路由
	 * @param {RouterStateSnapshot} state 即将到达的状态
	 * @returns {Observable<boolean> | boolean}
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		// const isLoginUrl: boolean = state.url.indexOf('login') >= 0;
		// if (!localStorage.getItem(environment.tokenName)) {
		// 	if (!isLoginUrl) {
		// 		this.router.navigate(['/login']);
		// 		return false;
		// 	}
		// } else {
		// 	if (isLoginUrl) {
		// 		this.router.navigate(['/frame/custom/home']);
		// 		return false;
		// 	}
		// }
		return true;
	}

	/**
	 * 路由进入守卫（包括子组件）
	 * @param {ActivatedRouteSnapshot} route 即将被激活的路由
	 * @param {RouterStateSnapshot} state 即将到达的状态
	 * @returns {Observable<boolean> | boolean}
	 */
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
	}

	/**
	 * 路由预加载数据
	 * @param {ActivatedRouteSnapshot} route 即将被激活的路由
	 * @param {RouterStateSnapshot} state 即将到达的状态
	 * @returns {Promise<any> | boolean}
	 */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | boolean {
		return new Promise((resolve, reject) => {
			// 1. 当前用户菜单
			// 2. 当前用户信息
			// 3. 当前用户资源
			// Observable.zip(this.loginService.getUserMenus(), this.loginService.getUserInfo(), this.loginService.getUserResources()).subscribe((data: any[]) => {
			// 	this.authService.currUserMenus = data[0].children;
			// 	this.authService.user = data[1].result;
			// 	this.authService.currUserResources = data[2].result;
			// 	resolve(true);
			// }, () => {
			// 	reject(false);
			// });
			resolve(true);
		});
	}
}
