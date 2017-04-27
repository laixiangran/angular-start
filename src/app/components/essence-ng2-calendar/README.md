# essence-ng2-calendar v1.0.0

This is a calendar component for Angular.

## 依赖

```json
{
  "typescript": ">=2.0.3",
  "angular2": ">=2.2.1",
  "bootstrap": "3.x",
  "font-awesome": "^4.7.0"
}
```

## 用法

### index.html引入font-awesome.css

```html
<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="./font-awesome/css/font-awesome.min.css">
```

### module中导入

```typescript
import {EssenceNg2EditorModule} from "../components/essence-ng2-calendar";
@NgModule({
    imports: [
        EssenceNg2CalendarModule
    ]
})
```

### template中使用

```html
<!-- 显示日程安排 -->
<essence-ng2-calendar [schedules]="schedules"
                      (onAddSchedule)="onAddSchedule($event)"
                      (onViewAllSchedule)="onViewAllSchedule($event)"
                      (onViewSchedule)="onViewSchedule($event)"
                      (dateChange)="onDateChange($event)">
</essence-ng2-calendar>

<!-- 不显示日程安排 -->
<essence-ng2-calendar (dateChange)="onDateChange($event)"></essence-ng2-calendar>
```

### 对应的component

```typescript
schedules: any = [
    {
        date: new Date(2017, 0, 18),
        data: [
            {
                title: '参加会议',
                address: '公司会议室',
                content: '讨论考核制度',
                info: '参会人员包括：张三、李四',
                start_time: new Date(2017, 0, 18),
                end_time: new Date(new Date(2017, 0, 18).getTime() + 3600000),
                remind_time: new Date(new Date(2017, 0, 18).getTime() - 3600000)
            },
            {
                title: '参加会议',
                address: '公司会议室',
                content: '讨论考核制度',
                info: '参会人员包括：张三、李四',
                start_time: new Date(2017, 0, 18),
                end_time: new Date(new Date(2017, 0, 18).getTime() + 3600000),
                remind_time: new Date(new Date(2017, 0, 18).getTime() - 3600000)
            }
        ]
    },

    {
        date: new Date(),
        data: [
            {
                title: '参加会议参加会议参加会议',
                address: '公司会议室',
                content: '讨论考核制度',
                info: '参会人员包括：张三、李四',
                start_time: new Date(),
                end_time: new Date(new Date().getTime() + 3600000),
                remind_time: new Date(new Date().getTime() - 3600000)
            },
            {
                title: '参加会议',
                address: '公司会议室',
                content: '讨论考核制度',
                info: '参会人员包括：张三、李四',
                start_time: new Date(),
                end_time: new Date(new Date().getTime() + 3600000),
                remind_time: new Date(new Date().getTime() - 3600000)
            }
        ]
    }
];

onDateChange ($event: Date) {
    console.log($event);
}

onAddSchedule ($event: any) {
    console.log($event);
}

onViewAllSchedule ($event: any) {
    console.log($event);
}

onViewSchedule ($event: any) {
    console.log($event);
}
```

## API说明

### 输入属性

- `schedules`（`?any=null`） - 日程安排，对象数组格式如下：
```typescript
[
    {
        id: '00001', // 日程安排id
        date: new Date(), // 日程安排日期，Date类型
        data: [
            {
                title: '参加会议', // 日程安排标题
                address: '公司会议室', // 日程安排地点
                content: '讨论考核制度', // 日程安排内容
                info: '参会人员包括：张三、李四', // 日程安排备注
                start_time: new Date(), // 日程安排开始时间，Date类型
                end_time: new Date(new Date().getTime() + 3600000), // 日程安排结束时间，Date类型
                remind_time: new Date(new Date().getTime() - 3600000) // 日程安排提醒时间，Date类型
            }
        ]
    }
]
```

### 事件

- `dateChange` - 日期改变会触发该事件，参数$event为改变之后的日期

**以下事件只发送事件有关的参数，具体操作需自定义**

- `onAddSchedule` - 触发该事件新增日程安排，参数$event为选中的日期

- `onViewSchedule` - 触发该事件查看日程安排，参数$event为一个对象，属性：date为当前日程安排所在日期, data为选中的日程安排数据

- `onViewAllSchedule` - 触发该事件查看当日全部日程安排，参数$event为一个对象，属性：date为选中的日期, data为选中日期的所有日程安排数据

- `onDeleteSchedule` - 触发该事件删除日程安排，参数$event为该日程安排数据