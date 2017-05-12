/**
 * Created by laixiangran on 2016/11/23.
 * homepage：http://www.laixiangran.cn.
 */
import {Directive, ElementRef, HostListener, Input, Renderer, OnInit} from '@angular/core';
@Directive({
    selector: '[essence-ng2-checked]'
})
export class EssenceNg2CheckedDirective implements OnInit {

    /**
     * 0：未选中
     * 1：待确定
     * 2：选中
     */
    @Input('essence-ng2-checked') essenceChecked: number;

    constructor (private el: ElementRef, private renderer: Renderer) {}

    ngOnInit () {
        if (this.essenceChecked === 2) {
            this.el.nativeElement.checked = true;
        } else if (this.essenceChecked === 1) {
            this.el.nativeElement.indeterminate = true;
        } else {
            this.el.nativeElement.checked = false;
        }
    }
}
