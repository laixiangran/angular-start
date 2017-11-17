import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { ButtonModule, DialogModule, TieredMenuModule } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FrameRoutingModule,
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
