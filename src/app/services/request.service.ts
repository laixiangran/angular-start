///<reference path="../../../node_modules/rxjs/Observable.d.ts"/>
/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ServerData } from '../models/server-data.model';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestService {
	private domain: string = environment.domain;
	private mockDomain: string = environment.mockDomain;

	constructor(private http: Http, public router: Router) {
	}

	/**
	 * post请求
	 * @param {string} url 请求路径
	 * @param {any} body 请求body
	 * @param {boolean} [isMock=false] 是否模拟请求
	 * @returns {Observable<ServerData>}
	 */
	post(url: string, body: any = null, isMock: boolean = false): Observable<ServerData> {
		const headers = new Headers({
				'Content-Type': 'application/json',
				'URMS_LOGIN_TOKEN': localStorage.getItem(environment.tokenName) || ''
			}),
			options = new RequestOptions({headers: headers}),
			requesUrl: string = (isMock ? this.mockDomain : this.domain) + url;
		return new Observable<ServerData>((subscriber: Subscriber<any>) => {
			this.http.post(requesUrl, body && JSON.stringify(body), options).map((res: Response) => {
				return res.json();
			}).subscribe((serverData: ServerData) => {
				subscriber.next(serverData);
				subscriber.complete();
			}, (error: Response) => {
				this.handlerError('post', error, url, body, isMock, subscriber);
			});
		});
	}

	/**
	 * get请求
	 * @param {string} url 请求路径
	 * @param {boolean} [isMock=false] 是否模拟请求
	 * @returns {Observable<ServerData>}
	 */
	get(url: string, isMock: boolean = false): Observable<ServerData> {
		const headers = new Headers({
				'Content-Type': 'application/json',
				'URMS_LOGIN_TOKEN': localStorage.getItem(environment.tokenName) || ''
			}),
			options = new RequestOptions({headers: headers}),
			requesUrl: string = (isMock ? this.mockDomain : this.domain) + url;
		return new Observable<ServerData>((subscriber: Subscriber<any>) => {
			this.http.get(requesUrl, options).map((res: Response) => {
				return res.json();
			}).subscribe((serverData: ServerData) => {
				subscriber.next(serverData);
				subscriber.complete();
			}, (error: Response) => {
				this.handlerError('get', error, url, null, isMock, subscriber);
			});
		});
	}

	/**
	 * 请求出错之后的处理
	 * @param {string} type 请求类型（post or get）
	 * @param {Response} error 错误对象
	 * @param {string} url 请求路径
	 * @param {any} obj 请求body
	 * @param {boolean} isMock 是否模拟请求
	 * @param {Subscriber} subscriber 当前请求的订阅对象
	 */
	private handlerError(type: string, error: Response, url: string, obj?: any, isMock?: boolean, subscriber?: Subscriber<any>) {
		if (error.status === 401) {
			localStorage.removeItem(environment.tokenName);
			this.router.navigate(['/login']);
		} else if (error.status === 404) {
			if (!isMock) { // 只模拟一次
				if (environment.dev) { // 开发环境
					isMock = true;
					if (type === 'post') {
						this.post(url, obj, isMock).subscribe((data: ServerData) => {
							subscriber.next(data);
							subscriber.complete();
						});
					} else if (type === 'get') {
						this.get(url, isMock).subscribe((data: ServerData) => {
							subscriber.next(data);
							subscriber.complete();
						});
					}
					return;
				}
			}
		}
		subscriber.error(error);
		subscriber.complete();
		throw error;
	}
}
