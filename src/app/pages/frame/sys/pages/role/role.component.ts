/**
 * Created by Hllinc on 2016-10-28 11:56.
 */
import {Component, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import {Role} from "../../models/role";
import {ServerData} from "../../models/server-data";
import {Sys} from "../../../../../utils/sys";
import {Roleresource} from "../../models/roleresource";

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

    constructor (private roleService: RoleService) {}

    ngOnInit (): void {
        this.getRoles();
    }

    /**
     * 获取所有角色
     */
    getRoles (): void {
        this.roleService.getRoles().subscribe(
            (serverData: ServerData) => {
                if (serverData.code === "ok") {
                    this.roles = <Role[]>serverData.result;
                } else {
                    Sys.sysAlert("查询失败！");
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        )
    }

    /**
     * 添加角色
     */
    addRole (): void {
        let role: Role = new Role('新角色', '这是新角色');
        this.roleService.addRole(role).subscribe(
            (serverData: ServerData) => {
                if (serverData.code === "ok") {
                    this.selectedRole = <Role>serverData.result;
                    this.getRoles();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        );
    }

    /**
     * 更新角色
     */
    updateRole (): void {
        this.roleService.updateRole(this.selectedRole).subscribe(
            (serverData: ServerData) => {
                if (serverData.code === "ok") {
                    this.getRoles();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        );
    }

    /**
     * 删除角色
     * @param role
     */
    deleteRole (role: Role): void {
        Sys.sysConfirm('确定删除【' + role.c_name + '】角色吗？', () => {
            this.roleService.deleteRole(role).subscribe(
                (serverData: ServerData) => {
                    if (serverData.code === "ok") {
                        this.getRoles();
                        this.selectedRole = null;
                    } else {
                        Sys.sysAlert(serverData.info);
                    }
                },
                (error) => {
                    Sys.sysAlert(error);
                }
            );
        });
    }

    /**
     * 选中角色
     * @param role
     */
    selectRole (role: Role): void {
        this.roleService.getRoleresource(role.c_id).subscribe(
            (serverData: ServerData) => {
                if (serverData.code === "ok") {
                    let roleresources: Array<Roleresource> = <Roleresource[]>serverData.result;
                    this.selectedRoleResource = [];
                    roleresources.forEach((roleresource) => {
                        this.selectedRoleResource.push(roleresource.c_resource_id);
                    });
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        );
        this.selectedRole = JSON.parse(JSON.stringify(role));
    }

    checkResource ($event): void {
        this.items = $event;
    }

    addRoleresource (): void {
        let obj: Object = {
            roleId: this.selectedRole.c_id,
            items: this.items
        };
        this.roleService.addRoleresource(obj).subscribe(
            (serverData: ServerData) => {
                Sys.sysAlert(serverData.info);
            },
            (error) => {
                Sys.sysAlert(error);
            }
        );
    }

    /**
     * ngFor追踪函数
     * @param index
     * @param role
     * @returns {string}
     */
    trackByRoles (index: number, role: Role): string {
        return role.c_id;
    }

    /**
     * 列表移上事件
     * @param cid
     */
    listMouseOn (cid: string): void {
        this.hoverButtonId = cid;
    }

    /**
     * 列表移出事件
     */
    listMouseLeave (): void {
        this.hoverButtonId = '';
    }
}
