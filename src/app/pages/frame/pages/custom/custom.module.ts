/**
 * Created by Hllinc on 2016-10-28 14:04.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomRoutingModule } from './custom.routes';
import { CustomComponent } from './custom.component';
import { HomeComponent } from './pages/home/home.component';
import { EssenceNg2EsriMapModule } from 'essence-ng2-esrimap';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CustomRoutingModule,
		EssenceNg2EsriMapModule
	],
	declarations: [
		CustomComponent,
		HomeComponent
	]
})
export class CustomModule {
}
