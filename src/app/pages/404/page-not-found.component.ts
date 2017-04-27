/**
 * Created by Hllinc on 2016-10-28 12:52.
 */
import {Component, OnInit} from '@angular/core';
import {setTimeout} from "timers";

@Component({
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent implements OnInit{
    constructor(){

    }
    ngOnInit(){
        // let timeOutId = window.setTimeout(() => {
        //     window.clearTimeout(timeOutId);
        //     history.back();
        // } ,5000)
    }
    pathname: string = location.pathname;
    href : string = this.pathname.split('/')[0]+'/frame/home';

    beforeUrl : string = document.referrer;

    //返回首页
    rtnHome () {
        location.href = this.href;
    }

    //刷新页面
    refreshPage () {
        location.reload();
    }
}
