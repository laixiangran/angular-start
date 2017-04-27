/**
 * Created by Hllinc on 2016-12-06 0006 11:19.
 */
import {Component, Input} from "@angular/core";
import {AuthService} from "../../../../../../../services/auth.service";
import {User} from "../../../../models/user";

@Component({
	selector: './user-detail',
	templateUrl: './user-detail.component.html'
})

export class UserDetailComponent {
	user: User = null;
	constructor(private authService: AuthService){
		if(!this.user){
			this.user = authService.getCurrentUser();
		}
	}
}
