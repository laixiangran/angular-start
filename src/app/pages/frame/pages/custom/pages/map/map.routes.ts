import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map.component';
import { ArcGISComponent } from './pages/arcgis/arcgis.component';

const mapRoutes: Routes = [
	{
		path: '',
		component: MapComponent,
		children: [
			{
				path: 'arcgis',
				component: ArcGISComponent,
				data: {
					title: '地图开发'
				}
			},
			{
				path: '',
				redirectTo: 'arcgis',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(mapRoutes)
	],
	exports: [
		RouterModule
	]
})
export class MapRoutingModule {
}
