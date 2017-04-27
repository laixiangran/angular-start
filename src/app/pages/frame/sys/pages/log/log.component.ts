/**
 * Created by Hllinc on 2016-11-01 21:03.
 */

import {Component} from "@angular/core";
import {Sys} from "../../../../../utils/sys";
@Component({
    templateUrl: './log.component.html'
})
export class LogComponent {
    content = '系统日志';
    option:any = {
    serverUrl: 'auth/sysLogAction/selectByEssenceTablePage.do',
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
            label: "操作人",
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
                return obj.c_name ? obj.c_name : '/';
            }
        }, {
            label: "请求方法",
            colName: "c_method",
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
                return obj.c_method ? obj.c_method: '/';
            }
        }, {
            label: "请求参数",
            colName: "c_parameter",
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
                return obj.c_parameter ? obj.c_parameter.split(']')[0]+']': '/';
            }
        }, {
            label: "请求路径",
            colName: "c_class",
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
                return obj.c_class ? obj.c_class : '/';
            }
        }, {
            label: "操作时间",
            colName: "d_date",
            visible: true,
            order: true,
            width: null,
            cls: "text-center",
            style: null,
            ellipsis: false,
            filterProp: {
                enabled: true,
                type: "date",// string,select,date,datetime,num,combobox
                compare: "like" // like,=,>,<,between
            },
            render: (obj) => {
                return obj.d_date ? Sys.dateFormat(new Date(obj.d_date),'yyyy-MM-dd') : '/';
            }
        }]
    }
};
}
