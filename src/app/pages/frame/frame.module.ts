import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';
import { ButtonModule, DialogModule, MenuModule, TieredMenuModule } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FrameRoutingModule,
		QRCodeModule,
		DialogModule,
		TieredMenuModule,
		ButtonModule
	],
	declarations: [
		FrameComponent
	]
})

export class FrameModule {
}
