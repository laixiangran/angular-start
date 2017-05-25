import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataService} from '../../../../services/data.service';
import {ServerData} from '../../../../models/server-data.model';

@Injectable()
export class HomeService {

    constructor (private dataService: DataService) { }

    /**
     * 获取自备井列表
     * @returns {Observable<ServerData>}
     */
    getWells (): Observable<ServerData> {
        return this.dataService.postData('auth/wellTotal/selectForWellPoint.do');
    }

}
