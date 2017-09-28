/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServerData } from '../../../../../../models/server-data.model';
import { RequestService } from '../../../../../../services/request.service';
import { User } from '../../models/user';

@Injectable()
export class OrgService {

	constructor(private requestService: RequestService) {
	}

	getUserDetailByOrgId(orgId: string): Observable<ServerData> {
		return this.requestService.post('/SysUnitAction/getSysUnitListTree', {c_id: orgId});
	}

	/**
	 *根据orgId查询该组织下的所有用户
	 * @param orgId
	 * @returns {Observable<ServerData>}
	 */
	getUsersByOrgId(orgId: string): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/getSysUserListByCondition', {c_unitid: orgId});
	}

	/**
	 * 获取角色数据
	 * @returns {Observable<ServerData>}
	 */
	getRoleData(): Observable<ServerData> {
		return this.requestService.post('/SysRoleAction/getSysRoleList');
	}

	/**
	 * 获取单位授权数据
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	getUnitRoleData(obj): Observable<ServerData> {
		return this.requestService.post('/UnitRoleAction/getUnitRoleListByCondition', obj);
	}

	/**
	 * 获取角色授权数据
	 * @returns {Observable<ServerData>}
	 */
	getUserRoleData(obj): Observable<ServerData> {
		return this.requestService.post('/UserRoleAction/getUserRoleListByCondition', obj);
	}

	/**
	 * 给单位授权
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	addUnitRole(obj): Observable<ServerData> {
		return this.requestService.post('/UnitRoleAction/addUnitRole', obj);
	}

	/**
	 * 给用户授权
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	addUserRole(obj): Observable<ServerData> {
		return this.requestService.post('/UserRoleAction/addUserRole', obj);
	}

	/**
	 * 获取所有用户分页列表
	 * @param obj
	 * @returns {Observable<ServerData>}
	 * */
	getUserListPage(obj): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/getUserListPage', obj)
	}

	/**
	 * 删除用户
	 * @param obj
	 * @returns {Observable<ServerData>}
	 * */
	deleteSysUser(obj): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/deleteSysUser', obj)
	}

	/**
	 * 重置密码
	 * @param obj
	 * @returns {Observable<ServerData>}
	 * */
	resetPassword(obj): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/resetPassword', obj)
	}

	/**
	 * 更新org
	 * @param obj
	 * @returns {Observable<ServerData>}
	 * */
	updateOrg(obj): Observable<ServerData> {
		return this.requestService.post('/auth/org/update', obj)
	}

	/**
	 * 更新组织机构
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	updateSysUnit(obj): Observable<ServerData> {
		return this.requestService.post('/SysUnitAction/updateSysUnit', obj)
	}

	/**
	 * 添加组织机构
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	addSysUnit(obj): Observable<ServerData> {
		return this.requestService.post('/SysUnitAction/addSysUnit', obj)
	}

	/**
	 * 删除组织机构
	 * @param {string} id 组织机构id
	 * @returns {Observable<ServerData>}
	 */
	deleteSysUnit(id: string): Observable<ServerData> {
		return this.requestService.post('/SysUnitAction/deleteSysUnit', {id: id})
	}

	/**
	 * 拖动组织机构节点
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	moveNode(obj): Observable<ServerData> {
		return this.requestService.post('/SysUnitAction/moveNode', obj)
	}

	/**
	 * 获取组织机构列表
	 * @returns {Observable<ServerData>}
	 */
	getSysUnitListTree(): Observable<ServerData> {
		return this.requestService.get('/SysUnitAction/getSysUnitListTree', null)
	}

	/**
	 * 添加用户
	 * @param {User} user
	 * @returns {Observable<ServerData>}
	 */
	addSysUser(user: User): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/addSysUser', user)
	}

	/**
	 * 更新用户
	 * @param {User} user
	 * @returns {Observable<ServerData>}
	 */
	updateSysUser(user: User): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/updateSysUser', user)
	}
}
