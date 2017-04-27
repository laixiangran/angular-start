/**
 * Created by Hllinc on 2016-10-28 16:04.
 */
import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Sys} from "../../utils/sys";
import {ServerData} from "./sys/models/server-data";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Component({
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

    constructor (private loginService: LoginService,
                 private router: Router,
                 private authService: AuthService) {}

    ngOnInit () {}

    logout () {

        Sys.sysConfirm('是否退出系统！', () => {
            this.router.navigate(['/login']).then(() => {
                this.authService.initParams();
            });
        });

        // Sys.sysConfirm('是否退出系统！', () => {
        //     this.loginService.logout().subscribe((data: ServerData) => {
        //         if (data.code == 'ok') {
        //             this.router.navigate(['/login']).then(() => {
        //                 this.authService.initParams();
        //             });
        //         }
        //     });
        // });
    }
}