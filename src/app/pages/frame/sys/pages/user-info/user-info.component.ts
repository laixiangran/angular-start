import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {User} from "../../models/user";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {Sys} from "../../../../../utils/sys";
import {UserInfoService} from "./user-info.service";

@Component({
	selector: 'user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

	@ViewChild('passwordModal') passwordModal: ModalComponent;

	user: User;

	constructor(private authService: AuthService, private userInfoService: UserInfoService) {
		this.user = authService.getCurrentUser();
	}

	openPasswordForm() {
		this.passwordModal.open();
	}

	closePasswordForm(serverData: any) {
		this.passwordModal.close();
		if (serverData) {
			Sys.sysAlert(serverData.info);
		}
	}

	saveCurrentUser() {
		this.userInfoService.updateUserByCurrentUser(this.user).subscribe(
			(serverData) => {
				Sys.sysAlert(serverData.info);
			},
			(error) => {
				Sys.sysAlert(error);
			}
		)
	}

	ngOnInit() {

	}

}
