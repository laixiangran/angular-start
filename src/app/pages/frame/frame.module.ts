import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FrameRoutingModule,
		QRCodeModule,
		Ng2Bs3ModalModule,
	],
	declarations: [
		FrameComponent
	]
})

export class FrameModule {
}
