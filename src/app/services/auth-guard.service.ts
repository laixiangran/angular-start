/**
 * Created by Hllinc on 2016-10-28 15:04.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, Resolve<any> {

	constructor(private router: Router, public authService: AuthService) {}

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
			if (this.authService.currUserResources) {
				resolve(this.authService.currUserResources);
			} else {
				/**
				 * 获取当前用户的权限（实际项目写真实请求路径）
				 */
				this.authService.currUserResources = [];
				resolve(this.authService.currUserResources);
			}
		});
	}
}
