/**
 * Created by Hllinc on 2016-10-28 15:25.
 */
import {Component} from "@angular/core";
import {Md5} from "ts-md5/dist/md5";

import {LoginService} from "./login.service";
import {ServerData} from "../frame/sys/models/server-data";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Sys} from "../../utils/sys";
import {Access} from "../frame/sys/models/access";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    access: Access = new Access();

    constructor (public router: Router) {}

    login (): void {

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