/**
 * Created by laixiangran on 2016/8/15.
 * homepage：http://www.laixiangran.cn.
 */

import {Directive, ElementRef, Input, Output, OnInit, OnDestroy, Self, EventEmitter} from "@angular/core";
import {ControlValueAccessor, NgModel} from "@angular/forms";

@Directive({
    selector: "[essence-ng2-datetimepicker][ngModel]",
    providers: [NgModel]
})
export class EssenceNg2ChartDatetimepickerDirective implements ControlValueAccessor, OnInit, OnDestroy {
    private el: HTMLElement;
    private cd: NgModel;
    private text: string | Date;
    private defaultOptions: any = {
        locale: 'zh-cn'
    };

    // 输入属性
    @Input() set options (options: any) {
        this.destroy();
        this.defaultOptions = $.extend(true, this.defaultOptions, options);
        this.commonPicker(this.defaultOptions);
    }

    // 事件
    @Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() showPicker: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() hidePicker: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() changeDate: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() updateDate: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() errorDate: EventEmitter<any> = new EventEmitter<any>(false);

    constructor (@Self() cd: NgModel, el: ElementRef) {
        this.el = el.nativeElement;
        this.cd = cd;
    }

    ngOnInit () {
        this.initEvent();
        this.ready.emit(this);
    }

    private initEvent () {
        this.commonPicker().on('dp.show', (ev) => {
            this.commonFn('viewMode')(this.commonFn('viewMode')());
            this.showPicker.emit(ev.date && ev.date.toDate());
        });

        this.commonPicker().on('dp.hide', (ev) => {
            this.hidePicker.emit(ev.date && ev.date.toDate());
        });

        this.commonPicker().on('dp.change', (ev) => {
            let id: number = window.setTimeout(() => {
                window.clearTimeout(id);
                let momentDate: any = ev.date;
                this.writeValue(momentDate.toDate());
                this.cd.viewToModelUpdate(momentDate.toDate());
                this.changeDate.emit(momentDate.toDate());
            });
        });

        this.commonPicker().on('dp.update', (ev) => {
            let id: number = window.setTimeout(() => {
                window.clearTimeout(id);
                let momentDate: any = ev.viewDate;
                this.updateDate.emit(momentDate.toDate());
            });
        });

        this.commonPicker().on('dp.error', (ev) => {
            this.errorDate.emit(ev.toDate());
        });
    }

    private commonPicker (options?: any): any {
        return $(this.el)['datetimepicker'](options);
    }

    private commonFn (fName: string): Function {
        return $(this.el)['data']("DateTimePicker") ? $(this.el)['data']("DateTimePicker")[fName] : () => {};
    }

    /**
     * 销毁
     */
    destroy () {
        this.commonFn('destroy')();
    }

    /**
     * 显示
     */
    show () {
        this.commonFn('show')();
    }

    /**
     * 隐藏
     */
    hide () {
        this.commonFn('hide')();
    }

    ngOnDestroy () {
        this.destroy();
    }

    // 以下实现ControlValueAccessor接口的方法
    writeValue (value: string | Date): void {
        this.text = value;
    }

    registerOnChange (fn: any): void {
    }

    registerOnTouched (fn: any): void {
    }
}
