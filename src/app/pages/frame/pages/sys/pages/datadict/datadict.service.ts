/**
 * Created by Hllinc on 2016-11-29 0029 17:07.
 */
import { Injectable } from '@angular/core';
import { DatadictType } from '../../models/datadict';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../../../services/request.service';
import { ServerData } from '../../../../../../models/server-data.model';

@Injectable()
export class DatadictService {

	datadictUrl: string = '/DictionaryAction/getAllType';

	constructor(private requestService: RequestService) {
	}

	/**
	 * 获取数据字典大类列表
	 * */
	postDatadictsList(): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/getAllType');
	}

	/**
	 * 获取数据字典列表
	 * @returns {Observable<ServerData>}
	 */
	postDatadicts(datadictTypeId: string): Observable<ServerData> {
		return this.requestService.get(`/DictionaryAction/getAType/${datadictTypeId}`);
	}

	/**
	 * 删除数据字典
	 * @param datadictTypeId
	 * @returns {Observable<ServerData>}
	 */
	deleteDatadict(datadictTypeId: string): Observable<ServerData> {
		return this.requestService.post(`/DictionaryAction/deleteType/${datadictTypeId}`);
	}

	/**
	 * 添加数据字典类型
	 * @param datadict
	 * @returns {Observable<ServerData>}
	 */
	addDatadict(datadict: DatadictType): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/addDatadictType', datadict);
	}

	/**
	 * 更新数据字典
	 * @param datadict
	 * @returns {Observable<ServerData>}
	 */
	updateDatadict(datadict: any): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/updateDatadict', datadict);
	}

	/**
	 * 添加字典值
	 * */
	addDatadictValue(datadict: any): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/addDatadict', datadict);
	}

	/**
	 *删除字典值
	 * */
	deleteDatadictValue(datadictValue: any): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/deleteDatadict', datadictValue);
	}

	/**
	 * 更新节点
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	updateParent(obj: Object): Observable<ServerData> {
		return this.requestService.post('/DictionaryAction/moveNode', obj);
	}


	/**
	 * 批量更新节点
	 * @param arr
	 * @returns {Observable<ServerData>}
	 */
	updateBatch(arr: Array<any>): Observable<ServerData> {
		return this.requestService.post('/auth/datadict/updateBatch', arr);
	}

	/**************************************************************************************
	 * 数据字典数据获取
	 * ************************************************************************************
	 */

	/**
	 * 获取单位类型
	 * @returns {Observable<ServerData>}
	 */
	getUnits(): Observable<ServerData> {
		return this.requestService.post(this.datadictUrl, {c_id: '/895ee890e7ac47f793147d77b52ad5a7'});
	}


}
