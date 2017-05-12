/**
 * Created by Hllinc on 2016-10-28 14:04.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {TreeModule} from "angular-tree-component";

import {SysComponent} from "./sys.component";
import {SysRoutingModule} from "./sys.routes";
import {DatadictFormComponent} from "./pages/datadict/components/datadict-form/datadict-form.component";
import {DatadictTreeComponent} from "./pages/datadict/components/datadict-tree/datadict-tree.component";
import {DatadictService} from "./pages/datadict/datadict.service";
import {OrgFormComponent} from "./pages/org/components/org-form/org-form.component";
import {AttachmentService} from "./services/attachment.service";
import {UserDetailComponent} from "./pages/org/components/user-detail/user-detail.component";
import {EssenceNg2TableModule} from "../../../components/essence-ng2-table/essence-ng2-table.module";
import {OrgService} from "./pages/org/org.service";
import {EssenceNg2CheckedModule} from "../../../directives/essence-ng2-checked/essence-ng2-checked.module";
import {OrgComponent} from "./pages/org/org.component";
import {OrgTreeComponent} from "./pages/org/components/org-tree/org-tree.component";
import {UserFormComponent} from "./pages/org/components/user-form/user-form.component";
import {ResourceComponent} from "./pages/resource/resource.component";
import {ResourceFormComponent} from "./pages/resource/components/resource-form/resource-form.component";
import {ResourceTreeComponent} from "./pages/resource/components/resource-tree/resource-tree.component";
import {RoleComponent} from "./pages/role/role.component";
import {DatadictComponent} from "./pages/datadict/datadict.component";
import {LogComponent} from "./pages/log/log.component";
import {RoleService} from "./pages/role/role.service";
import {ResourceService} from "./pages/resource/resource.service";
import {EssenceNg2FileUploadModule} from 'essence-ng2-fileupload';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        SysRoutingModule,
        Ng2Bs3ModalModule,
        TreeModule,
        EssenceNg2CheckedModule,
        EssenceNg2TableModule,
        EssenceNg2FileUploadModule
    ],
    declarations:[
        SysComponent,
        OrgComponent,
        OrgTreeComponent,
        OrgFormComponent,
        UserFormComponent,
		UserDetailComponent,
        ResourceComponent,
        ResourceFormComponent,
        ResourceTreeComponent,
        RoleComponent,
        DatadictComponent,
        DatadictFormComponent,
        DatadictTreeComponent,
        LogComponent
    ],
    providers:[
        RoleService,
        ResourceService,
        DatadictService,
		AttachmentService,
        OrgService
    ],
    exports: [
        OrgTreeComponent
    ]
})

export class SysModule{}
