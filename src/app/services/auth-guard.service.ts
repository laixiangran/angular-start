/**
 * Created by Hllinc on 2016-10-28 15:04.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { LoginService } from '../pages/login/login.service';
import { AuthService } from './auth.service';
import { ServerData } from '../models/server-data.model';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private loginService: LoginService, private router: Router) {}

	// ActivatedRouteSnapshot包含了即将被激活的路由，而RouterStateSnapshot包含了该应用即将到达的状态
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return true;
		// return this.checkLogin(state.url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
	}

	checkLogin(url: string): Observable<boolean> | boolean {
		return new Observable<boolean>((subscriber: Subscriber<any>) => {
			this.loginService.isLogin().subscribe((serverData: ServerData) => {
				if (serverData.code === 'ok') {
					this.authService.initParams(this.authService.redirectUrl || url, serverData.result).subscribe((data: boolean) => {
						if (data) {
							if (url.indexOf('login') >= 0) {
								this.router.navigate(['frame/home']);
							}
						} else {
							this.router.navigate(['/login']);
						}
						subscriber.next(true);
						subscriber.complete();
					});
				} else {
					const redirectUrl: string = url.indexOf('login') < 0 ? url : this.authService.redirectUrl;
					this.authService.initParams(redirectUrl).subscribe(() => {
						if (url.indexOf('login') < 0) {
							this.router.navigate(['/login']);
						}
						subscriber.next(true);
						subscriber.complete();
					});
				}
			});
		});
	}
}
