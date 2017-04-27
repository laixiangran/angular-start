/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {DataService} from "../../../../../services/data.service";
import {ServerData} from "../../models/server-data";
import {Resource} from "../../models/resource";

@Injectable()
export class ResourceService {

    constructor (private dataService: DataService) {}

    /**
     * 获取资料列表
     * @returns {Observable<ServerData>}
     */
    getResources (): Observable<ServerData> {
        return this.dataService.getData('auth/resource/selectAll.do');
    }

    /**
     * 根据用户id获取资源树
     * @param id
     * @returns {Observable<ServerData>}
     */
    getResourceByUserId (id: string): Observable<ServerData> {
        return this.dataService.postData("auth/resource/selectResourceByUserId.do", {c_user_id: id});
    }

    /**
     * 添加资源
     * @param resource
     * @returns {Observable<ServerData>}
     */
    addResource (resource: Resource): Observable<ServerData> {
        return this.dataService.postData('auth/resource/add.do', resource);
    }

    /**
     * 更新资源
     * @param resource
     * @returns {Observable<ServerData>}
     */
    updateResource (resource: Resource): Observable<ServerData> {
        return this.dataService.postData('auth/resource/update.do', resource);
    }

    /**
     * 删除资源
     * @param resource
     * @returns {Observable<ServerData>}
     */
    deleteResource (resource: Resource): Observable<ServerData> {
        return this.dataService.postData('auth/resource/deleteById.do', resource);
    }

    /**
     * 更新节点
     * @param obj
     * @returns {Observable<ServerData>}
     */
    updateParent (obj: Object): Observable<ServerData> {
        return this.dataService.postData('auth/resource/updateParent.do', obj);
    }

    /**
     * 批量更新节点
     * @param arr
     * @returns {Observable<ServerData>}
     */
    updateBatch (arr: Array<any>): Observable<ServerData> {
        return this.dataService.postData('auth/resource/updateBatch.do', arr);
    }

}