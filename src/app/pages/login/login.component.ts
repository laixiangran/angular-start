import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	access: any = {};
	isaffirm: boolean = false;

	constructor(public loginService: LoginService,
				public authService: AuthService,
				public messageService: MessageService,
				public router: Router) {}

	login(): void {
		const access: any = {
			username: this.access.username,
			password: Md5.hashStr(this.access.password),
			remeberme: this.access.status
		};
		this.loginService.login(access).subscribe((serverData: any) => {
			if (serverData.status === 1 || serverData.status === -1 || serverData.status === 200) {
				this.messageService.clear();
				this.authService.setToken(serverData.token);
				this.router.navigate(['/frame/custom/home']);
			} else if (serverData.status === -3) {
				this.messageService.add({
					severity: 'error',
					summary: '系统消息',
					detail: '用户不存在，请重试！'
				});
			} else if (serverData.status === -4) {
				this.messageService.add({
					severity: 'error',
					summary: '系统消息',
					detail: '密码错误，请重试！'
				});
			} else if (serverData.status === -5) {
				this.messageService.add({
					severity: 'error',
					summary: '系统消息',
					detail: '没有权限登录，请联系管理员！'
				});
			} else if (serverData.status === -6) {
				this.messageService.add({
					severity: 'error',
					summary: '系统消息',
					detail: '账户受保护，请联系管理员！'
				});
			}
		});
	}

	selectAffirm() {
		this.isaffirm = !this.isaffirm;
	}
}
