# essence-ng2-checked

一个改变checkbox的checked状态的angular2指令（输入值essence-checked - 0：未选中，1：待确定，2：已选中）

## 依赖
```json
{
  "angular2": ">=2.2.1"
}
```

## 用法

### module中导入
```typescript
import {EssenceNg2CheckedModule} from "../directives/essence-ng2-checked";
@NgModule({
    imports: [
        EssenceNg2CheckedModule
    ]
})
```

### template中使用
```html
<input [essence-ng2-checked]="checked" type="checkbox">
```

### 对应的component
```typescript
checked: number = 0; // or 1 or 2
```
