import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'schedules-detail-template',
    templateUrl: './schedules-detail-template.component.html',
    styleUrls: ['./schedules-detail-template.component.scss']
})
export class SchedulesDetailTemplateComponent implements OnInit {
    @Input() schedulesData;

    constructor () { }

    ngOnInit () {
        console.log(this.schedulesData);
    }

}
