/**
 * Created by Hllinc on 2016-10-28 11:47.
 */
import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {DataService} from "../../../../../services/data.service";
import {Md5} from "ts-md5/dist/md5";
import {UserDetailComponent} from "./components/user-detail/user-detail.component";
import {EssenceNg2TableComponent} from "../../../../../components/essence-ng2-table/essence-ng2-table.component";
import {OrgTreeComponent} from "./components/org-tree/org-tree.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {User} from "../../models/user";
import {Org} from "../../models/org";
import {Sys} from "../../../../../utils/sys";
@Component({
	templateUrl: './org.component.html'
})

export class OrgComponent {
	@ViewChild(OrgTreeComponent)
	private orgTreeComponent: OrgTreeComponent;
	@ViewChild(UserFormComponent)
	private userFormComponent: UserFormComponent;
	@ViewChild(UserDetailComponent)
	private userDetailComponent: UserDetailComponent;
	@ViewChild('eTable')
	private eTable: EssenceNg2TableComponent;

	orgUsers: User[];
	editUser: User;

	// 弹出窗口属性配置
	userFormTitle: string;
	@ViewChild('modal')
	modal: ModalComponent;
	@ViewChild('userDetailModal')
	userDetailModal: ModalComponent;
	selected: string;
	output: string;
	index: number = 0;
	cssClass: string = '';

	animation: boolean = true;
	keyboard: boolean = true;
	backdrop: string | boolean = true;
	css: boolean = false;

	// 选中的组织机构
	selectedOrg: Org = null;

	type: string = 'add';

	constructor(private dataService: DataService) {
		this.setOption();

	}

	option: any = {};

