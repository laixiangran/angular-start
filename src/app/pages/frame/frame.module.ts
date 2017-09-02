/**
 * Created by Hllinc on 2016-10-28 18:08.
 */

import { NgModule } from '@angular/core';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FrameRoutingModule } from './frame.routes';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule, InputTextModule, RatingModule } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		FrameRoutingModule,
		InputTextModule,
		ButtonModule,
		RatingModule
	],
	declarations: [
		FrameComponent,
		HomeComponent
	]
})

export class FrameModule {
}
