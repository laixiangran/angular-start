# essence-ng2-table

This is a Table component for Angular2.

## 依赖
```json
{
  'typescript': '>=2.0.3',
  'angular2': '>=2.2.1'
}
```

## 用法

### module中导入
```typescript
import {EssenceNg2TableModule} from '../components/essence-ng2-table';
@NgModule({
    imports: [
        EssenceNg2TableModule
    ]
})
```

### template中使用
```html
<essence-ng2-table [option]='option' (ready)='ready()'></essence-ng2-table>
```

### 对应的component
```typescript
@ViewChild('eTable') eTable: EssenceNg2TableComponent;
option: any = {
	serverUrl: 'auth/user/selectResultByEssenceTablePage.do',
	columns: {
		filter: {
			enabled: true
		},
		batch: {
			enabled: true,
			checkAllName: null,
			checkSingleName: null
		},
		items: [{
			label: "系统编号",
			colName: "c_id",
			colAlias: "u.c_id",
			visible: false,
			order: false,
			width: null,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "string",// string,select,date,datetime,num,combobox
				compare: "like" // like,=,>,<,between
			},
			render: (obj) => {

			}
		}, {
			label: "姓名",
			colName: "c_name",
			visible: true,
			order: true,
			width: null,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "string",// string,select,date,datetime,num,combobox
				compare: "like" // like,=,>,<,between
			},
			render: (obj) => {

			}
		}, {
			label: "性别",
			colName: "c_sex",
			visible: true,
			order: false,
			width: null,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "select",// string,select,date,datetime,num,combobox
				data : [{
					text: '男',
					value: '男'
				}, {
					text: '女',
					value: '女'
				}],
				compare: "=" // like,=,>,<,between
			},
			render: (obj) => {

			}
		}, {
			label: "邮箱",
			colName: "c_email",
			visible: true,
			order: true,
			width: null,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "string",// string,select,date,datetime,num,combobox
				compare: "like" // like,=,>,<,between
			},
			render: (obj) => {

			}
		}, {
			label: "电话",
			colName: "c_telphone",
			visible: true,
			order: true,
			width: null,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "string",// string,select,date,datetime,num,combobox
				compare: "like" // like,=,>,<,between
			},
			render: (obj) => {

			}
		}, {
			label: "创建时间",
			colName: "d_createtime",
			visible: true,
			order: true,
			width: 200,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: true,
				type: "date",// string,select,date,datetime,num,combobox
				compare: "like" // like,=,>,<,between
			},
			render: (obj) => {
				let result = Sys.dateFormat(obj.d_createtime, 'yyyy-MM-dd');
				return result;
			}
		}, {
			label: "操作",
			colName: null,
			visible: true,
			order: false,
			width: 200,
			cls: "text-center",
			style: null,
			ellipsis: false,
			filterProp: {
				enabled: false
			},
			render: [{
				text: '删除',
				type: 'button',
				cls: 'btn-xs btn-danger',
				exist: (obj) => {// 不设置该属性默认显示按钮
					return true;// 返回true显示按钮，false不显示
				},
				event: (obj) => {
					console.log(obj.c_name);
				}
			}, {
				text: '编辑',
				type: 'button',
				cls: 'btn-xs btn-warning',
				event: (obj) => {
					console.log(obj.c_name);
				}
			}]
		}]
	}
};
ready() {
    console.log('essence table ready.');
}

refresh(){
    this.eTable.refresh();
}
```

# API说明

## 属性

### option
详细说明参见EssenceTable jQuery版本的API文档，通用。
### option.columns.index
#### enabled
- boolean
是否显示列表序号，默认为true
#### option.columns.items.render
当colName为null时，该列不映射任何字段，可以用做操作列等，对应render的值如下：
```typescript
[{
	text: '删除', // 操作元素显示名称
	type: 'button',// 操作元素类型
	cls: 'btn-xs btn-danger',// 操作元素样式
	event: (obj) => {// 操作元素事件
		console.log(obj.c_name);
	}
}, {
	text: '编辑',
	type: 'button',
	cls: 'btn-xs btn-warning',
	event: (obj) => {
		console.log(obj.c_name);
	}
}]
```
#### option.columns.items.colAlias
- string
列别名，以供后台多表查询使用
#### option.columns.items.filterProp
##### enabled: boolean
是否启用该列过滤
##### type: string，过滤输入控件类型。支持string,select,date
- string
控件类型为文本输入框
- select
控件类型为下拉列表，当为该类型时需要为其设置值，值的类型为对象数组，属性为text和value，text代表下拉列表显示的文本，value代表下拉列表选中的值，如下所示：
```typescript
{
	enabled: true,
	type: 'select',// string,select,date,datetime,num,combobox
	data : [{
		text: '男',
		value: '男'
	}, {
		text: '女',
		value: '女'
	}],
	compare: '=' // like,=,>,<,between
}
```
- date
控件类型为日期选择器

### 事件

- 表格准备就绪后会触发该事件
@Output()
ready: EventEmitter<any> = new EventEmitter<any>(false);

### 实例方法

- refresh()
刷新列表数据
