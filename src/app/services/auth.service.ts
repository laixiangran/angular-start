/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 当前用户信息服务
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
	user: any = null;
	currResources: any[] = null; // 当前用户菜单
	currUserResources: string[] = null; // 当前用户资源
	messageNum: number = 0; // 未读站内信的个数

	constructor() {}
}
