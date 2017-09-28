/**
 * Created by Hllinc on 2016-11-11 20:13.
 */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Org } from '../../../../models/org';
import { Role } from '../../../../models/role';
import { User } from '../../../../models/user';
import { Subscription } from 'rxjs/Subscription';
import { OrgService } from '../../org.service';
import { ServerData } from '../../../../../../../../models/server-data.model';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
	@Input('selectedOrg') selectedOrg: Org = null;
	@Input() showOrg;

	@Output()
	close: EventEmitter<any> = new EventEmitter<any>();
	roles: Role[] = [];

	enableLogin: boolean = false;

	user: User = new User('', '', '0');


	constructor(private orgService: OrgService) {
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.user.id) {
			this.editUser();
		} else {
			this.user.unit = this.selectedOrg.data.id;
			this.addUser();
		}
	}

	cancel() {
		this.close.emit();
	}

	resetUser() {
		this.user = new User();
		for (let j = 0; j < this.roles.length; j++) {
			this.roles[j].c_checked = false;
		}
	}

	addUser() {
		// 初始化密码
		this.user.password = Md5.hashStr('essence') + '';
		const sub: Subscription = this.orgService.addSysUser(this.user).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.close.emit('add');
			}
		});
	}

	editUser() {
		const sub: Subscription = this.orgService.updateSysUser(this.user).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.close.emit('edit');
			}
		});
	}

	enableLoginEvent($event: any) {
		this.enableLogin = $event.target.checked;
	}
}
