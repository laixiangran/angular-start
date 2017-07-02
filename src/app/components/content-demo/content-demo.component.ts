import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'content-demo',
	templateUrl: './content-demo.component.html',
	styleUrls: ['./content-demo.component.scss']
})
export class ContentDemoComponent implements OnInit, AfterContentInit {

	@Input() content: string;

	@Output() ready: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	ngAfterContentInit() {
		this.ready.emit('content-demo组件已经加载完成！');
	}

}
