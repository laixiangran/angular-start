/**
 * Created by laixiangran on 2016/8/15.
 * homepage：http://www.laixiangran.cn.
 */

import {Directive, ElementRef, OnInit, Input, Output, EventEmitter, OnDestroy} from "@angular/core";

@Directive({
    selector: "[essence-ng2-fileInput]"
})
export class EssenceNg2FileInputDirective implements OnInit, OnDestroy {
    private el: HTMLElement;
    private $el: JQuery;
    private defaultOpts: any = {
        language: "zh",
        // previewFileType: "any",
        showUpload: false,
        showPreview: true,
        showCaption: false,
        showClose: false,
        showCancel: false,
        showRemove: true,
        maxFileCount: 0,
        defaultPreviewContent: null,
        resizePreference: 'height',
        // uploadUrl: this.dataService.serverHost + "/auth/attachmentItemsAction/upload.do", //上传的地址
        // uploadExtraData: (previewId: any, index: any) => {
        // 	return {attachmentGroupId: this.selectedOrg.c_attachment};
        // },
        layoutTemplates: {
            actions: '<div class="file-actions">\n' +
            '    <div class="file-footer-buttons">\n' +
            '    </div>\n' +
            '</div>',
        },
        uploadAsync: false,
        browseClass: "btn btn-primary",
        fileType: "any",
        resizeImage: true,
        maxFileSize: 0,
        previewFileIcon: '<i class="fa fa-file"></i>',
        allowedPreviewTypes: ['image', 'html', 'video', 'audio', 'flash'], // set to empty, null or false to disable preview for all types
        previewFileIconSettings: {
            'doc': '<i class="fa fa-file-word-o text-primary"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'htm': '<i class="fa fa-file-code-o text-info"></i>',
            'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
            'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
            'txt': '<i class="fa fa-file-text text-info"></i>',
        },
        previewFileExtSettings: {
            'doc': function (ext) {
                return ext.match(/(doc|docx)$/i);
            },
            'xls': function (ext) {
                return ext.match(/(xls|xlsx)$/i);
            },
            'ppt': function (ext) {
                return ext.match(/(ppt|pptx)$/i);
            },
            'zip': function (ext) {
                return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
            },
            'htm': function (ext) {
                return ext.match(/(php|js|css|htm|html)$/i);
            },
            'txt': function (ext) {
                return ext.match(/(txt|ini|md)$/i);
            },
            'mov': function (ext) {
                return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
            },
            'mp3': function (ext) {
                return ext.match(/(mp3|wav)$/i);
            },
        }
    };

    @Input('essence-ng2-fileInput') fileInputOpts: any;

    @Output()
    ready: EventEmitter<any> = new EventEmitter<any>(false);

    @Output()
    fileuploaded: EventEmitter<any> = new EventEmitter<any>(false);

    @Output()
    fileuploaderror: EventEmitter<any> = new EventEmitter<any>(false);

    @Output()
    filebatchuploadcomplete: EventEmitter<any> = new EventEmitter<any>(false);

    @Output()
    filebatchuploaderror: EventEmitter<any> = new EventEmitter<any>(false);

    @Output()
    filebatchuploadsuccess: EventEmitter<any> = new EventEmitter<any>(false);

    constructor (el: ElementRef) {
        this.el = el.nativeElement;
        this.$el = $(this.el);
    }

    ngOnInit () {
        this.$el.fileinput($.extend(true, {}, this.defaultOpts, this.fileInputOpts));

        this.ready.emit(this);

        this.$el.on('fileuploaded', (event: any, data: any, previewId: any, index: any) => {
            this.fileuploaded.emit({
                event: event,
                data: data,
                previewId: previewId,
                index: index
            });
        });

        this.$el.on('fileuploaderror', (event: any, data: any, msg: any) => {
            this.fileuploaderror.emit({
                event: event,
                data: data,
                msg: msg
            });
        });

        this.$el.on('filebatchuploadcomplete', (event: any, data: any, previewId: any, index: any) => {
            this.filebatchuploadcomplete.emit({
                event: event,
                data: data,
                previewId: previewId,
                index: index
            });
        });

        this.$el.on('filebatchuploaderror', (event: any, data: any, msg: any) => {
            this.filebatchuploaderror.emit({
                event: event,
                data: data,
                msg: msg
            });
        });

        this.$el.on('filebatchuploadsuccess', (event: any, data: any, previewId: any, index: any) => {
            this.filebatchuploadsuccess.emit({
                event: event,
                data: data,
                previewId: previewId,
                index: index
            })
        });
    }

    ngOnDestroy () {
        this.destroy();
    }

    /**
     * 禁用
     */
    disable () {
        this.$el.fileinput('disable');
    }

    /**
     * 启用
     */
    enable () {
        this.$el.fileinput('enable');
    }

    /**
     * 重置
     */
    reset () {
        this.$el.fileinput('reset');
    }

    /**
     * 刷新
     */
    refresh () {
        this.$el.fileinput('refresh');
    }

    /**
     * 清空
     */
    clear () {
        this.$el.fileinput('clear');
    }

    /**
     * 销毁
     */
    destroy () {
        this.$el.fileinput('destroy');
    }

    /**
     * 上传
     */
    upload () {
        this.$el.fileinput('upload');
    }

    /**
     * 取消上传
     */
    cancel () {
        this.$el.fileinput('cancel');
    }
}