/**
 * Created by Hllinc on 2016-12-20 0020 17:02.
 */
import {Injectable} from "@angular/core";
import {DataService} from "../../../../../services/data.service";
import {Access} from "../../models/access";
import {Observable} from "rxjs";
import {ServerData} from "../../models/server-data";
import {User} from "../../models/user";

@Injectable()
export class UserInfoService {
	constructor(private dataService: DataService){

	}

	/**
	 * 个人修改登陆密码
	 * @param a
	 * @returns {Observable<ServerData>}
	 */
	updatePasswordByCurrentUser(a: Access): Observable<ServerData>{
		return this.dataService.postData("auth/user/updateAccessPassword.do", a);
	}

	/**
	 * 当前用户修改个人信息
	 * @param u
	 * @returns {Observable<ServerData>}
	 */
	updateUserByCurrentUser(u: User): Observable<ServerData>{
		return this.dataService.postData("auth/user/updateUserByCurrentUser.do", u);
	}
}
