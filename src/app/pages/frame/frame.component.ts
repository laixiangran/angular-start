/**
 * Created by Hllinc on 2016-10-28 16:04.
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

	constructor(public loginService: LoginService,
				public router: Router,
				public authService: AuthService) {
	}

	ngOnInit() {
	}

	logout() {
		this.authService.initParams();
		this.router.navigate(['login']);
	}
}
