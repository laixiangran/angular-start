/**
 * Created by Hllinc on 2016-10-28 15:15.
 */
import {Injectable} from "@angular/core";

import {Observable, Subscriber} from "rxjs";
import {DataService} from "./data.service";
import {Sys} from "../utils/sys";
import {ServerData} from '../models/server-data.model';

@Injectable()
export class AuthService {

    // 当前用户
    user: any = null;

    // 当前角色所有的菜单资源
    currResources: any[] = null;

    // 是否登录
    isLoggedIn: boolean = null;

    // 登录前的路径
    redirectUrl: string = null;

    constructor (private dataService: DataService) {}

    /**
     * 初始化变量
     * @param redirectUrl
     * @param user
     * @returns {Observable<boolean>}
     */
    initParams (redirectUrl?: string, user?: any): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<any>) => {
            if (user) {
                this.isLoggedIn = true;
                this.redirectUrl = redirectUrl;
                this.user = user;
                subscriber.next(true);
                subscriber.complete();
            } else {
                this.redirectUrl = redirectUrl;
                this.user = user;
                this.isLoggedIn = null;
                this.currResources = null;
                subscriber.next(true);
                subscriber.complete();
            }
        });
    }
}
