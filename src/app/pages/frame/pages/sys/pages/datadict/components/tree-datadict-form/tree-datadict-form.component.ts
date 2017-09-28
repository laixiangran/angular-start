/**
 * Created by Hllinc on 2016-11-29 0029 17:05.
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Datadict } from '../../../../models/datadict';
import { DatadictService } from '../../datadict.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'tree-datadict-form',
	templateUrl: './tree-datadict-form.template.html',
	styleUrls: ['./tree-datadict-form.style.scss']
})

export class TreeDatadictFormComponent {
	@ViewChild('datadictForm') datadictForm: ModalComponent;
	datadictValue: Datadict = new Datadict();
	isUpdate: boolean;

	@Input()
	set datadictInfoValue(value: any) {
		if (value.data.type) {
			this.isUpdate = value.data.id ? true : false;
			this.datadictValue = JSON.parse(JSON.stringify(value));
		}
	}

	@Output()
	close2: EventEmitter<any> = new EventEmitter<any>();

	constructor(private datadictService: DatadictService) {

	}

	onSubmit() {
		if (this.isUpdate) {
			const sub: Subscription = this.datadictService.updateDatadict(this.datadictValue.data).subscribe(
				(serverData) => {
					sub.unsubscribe();
					this.close2.emit('editsuccess');
				});
		} else {
			const obj = {
				id: this.datadictValue.data.id,
				parentId: this.datadictValue.data.parentId,
				type: this.datadictValue.data.type,
				info: this.datadictValue.data.info,
				name: this.datadictValue.data.name
			};
			const subs: Subscription = this.datadictService.addDatadictValue(obj).subscribe(
				(serverData) => {
					subs.unsubscribe();
					this.close2.emit('addsuccess');
				});
		}

	}

	closef() {
		this.close2.emit(false);
	}
}
