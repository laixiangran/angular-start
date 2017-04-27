# essence-ng2-editor v1.0.0

This is a UEditor component for Angular.

## 依赖
```json
{
  "typescript": ">=2.0.3",
  "angular2": ">=2.2.1",
  "UEditor": ">=1.4.3.3 Jsp版 UTF-8版"
}
```

[UEditor: http://ueditor.baidu.com/website/index.html](http://ueditor.baidu.com/website/index.html)

## 用法

### index.html引入UEditor
```html
// index.html引用
<script src="./assets/scripts/ueditor/ueditor.config.js"></script>
<script src="./assets/scripts/ueditor/ueditor.all.min.js"></script>
```

### module中导入
```typescript
import {EssenceNg2EditorModule} from "../components/essence-ng2-editor";
@NgModule({
    imports: [
        EssenceNg2EditorModule
    ]
})
```

### template中使用
```html
<essence-ng2-editor [(ngModel)]="model_text"
                    (contentChange)="contentChange($event)"
                    (ready)="editorReady($event)">
</essence-ng2-editor>
```

### 对应的component
```typescript
model_text: string = "<p style='color: red;'>ngmodel</p>";

contentChange ($event) {
    console.log($event);
}

editorReady ($event) {
    console.log($event);
}
```

## API说明

### 输入属性

- `[(ngModel)]`（`string`） - 绑定编辑器内容
- `ueOption`（`?Object`） - 属性参数（参照官网api），默认defaultConfig如下：
```typescript
    defaultConfig: any = {
        autoHeightEnabled: true,
        allowDivTransToP: false,
        toolbars: [
            ['fullscreen', 'source', 'undo', 'redo'],
            ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
        ]
    };
```

### 事件

- `ready` - 编辑器准备就绪后会触发该事件

- `destroy` - 执行destroy方法会触发该事件

- `reset` - 执行reset方法会触发该事件

- `focusEvent` - 执行focus方法会触发该事件

- `langReady` - 语言加载完成会触发该事件

- `beforeExecCommand` - 运行命令之后会触发该命令

- `afterExecCommand` - 运行命令之后会触发该命令

- `firstBeforeExecCommand` - 运行命令之前会触发该命令

- `beforeGetContent` - 在getContent方法执行之前会触发该事件

- `afterGetContent` - 在getContent方法执行之后会触发该事件

- `getAllHtml` - 在getAllHtml方法执行时会触发该事件

- `beforeSetContent` - 在setContent方法执行之前会触发该事件

- `afterSetContent` - 在setContent方法执行之后会触发该事件

- `selectionchange` - 每当编辑器内部选区发生改变时，将触发该事件。**警告： 该事件的触发非常频繁，不建议在该事件的处理过程中做重量级的处理**

- `beforeSelectionChange` - 在所有selectionchange的监听函数执行之前，会触发该事件

- `afterSelectionChange` - 在所有selectionchange的监听函数执行完之后，会触发该事件

- `contentChange` - 编辑器内容发生改变时会触发该事件

### 实例方法（更多的方法根据需求再添加）

```typescript
/**
 * 设置编辑器高度
 * 提示：当配置项autoHeightEnabled为真时,该方法无效
 * @param height 编辑器高度（不带单位）
 */
setHeight (height: number): any {
    this.ue && this.ue.setHeight(height);
}

/**
 * 设置编辑器的内容，可修改编辑器当前的html内容
 * @param html 要插入的html内容
 * @param isAppendTo 若传入true，不清空原来的内容，在最后插入内容，否则，清空内容再插入
 */
setContent (html: string, isAppendTo: boolean = false): any {
    this.ue && this.ue.setContent(html, isAppendTo);
}

/**
 * 获取编辑器html内容
 */
getContent (): any {
   return this.ue && this.ue.getContent();
}

/**
 * 获取编辑器纯文本内容
 */
getContentTxt (): any {
    return this.ue && this.ue.getContentTxt();
}

/**
 * 获取编辑器带格式的纯文本内容
 */
getPlainTxt (): any {
    return this.ue && this.ue.getPlainTxt();
}

/**
 * 判断编辑器是否有内容
 */
hasContents (): any {
    return this.ue && this.ue.hasContents();
}

/**
 * 让编辑器获得焦点
 */
focus (): any {
    this.ue && this.ue.focus();
}

/**
 * 让编辑器失去焦点
 */
blur (): any {
    this.ue && this.ue.blur();
}

/**
 * 判断编辑器是否获得焦点
 */
isFocus (): any {
    return this.ue && this.ue.isFocus();
}

/**
 * 设置当前编辑区域不可编辑
 */
setDisabled (): any {
    this.ue && this.ue.setDisabled();
}

/**
 * 设置当前编辑区域可以编辑
 */
setEnabled (): any {
    this.ue && this.ue.setEnabled();
}

/**
 * 隐藏编辑器
 */
setHide (): any {
    this.ue && this.ue.setHide();
}

/**
 * 显示编辑器
 */
setShow (): any {
    this.ue && this.ue.setShow();
}

/**
 * 获得当前选中的文本
 */
getSelectionText (): any {
    return this.ue && this.ue.selection.getText();
}
```