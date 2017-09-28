/**
 * Created by Hllinc on 2016-11-29 0029 17:05.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatadictType } from '../../../../models/datadict';
import { DatadictService } from '../../datadict.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'datadict-form',
	templateUrl: './datadict-form.template.html',
	styleUrls: ['./datadict-form.style.scss']
})

export class DatadictFormComponent {
	datadictInfo: DatadictType = new DatadictType();
	isUpdate: boolean = false;

	@Input()
	set datadictInfos(value: any) {
		if (!value.id) {
			this.isUpdate = false;
			this.datadictInfo = new DatadictType();
		} else {
			this.isUpdate = true;
			this.datadictInfo = JSON.parse(JSON.stringify(value));
		}
	}

	@Output()
	close: EventEmitter<any> = new EventEmitter<any>();

	constructor(private datadictService: DatadictService) {

	}

	/**
	 * 更新或添加事件
	 * */
	onSubmit() {
		this.datadictInfo.leaf = true;
		if (this.isUpdate) {
			const sub: Subscription = this.datadictService.updateDatadict(this.datadictInfo).subscribe(
				(serverData) => {
					sub.unsubscribe();
					this.close.emit(true);
				});
		} else {
			const subs: Subscription = this.datadictService.addDatadict(this.datadictInfo).subscribe(
				(serverData) => {
					subs.unsubscribe();
					this.close.emit(true);
				});
		}

	}

	closeForm() {
		this.close.emit(false);
	}
}
