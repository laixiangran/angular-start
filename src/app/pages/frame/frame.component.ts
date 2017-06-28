/**
 * Created by Hllinc on 2016-10-28 16:04.
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Sys } from '../../utils/sys';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

	constructor(public loginService: LoginService,
				public router: Router,
				public authService: AuthService) {}

	ngOnInit() {}

	logout() {

		Sys.sysConfirm('是否退出系统！', () => {
			this.router.navigate(['/login']).then(() => {
				this.authService.initParams();
			});
		});

		// Sys.sysConfirm('是否退出系统！', () => {
		//     this.loginService.logout().subscribe((data: ServerData) => {
		//         if (data.code == 'ok') {
		//             this.router.navigate(['/login']).then(() => {
		//                 this.authService.initParams();
		//             });
		//         }
		//     });
		// });
	}
}