	setOption() {
		this.option = {
			serverUrl: 'auth/user/selectResultByEssenceTablePage.do',
			columns: {
				filter: {
					enabled: true
				},
				batch: {
					enabled: true,
					checkAllName: null,
					checkSingleName: null
				},
				index: {
					enabled: true
				},
				items: [{
					label: "系统编号",
					colName: "c_id",
					visible: false,
					order: false,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "所属单位id",
					colName: "c_org_id",
					visible: false,
					order: false,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						value: this.selectedOrg ? this.getOrgIds(this.selectedOrg) : null,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "in" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "登陆名",
					colName: "c_access_id",
					visible: true,
					order: true,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: false,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {
						return obj.access.c_login_id;
					}
				}, {
					label: "姓名",
					colName: "c_name",
					colAlias: "u.c_name",
					visible: true,
					order: true,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "角色",
					colName: "c_id",
					visible: true,
					order: true,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: false,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {
						let roles = [];
						for(let i=0;i<obj.userRoles.length;i++){
							roles.push(obj.userRoles[i].c_name);
						}
						return roles.join(',');
					}
				}, {
					label: "性别",
					colName: "c_sex",
					visible: true,
					order: false,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "select",// string,select,date,datetime,num,combobox
						data: [{
							text: '男',
							value: '男'
						}, {
							text: '女',
							value: '女'
						}],
						compare: "=" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "邮箱",
					colName: "c_email",
					visible: true,
					order: true,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "电话",
					colName: "c_telphone",
					visible: true,
					order: true,
					width: null,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "string",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {

					}
				}, {
					label: "出生日期",
					colName: "d_birthday",
					visible: true,
					order: true,
					width: 200,
					cls: "text-center",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: true,
						type: "date",// string,select,date,datetime,num,combobox
						compare: "like" // like,=,>,<,between
					},
					render: (obj) => {
						let result = Sys.dateFormat(obj.d_createtime, 'yyyy-MM-dd');
						return result;
					}
				}, {
					label: "操作",
					colName: null,
					visible: true,
					order: false,
					width: 240,
					cls: "text-center hidden-print",
					style: null,
					ellipsis: false,
					filterProp: {
						enabled: false
					},
					render: [{
						text: '查看',
						type: 'button',
						cls: 'btn-xs btn-info',
						event: (obj) => {
							this.viewUser(obj);
						}
					}, {
						text: '编辑',
						type: 'button',
						cls: 'btn-xs btn-warning',
						event: (obj) => {
							this.openEditUser(obj);
						}
					}, {
						text: '删除',
						type: 'button',
						cls: 'btn-xs btn-danger',
						event: (obj) => {
							this.deleteUser(obj);
						}
					}, {
						text: '重置密码',
						type: 'button',
						cls: 'btn-xs btn-default',
						event: (obj) => {
							this.resetPassword(obj);
						}
					}]
				}]
			}
		};
	}

	ready() {
	}

	refresh() {
		this.eTable.refresh();
	}

	/**
	 * 窗口关闭后执行方法
	 */
	closed() {
		this.output = '(closed) ' + this.selected;
	}

	dismissed() {
		this.output = '(dismissed)';
	}

	/**
	 * 窗口打开后执行方法
	 */
	opened() {
		if (this.type == 'add') {
			this.userFormComponent.selectOrg();
		}
	}

	closeForm(type: string) {
		if (this.selectedOrg) {
			if (type == 'add') {
				this.orgTreeComponent.activateNode(this.selectedOrg.c_id);
			} else if (type == 'edit') {
				this.orgTreeComponent.activateNode(this.selectedOrg.c_id);
			}
		}
		this.eTable.refresh();
		this.modal.close();
	}

	/**
	 * 添加用户
	 */
	openAddUser() {
		this.type = 'add';
		this.userFormComponent.resetUser();
		this.userFormTitle = '添加用户';
		this.modal.open();
	}

	/**
	 * 查看用户详细信息
	 * @param user
	 */
	viewUser(user: User) {
		this.userDetailComponent.user = user;
		this.userDetailModal.open();
	}

	/**
	 * 编辑用户
	 * @param user
	 */
	openEditUser(user: User) {
		this.type = 'edit';
		this.userFormComponent.resetUser();
		user.d_birthday = Sys.dateFormat(new Date(user.d_birthday), 'yyyy-MM-dd');

		for (let i = 0; i < user.userRoles.length; i++) {
			let userRole = user.userRoles[i];
			for (let j = 0; j < this.userFormComponent.roles.length; j++) {
				let r = this.userFormComponent.roles[j];
				if (r.c_id == userRole.c_id) {
					r.c_checked = true;
				}
			}
		}

		this.userFormComponent.user = JSON.parse(JSON.stringify(user));
		this.userFormComponent.orgTree.activateNode(user.c_org_id);
		this.userFormComponent.hasSelectRole = user.userRoles.length > 0 ? true : false;
		this.userFormComponent.enableLogin = user.access.n_valid ? true : false;
		this.userFormTitle = '编辑用户';
		this.modal.open();
	}

	/**
	 * 删除用户
	 * @param user
	 */
	deleteUser(user: User) {
		Sys.sysConfirm('确定要删除[' + user.c_name + ']用户吗？', () => {
			this.dataService.postData('auth/user/deleteUser.do', user).subscribe(
				(serverData) => {
					if (serverData.code == 'ok') {
						this.orgTreeComponent.activateNode(this.selectedOrg.c_id);
						this.eTable.refresh();
					} else {
						Sys.sysAlert(serverData.info);
					}
				},
				(error) => {
					Sys.sysAlert(error);
				}
			)
		});
	}

	resetPassword(user: User) {
		Sys.sysConfirm('确定要重置[' + user.c_name + ']用户的密码吗？', () => {
			let password: string = 'essence';
			user.access.c_password = Md5.hashStr(password).toString();
			this.dataService.postData('auth/user/updateAccessPasswordByAdmin.do', user.access).subscribe(
				(serverData) => {
					if (serverData.code == 'ok') {
						Sys.sysAlert(serverData.info + '初始密码为【' + password + '】请尽快修改初始密码！');
					} else {
						Sys.sysAlert(serverData.info);
					}
				},
				(error) => {
					Sys.sysAlert(error);
				}
			)
		});
	}

	/**
	 * 树节点选择事件
	 * @param $event
	 */
	treeClick($event: Org) {
		this.selectedOrg = $event;
		this.setOption();
	}

	/**
	 * 获取选中节点和子节点id
	 * @param org
	 * @returns {Array}
	 */
	getOrgIds(org: Org) {
		let result = [];
		result.push(org.c_id);
		for (let i = 0; i < org.children.length; i++) {
			result.push.apply(result, this.getOrgIds(org.children[i]));
		}
		return result;
	}

	/**
	 * 添加组织机构
	 * 调用子组件OrgTreeComponent的添加方法
	 */
	addOrg() {
		this.orgTreeComponent.addOrg();
	}

	deleteOrg() {
		this.orgTreeComponent.deleteOrg();
	}

	modifyOrg() {
		this.orgTreeComponent.modifyOrg();
	}
}
