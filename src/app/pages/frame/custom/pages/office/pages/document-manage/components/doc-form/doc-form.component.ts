import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {DataService} from "../../../../../../../../../services/data.service";

@Component({
    selector: 'doc-form',
    templateUrl: './doc-form.component.html',
    styleUrls: ['./doc-form.component.scss']
})
export class DocFormComponent implements OnInit {
    @Input() selectedType;
    @Output() cancle:EventEmitter<any> = new EventEmitter<any>(false);
    @Output() confirm:EventEmitter<any> = new EventEmitter<any>(false);
    fileInputOpts: any = {
        uploadUrl: this.dataService.serverHost + "auth/attachmentItems/upload.do", //上传的地址
        uploadExtraData: (previewId: any, index: any) => {
            return {attachmentGroupId:this.selectedType};
        }
    };
    fileInput: any;

    constructor (private dataService: DataService) { }

    ngOnInit () {
    }

    /**
     * fileInput初始化完成后
     * @param $event
     */
    fileInputReady ($event: any) {
        this.fileInput = $event;
    }

    /**
     * 附件上传成功后
     * @param $event
     */
    filebatchuploadsuccess ($event: any) {
        this.confirm.emit();
        this.fileInput.clear();
    }

    /**
     *取消按钮点击事件
     */
    cancleHandler () {
        this.fileInput.clear();
        this.cancle.emit();
    }
    /**
     * 确定按钮点击事件
     */
    confirmHandler () {
        this.fileInput.upload();
    }
}
