import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'add-schedule-form',
    templateUrl: './add-schedule-form.component.html',
    styleUrls: ['./add-schedule-form.component.scss']
})
export class AddScheduleFormComponent implements OnInit {

    cancleText: string = '取消';
    confirmText: string = '确定';
    @Input() schedule;
    // 取消事件
    @Output() cancle: EventEmitter<any> = new EventEmitter<any>(false);

    // 确定事件
    @Output() confirm: EventEmitter<any> = new EventEmitter<any>(false);

    constructor () { }

    ngOnInit () {
    }

    /**
     * 取消按钮点击事件
     */
    cancleHandler () {
        this.cancle.emit();
    }
    /**
     * 确定按钮点击事件
     */
    confirmHandler ($event) {
        this.confirm.emit($event);
    }

}
