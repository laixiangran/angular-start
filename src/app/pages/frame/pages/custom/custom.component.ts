import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
	templateUrl: './custom.component.html',
	styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit, OnDestroy {

	constructor(public elemRef: ElementRef, public renderer: Renderer2) {
	}

	ngOnInit() {
		this.renderer.addClass(this.elemRef.nativeElement.ownerDocument.body, 'custom-module');
	}

	ngOnDestroy() {
		this.renderer.removeClass(this.elemRef.nativeElement.ownerDocument.body, 'custom-module');
	}
}
