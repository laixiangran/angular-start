/**
 * Created by monica on 2017-02-08.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {ServerData} from "../../../../../sys/models/server-data";
import {DataService} from "../../../../../../../services/data.service";

@Injectable()
export class ScheduleManageService {
    constructor (private dataService: DataService) {}

    /**
     * 获取所有日程
     * @returns {Observable<ServerData>}
     */
    getScheduleData (): Observable<ServerData> {
        return this.dataService.postData('auth/schedule/getScheduleList.do');
    }

    /**
     * 添加日程
     * @returns {Observable<ServerData>}
     */
    addSchedule (obj): Observable<ServerData> {
        return this.dataService.postData('auth/schedule/addSchedule.do',obj);
    }
    /**
     * 编辑日程
     * @returns {Observable<ServerData>}
     */
    updateSchedule (obj): Observable<ServerData> {
        return this.dataService.postData('auth/schedule/updateSchedule.do',obj);
    }
    /**
     * 删除日程
     * @returns {Observable<ServerData>}
     */
    deleteSchedule (obj): Observable<ServerData> {
        return this.dataService.postData('auth/schedule/deleteSchedule.do',obj);
    }
}
