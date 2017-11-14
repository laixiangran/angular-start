/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * @name AuthService
 * @description 提供与当前用户有关信息的服务
 */
@Injectable()
export class AuthService {
	user: any = null; // 当前用户信息
	currUserResources: string[] = null; // 当前用户资源
	currUserMenus: any[] = null; // 当前用户菜单

	constructor() {
		this.currUserMenus = [
			{
				url: '/frame/custom/home',
				icon: 'fa fa-tachometer',
				label: '工作台',
				children: []
			},
			{
				url: '/frame/custom/globe',
				icon: 'fa fa-globe',
				label: '三维框架',
				children: [
					{
						url: '/frame/custom/globe/cesium',
						icon: 'fa fa-globe',
						label: 'Cesium',
						children: []
					}
				]
			}
		];
	}

	/**
	 * 保存令牌
	 * @param {string} token
	 */
	setToken(token: string) {
		localStorage.setItem(environment.tokenName, token);
	}

	/**
	 * 删除令牌
	 */
	removeToken() {
		localStorage.removeItem(environment.tokenName);
	}

	/**
	 * 初始化所有用户信息
	 */
	initParams() {
		this.user = null;
		this.currUserResources = null;
		this.currUserMenus = null;
		this.removeToken();
	}
}
