/**
 * Created by laixiangran on 2016/9/29.
 * homepage：http://www.laixiangran.cn.
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {EssenceNg2PagerComponent} from './essence-ng2-pager.component';
import {EssenceNg2PaginationComponent} from './essence-ng2-pagination.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [EssenceNg2PagerComponent, EssenceNg2PaginationComponent],
    exports: [FormsModule, EssenceNg2PagerComponent, EssenceNg2PaginationComponent]
})
export class EssenceNg2PaginationModule {
}
