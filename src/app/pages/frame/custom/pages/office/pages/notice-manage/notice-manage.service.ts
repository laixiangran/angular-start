/**
 * Created by monica on 2017-02-16.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {ServerData} from "../../../../../sys/models/server-data";
import {DataService} from "../../../../../../../services/data.service";

@Injectable()
export class NoticeManageService {
    constructor (private dataService: DataService) {}

    /**
     * 发送消息
     * @param obj 消息对象
     * @returns {Observable<ServerData>}
     */
    sendMessage (obj): Observable<ServerData> {
        return this.dataService.postData('auth/MessageController/sendMessage.do', obj);
    }

    /**
     * 删除消息
     * @param messageId 消息id
     * @returns {Observable<ServerData>}
     */
    deleteMessageById (messageId: string): Observable<ServerData> {
        return this.dataService.postData('auth/MessageController/deleteSysMessage.do', {id: messageId});
    }

    /**
     * 批量删除消息
     * @param messageIds 消息id数组
     * @returns {Observable<ServerData>}
     */
    batchDeleteMessageByIds (messageIds: {id: string}[]): Observable<ServerData> {
        return this.dataService.postData('auth/MessageController/deleteBatchSysMessage.do', messageIds);
    }
}
