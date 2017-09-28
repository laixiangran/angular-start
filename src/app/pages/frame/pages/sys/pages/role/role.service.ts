/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import { Injectable } from '@angular/core';
import { Role } from '../../models/role';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../../../services/request.service';
import { ServerData } from '../../../../../../models/server-data.model';

@Injectable()
export class RoleService {

	constructor(private requestService: RequestService) {}

	/**
	 * 获取角色列表
	 * @returns {Observable<ServerData>}
	 */
	getRoles(): Observable<ServerData> {
		return this.requestService.post('/SysRoleAction/getSysRoleList');
	}

	/**
	 * 根据id获取角色
	 * @param id
	 * @returns {Observable<ServerData>}
	 */
	getRole(id: string): Observable<ServerData> {
		return this.requestService.post('auth/role/selectById', {c_id: id});
	}

	/**
	 * 根据id获取角色资源
	 * @param id
	 * @returns {Observable<ServerData>}
	 */
	getRoleresource(id: string): Observable<ServerData> {
		return this.requestService.post('/SysRoleResourceAction/getSysRoleResourceListByCondition', {c_role_id: id});
	}

	/**
	 * 分配角色资源
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	addRoleresource(obj: Object): Observable<ServerData> {
		return this.requestService.post('/SysRoleResourceAction/addSysRoleResource', obj);
	}

	/**
	 * 添加角色
	 * @param role
	 * @returns {Observable<ServerData>}
	 */
	addRole(role: Role): Observable<ServerData> {
		return this.requestService.post('/SysRoleAction/addSysRole', role);
	}

	/**
	 * 编辑角色
	 * @param role
	 * @returns {Observable<ServerData>}
	 */
	updateRole(role: Role): Observable<ServerData> {
		return this.requestService.post('/SysRoleAction/updateSysRole', role);
	}

	/**
	 * 删除角色
	 * @param role
	 * @returns {Observable<ServerData>}
	 */
	deleteRole(role: Role): Observable<ServerData> {
		return this.requestService.post('/SysRoleAction/deleteSysRole', role);
	}

}
