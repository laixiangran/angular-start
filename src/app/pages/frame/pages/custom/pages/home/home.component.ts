import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [HomeService]
})
export class HomeComponent {

	welcomeMessage: string = 'Welcome to Angular World!';

	constructor() {
	}
}
