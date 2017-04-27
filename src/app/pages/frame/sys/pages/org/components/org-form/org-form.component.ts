/**
 * Created by Hllinc on 2016-11-30 0030 17:34.
 */

import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {DataService} from "../../../../../../../services/data.service";
import {Datadict} from "../../../../models/datadict";
import {DatadictService} from "../../../datadict/datadict.service";
import {AttachmentItem} from "../../../../models/attachment-item";
import {AttachmentService} from "../../../../services/attachment.service";
import {Attachment} from "../../../../models/attachment";
import {Org} from "../../../../models/org";
import {Sys} from "../../../../../../../utils/sys";

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

	fileInputOpts: any = {
		uploadUrl: this.dataService.serverHost + "/auth/attachmentItemsAction/upload.do", //上传的地址
		uploadExtraData: (previewId: any, index: any) => {
			return {attachmentGroupId: this.selectedOrg.c_attachment};
		}
	};

	fileInput:any;

	fileInputReady($event: any) {
		this.fileInput = $event;
		// console.log($event);
	}

	filebatchuploadsuccess($event: any){
		this.fileInput.clear();
		this.selectedOrg.attachmentDetail.attachmentItems = this.selectedOrg.attachmentDetail.attachmentItems?this.selectedOrg.attachmentDetail.attachmentItems.concat($event.data.response.result):$event.data.response.result;
		this.dataService.postData('auth/org/update.do', this.selectedOrg).subscribe(
			(serverData) => {
				if (serverData.code == 'ok') {
					this.close.emit(this.selectedOrg);
				} else {
					Sys.sysAlert(serverData.info);
				}
			},
			(error) => {
				Sys.sysAlert(error);
			});
	}

	constructor(private dataService: DataService, private datadictService: DatadictService, private attachmentService: AttachmentService) {
	}

	onSubmit() {
		if (!this.selectedOrg.c_attachment){
			this.attachmentService.addAttachmentGroup(new Attachment('')).subscribe(
				(serverData) => {
					if(serverData.code == 'ok'){
						let a:Attachment = <Attachment> serverData.result;
						let attachmentGroupId:string = a.c_id;
						this.selectedOrg.c_attachment = attachmentGroupId;
						this.selectedOrg.attachmentDetail = a;
						this.fileInput.upload();
						//$("#c_attachment").fileinput("upload");
					}
				},
				(error) => {
					Sys.sysAlert(error);
				}
			);
		} else {
			this.fileInput.upload();
			//$("#c_attachment").fileinput("upload");
		}
	}

	closeForm() {
		this.fileInput.clear();
		this.close.emit(this.selectedOrg);
	}

	/**
	 * 删除单个附件
	 * @param ai
	 */
	deleteOrgAttachment(ai:AttachmentItem){
		Sys.sysConfirm('确定删除'+ai.c_name+'吗？',()=>{
			this.attachmentService.deleteAttachmentItem(ai).subscribe(
				(serverData) => {
					if(serverData.code == 'ok'){
						for(let i=0;i<this.selectedOrg.attachmentDetail.attachmentItems.length;i++){
							if(ai === this.selectedOrg.attachmentDetail.attachmentItems[i]){
								this.selectedOrg.attachmentDetail.attachmentItems.splice(i,1);
							}
						}
					}
				},
				(error) => {
					Sys.sysAlert(error);
				}
			);
		});
	}

	ngOnInit() {
		this.datadictService.getUnits().subscribe(
			(serverData) => {
				this.orgType = <Datadict> serverData.result;
			},
			(error) => {
				Sys.sysAlert(error);
			}
		);
	}

}
