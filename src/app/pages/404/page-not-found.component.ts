/**
 * Created by Hllinc on 2016-10-28 12:52.
 */
import { Component, OnInit } from '@angular/core';
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
		this.router.navigate(['frame/home']);
	}

	// 刷新页面
	refresh() {
		location.reload();
	}
}
