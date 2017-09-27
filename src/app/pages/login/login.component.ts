import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	access: any = {};

	constructor(public loginService: LoginService,
				public router: Router) {}

	login(): void {
		const access: any = {
			username: this.access.username,
			password: Md5.hashStr(this.access.password),
			remeberme: this.access.status
		};
		this.loginService.login(access).subscribe((serverData: any) => {
			if (serverData.status === 1 || serverData.status === -1 || serverData.status === 200) {
				localStorage.setItem(environment.tokenName, serverData.token);
				this.router.navigate(['/frame/custom/home']);
			} else if (serverData.status === -3) {
				console.error('用户不存在，请重试！', '温馨提示');
			} else if (serverData.status === -4) {
				console.error('密码错误，请重试！', '温馨提示');
			} else if (serverData.status === -5) {
				console.error('没有权限登录，请联系管理员！', '温馨提示');
			} else if (serverData.status === -6) {
				console.error('账户受保护，请联系管理员！', '温馨提示');
			}
		});
	}
}
