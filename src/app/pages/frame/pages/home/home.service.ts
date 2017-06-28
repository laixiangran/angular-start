import { Injectable } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ServerData } from '../../../../models/server-data.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

    constructor(private dataService: DataService) { }

    /**
     * 获取自备井列表
     * @returns {Observable<ServerData>}
     */
    getWells(): Observable<ServerData> {
        return this.dataService.postData('auth/wellTotal/selectForWellPoint.do');
    }

}
