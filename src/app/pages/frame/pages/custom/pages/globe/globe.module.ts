import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobeComponent } from './globe.component';
import { CesiumComponent } from './pages/cesium/cesium.component';
import { GlobeRoutingModule } from './globe.routes';
import { NgxCesiumModule } from 'ngx-cesium';
import { SelectButtonModule } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		GlobeRoutingModule,
		NgxCesiumModule,
		SelectButtonModule
	],
	declarations: [
		GlobeComponent,
		CesiumComponent
	]
})
export class GlobeModule {
}
