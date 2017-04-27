/**
 * Created by Hllinc on 2016-10-28 15:15.
 */
import {Injectable} from "@angular/core";

import {ServerData} from "../pages/frame/sys/models/server-data";
import {ResourceService} from "../pages/frame/sys/pages/resource/resource.service";
import {Observable, Subscriber} from "rxjs";
import {DataService} from "./data.service";
import {User} from "../pages/frame/sys/models/user";
import {Resource} from "../pages/frame/sys/models/resource";
import {Role} from "../pages/frame/sys/models/role";
import {Sys} from "../utils/sys";

@Injectable()
export class AuthService {

    // 当前用户
    user: User = null;

    // 当前角色所有的菜单资源
    currResources: Resource[] = null;

    // 是否登录
    isLoggedIn: boolean = null;

    // 登录前的路径
    redirectUrl: string = null;

    // 角色等级
    roleLevel: number = null; // 分三级，3为系统管理员和区级管理员，2为镇级管理员，1为村级管理员

    constructor (private resourceService: ResourceService, private dataService: DataService) {}

    getCurrentUser (): User {
        return this.user;
    }

    setCurrentUser (user: User): void {
        this.user = user;
    }

    getCurrResources (): Resource[] {
        return this.currResources;
    }

    setCurrResources (resources: Resource[]): void {
        this.currResources = resources;
    }

    /**
     * 初始化变量
     * @param redirectUrl
     * @param user
     * @returns {Observable<boolean>}
     */
    initParams (redirectUrl?: string, user?: User): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<any>) => {
            if (user) {
                if (!this.getCurrResources()) {
                    this.resourceService.getResourceByUserId(user.c_id).subscribe((serverData: ServerData) => {
                        if (serverData.code === "ok") {
                            this.setCurrResources(serverData.result[0].children);
                            this.isLoggedIn = true;
                            this.redirectUrl = redirectUrl;
                            this.user = user;
                            subscriber.next(true);
                            subscriber.complete();
                        } else {
                            Sys.sysAlert(serverData.info, '温馨提示');
                            subscriber.next(false);
                            subscriber.complete();
                        }
                    });
                } else {
                    subscriber.next(true);
                    subscriber.complete();
                }
            } else {
                this.redirectUrl = redirectUrl;
                this.user = user;
                this.isLoggedIn = null;
                this.roleLevel = null;
                this.currResources = null;
                subscriber.next(true);
                subscriber.complete();
            }
        });
    }
}
