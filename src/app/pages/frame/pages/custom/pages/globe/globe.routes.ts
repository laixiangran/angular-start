import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobeComponent } from './globe.component';
import { CesiumComponent } from './pages/cesium/cesium.component';

const globeRoutes: Routes = [
	{
		path: '',
		component: GlobeComponent,
		children: [
			{
				path: 'cesium',
				component: CesiumComponent
			},
			{
				path: '',
				redirectTo: 'cesium',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(globeRoutes)
	],
	exports: [
		RouterModule
	]
})
export class GlobeRoutingModule {
}
