/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServerData } from '../../../../../../models/server-data.model';
import { RequestService } from '../../../../../../services/request.service';

@Injectable()
export class ResourceService {

	constructor(private requestService: RequestService) {
	}

	/**
	 * 获取资料列表
	 * @returns {Observable<ServerData>}
	 */
	getResources(): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/getSysResourceListTree');
	}

	/**
	 * 根据用户id获取资源树
	 * @param id
	 * @returns {Observable<ServerData>}
	 */
	getResourceByUserId(param): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/querySysResource', param);
	}

	/**
	 * 添加资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
	addResource(param): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/addSysResource', param);
	}

	/**
	 * 更新资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
	updateResource(param): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/updateSysResource', param);
	}

	/**
	 * 删除资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
	deleteResource(param): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/deleteSysResource', param);
	}

	/**
	 * 更新节点 拖动
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	updateParent(obj: Object): Observable<ServerData> {
		return this.requestService.post('/SysResourceAction/moveNode', obj);
	}

	/**
	 * 批量更新节点
	 * @param arr
	 * @returns {Observable<ServerData>}
	 */
	updateBatch(arr: Array<any>): Observable<ServerData> {
		return this.requestService.post('/auth/resource/updateBatch', arr);
	}

}
