/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 路由拦截服务
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ServerData } from '../models/server-data.model';
import { LoginService } from '../pages/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, Resolve<any> {

	constructor(public router: Router,
				public loginService: LoginService,
				public authService: AuthService) {}

	// ActivatedRouteSnapshot包含了即将被激活的路由，而RouterStateSnapshot包含了该应用即将到达的状态
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.checkLogin(state.url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
	}

	checkLogin(url: string): boolean {
		const isLoginUrl: boolean = url.indexOf('login') >= 0;
		if (!localStorage.getItem(environment.tokenName)) {
			if (!isLoginUrl) {
				this.router.navigate(['/login']);
				return false;
			}
		} else {
			if (isLoginUrl) {
				this.router.navigate(['/frame/custom/home']);
				return false;
			}
		}
		return true;
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | boolean {
		return new Promise((resolve, reject) => {
			// 当前用户菜单
			this.loginService.getUserMenus().subscribe((serverData: any) => {
				this.authService.currUserMenus = serverData.children;
			});

			// 获取当前登录用户的信息
			this.loginService.getUserInfo().subscribe((serverData: ServerData) => {
				if (serverData.code === 'ok') {
					this.authService.user = serverData.result;
				}
			});

			// 当前用户资源
			this.loginService.getUserResources().subscribe(
				(serverData: ServerData) => {
					if (serverData.code === 'ok') {
						this.authService.currUserResources = serverData.result;
						resolve(this.authService.currUserResources);
					} else {
						console.error(serverData.info);
						reject();
					}
				},
				(error: any) => {
					console.error(error);
					reject();
				}
			);
		});
	}
}
