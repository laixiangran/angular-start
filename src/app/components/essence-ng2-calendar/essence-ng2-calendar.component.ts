import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'essence-ng2-calendar',
    templateUrl: './essence-ng2-calendar.component.html',
    styleUrls: ['./essence-ng2-calendar.component.scss']
})
export class EssenceNg2CalendarComponent implements OnInit {

    now: Date; // 当前日期
    calendarData: any; // 初始化的日历数据
    isShowYearAndMonth: boolean = false; // 是否显示选择年月视图
    isShowYearView: boolean = false; // 是否显示年视图
    isShowMonthView: boolean = false; // 是否显示月视图
    selectYearText: string; // 年范围文本
    selectYear: number; // 选中的年
    selectMonth: number; // 选中的月
    minTenYear: boolean = false; //最小10年
    maxTenYear: boolean = false; //最大10年
    minYear: number = 1899; //最小年限
    maxYear: number = 2050; //最大年限
    weekData: Array<string> = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']; // 星期数据
    monthData: Array<string> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']; // 月份数据
    yearData: Array<number> = []; // 当前年所在的十年数据

    initSchedules: Array<any> = null;
    // @Input() schedules: Array<any> = null; // 日程安排数据
    @Input()
    set schedules (schedules: any) {
        this.initSchedules = schedules;
        this.initCalendarData(new Date());
    }
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() onAddSchedule: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() onViewSchedule: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() onViewAllSchedule: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() onDeleteSchedule: EventEmitter<any> = new EventEmitter<any>(false);

    // 错误码列表
    errorCode = {
        "100": '输入的年份超过了可查询范围，仅支持1900至2050年',
        "101": '参数输入错误，请查阅文档'
    };

    constructor () {}

    ngOnInit () {
        this.initCalendarData(new Date());
    }

    /**
     * 初始化日历
     * @param now 当前日期
     */
    initCalendarData (now: Date) {
        this.now = now;
        this.selectYear = this.now.getFullYear();
        this.selectMonth = this.now.getMonth();
        this.calendarData = this.solarCalendar(this.now.getFullYear(), this.now.getMonth());

        // 设置对应日期的日程安排
        if (this.initSchedules) {
            this.calendarData.monthData.forEach((monthData: any) => {
                this.initSchedules.forEach((schedule: any) => {
                    let date1: Date = new Date(monthData.year, monthData.month - 1, monthData.day),
                        date2: Date = new Date(schedule.date.getFullYear(), schedule.date.getMonth(), schedule.date.getDate());
                    if (date1.getTime() === date2.getTime()) {
                        monthData.data = schedule.data;
                    }
                });
            });
        }

        this.dateChange.emit(this.now);
    }

    /**
     * 上一个月
     */
    preMonth () {
        let preYear: number = this.now.getMonth() - 1 < 0 ? this.now.getFullYear() - 1 : this.now.getFullYear(),
            preMonth: number = this.now.getMonth() - 1 < 0 ? 11 : this.now.getMonth() - 1,
            preDate: Date = new Date(preYear, preMonth);
        this.initCalendarData(preDate);
    }

    /**
     * 下一个月
     */
    nextMonth () {
        let nextYear: number = this.now.getMonth() + 1 > 11 ? this.now.getFullYear() + 1 : this.now.getFullYear(),
            nextMonth: number = this.now.getMonth() + 1 > 11 ? 0 : this.now.getMonth() + 1,
            nextDate: Date = new Date(nextYear, nextMonth);
        this.initCalendarData(nextDate);
    }

    /**
     * 公历某月日历
     * @param {Number} year 公历年
     * @param {Number} month 公历月
     * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始 (7*6阵列)
     * @returns {Object}
     */
    solarCalendar (year: number, month: number, fill: boolean = true): any {
        let inputDate: any = this.formateDate(year, month);

        if (inputDate.error) {
            return inputDate;
        }

        let _year: number = inputDate.year,
            _month: number = inputDate.month,
            firstDate = new Date(_year, _month, 1),
            preMonthDays: number,
            preMonthData: Array<any>,
            nextMonthData: Array<any>,
            res: any = {
                firstDay: firstDate.getDay(), //该月1号星期几
                monthDays: this.getSolarMonthDays(_year, _month), //该月天数
                monthData: []
            };

        res.monthData = this.creatLenArr(_year, _month + 1, res.monthDays, 1);

        if (fill) {
            if (res.firstDay > 0) { // 前补
                let preYear: number = _month - 1 < 0 ? _year - 1 : _year,
                    preMonth: number = _month - 1 < 0 ? 11 : _month - 1;
                preMonthDays = this.getSolarMonthDays(preYear, preMonth);
                preMonthData = this.creatLenArr(preYear, preMonth + 1, res.firstDay, preMonthDays - res.firstDay + 1);
                res.monthData = preMonthData.concat(res.monthData);
            }

            if (7 * 6 - res.monthData.length != 0) { // 后补
                let nextYear: number = _month + 1 > 11 ? _year + 1 : _year,
                    nextMonth: number = _month + 1 > 11 ? 0 : _month + 1,
                    fillLen: number = 7 * 6 - res.monthData.length;
                nextMonthData = this.creatLenArr(nextYear, nextMonth + 1, fillLen, 1);
                res.monthData = res.monthData.concat(nextMonthData);
            }
        }
        return res;
    }

    /**
     * 创建指定年月的天数
     * @param year 年
     * @param month 月
     * @param len 天数
     * @param start 哪一天开始
     * @returns {Array}
     */
    creatLenArr (year: number, month: number, len: number, start: number = 0): Array<any> {
        let arr: Array<any> = [];
        if (len < 1) {
            return arr;
        }
        let k: number = start;
        for (let i: number = 0; i < len; i++) {
            arr.push({
                year: year,
                month: month,
                day: k
            });
            k++;
        }
        return arr;
    }

