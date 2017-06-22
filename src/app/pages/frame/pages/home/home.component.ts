import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from "./home.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HomeService]
})

export class HomeComponent implements OnInit, OnDestroy {

    option: any = {
        serverParam: {
            serverUrl: 'http://192.168.0.88/drainage/TSewerageUserController/getSewerageUserListPage'
        },
        columns: {
            primaryKey: 'id',
            items: [{
                label: "工程名称",
                colName: "name",
                render: (value: any, obj: any) => {
                    return `<span style="color: royalblue;"><span class="glyphicon glyphicon-user"></span>value</span>`;
                }
            }, {
                label: "工程编号",
                colName: "no",
                style: {color: 'red', 'font-weight': 'bold'}
            }, {
                label: "工程地址",
                colName: "address",
                filterProp: {
                    type: 'select',
                    value: [
                        {
                            text: '8888',
                            value: '888'
                        },
                        {
                            text: '北京市',
                            value: '北京市'
                        }
                    ]
                }
            }, {
                label: "创建时间",
                colName: "createtime",
                search: false,
                filterProp: {
                    type: 'date',
                    compare: 'eq'
                }
            }, {
                label: "操作",
                print: false,
                filterProp: {
                    enabled: false
                },
                order: null,
                render: [
                    {
                        text: '编辑',
                        cls: 'btn-info btn-xs',
                        event: (obj: any) => {
                            console.log(obj);
                        }
                    }
                ]
            }]
        }
    };

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    ready() {
        console.log('essence table ready.');
    }
}
