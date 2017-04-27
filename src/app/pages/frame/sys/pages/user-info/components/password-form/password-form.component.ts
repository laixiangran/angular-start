import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Md5} from "ts-md5/dist/md5";
import {Access} from "../../../../models/access";
import {AuthService} from "../../../../../../../services/auth.service";
import {UserInfoService} from "../../user-info.service";
import {Sys} from "../../../../../../../utils/sys";

@Component({
	selector: 'password-form',
	templateUrl: './password-form.component.html',
	styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
	@Output()
	close: EventEmitter<any> = new EventEmitter<any>();
	a: Access;

	oldPasswordValid: boolean = true;
	confirmPasswordValid: boolean = true;

	newAccess: any = {
		c_old_password: '',
		c_new_password: '',
		c_confirm_password: ''
	};

	constructor(private authService: AuthService, private userInfoService: UserInfoService) {
		this.a = authService.getCurrentUser().access;
	}

	ngOnInit() {
	}

	closeForm() {
		this.close.emit();
	}

	onSubmit() {
		this.oldPasswordValid = true;
		this.confirmPasswordValid = true;
		let oldPassword: string = this.newAccess.c_old_password;
		if (Md5.hashStr(oldPassword) != this.a.c_password) {
			this.oldPasswordValid = false;
		} else if (this.newAccess.c_new_password != this.newAccess.c_confirm_password) {
			this.confirmPasswordValid = false;
		}else {
			this.a.c_password = Md5.hashStr(this.newAccess.c_new_password) + '';
			this.userInfoService.updatePasswordByCurrentUser(this.a).subscribe(
				(serverData) => {
					this.close.emit(serverData);
				},
				(error) => {
					this.close.emit();
					Sys.sysAlert(error);
				}
			);
		}
	}

}
