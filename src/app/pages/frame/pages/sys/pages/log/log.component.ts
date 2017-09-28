/**
 * Created by Hllinc on 2016-11-01 21:03.
 */

import { Component } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { DateTimeService } from '../../../../../../services/datetime.service';

@Component({
	templateUrl: './log.component.html'
})
export class LogComponent {
	content: string = '系统日志';
	option: any = {
		serverParam: {
			serverUrl: environment.domain + '/SysLogAction/getSysLogListPage',
			token: localStorage.getItem(environment.tokenName)
		},
		columns: {
			primaryKey: 'id', // （一般要配置，如果错了rowSelect事件会失效）
			items: [{
				label: '操作人',
				colName: 'realnm',
				render: (value: any) => {
					return value ? value : '/';
				}
			}, {
				label: '请求方法',
				colName: 'method',
				render: (value) => {
					return value ? value : '/';
				}
			}, {
				label: '请求参数',
				colName: 'parameter',
				render: (value, obj) => {
					return obj.parameter ? obj.parameter.split(']')[0] + ']' : '/';
				}
			}, {
				label: '请求路径',
				colName: 'cclass',
				render: (value) => {
					return value ? value : '/';
				}
			}, {
				label: '操作时间',
				colName: 'date',
				render: (value) => {
					return value ? this.dateTimeService.dateFormat(new Date(value), 'yyyy-MM-dd') : '/';
				}
			}]
		}
	};
	constructor(public dateTimeService: DateTimeService) {}
}
