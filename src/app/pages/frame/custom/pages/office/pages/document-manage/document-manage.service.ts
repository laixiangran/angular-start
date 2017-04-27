/**
 * Created by monica on 2017-02-21.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {ServerData} from "../../../../../sys/models/server-data";
import {DataService} from "../../../../../../../services/data.service";

@Injectable()
export class DocumentManageService {
    constructor (private dataService: DataService) {}

    /**
     * 获取文档类型
     * @returns {Observable<ServerData>}
     */
    getDocTypeData (): Observable<ServerData> {
        return this.dataService.postData('auth/attachment/select.do');
    }

    /**
     * 获取某文档类型下的文档
     * @returns {Observable<ServerData>}
     */
    getDocDataByType (obj): Observable<ServerData> {
        return this.dataService.postData('auth/attachmentItems/selectByGroupId.do', obj);
    }
    /**
     * 添加文档类型
     * @returns {Observable<ServerData>}
     */
    addDocType (obj): Observable<ServerData> {
        return this.dataService.postData('auth/attachment/add.do', obj);
    }
    /**
     * 删除文档类型
     * @returns {Observable<ServerData>}
     */
    deleteDocType (obj): Observable<ServerData> {
        return this.dataService.postData('auth/attachment/deleteById.do', obj);
    }
    /**
     * 删除文档
     * @returns {Observable<ServerData>}
     */
    deleteDoc (obj): Observable<ServerData> {
        return this.dataService.postData('auth/attachmentItems/deleteById.do', obj);
    }
}
