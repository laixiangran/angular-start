/**
 * Created by Hllinc on 2016-10-28 13:46.
 */
import {NgModule}  from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SysComponent} from "./sys.component";
import {AuthGuard} from "../../../services/auth-guard.service";
import {FrameComponent} from "../../frame/frame.component";
import {OrgComponent} from "./pages/org/org.component";
import {ResourceComponent} from "./pages/resource/resource.component";
import {RoleComponent} from "./pages/role/role.component";
import {DatadictComponent} from "./pages/datadict/datadict.component";
import {LogComponent} from "./pages/log/log.component";

const sysRoutes: Routes = [
    {
        path: 'frame/sys',
        redirectTo: '/frame/sys/org',
        pathMatch: 'full'
    },
    {
        path: 'frame',
        component: FrameComponent,
        children: [
            {
                path: 'sys',
                component: SysComponent,
                canActivateChild: [AuthGuard],
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
                    }
                ]
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