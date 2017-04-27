# essence-ng2-fileInput v1.0.0

This is a bootstrap-fileinput directive for Angular.

## 依赖
```json
{
  "typescript": ">=2.0.3",
  "angular2": ">=2.2.1",
  "bootstrap": "3.x",
  "jquery": "Latest",
  "bootstrap-fileinput": ">=4.3.4"
}
```

[bootstrap-fileinput: http://plugins.krajee.com/file-input](http://plugins.krajee.com/file-input)

## 用法

### index.html引入UEditor
```html
// css
<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/css/fileinput.min.css" rel="stylesheet">

// script
<script src="http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/js/plugins/canvas-to-blob.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/js/plugins/sortable.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/js/plugins/purify.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/js/fileinput.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/themes/fa/theme.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-fileinput/4.3.5/js/locales/zh.js"></script>
```

### module中导入
```typescript
import {EssenceNg2FileInputModule} from "../directives/essence-ng2-fileInput";
@NgModule({
    imports: [
        EssenceNg2FileInputModule
    ]
})
```

### template中使用
```html
<input id="pic_file" type="file" class="file" name="pic_file" multiple
       [essence-ng2-fileInput]="fileInputOpts"
       (ready)="ready($event)"
       (filebatchuploadcomplete)="filebatchuploadcomplete($event)"
       (filebatchuploaderror)="filebatchuploaderror($event)"
       (fileuploaded)="fileuploaded($event)"
       (fileuploaderror)="fileuploaderror($event)">
```

### 对应的component
```typescript
fileInputOpts: any = {
    uploadUrl: "/App/Goods/UploadImges",
    uploadAsync: true,
    language: "zh",
    showCaption: false,
    showRemove: false,
    showPreview: true,
    previewFileType: "image",
    browseLabel: "选择图片",
    browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i>",
    uploadClass: "btn btn-success",
    uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i>"
};

ready ($event: any) {
    console.log($event);
}

filebatchuploadcomplete ($event: any) {
    console.log($event);
}

filebatchuploaderror ($event: any) {
    console.log($event);
}

fileuploaded ($event: any) {
    console.log($event);
}

fileuploaderror ($event: any) {
    console.log($event);
}
```

## API说明

### 输入属性

- `essence-ng2-fileInput`（`Object`） - 与bootstrap-fileinput的配置属性一致，默认配置如下：
```typescript
defaultOpts: any = {
    language: "zh",
    showUpload: false,
    showPreview: true,
    showCaption: false,
    showClose: false,
    showCancel: false,
    showRemove: true,
    maxFileCount: 0,
    defaultPreviewContent: null,
    resizePreference: 'height',
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
    allowedPreviewTypes: ['image', 'html', 'video', 'audio', 'flash'],
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
```

### 事件（更多的事件根据需求再添加）

- `ready` - fileinput初始化完成的事件，$event为当前EssenceNg2FileInputDirective实例
- `fileuploaded` - 单个文件上传成功的事件，$event = {event: event, data: data, previewId: previewId, index: index}
- `fileuploaderror` - 单个文件上传失败的事件 $event = {event: event, data: data, msg: msg}
- `filebatchuploadcomplete` - 批量文件上传完成的事件，$event = {event: event, data: data, previewId: previewId, index: index}
- `filebatchuploadsuccess` - 批量文件上传成功的事件，$event = {event: event, data: data, previewId: previewId, index: index}
- `filebatchuploaderror` - 批量文件上传失败的事件 $event = {event: event, data: data, msg: msg}

### 实例方法

- `disable` - 禁用上传控件
- `enable` - 启用上传控件
- `reset` - 重置上传控件
- `destroy` - 销毁上传控件
- `refresh` - 刷新上传控件
- `clear` - 清空上传控件
- `upload` - 上传
- `cancel` - 取消上传