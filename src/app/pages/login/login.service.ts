import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';

@Injectable()
export class LoginService {

	constructor(private requestService: RequestService) {}

	login(access: any): Observable<any> {
		return this.requestService.post('/LoginAction/Login', access);
	}

	logout(): Observable<any> {
		return this.requestService.post('/LoginAction/Logout');
	}
}
