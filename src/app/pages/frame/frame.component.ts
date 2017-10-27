import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService, MenuItem } from 'primeng/primeng';

@Component({
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, OnDestroy {
	title: string = environment.title;
	appDownloadUrl: string = environment.appDownloadUrl;
	scanCodeDialogDisplay: boolean = false;
	items: MenuItem[];

	constructor(public loginService: LoginService,
				public router: Router,
				public route: ActivatedRoute,
				public confirmationService: ConfirmationService,
				public messageService: MessageService,
				public elemRef: ElementRef,
				public renderer: Renderer2,
				public authService: AuthService) {}

	ngOnInit() {
		this.route.data.subscribe((data: any) => {
			if (data.currUserInfoLoaded) {
				console.log('当前用户有关信息预加载完成！');
			} else {
				console.error('当前用户有关信息未预加载完成，请检查！');
			}
		});

		this.items = [
			{
				label: '退出登录',
				icon: 'fa-sign-out',
				command: () => {
					this.logout();
				}
			}
		];

		this.renderer.addClass(this.elemRef.nativeElement.ownerDocument.body, 'frame-module');
	}

	ngOnDestroy() {
		this.renderer.removeClass(this.elemRef.nativeElement.ownerDocument.body, 'frame-module');
	}

	logout() {
		this.confirmationService.confirm({
			header: '系统提示',
			message: '确定退出系统？',
			accept: () => {
				this.loginService.logout().subscribe((data: any) => {
					if (data.status === 200) {
						this.authService.initParams();
						this.messageService.clear();
						this.router.navigate(['/login']);
					}
				}, (error: any) => {
					this.messageService.add({severity: 'error', summary: '系统消息', detail: '退出失败，请重试！'});
				});
			},
			reject: () => {
				this.messageService.add({severity: 'info', summary: '系统消息', detail: '您已取消退出系统！'});
			}
		});
	}

	/**
	 * 二维码显示/隐藏
	 */
	toggleScanCode() {
		this.scanCodeDialogDisplay = !this.scanCodeDialogDisplay;
	}

	/**
	 * 直接下载APP
	 */
	directDownload() {
		window.open(this.appDownloadUrl);
	}
}
