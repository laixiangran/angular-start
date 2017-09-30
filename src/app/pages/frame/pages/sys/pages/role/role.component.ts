/**
 * Created by Hllinc on 2016-10-28 11:56.
 */
import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { Role } from '../../models/role';
import { Roleresource } from '../../models/roleresource';
import { Subscription } from 'rxjs/Subscription';
import { ServerData } from '../../../../../../models/server-data.model';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
	roles: Role[];
	selectedRole: Role = null;
	selectedRoleResource: Array<string> = [];
	hoverButtonId: string;
	items: Array<string>;

	constructor(private roleService: RoleService, private confirmationService: ConfirmationService) {
	}

	ngOnInit(): void {
		this.getRoles();
	}

	/**
	 * 获取所有角色
	 */
	getRoles(): void {
		const sub: Subscription = this.roleService.getRoles().subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.roles = <Role[]>serverData.result;
			}
		});
	}

	/**
	 * 添加角色
	 */
	addRole(): void {
		const role: Role = new Role('新角色', '这是新角色');
		this.roleService.addRole(role).subscribe((serverData: ServerData) => {
			if (serverData.code === 'ok') {
				this.selectedRole = <Role>serverData.result;
				this.getRoles();
			}
		});
	}

	/**
	 * 更新角色
	 */
	updateRole(): void {
		this.roleService.updateRole(this.selectedRole).subscribe((serverData: ServerData) => {
			if (serverData.code === 'ok') {
				this.getRoles();
			}
		});
	}

	/**
	 * 删除角色
	 * @param role
	 */
	deleteRole(role: Role): void {
		this.confirmationService.confirm({
			header: '系统提示',
			message: `确定删除 【${role.rolenm}】角色吗？`,
			acceptVisible: true,
			accept: () => {
				this.roleService.deleteRole(role).subscribe((serverData: ServerData) => {
					if (serverData.code === 'ok') {
						this.getRoles();
						this.selectedRole = null;
					}
				});
			},
			rejectVisible: true,
			reject: () => {}
		});
	}

	/**
	 * 选中角色
	 * @param role
	 */
	selectRole(role: Role): void {
		this.roleService.getRoleresource(role.id).subscribe((serverData: ServerData) => {
			if (serverData.code === 'ok') {
				this.selectedRoleResource = [];
				if (serverData.result.length !== 0) {
					const roleresources: Array<Roleresource> = <Roleresource[]>serverData.result;
					roleresources.forEach((data) => {
						this.selectedRoleResource.push(data.resourceId);
					});
				}
				this.selectedRole = JSON.parse(JSON.stringify(role));
			}
		});
	}

	checkResource($event): void {
		this.items = $event;
	}

	addRoleresource(): void {
		const obj: Object = {
			roleId: this.selectedRole.id,
			items: this.items
		};
		this.roleService.addRoleresource(obj).subscribe((serverData: ServerData) => {});
	}

	/**
	 * ngFor追踪函数
	 * @param index
	 * @param role
	 * @returns {string}
	 */
	trackByRoles(index: number, role: Role): string {
		return role.id;
	}

}
