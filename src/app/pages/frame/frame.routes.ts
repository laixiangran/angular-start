/**
 * Created by Hllinc on 2016-10-28 18:02.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrameComponent } from './frame.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

const frameRoutes: Routes = [
    {
        path: 'frame',
        redirectTo: '/frame/home',
        pathMatch: 'full'
    },
    {
        path: 'frame',
        component: FrameComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent
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
