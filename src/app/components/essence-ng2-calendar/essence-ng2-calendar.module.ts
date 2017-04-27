/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {EssenceNg2CalendarComponent} from "./essence-ng2-calendar.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EssenceNg2CalendarComponent
    ],
    exports: [
        EssenceNg2CalendarComponent
    ]
})
export class EssenceNg2CalendarModule {
}