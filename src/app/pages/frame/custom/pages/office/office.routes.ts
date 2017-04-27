/**
 * Created by Hllinc on 2016-10-28 13:46.
 */
import {NgModule}  from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FrameComponent} from "../../../frame.component";
import {AuthGuard} from "../../../../../services/auth-guard.service";
import {CustomComponent} from "../../custom.component";
import {OfficeComponent} from "./office.component";
import {NoticeManageComponent} from "./pages/notice-manage/notice-manage.component";
import {DocumentManageComponent} from "./pages/document-manage/document-manage.component";
import {ScheduleManageComponent} from "./pages/schedule-manage/schedule-manage.component";

const OfficeRoutes: Routes = [
    {
        path: 'frame',
        component: FrameComponent,
        children: [
            {
                path: 'custom',
                component: CustomComponent,
                children: [
                    {
                        path: 'office',
                        component: OfficeComponent,
                        canActivateChild: [AuthGuard],
                        children: [
                            {
                                path: '',
                                component: NoticeManageComponent,
                            },
                            {
                                path: 'documentManage',
                                component: DocumentManageComponent
                            },
                            {
                                path: 'scheduleManage',
                                component: ScheduleManageComponent
                            },
                            {
                                path: 'noticeManage',
                                component: NoticeManageComponent
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(OfficeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OfficeRoutingModule {
}
