/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 当前用户信息服务
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
	user: any = null; // 当前用户信息
	currUserResources: string[] = null; // 当前用户资源
	currUserMenus: any[] = null; // 当前用户菜单

	constructor() {}

	setToken(token: string) {
		localStorage.setItem(environment.tokenName, token);
	}

	removeToken() {
		localStorage.removeItem(environment.tokenName);
	}

	initParams() {
		this.user = null;
		this.currUserResources = null;
		this.currUserMenus = null;
		this.removeToken();
	}
}
