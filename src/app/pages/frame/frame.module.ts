/**
 * Created by Hllinc on 2016-10-28 18:08.
 */

import { NgModule } from '@angular/core';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/primeng';

import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { CustomModule } from './pages/custom/custom.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		BrowserAnimationsModule,
		FrameRoutingModule,
		CustomModule,
		ConfirmDialogModule
	],
	declarations: [
		FrameComponent
	]
})

export class FrameModule {
}
