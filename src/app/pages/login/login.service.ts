import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';
import { ServerData } from '../../models/server-data.model';

@Injectable()
export class LoginService {

	constructor(private requestService: RequestService) {}

	/**
	 * 登录
	 * @param access
	 * @returns {Observable<ServerData>}
	 */
	login(access: any): Observable<ServerData> {
		return this.requestService.post('/LoginAction/Login', access);
	}

	/**
	 * 登出
	 * @returns {Observable<ServerData>}
	 */
	logout(): Observable<ServerData> {
		return this.requestService.post('/LoginAction/Logout');
	}

	/**
	 * 获取用户信息
	 * @returns {Observable<ServerData>}
	 */
	getUserInfo(): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/getMyInfo');
	}

	/**
	 * 获取当前用户菜单
	 * @returns {Observable<ServerData>}
	 */
	getUserMenus(): Observable<any> {
		return this.requestService.post('/SysResourceAction/getMyResourceListTree');
	}

	/**
	 * 当前当前用户资源
	 * @returns {Observable<ServerData>}
	 */
	getUserResources(): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/getMySN');
	}
}
