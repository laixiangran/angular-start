/**
 * Created by Hllinc on 2016-10-28 14:04.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {CustomRoutingModule} from "./custom.routes";
import {CustomComponent} from "./custom.component";

import {OfficeModule} from "./pages/office/office.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomRoutingModule,
        OfficeModule
    ],
    declarations: [
        CustomComponent
    ]
})

export class CustomModule {
}
