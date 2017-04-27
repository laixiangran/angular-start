# essence-ng2-datetimepicker v1.0.0

This is a datetimepicker directive for Angular.

## 依赖
```json
{
  "typescript": ">=2.0.3",
  "angular2": ">=2.2.1",
  "bootstrap": "3.x",
  "jquery": "Latest",
  "bootstrap-datetimepicker": ">=4.17.45"
  "moment": ">=2.17.1"
}
```

- [bootstrap-datetimepicker](http://eonasdan.github.io/bootstrap-datetimepicker/)

- [moment](http://momentjs.com/)

## 用法

### index.html引入UEditor
```html
// index.html引用
<link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="http://cdn.bootcss.com/bootstrap-datetimepicker/4.17.45/css/bootstrap-datetimepicker.min.css" rel="stylesheet">

<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/moment.js/2.17.1/moment.min.js"></script>
<script src="http://cdn.bootcss.com/moment.js/2.17.1/moment-with-locales.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-datetimepicker/4.17.45/js/bootstrap-datetimepicker.min.js"></script>
```

### module中导入
```typescript
import {EssenceNg2ChartDatetimepickerModule} from "../../directives/essence-ng2-datetimepicker/essence-ng2-datetimepicker.module";

@NgModule({
    imports: [
        EssenceNg2ChartDatetimepickerModule
    ]
})
```

### template中使用
```html
<div class="row">
	<div class="col-md-12">
		<input type="text" class="form-control" essence-ng2-datetimepicker [(ngModel)]="datetime" [options]="options">
	</div>
</div>
```

**注意：input必须放置在position: relative的容器中，如bootstrap的row或者col-md-\*中**

### 对应的component
```typescript
datetime: any = '2016/12/01';
options: any = {
    format: 'YYYY/MM/DD'
};
```

## API说明

### 输入属性

- `options`（`Object`） - 与[bootstrap-datetimepicker的配置属性](http://eonasdan.github.io/bootstrap-datetimepicker/Options/)一致

### 事件

- `ready` - datetimepicker初始化完成的事件，$event为当前EssenceNg2ChartDatetimepickerDirective实例

### 实例方法

- `show` - 显示日期控件
- `hide` - 隐藏日期控件
- `destroy` - 销毁日期控件