    /**
     * 统一日期输入参数（月份统一从0开始）
     * @param year 公历年
     * @param month 公历月
     * @param day 公历日
     * @param minYear 最小公历年
     * @returns {any}
     */
    formateDate (year?: number, month?: number, day?: number, minYear?: number): any {
        let now: Date = new Date();
        year = year ? year : now.getFullYear();
        month = !isNaN(month + 1) ? month : now.getMonth();
        day = day ? day : now.getDate();
        if (year < (minYear ? minYear : this.minYear + 1) || year > this.maxYear) {
            return {
                error: 100,
                msg: this.errorCode[100]
            };
        }
        return {
            year: year,
            month: month,
            day: day
        };
    }

    /**
     * 获取公历月份的天数
     * @param {Number} year 公历年
     * @param {Number} month 公历月
     * @returns {number}
     */
    getSolarMonthDays (year: number, month: number): number {
        let monthDays: Array<number> = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return monthDays[month];
    }

    /**
     * 判断公历年是否是闰年
     * @param {Number} year 公历年
     * @returns {boolean}
     */
    isLeapYear (year: number): boolean {
        return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
    }

    /**
     * 判断指定的月与当前月是否相同
     * @param year
     * @param month
     * @param day
     * @returns {boolean}
     */
    isNotSameMonth (year?: number, month?: number, day?: number): boolean {
        let date1: Date = new Date(year, month - 1, 1),
            date2: Date = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
        return date1.getTime() !== date2.getTime();
    }

    /**
     * 判断是否是今天
     * @param year
     * @param month
     * @param day
     * @returns {boolean}
     */
    isCurrDay (year?: number, month?: number, day?: number): boolean {
        let now: Date = new Date(),
            date1: Date = new Date(year, month - 1, day),
            date2: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return date1.getTime() === date2.getTime();
    }

    /**
     * 返回今天
     */
    backToday () {
        this.initCalendarData(new Date());
    }

    /**
     * monthData转换成date
     * @param monthData
     * @returns {Date}
     */
    toDate (monthData: any): Date {
        return new Date(monthData.year, monthData.month - 1, monthData.day);
    }

    /**
     * 添加日程安排
     * @param monthData
     */
    addSchedule (monthData: any) {
        this.onAddSchedule.emit(this.toDate(monthData));
    }

    /**
     * 查看日程安排
     * @param monthData
     * @param schedule
     */
    viewSchedule (monthData: any, schedule: any) {
        this.onViewSchedule.emit({
            date: this.toDate(monthData),
            data: schedule
        });
    }

    /**
     * 查看所有的日程安排
     * @param monthData
     */
    viewAllSchedule (monthData: any) {
        this.onViewAllSchedule.emit({
            date: this.toDate(monthData),
            data: monthData.data
        });
    }

    /**
     * 删除某个日程
     * @param schedule
     */
    deleteSchedule (schedule: any) {
        this.onDeleteSchedule.emit(schedule);
    }
    /**
     * 切换年月面板
     */
    toggleYearAndMonth () {
        this.isShowYearAndMonth = !this.isShowYearAndMonth;
        this.isShowYearView = false;
        this.isShowMonthView = this.isShowYearAndMonth;
    }

    /**
     * 改变月
     * @param month
     */
    changeMonth (month: number) {
        this.isShowYearAndMonth = false;
        this.selectMonth = month;
        this.initCalendarData(new Date(this.selectYear, this.selectMonth));
    }

    /**
     * 改变年
     * @param year
     */
    changeYear (year: number) {
        this.selectYear = year;
        this.isShowYearView = false;
        this.isShowMonthView = true;
    }

    /**
     * 显示年视图
     * @param year
     */
    showYearView (year: number) {
        this.isShowYearView = true;
        this.isShowMonthView = false;
        this.yearData = this.creatTenYear(year);
        this.selectYearText = `${this.yearData[0]} - ${this.yearData[9]}`;
    }

    /**
     * 该年是否在年视图显示的十年内
     * @param year
     * @returns {boolean}
     */
    isInTenYear (year: number): boolean {
        return year < this.yearData[0] || year > this.yearData[9];
    }

    /**
     * 上十年
     */
    preTenYear () {
        if (this.yearData[0] > this.minYear + 1) {
            this.maxTenYear = false;
            this.yearData = this.creatTenYear(this.yearData[0] - 10);
            this.selectYearText = `${this.yearData[0]} - ${this.yearData[9]}`;
            if (this.yearData[0] <= this.minYear + 1) {
                this.minTenYear = true;
            }
        }
    }

    /**
     * 下十年
     */
    nextTenYear () {
        if (this.yearData[9] < this.maxYear - 1) {
            this.minTenYear = false;
            this.yearData = this.creatTenYear(this.yearData[0] + 10);
            this.selectYearText = `${this.yearData[0]} - ${this.yearData[9]}`;
            if (this.yearData[9] >= this.maxYear - 1) {
                this.maxTenYear = true;
            }
        }
    }

    /**
     * 根据给定的年创建该年所在的十年数据
     * @param year
     * @returns {Array<number>}
     */
    creatTenYear (year: number): Array<number> {
        let tenYear: Array<number> = [],
            s_year: number = Math.floor((year/10))*10;
        for (let i = 0; i < 12; i++) {
            tenYear.push(s_year);
            s_year++;
        }
        return tenYear;
    }
}
