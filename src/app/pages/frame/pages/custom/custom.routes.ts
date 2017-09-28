import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponent } from './custom.component';
import { HomeComponent } from './pages/home/home.component';

const customRoutes: Routes = [
	{
		path: '',
		component: CustomComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
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
