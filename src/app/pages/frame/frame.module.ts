/**
 * Created by Hllinc on 2016-10-28 18:08.
 */

import {NgModule} from "@angular/core";
import {JsonpModule, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {FrameRoutingModule} from "./frame.routes";
import {FrameComponent} from "./frame.component";
import {CommonModule} from "@angular/common";
import {SysModule} from "./sys/sys.module";
import {CustomModule} from "./custom/custom.module";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        FrameRoutingModule,
        SysModule,
        CustomModule
    ],
    declarations: [
        FrameComponent,
        HomeComponent
    ]
})

export class FrameModule {
}