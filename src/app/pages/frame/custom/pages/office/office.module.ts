import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeComponent} from "./office.component";
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {OfficeRoutingModule} from "./office.routes";
import {DocumentManageComponent} from './pages/document-manage/document-manage.component';
import {ScheduleManageComponent} from './pages/schedule-manage/schedule-manage.component';
import {DocTypeFormComponent} from './pages/document-manage/components/doc-type-form/doc-type-form.component';
import {FormsModule} from "@angular/forms";
import {AddScheduleFormComponent} from './pages/schedule-manage/components/add-schedule-form/add-schedule-form.component';
import {SchedulesDetailTemplateComponent} from './pages/schedule-manage/components/schedules-detail-template/schedules-detail-template.component';
import {SysModule} from "../../../sys/sys.module";
import {DocFormComponent} from './pages/document-manage/components/doc-form/doc-form.component';
import {EssenceNg2TableModule} from "../../../../../components/essence-ng2-table/essence-ng2-table.module";
import {NoticeManageComponent} from "./pages/notice-manage/notice-manage.component";
import {MessageFormComponent} from "./pages/notice-manage/components/message-form/message-form.component";
import {EssenceNg2CalendarModule} from 'essence-ng2-calendar';
import {EssenceNg2EditorModule} from 'essence-ng2-editor';
import {EssenceNg2FileUploadModule} from 'essence-ng2-fileupload';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2Bs3ModalModule,
        OfficeRoutingModule,
        EssenceNg2CalendarModule,
        SysModule,
        EssenceNg2FileUploadModule,
        EssenceNg2TableModule,
        EssenceNg2EditorModule
    ],
    declarations: [
        OfficeComponent,
        NoticeManageComponent,
        MessageFormComponent,
        DocumentManageComponent,
        ScheduleManageComponent,
        DocTypeFormComponent,
        AddScheduleFormComponent,
        SchedulesDetailTemplateComponent,
        DocFormComponent
    ]
})
export class OfficeModule {
}
