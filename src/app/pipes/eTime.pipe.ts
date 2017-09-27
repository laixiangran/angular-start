import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'eTime'
})
export class ETimePipe implements PipeTransform {
	constructor() {}

	transform(value: number): string {
		const h: string = parseInt(value / 3600 + '', 10) < 10 ?
			'0' + parseInt(value / 3600 + '', 10) : '' + parseInt(value / 3600 + '', 10);
		const m: string = parseInt(value % 3600 / 60 + '', 10) < 10 ?
			'0' + parseInt(value % 3600 / 60 + '', 10) : '' + parseInt(value % 3600 / 60 + '', 10);
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
