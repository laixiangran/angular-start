import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'normal-demo',
	templateUrl: './normal-demo.component.html',
	styleUrls: ['./normal-demo.component.scss']
})
export class NormalDemoComponent implements OnInit {

	@Input() content: string;

	@Output() ready: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
		this.ready.emit('normal-demo组件已经加载完成！');
	}

}
