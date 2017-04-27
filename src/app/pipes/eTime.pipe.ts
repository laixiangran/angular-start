/**
 * Created by laixiangran on 2017/4/3.
 * homepage：http://www.laixiangran.cn
 * 将秒数格式化为hh:mm:ss
 */

import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
	name: "eTime"
})
export class ETimePipe implements PipeTransform {
	constructor () {}

	transform (value: number): string {
		let h: string = parseInt(value/3600 + '') < 10 ? '0' + parseInt(value/3600 + '') : '' + parseInt(value/3600 + ''),
			m: string = parseInt(value%3600/60 + '') < 10 ? '0' + parseInt(value%3600/60 + '') : '' + parseInt(value%3600/60 + ''),
			s: string;
		if (value >= 60) {
			s =  value%3600%60 < 10 ? '0' + parseInt(value%3600%60 + '') : '' + parseInt(value%3600%60 + '');
		} else if (value < 60 && value >= 10) {
			s = '' + parseInt(value + '');
		} else if (value < 10) {
			s = '0' + parseInt(value + '');
		}
		return `${h}:${m}:${s}`;
	}
}
