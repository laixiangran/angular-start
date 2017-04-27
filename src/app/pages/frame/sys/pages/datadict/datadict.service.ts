/**
 * Created by Hllinc on 2016-11-29 0029 17:07.
 */
import {Injectable} from "@angular/core";
import {DataService} from "../../../../../services/data.service";
import {Observable} from "rxjs";
import {ServerData} from "../../models/server-data";
import {Datadict} from "../../models/datadict";
@Injectable()
export class DatadictService {

	datadictUrl: string = 'auth/datadict/selectDatadictByParentId.do';

	constructor(private dataService: DataService) {
	}

	/**
	 * 获取数据字典列表
	 * @returns {Observable<ServerData>}
	 */
	getDatadicts(): Observable<ServerData> {
		return this.dataService.getData('auth/datadict/selectAll.do');
	}

	/**
	 * 添加数据字典
	 * @param datadict
	 * @returns {Observable<ServerData>}
	 */
	addDatadict(datadict: Datadict): Observable<ServerData> {
		return this.dataService.postData('auth/datadict/add.do', datadict);
	}

	/**
	 * 更新数据字典
	 * @param datadict
	 * @returns {Observable<ServerData>}
	 */
	updateDatadict(datadict: Datadict): Observable<ServerData> {
		return this.dataService.postData('auth/datadict/update.do', datadict);
	}

	/**
	 * 删除数据字典
	 * @param datadict
	 * @returns {Observable<ServerData>}
	 */
	deleteDatadict(datadict: Datadict): Observable<ServerData> {
		return this.dataService.postData('auth/datadict/deleteById.do', datadict);
	}

	/**
	 * 更新节点
	 * @param obj
	 * @returns {Observable<ServerData>}
	 */
	updateParent(obj: Object): Observable<ServerData> {
		return this.dataService.postData('auth/datadict/updateParent.do', obj);
	}

	/**
	 * 批量更新节点
	 * @param arr
	 * @returns {Observable<ServerData>}
	 */
	updateBatch(arr: Array<any>): Observable<ServerData> {
		return this.dataService.postData('auth/datadict/updateBatch.do', arr);
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
		return this.dataService.postData(this.datadictUrl, {c_id: '895ee890e7ac47f793147d77b52ad5a7'});
	}

	/**
	 * 获取施工单位管理人员职务
	 * @returns {Observable<ServerData>}
	 */
	getConstructionManagerDuty(): Observable<ServerData> {
		return this.dataService.postData(this.datadictUrl, {c_id: '6d258c5358c44261b2992e267c6913ea'});
	}

	/**
	 * 获取设计单位管理人员职务
	 * @returns {Observable<ServerData>}
	 */
	getDesignManagerDuty(): Observable<ServerData> {
		return this.dataService.postData(this.datadictUrl, {c_id: '0fbc63d90ac543a2b7dcc162b93f4c30'});
	}

	/**
	 * 获取建设单位管理人员职务
	 * @returns {Observable<ServerData>}
	 */
	getProjectEntityManagerDuty(): Observable<ServerData> {
		return this.dataService.postData(this.datadictUrl, {c_id: '267827a70ff441d89f45814721adc4af'});
	}

	/**
	 * 获取监理单位管理人员职务
	 * @returns {Observable<ServerData>}
	 */
	getSupervisionManagerDuty(): Observable<ServerData> {
		return this.dataService.postData(this.datadictUrl, {c_id: '0238b24347a1447985fb2e556552427f'});
	}
}
