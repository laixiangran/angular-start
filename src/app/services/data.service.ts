/**
 * Created by Hllinc on 2016-11-01 15:29.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ServerData} from '../models/server-data.model';

@Injectable()
export class DataService {

    serverHost: string = environment.apiUrl;

    constructor (private http: Http) {}

    /**
     * get请求
     * @param url 请求路径
     * @returns {Observable<ServerData>}
     */
    getData (url: string): Observable<ServerData> {
        return this.http.get(this.serverHost + url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * post请求
     * @param url 请求路径
     * @param obj 请求body
     * @returns {Observable<ServerData>}
     */
    postData (url: string, body: any = null): Observable<ServerData> {
        let headers = new Headers({'Content-Type': 'application/json'}),
            options = new RequestOptions({headers: headers});
        return this.http.post(this.serverHost + url, body && JSON.stringify(body), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * 提取数据
     * @param res Response
     * @returns {any|{}}
     */
    private extractData (res: Response) {
        let body = res.json();
        return body || {};
    }

    /**
     * 请求错误
     * @param error 错误对象
     * @returns {ErrorObservable}
     */
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}