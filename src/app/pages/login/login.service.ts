/**
 * Created by laixiangran on 2016/11/25.
 * homepage：http://www.laixiangran.cn.
 */

import { Injectable } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ServerData } from '../../models/server-data.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

	constructor(private dataService: DataService) {}

	/**
	 * 登录
	 * @param access
	 * @returns {Observable<ServerData>}
	 */
	login(access: any): Observable<ServerData> {
		const param: Object = {
			c_login_id: access.c_login_id,
			c_password: access.c_password
		};
		return this.dataService.postData('access/login.do', param);
	}

	/**
	 * 登出
	 * @returns {Observable<ServerData>}
	 */
	logout(): Observable<ServerData> {
		return this.dataService.postData('access/logout.do');
	}

	/**
	 * 验证是否登录
	 * @returns {Observable<ServerData>}
	 */
	isLogin(roleType?: string): Observable<ServerData> {
		return this.dataService.getData('access/isLogin.do?roleType=' + roleType);
	}
}
