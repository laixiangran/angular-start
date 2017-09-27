/**
 * Created by Hllinc on 2016-10-28 13:46.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomComponent } from './custom.component';
import { FrameComponent } from '../../frame.component';
import { AuthGuard } from '../../../../services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

const customRoutes: Routes = [
	{
		path: 'frame/custom',
		redirectTo: '/frame/custom/home',
		pathMatch: 'full'
	},
	{
		path: 'frame',
		component: FrameComponent,
		canActivateChild: [AuthGuard],
		resolve: {
			currUserResources: AuthGuard
		},
		children: [
			{
				path: 'custom',
				component: CustomComponent,
				children: [
					{
						path: 'home',
						component: HomeComponent
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(customRoutes)
	],
	exports: [
		RouterModule
	]
})

export class CustomRoutingModule {
}
