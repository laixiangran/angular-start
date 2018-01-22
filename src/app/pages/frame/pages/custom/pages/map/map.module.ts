import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map.routes';
import { ArcGISComponent } from './pages/arcgis/arcgis.component';
import { EssenceNg2EsriMapModule } from 'essence-ng2-esrimap';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MapRoutingModule,
		EssenceNg2EsriMapModule
	],
	declarations: [
		MapComponent,
		ArcGISComponent
	]
})
export class MapModule {
}
