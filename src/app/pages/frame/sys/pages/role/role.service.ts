/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {DataService} from "../../../../../services/data.service";
import {ServerData} from "../../models/server-data";
import {Role} from "../../models/role";

@Injectable()
export class RoleService {

    constructor (private dataService: DataService) {}

    /**
     * 获取角色列表
     * @returns {Observable<ServerData>}
     */
    getRoles (): Observable<ServerData> {
        return this.dataService.getData('auth/role/selectAll.do');
    }

    /**
     * 根据id获取角色
     * @param id
     * @returns {Observable<ServerData>}
     */
    getRole (id: string): Observable<ServerData> {
        return this.dataService.postData("auth/role/selectById.do", {c_id: id});
    }

    /**
     * 根据id获取角色资源
     * @param id
     * @returns {Observable<ServerData>}
     */
    getRoleresource (id: string): Observable<ServerData> {
        return this.dataService.postData("auth/resource/selectResourceByRoleId.do", {c_role_id: id});
    }

    /**
     * 分配角色资源
     * @param obj
     * @returns {Observable<ServerData>}
     */
    addRoleresource (obj: Object): Observable<ServerData> {
        return this.dataService.postData("auth/roleresource/add.do", obj);
    }

    /**
     * 添加角色
     * @param role
     * @returns {Observable<ServerData>}
     */
    addRole (role: Role): Observable<ServerData> {
        return this.dataService.postData("auth/role/add.do", role);
    }

    /**
     * 编辑角色
     * @param role
     * @returns {Observable<ServerData>}
     */
    updateRole (role: Role): Observable<ServerData> {
        return this.dataService.postData("auth/role/update.do", role);
    }

    /**
     * 删除角色
     * @param role
     * @returns {Observable<ServerData>}
     */
    deleteRole (role: Role): Observable<ServerData> {
        return this.dataService.postData("auth/role/delete.do", role);
    }

}