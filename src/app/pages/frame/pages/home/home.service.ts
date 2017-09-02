import { Injectable } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { ServerData } from '../../../../models/server-data.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

	constructor(private rs: RequestService) { }

	/**
	 * 获取自备井列表
	 * @returns {Observable<ServerData>}
	 */
	getWells(): Observable<ServerData> {
		return this.rs.post('auth/wellTotal/selectForWellPoint.do');
	}
}
