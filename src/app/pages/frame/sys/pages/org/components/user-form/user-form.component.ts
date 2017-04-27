/**
 * Created by Hllinc on 2016-11-11 20:13.
 */
import {Component, Input, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {OrgTreeComponent} from "../org-tree/org-tree.component";
import {Md5} from "ts-md5/dist/md5";
import {DataService} from "../../../../../../../services/data.service";
import {AttachmentItem} from "../../../../models/attachment-item";
import {AttachmentService} from "../../../../services/attachment.service";
import {Attachment} from "../../../../models/attachment";
import {Org} from "../../../../models/org";
import {Role} from "../../../../models/role";
import {User} from "../../../../models/user";
import {Sys} from "../../../../../../../utils/sys";
import {Access} from "../../../../models/access";
@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
	@Input('selectedOrg') selectedOrg: Org = null;
	@Output()
	close: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('orgTree') // 选中dom中属性为#orgTree的组件
	orgTree: OrgTreeComponent;

	sexs = ['男', '女'];
	roles: Role[] = [];

	hasSelectRole: boolean = false;
	enableLogin: boolean = false;

	submitted = false;
	user: User = new User('', '', '男', new Access('', 1, ''), []);

	fileInput:any;

	constructor(private dataService: DataService, private attachmentService: AttachmentService) {
	}

	fileInputOpts: any = {
		uploadUrl: this.dataService.serverHost + "/auth/attachmentItemsAction/upload.do", //上传的地址
		uploadExtraData: (previewId: any, index: any) => {
			return {attachmentGroupId: this.user.c_attachment};
		}
	};

	ready($event: any) {
		this.fileInput = $event;
	}

	filebatchuploadcomplete($event: any) {
	}

	filebatchuploaderror($event: any) {
	}

	filebatchuploadsuccess($event: any){
		this.fileInput.clear();
		this.user.attachmentDetail.attachmentItems = this.user.attachmentDetail.attachmentItems?this.user.attachmentDetail.attachmentItems.concat($event.data.response.result):$event.data.response.result;
		if (this.user.c_id == '') {
			// 添加用户
			this.addUser();
		} else {
			// 编辑用户
			this.editUser();
		}
	}

	fileuploaded($event: any) {
	}

	fileuploaderror($event: any) {
	}

	onSubmit() {
		if (!this.user.c_attachment){
			this.attachmentService.addAttachmentGroup(new Attachment('')).subscribe(
				(serverData) => {
					if(serverData.code == 'ok'){
						let a:Attachment = <Attachment> serverData.result;
						let attachmentGroupId:string = a.c_id;
						this.user.c_attachment = attachmentGroupId;
						this.user.attachmentDetail = a;
						this.fileInput.upload();
						//$("#c_user_attachment").fileinput("upload");
					}
				},
				(error) => {
					Sys.sysAlert(error);
				}
			);
		} else {
			//$("#c_user_attachment").fileinput("upload");
			this.fileInput.upload();
		}
	}

	cancel() {
		this.fileInput.clear();
		this.close.emit();
	}

	resetUser() {
		this.user = new User('', '', '男', new Access('', 1, ''), []);
		for (let j = 0; j < this.roles.length; j++) {
			this.roles[j].c_checked = false;
		}
	}

	addUser() {
		// 初始化密码
		this.user.access.c_password = Md5.hashStr('essence') + '';
		this.user.c_org_id = this.selectedOrg.c_id;
		for (let i = 0; i < this.roles.length; i++) {
			if (this.roles[i].c_checked) {
				let r = this.roles[i];
				delete r.c_checked;
				this.user.userRoles.push(r);
			}
		}
		this.dataService.postData('auth/user/addUser.do', this.user).subscribe(
			(serverData) => {
				if (serverData.code == 'ok') {
					this.close.emit('add');
				} else {
					Sys.sysAlert(serverData.info);
				}
			},
			(error) => {
				Sys.sysAlert(error);
			}
		)
	}

	editUser() {
		this.user.c_org_id = this.selectedOrg.c_id;
		this.user.userRoles = [];
		for (let i = 0; i < this.roles.length; i++) {
			if (this.roles[i].c_checked) {
				let r = this.roles[i];
				delete r.c_checked;
				this.user.userRoles.push(r);
			}
		}
		this.dataService.postData('auth/user/updateUser.do', this.user).subscribe(
			(serverData) => {
				if (serverData.code == 'ok') {
					this.close.emit('edit');
				} else {
					Sys.sysAlert(serverData.info);
				}
			},
			(error) => {
				Sys.sysAlert(error);
			}
		)
	}

	treeClick($event: Org) {
		this.selectedOrg = $event;
	}

	/**
	 * 选中父组件中选择的组织机构
	 */
	selectOrg() {
		if (this.selectedOrg) {
			this.orgTree.activateNode(this.selectedOrg.c_id);
		}
	}

	checkboxEvent($event: any, role: Role) {
		this.hasSelectRole = false;
		role.c_checked = $event.target.checked;
		for (let i = 0; i < this.roles.length; i++) {
			if (this.roles[i].c_checked) {
				this.hasSelectRole = true;
				break;
			}
		}
	}

	enableLoginEvent($event: any){
		this.enableLogin = $event.target.checked;
		this.user.access.n_valid = $event.target.checked?1:0;
	}

	/**
	 * 删除用户附件
	 * @param ai
	 */
	deleteUserAttachment(ai: AttachmentItem) {
		Sys.sysConfirm('确定删除' + ai.c_name + '吗？', ()=> {
			this.attachmentService.deleteAttachmentItem(ai).subscribe(
				(serverData) => {
					if (serverData.code == 'ok') {
						for(let i=0;i<this.user.attachmentDetail.attachmentItems.length;i++){
							if(ai === this.user.attachmentDetail.attachmentItems[i]){
								this.user.attachmentDetail.attachmentItems.splice(i,1);
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
		this.dataService.getData('auth/role/selectAll.do').subscribe(
			(serverData) => {
				this.roles = <Role[]>serverData.result;
			},
			(error) => {
			}
		)
	}
}
