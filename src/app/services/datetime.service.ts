/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 */
import { Injectable } from '@angular/core';

/**
 * @name DateTimeService
 * @description 通用日期时间操作服务
 */
@Injectable()
export class DateTimeService {

	/**
	 * 针对primeng中Calendar的本地配置
	 */
	locale: any = {
		firstDayOfWeek: 0,
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		today: '今天',
		clear: '清除'
	};

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


