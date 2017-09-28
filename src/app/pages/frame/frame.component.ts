import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { environment } from '../../../environments/environment';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss'],
	providers: [ConfirmationService]
})
export class FrameComponent implements OnInit {
	title: string = environment.title;

	constructor(public loginService: LoginService,
				public router: Router,
				public confirmationService: ConfirmationService,
				public authService: AuthService) {}

	ngOnInit() {
	}

	logout() {
		this.confirmationService.confirm({
			header: '系统提示',
			message: '是否退出系统？',
			accept: () => {
				this.loginService.logout().subscribe(() => {});
				localStorage.removeItem(environment.tokenName);
				this.router.navigate(['/login']);
			},
			reject: () => {
				console.log('取消退出！');
			}
		});
	}
}
