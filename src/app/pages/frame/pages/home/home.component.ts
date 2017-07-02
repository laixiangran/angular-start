import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [HomeService]
})

export class HomeComponent implements OnInit, OnDestroy {

	constructor() {
	}

	ngOnInit() {
	}

	ngOnDestroy() {
	}

	onReady(evt: any) {
		console.log(evt);
	}
}
