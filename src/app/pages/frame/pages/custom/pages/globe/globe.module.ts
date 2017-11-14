import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobeComponent } from './globe.component';
import { CesiumComponent } from './pages/cesium/cesium.component';
import { GlobeRoutingModule } from './globe.routes';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		GlobeRoutingModule
	],
	declarations: [
		GlobeComponent,
		CesiumComponent
	]
})
export class GlobeModule {
}
