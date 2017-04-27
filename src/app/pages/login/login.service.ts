/**
 * Created by laixiangran on 2016/11/25.
 * homepage：http://www.laixiangran.cn.
 */

import {Injectable} from '@angular/core';

import {DataService} from "../../services/data.service";
import {Observable} from "rxjs";
import {ServerData} from "../frame/sys/models/server-data";
import {Access} from "../frame/sys/models/access";
import {Md5} from "ts-md5/dist/md5";

@Injectable()
export class LoginService {

    constructor (private dataService: DataService) {}

    /**
     * 登录
     * @param access
     * @returns {Observable<ServerData>}
     */
    login (access: Access): Observable<ServerData> {
        let param: Object = {
            c_login_id: access.c_login_id,
            c_password: Md5.hashStr(access.c_password)
        };
        return this.dataService.postData('access/login.do', param);
    }

    /**
     * 登出
     * @returns {Observable<ServerData>}
     */
    logout (): Observable<ServerData> {
        return this.dataService.postData('access/logout.do');
    }

    /**
     * 验证是否登录
     * @returns {Observable<ServerData>}
     */
    isLogin (roleType?: string): Observable<ServerData> {
        return this.dataService.getData('access/isLogin.do?roleType=' + roleType);
    }
}