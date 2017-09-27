import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../../../../../services/request.service';
import { ServerData } from '../../../../../../models/server-data.model';

@Injectable()
export class HomeService {

	constructor(private requestService: RequestService) { }

	/**
	 * 获取用户信息
	 * @returns {Observable<ServerData>}
	 */
	getUserInfo(): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/getMyInfo');
	}
}
