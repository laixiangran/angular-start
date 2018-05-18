import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	constructor(public elemRef: ElementRef,
				public router: Router,
				public route: ActivatedRoute,
				public title: Title,
				public renderer: Renderer2) {
		// 根据路由变化设置标题
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.route)
			.map(route1 => {
				while (route1.firstChild) {
					route1 = route1.firstChild;
				}
				return route1;
			})
			.filter(route2 => route2.outlet === 'primary')  // 过滤出未命名的outlet，<router-outlet>
			.mergeMap(route3 => route3.data)                // 获取路由配置数据
			.subscribe((event) => {
				this.title.setTitle(event.title); // 设置html标题
			});
	}

	ngOnInit() {
		this.renderer.addClass(this.elemRef.nativeElement.ownerDocument.body, 'app-module');
	}

	ngOnDestroy() {
		this.renderer.removeClass(this.elemRef.nativeElement.ownerDocument.body, 'app-module');
	}
}
