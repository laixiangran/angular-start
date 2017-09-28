/**
 * Created by Hllinc on 2016-10-28 11:47.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { Md5 } from 'ts-md5/dist/md5';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { OrgTreeComponent } from './components/org-tree/org-tree.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { User } from '../../models/user';
import { Org } from '../../models/org';
import { EssenceNg2TableComponent } from 'essence-ng2-table';
import { OrgService } from './org.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../../../../../../services/request.service';
import { environment } from '../../../../../../../environments/environment';
import { ServerData } from '../../../../../../models/server-data.model';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	templateUrl: './org.component.html'
})

export class OrgComponent implements OnInit {
	@ViewChild(OrgTreeComponent) private orgTreeComponent: OrgTreeComponent;
	@ViewChild(UserFormComponent) private userFormComponent: UserFormComponent;
	@ViewChild(UserDetailComponent) private userDetailComponent: UserDetailComponent;
	@ViewChild('eTable') private eTable: EssenceNg2TableComponent;

	// 弹出窗口属性配置
	userFormTitle: string;
	@ViewChild('modal') modal: ModalComponent;
	@ViewChild('userDetailModal') userDetailModal: ModalComponent;
	@ViewChild('passwordModal') passwordModal: ModalComponent;
	@ViewChild('unitEmpowerModal') unitEmpowerModal: ModalComponent;
	@ViewChild('userEmpowerModal') userEmpowerModal: ModalComponent;
	selected: string;
	output: string;
	index: number = 0;
	cssClass: string = '';

	animation: boolean = true;
	keyboard: boolean = true;
	backdrop: string | boolean = true;
	css: boolean = false;

	// 选中的组织机构
	selectedOrg: Org;
	type: string = 'add';
	option: any = {};
	userListData: Array<any> = []; // 组织下的用户列表数据
	showTable: string = 'essenceTable'; // 当前显示的表格
	curUser: any = {
		id: '',
		password: '',
		confirmPassword: ''
	};
	rolesData: any;
	rolesList: any[] = [];
	showRole: boolean = false; // 显示角色列表与否
	showOrg: boolean = false; // 用户表单的组织机构显示与否
	showAddUserBtn: boolean = false; // 添加用户按钮显示与否
	empowerUser: any;

	constructor(private requestService: RequestService,
				private confirmationService: ConfirmationService,
				private orgService: OrgService) {
		this.setOption();
	}

	ngOnInit() {
		// 获取角色资源
		const sub = this.orgService.getRoleData().subscribe(
			(res: ServerData) => {
				if (res.code === 'ok') {
					this.rolesData = res.result;
					sub.unsubscribe();
				}
			});
	}

	setOption() {
		this.option = {
			serverParam: {
				serverUrl: environment.domain + '/SysUserAction/getUserListPage',
				token: localStorage.getItem(environment.tokenName)
			},
			columns: {
				primaryKey: 'id', // （一般要配置，如果错了rowSelect事件会失效）
				items: [{
					label: '登陆名',
					colName: 'name',
					render: (value) => {
						return value ? value : '/'
					}
				}, {
					label: '姓名',
					colName: 'realName',
					render: (value) => {
						return value ? value : '/'
					}
				}, {
					label: '性别',
					colName: 'sex',
					render: (value) => {
						return value === 0 ? '男' : '女';
					}
				}, {
					label: '邮箱',
					colName: 'email',
					render: (value) => {
						return value ? value : '/'
					}
				}, {
					label: '电话',
					colName: 'tel',
					render: (value) => {
						return value ? value : '/'
					}
				}, {
					label: '操作',
					colName: null,
					width: 300,
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
							this.curUser = {
								id: obj.id,
								password: '',
								confirmPassword: ''
							};
							this.passwordModal.open();
						}
					}, {
						text: '授权',
						type: 'button',
						cls: 'btn-xs btn-success',
						event: (obj) => {
							this.empower('user', obj)
							// this.resetPassword(obj);
						}
					}]
				}]
			}
		};
	}

	refresh() {
		this.eTable.refresh();
	}

	/**
	 * 树节点选择事件
	 * @param $event
	 */
	treeClick($event: Org) {
		this.selectedOrg = $event;
		if (this.selectedOrg.id === '1') {
			this.showTable = 'essenceTable';
			this.showAddUserBtn = false;
			this.setOption();
		} else {
			this.showTable = 'listTable';
			this.showAddUserBtn = true;
			this.getUserList(this.selectedOrg.id);
		}
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
		if (this.type === 'add') {
			// this.userFormComponent.selectOrg();
		}
	}

	closeForm(type: string) {
		if (this.showTable === 'essenceTable') {
			this.eTable.refresh();
		} else {
			this.getUserList(this.selectedOrg.id);
		}
		this.modal.close();
	}

	/**
	 * 添加用户
	 */
	openAddUser() {
		this.showOrg = true;
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
		this.showOrg = false;
		this.userFormComponent.resetUser();
		this.userFormComponent.user = JSON.parse(JSON.stringify(user));
		this.userFormTitle = '编辑用户';
		this.modal.open();
	}

	/**
	 * 删除用户
	 * @param user
	 */
	deleteUser(user: User) {
		this.confirmationService.confirm({
			header: '系统提示',
			message: `确定删除 【${user.realName}】用户吗？`,
			accept: () => {
				const sub: Subscription = this.orgService.deleteSysUser(user).subscribe(
					(serverData: ServerData) => {
						sub.unsubscribe();
						if (serverData.code === 'ok') {
							if (this.showTable === 'essenceTable') {
								this.eTable.refresh();
							} else {
								this.getUserList(this.selectedOrg.id);
							}
						}
					});
			},
			reject: () => {}
		});
	}

	resetPassword(obj) {
		this.curUser = {
			id: obj.id,
			password: '',
			confirmPassword: ''
		};
		this.passwordModal.open();
	}

	/**
	 * 重置密码
	 * @param user
	 */
	resetPasswordSubmit() {
		const pass: any = {
			id: this.curUser.id,
			password: Md5.hashStr(this.curUser.password).toString()
		};
		const sub: Subscription = this.orgService.resetPassword(pass).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.confirmationService.confirm({
					header: '系统提示',
					message: `密码重置成功！`,
					accept: () => {}
				});
				this.passwordModal.close();
			}
		})
	}

	/**
	 * 授权按钮点击事件
	 */
	empower(role, obj) {
		this.rolesList = [];
		this.showRole = false;
		if (role === 'org') {
			this.rolesData.forEach((it, i) => {
				this.rolesData[i].checked = false;
			});
			const sub = this.orgService.getUnitRoleData({c_unitid: this.selectedOrg.id}).subscribe(
				(res: ServerData) => {
					if (res.code === 'ok') {
						if (res.result.length > 0) {
							res.result.forEach((item) => {
								this.rolesList.push(item.roleid);
								this.rolesData.forEach((ite, i) => {
									if (item.roleid === ite.id) {
										this.rolesData[i].checked = true;
									}
								})
							});
						}
						this.showRole = true; // 重新生成角色列表dom
						this.unitEmpowerModal.open();
						sub.unsubscribe();
					}
				});
		} else {
			this.empowerUser = JSON.parse(JSON.stringify(obj));
			this.rolesData.forEach((it, i) => {
				this.rolesData[i].checked = false;
				this.rolesData[i].disabled = false;
			});
			const subone = this.orgService.getUnitRoleData({c_unitid: obj.unit}).subscribe(
				(res) => {
					if (res.code === 'ok') {
						if (res.result.length > 0) {
							res.result.forEach((item) => {
								this.rolesData.forEach((ite, i) => {
									if (item.roleid === ite.id) {
										this.rolesData[i].checked = true;
										this.rolesData[i].disabled = true;
									}
								})
							});
						}
						const subtwo = this.orgService.getUserRoleData({c_userid: obj.id}).subscribe(
							(serverData) => {
								if (serverData.code === 'ok') {
									if (serverData.result.length > 0) {
										serverData.result.forEach((item) => {
											this.rolesList.push(item.roleid);
											this.rolesData.forEach((ite, i) => {
												if (item.roleid === ite.id) {
													this.rolesData[i].checked = true;
												}
											})
										});
									}
								}
								this.showRole = true; // 重新生成角色列表dom
								this.userEmpowerModal.open();
								subtwo.unsubscribe();
								subone.unsubscribe();
							}
						)
					}
				});
		}
	}

	/**
	 * 选择要授权的角色
	 */
	chooseRole(role, $event) {
		if ($event.target.checked) {
			this.rolesList.push(role.id);
		} else {
			this.rolesList.forEach((item, i) => {
				if (item === role.id) {
					this.rolesList.splice(i, 1);
				}
			})
		}
	}

	/**
	 * 授权表单提交
	 */
	empowerSubmit(type) {
		if (type === 'unit') {
			const sub = this.orgService.addUnitRole({unitid: this.selectedOrg.data.id, items: this.rolesList}).subscribe(
				(res: ServerData) => {
					if (res.code === 'ok') {
						this.rolesList = [];
						this.unitEmpowerModal.close();
						// Sys.sysAlert('授权成功！');
						sub.unsubscribe();
					}
				});
		} else {
			const sub = this.orgService.addUserRole({userid: this.empowerUser.id, items: this.rolesList}).subscribe(
				(res: ServerData) => {
					if (res.code === 'ok') {
						this.rolesList = [];
						this.userEmpowerModal.close();
						// Sys.sysAlert('授权成功！');
						sub.unsubscribe();
					}
				});
		}
	}

	/**
	 * 根据组织机构id查询用户
	 * @param orgId
	 */
	getUserList(orgId) {
		const sub = this.orgService.getUsersByOrgId(orgId).subscribe((res) => {
			if (res.code === 'ok') {
				this.userListData = res.result;
				sub.unsubscribe();
			}
		})
	}

	/**
	 * 获取选中节点和子节点id
	 * @param org
	 * @returns {Array}
	 */
	getOrgIds(org: any) {
		const result = [];
		result.push(org.id);
		if (org.children) {
			for (let i = 0; i < org.children.length; i++) {
				result.push.apply(result, this.getOrgIds(org.children[i]));
			}
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
