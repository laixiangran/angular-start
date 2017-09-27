import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

	constructor(public router: Router) {

	}

	// 返回首页
	goHome() {
		this.router.navigate(['/frame/custom/home']);
	}

	// 刷新页面
	refresh() {
		location.reload();
	}
}
