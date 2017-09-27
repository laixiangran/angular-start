import { NgModule } from '@angular/core';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/primeng';
import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		FrameRoutingModule,
		ConfirmDialogModule
	],
	declarations: [
		FrameComponent
	]
})

export class FrameModule {
}
