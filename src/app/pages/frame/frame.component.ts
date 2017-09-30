import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { environment } from '../../../environments/environment';
import { ConfirmationService } from 'primeng/primeng';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
	title: string = environment.title;
	appDownloadUrl: string = environment.appDownloadUrl;
	@ViewChild('scanCodeModal') scanCodeModal: ModalComponent;

	constructor(public loginService: LoginService,
				public router: Router,
				public route: ActivatedRoute,
				public confirmationService: ConfirmationService,
				public authService: AuthService) {}

	ngOnInit() {
		this.route.data.subscribe((data: any) => {
			if (data.currUserInfoLoaded) {
				console.log('当前用户有关信息预加载完成！');
			} else {
				console.error('当前用户有关信息未预加载完成，请检查！');
			}
		});
	}

	logout() {
		this.confirmationService.confirm({
			header: '系统提示',
			message: '是否退出系统？',
			acceptVisible: true,
			accept: () => {
				this.loginService.logout().subscribe((data: any) => {
					if (data.status === 200) {
						this.authService.initParams();
						this.router.navigate(['/login']);
					}
				}, (error: any) => {
					console.error(error);
				});
			},
			rejectVisible: true,
			reject: () => {
				console.log('取消退出！');
			}
		});
	}

	scanCode() {
		this.scanCodeModal.open('lg');
	}
}
