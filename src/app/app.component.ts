import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	constructor(public elemRef: ElementRef, public renderer: Renderer2) {
	}

	ngOnInit() {
		this.renderer.addClass(this.elemRef.nativeElement.ownerDocument.body, 'app-module');
	}

	ngOnDestroy() {
		this.renderer.removeClass(this.elemRef.nativeElement.ownerDocument.body, 'app-module');
	}
}
