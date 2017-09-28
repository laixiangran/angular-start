import { Component } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../../../../../../services/auth.service';

@Component({
	selector: './user-detail',
	templateUrl: './user-detail.component.html'
})

export class UserDetailComponent {
	user: User = null;

	constructor(private authService: AuthService) {
		if (!this.user) {

			this.user = authService.user;
		}
	}
}
