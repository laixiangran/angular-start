import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/404/page-not-found.component';


const appRoutes: Routes = [
	{
		path: 'login',
		canActivate: [AuthGuard],
		component: LoginComponent
	},
	{
		path: 'frame',
		loadChildren: './pages/frame/frame.module#FrameModule'
	},
	{
		path: '',
		redirectTo: 'frame',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {
}
