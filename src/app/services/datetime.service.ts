/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 日期时间操作服务
 */

import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {

	constructor() {
	}

	/**
	 * 时间格式化
	 * @param {*} value 可转化为时间的值
	 * @param {string} fmt 格式 除了月使用大写M，其它都是小写
	 * @returns {string}
	 */
	dateFormat(value: any, fmt: string): string {
		const date: Date = new Date(value);
		const o = {
			'M+': date.getMonth() + 1, // 月份
			'd+': date.getDate(), // 日
			'h+': date.getHours(), // 小时
			'm+': date.getMinutes(), // 分
			's+': date.getSeconds(), // 秒
			'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
			'S': date.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (const k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
			}
		}
		return fmt;
	}

	/**
	 * 将秒数格式化成hh:mm:ss
	 * @param {number} value 秒数
	 * @returns {string}
	 */
	timeFormat(value: number): string {
		const h: string = parseInt(value / 3600 + '', 10) < 10 ? '0' + parseInt(value / 3600 + '', 10) : '' + parseInt(value / 3600 + '', 10),
			m: string = parseInt(value % 3600 / 60 + '', 10) < 10 ? '0' + parseInt(value % 3600 / 60 + '', 10) : '' + parseInt(value % 3600 / 60 + '', 10);
		let s: string;
		if (value >= 60) {
			s = value % 3600 % 60 < 10 ? '0' + parseInt(value % 3600 % 60 + '', 10) : '' + parseInt(value % 3600 % 60 + '', 10);
		} else if (value < 60 && value >= 10) {
			s = '' + parseInt(value + '', 10);
		} else if (value < 10) {
			s = '0' + parseInt(value + '', 10);
		}
		return `${h}:${m}:${s}`;
	}
}


