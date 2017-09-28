/**
 * Created by Hllinc on 2016-10-28 13:46.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SysComponent } from './sys.component';
import { LogComponent } from './pages/log/log.component';
import { OrgComponent } from './pages/org/org.component';
import { DatadictComponent } from './pages/datadict/datadict.component';
import { RoleComponent } from './pages/role/role.component';
import { ResourceComponent } from './pages/resource/resource.component';

const sysRoutes: Routes = [
	{
		path: '',
		component: SysComponent,
		children: [
			{
				path: 'org',
				component: OrgComponent
			}, {
				path: 'resource',
				component: ResourceComponent
			}, {
				path: 'role',
				component: RoleComponent
			}, {
				path: 'datadict',
				component: DatadictComponent
			}, {
				path: 'log',
				component: LogComponent
			},
			{
				path: '',
				redirectTo: 'org',
				pathMatch: 'full',
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(sysRoutes)
	],
	exports: [
		RouterModule
	]
})
export class SysRoutingModule {
}
