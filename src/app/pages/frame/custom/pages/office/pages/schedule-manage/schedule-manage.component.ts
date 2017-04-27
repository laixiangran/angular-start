import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ScheduleManageService} from "./schedule-manage.service";
import {Sys} from "../../../../../../../utils/sys";
import {Schedule} from "./models/schedule";
@Component({
    selector: 'schedule-manage',
    templateUrl: './schedule-manage.component.html',
    styleUrls: ['./schedule-manage.component.scss'],
    providers: [ScheduleManageService]
})
export class ScheduleManageComponent implements OnInit {
    @ViewChild('addScheduleModal') addScheduleModal: ModalComponent;
    @ViewChild('schedulesDetailModal') schedulesDetailModal: ModalComponent;
    modalTitle: string = "添加日程";
    scheduleData: any;
    schedules: any;
    schedule: Schedule = new Schedule('');
    scheduleDate: any;
    operateType: string;
    curSchedulesDetailData:any;

    constructor (private scheduleManageService: ScheduleManageService) { }

    ngOnInit () {
        this.getData();
    }

    /**
     * 获取所有日程
     */
    getData () {
        this.scheduleManageService.getScheduleData().subscribe(
            (serverData) => {
                if (serverData.code === 'ok') {
                    let schedules = [];
                    this.scheduleData = serverData.result;
                    this.scheduleData.forEach((curSchedule: any) => {
                        let curData = curSchedule.data;
                        let obj = {
                            date: new Date(curSchedule.date),
                            data: []
                        };
                        curData.forEach((cur: any) => {
                            obj.data.push({
                                id: cur.id,
                                title: cur.title,
                                addr: cur.addr,
                                content: cur.content,
                                info: cur.info,
                                startTime: new Date(cur.startTime),
                                endTime: new Date(cur.endTime),
                                remindTime: new Date(cur.remindTime)
                            })
                        });
                        schedules.push(obj);
                    });
                    this.schedules = schedules;
                } else {
                    this.schedules = [];
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        )
    }

    /**
     * 弹框取消按钮点击事件
     */
    onCancle () {
        this.addScheduleModal.close();
    }

    onDateChange ($event: Date) {
    }

    /**
     * 添加日程事件
     */
    onAddSchedule ($event: any) {
        this.operateType = 'add';
        this.scheduleDate = $event;
        this.addScheduleModal.open();
        this.schedule = new Schedule('');
    }

    /**
     * 确定按钮点击事件
     * @param $event
     */
    onConfirm ($event) {
        if (this.operateType === 'add') {
            $event.createtime = this.scheduleDate;
            this.scheduleManageService.addSchedule($event).subscribe(
                (serverData) => {
                    if (serverData.code === 'ok') {
                        this.addScheduleModal.close();
                        this.getData();
                    } else {
                        Sys.sysAlert('添加失败');
                    }
                },
                (error) => {
                    Sys.sysAlert(error);
                }
            );
        } else {
            $event.createtime = this.schedule.createtime;
            $event.id = this.schedule.id;
            this.scheduleManageService.updateSchedule($event).subscribe(
                (serverData) => {
                    if (serverData.code === 'ok') {
                        this.addScheduleModal.close();
                        this.getData();
                    } else {
                        Sys.sysAlert('修改失败');
                    }
                },
                (error) => {
                    Sys.sysAlert(error);
                }
            );
        }
    }

    /**
     * 单个日程点击查看详情
     * @param $event
     */
    onViewSchedule ($event: any) {
        this.operateType = 'editor';
        this.modalTitle = '查看或编辑当前日程';
        this.schedule = new Schedule($event.data.title, $event.data.addr, $event.data.content, Sys.dateFormat($event.data.startTime, 'yyyy-MM-dd'),
            Sys.dateFormat($event.data.endTime, 'yyyy-MM-dd'), Sys.dateFormat($event.data.remindTime, 'yyyy-MM-dd'), $event.data.info,$event.data.id,$event.data.createtime);
        this.addScheduleModal.open();
    }

    /**
     * 删除按钮点击事件
     * @param $event
     */
    onDeleteSchedule ($event) {
        Sys.sysConfirm('确定要删除“' + $event.title + '”日程吗？', () => {
            this.scheduleManageService.deleteSchedule({id: $event.id}).subscribe(
                (serverData) => {
                    if (serverData.code === 'ok') {
                        this.getData();
                    } else {
                        Sys.sysAlert('删除失败！');
                    }
                },
                (error) => {
                    Sys.sysAlert(error);
                }
            )
        });
    }

    onViewAllSchedule ($event: any) {
        this.curSchedulesDetailData = $event.data;
        this.schedulesDetailModal.open();
    }

}
