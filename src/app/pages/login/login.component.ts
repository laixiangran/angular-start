/**
 * Created by Hllinc on 2016-10-28 15:25.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    access: any = {};

    constructor(public router: Router) {}

    login(): void {

        // 跳到主页
        this.router.navigate(['frame/home']);

        // this.loginService.login(this.access).subscribe((data: ServerData) => {
        //     if (data.code === 'ok') {
        //         this.authService.initParams(this.authService.redirectUrl, data.result).subscribe((data: boolean) => {
        //             if (data) {
        //                 if (this.authService.redirectUrl && this.authService.redirectUrl.indexOf('login') < 0) {
        //                     this.router.navigate([this.authService.redirectUrl]); // 跳转到登录前的页面
        //                 } else {
        //                     // 跳到主页
        //                     this.router.navigate(['frame/home']);
        //                 }
        //             } else {
        //                 this.router.navigate(['/login']);
        //             }
        //         });
        //     } else {
        //         Sys.sysAlert(data.info, '温馨提示');
        //     }
        // });
    }
}
