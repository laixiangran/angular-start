/**
 * Created by Hllinc on 2016-10-28 18:02.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const frameRoutes: Routes = [
	{
		path: 'frame',
		redirectTo: '/frame/custom/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(frameRoutes)
	],
	exports: [
		RouterModule
	]
})

export class FrameRoutingModule {
}
