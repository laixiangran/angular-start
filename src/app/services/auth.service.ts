/**
 * Created by Hllinc on 2016-10-28 15:15.
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
