/**
 * Created by laixiangran on 2016/11/22.
 * homepage：http://www.laixiangran.cn.
 */

import {Injectable} from '@angular/core';

import {DataService} from "../../../../../services/data.service";
import {Observable} from "rxjs";
import {ServerData} from "../../models/server-data";

@Injectable()
export class OrgService {

    constructor (private dataService: DataService) {}

    getUserDetailByOrgId (orgId: string): Observable<ServerData> {
        return this.dataService.postData('auth/user/selectUserDetailByOrgId.do', {c_id: orgId});
    }
}