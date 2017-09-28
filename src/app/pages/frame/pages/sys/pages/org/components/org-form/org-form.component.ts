/**
 * Created by Hllinc on 2016-11-30 0030 17:34.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datadict } from '../../../../models/datadict';
import { DatadictService } from '../../../datadict/datadict.service';
import { AttachmentService } from '../../../../services/attachment.service';
import { Org } from '../../../../models/org';
import { Subscription } from 'rxjs/Subscription';
import { OrgService } from '../../org.service';
import { ServerData } from '../../../../../../../../models/server-data.model';

@Component({
	selector: 'org-form',
	templateUrl: './org-form.component.html',
	styleUrls: ['./org-form.component.scss']
})

export class OrgFormComponent implements OnInit {

	@Input('selectedOrg') selectedOrg: Org = null;
	@Output()
	close: EventEmitter<any> = new EventEmitter<any>();
	// 单位类型
	orgType: Datadict;

	filebatchuploadsuccess($event: any) {
		this.selectedOrg.attachmentDetail.attachmentItems = this.selectedOrg.attachmentDetail.attachmentItems ?
			this.selectedOrg.attachmentDetail.attachmentItems.concat($event.data.response.result) : $event.data.response.result;
		const sub: Subscription = this.orgService.updateOrg(this.selectedOrg).subscribe(
			(serverData) => {
				sub.unsubscribe();
				if (serverData.code === 'ok') {
					this.close.emit(this.selectedOrg);
				}
			});
	}

	constructor(private datadictService: DatadictService,
				private orgService: OrgService,
				private attachmentService: AttachmentService) {
	}

	onSubmit() {
		const sub: Subscription = this.orgService.updateSysUnit(this.selectedOrg.data).subscribe(
			(serverData) => {
				sub.unsubscribe();
				if (serverData.code === 'ok') {
					this.close.emit(this.selectedOrg);
				}
			});
	}

	closeForm() {
		this.close.emit(this.selectedOrg);
	}

	ngOnInit() {
		const sub: Subscription = this.datadictService.getUnits().subscribe(
			(serverData: ServerData) => {
				sub.unsubscribe();
				if (serverData.code === 'ok') {
					this.orgType = <Datadict> serverData.result;
				}
			});
	}

}
