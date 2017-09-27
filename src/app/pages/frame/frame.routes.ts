import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './frame.component';
import { AuthGuard } from '../../services/auth-guard.service';

const frameRoutes: Routes = [
	{
		path: '',
		component: FrameComponent,
		canActivateChild: [AuthGuard],
		resolve: {
			currUserResources: AuthGuard
		},
		children: [
			{
				path: 'custom',
				loadChildren: './pages/custom/custom.module#CustomModule',
			},
			{
				path: '',
				redirectTo: 'custom',
				pathMatch: 'full',
			}
		]
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
