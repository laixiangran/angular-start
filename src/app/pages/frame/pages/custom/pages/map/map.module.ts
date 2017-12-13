import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map.routes';
import { ArcGISComponent } from './pages/arcgis/arcgis.component';
import { ENgxEsriMapModule } from 'e-ngx-esrimap';

@NgModule({
	imports: [
		CommonModule,
		MapRoutingModule,
		ENgxEsriMapModule
	],
	declarations: [
		MapComponent,
		ArcGISComponent
	]
})
export class MapModule {
}
