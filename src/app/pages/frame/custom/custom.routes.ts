/**
 * Created by Hllinc on 2016-10-28 13:46.
 */
import {NgModule}  from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "../../../services/auth-guard.service";
import {CustomComponent} from "./custom.component";
import {FrameComponent} from "../frame.component";
import {OfficeComponent} from './pages/office/office.component';

const customRoutes: Routes = [
    {
        path: 'frame/custom',
        redirectTo: '/frame/custom/userInfo',
        pathMatch: 'full'
    },
    {
        path: 'frame',
        component: FrameComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'custom',
                component: CustomComponent,
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'office',
                        component: OfficeComponent
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
