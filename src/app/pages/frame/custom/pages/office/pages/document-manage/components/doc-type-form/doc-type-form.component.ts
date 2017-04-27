import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DocType} from "../../models/docType";

@Component({
    selector: 'doc-type-form',
    templateUrl: './doc-type-form.component.html',
    styleUrls: ['./doc-type-form.component.scss']
})
export class DocTypeFormComponent implements OnInit {

    cancleText: string = '取消';
    confirmText: string = '确定';
    docType: DocType = new DocType('');
    // 取消事件
    @Output() cancle: EventEmitter<any> = new EventEmitter<any>(false);

    // 确定事件
    @Output() confirm: EventEmitter<any> = new EventEmitter<any>(false);

    constructor () {
    }

    ngOnInit () {
    }

    /**
     * 取消按钮点击事件
     */
    cancleHandler () {
        this.docType = new DocType('');
        this.cancle.emit();
    }

    /**
     *确定按钮点击事件
     */
    confirmHandler () {
        this.confirm.emit(this.docType);
    }
}
