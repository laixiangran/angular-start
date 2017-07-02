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
import { NormalDemoComponent } from '../../components/normal-demo/normal-demo.component';
import { ContentDemoComponent } from '../../components/content-demo/content-demo.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		FrameRoutingModule
	],
	declarations: [
		FrameComponent,
		HomeComponent,
		NormalDemoComponent,
		ContentDemoComponent
	]
})

export class FrameModule {
}
