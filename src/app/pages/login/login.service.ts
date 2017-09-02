/**
 * Created by laixiangran on 2016/11/25.
 * homepage：http://www.laixiangran.cn.
 */

import { Injectable } from '@angular/core';

import { RequestService } from '../../services/request.service';
import { ServerData } from '../../models/server-data.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

	constructor(private rs: RequestService) {}

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
		return this.rs.post('access/login.do', param);
	}

	/**
	 * 登出
	 * @returns {Observable<ServerData>}
	 */
	logout(): Observable<ServerData> {
		return this.rs.post('access/logout.do');
	}

	/**
	 * 验证是否登录
	 * @returns {Observable<ServerData>}
	 */
	isLogin(roleType?: string): Observable<ServerData> {
		return this.rs.get('access/isLogin.do?roleType=' + roleType);
	}
}
