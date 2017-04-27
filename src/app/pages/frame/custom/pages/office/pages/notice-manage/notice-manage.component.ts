/**
 * Created by Hllinc on 2016-12-19 0019 16:21.
 */

import {Component, ViewChild, OnInit} from "@angular/core";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {NoticeManageService} from "./notice-manage.service";
import {Sys} from "../../../../../../../utils/sys";
import {EssenceNg2TableComponent} from "../../../../../../../components/essence-ng2-table/essence-ng2-table.component";
import {ServerData} from "../../../../../sys/models/server-data";

@Component({
    templateUrl: './notice-manage.component.html',
    styleUrls: ['./notice-manage.component.scss'],
    providers: [NoticeManageService]
})

export class NoticeManageComponent implements OnInit {

    @ViewChild('noticeTable') noticeTable: EssenceNg2TableComponent;

    noticeList: any[];
    sendOrReceiveStr: string = 'send';
    selectedType: number = 2;
    selectedNavi: string = 'sms';
    selectedNaviText: string = '短信';
    messageData: any;
    showConfirm: boolean = true;
    isEdit: boolean = true;
    modalTitle: string = '发送' + this.selectedNaviText;
    option: any = {
        serverUrl: 'auth/MessageController/selectSendByEssenceTablePage.do',
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
                }
            }, {
                label: "信息类型",
                colName: "n_type",
                visible: false,
                order: false,
                width: null,
                cls: "text-center",
                style: null,
                ellipsis: false,
                filterProp: {
                    enabled: true,
                    value: this.selectedType + '',
                    type: "string",
                    compare: "="
                }
            }, {
                label: "主题",
                colName: "c_subject",
                visible: this.selectedNavi == 'email',
                order: true,
                width: null,
                cls: "text-center",
                style: null,
                ellipsis: false,
                filterProp: {
                    enabled: true,
                    type: "string",
                    compare: "like"
                },
                render: (obj) => {
                    return obj.c_subject ? obj.c_subject : '/';
                }
            }, {
                label: "内容",
                colName: "c_info",
                visible: this.selectedNavi != 'email',
                order: false,
                width: null,
                cls: "text-center",
                style: null,
                ellipsis: false,
                filterProp: {
                    enabled: true,
                    type: "string",
                    compare: "like"
                },
                render: (obj) => {
                    return obj.c_info ? (obj.c_info.length > 20 ? obj.c_info.substr(0, 20) + '...' : obj.c_info.substr(0, 20)) : '/';
                }
            }, {
                label: "时间",
                colName: "d_time",
                visible: true,
                order: false,
                width: null,
                cls: "text-center",
                style: null,
                ellipsis: false,
                filterProp: {
                    enabled: true,
                    type: "string",
                    compare: "like"
                },
                render: (obj) => {
                    return obj.d_time ? Sys.dateFormat(obj.d_time, 'yyyy/MM/dd hh:mm:ss') : '/';
                }
            }, {
                label: "操作",
                colName: null,
                visible: true,
                order: false,
                width: null,
                cls: "text-center",
                style: null,
                ellipsis: false,
                filterProp: {
                    enabled: false
                },
                render: [{
                    text: '详情',
                    type: 'button',
                    cls: 'btn-xs btn-success',
                    event: (obj) => {
                        this.viewMessage(obj);
                    }
                }, {
                    text: '删除',
                    type: 'button',
                    cls: 'btn-xs btn-danger',
                    event: (obj) => {
                        this.deleteMessage(obj);
                    }
                }]
            }]
        }
    };

    @ViewChild('sendModal') sendModal: ModalComponent;

    constructor (private noticeManageService: NoticeManageService) {}

    ngOnInit () {}

    tableReady () {}

    naviClick (nav: string) {
        this.selectedNavi = nav;
        if (nav == 'sms') {
            this.selectedNaviText = '短信';
            this.selectedType = 2;
        } else if (nav == 'email') {
            this.selectedNaviText = '邮件';
            this.selectedType = 1;
        } else if (nav == 'system') {
            this.selectedNaviText = '站内信';
            this.selectedType = 0;
        }
        this.changeSendOrReceive(this.sendOrReceiveStr);
    }

    changeSendOrReceive (type: string) {
        this.sendOrReceiveStr = type;
        if (this.sendOrReceiveStr == 'send') {
            this.option = {
                serverUrl: 'auth/MessageController/selectSendByEssenceTablePage.do',
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
                        }
                    }, {
                        label: "信息类型",
                        colName: "n_type",
                        visible: false,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            value: this.selectedType + '',
                            type: "string",
                            compare: "="
                        }
                    }, {
                        label: "主题",
                        colName: "c_subject",
                        visible: this.selectedNavi == 'email',
                        order: true,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.c_subject ? obj.c_subject : '/';
                        }
                    }, {
                        label: "内容",
                        colName: "c_info",
                        visible: this.selectedNavi != 'email',
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.c_info ? (obj.c_info.length > 20 ? obj.c_info.substr(0, 20) + '...' : obj.c_info.substr(0, 20)) : '/';
                        }
                    }, {
                        label: "时间",
                        colName: "d_time",
                        visible: true,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.d_time ? Sys.dateFormat(obj.d_time, 'yyyy/MM/dd hh:mm:ss') : '/';
                        }
                    }, {
                        label: "操作",
                        colName: null,
                        visible: true,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: false
                        },
                        render: [{
                            text: '详情',
                            type: 'button',
                            cls: 'btn-xs btn-success',
                            event: (obj) => {
                                this.viewMessage(obj);
                            }
                        }, {
                            text: '删除',
                            type: 'button',
                            cls: 'btn-xs btn-danger',
                            event: (obj) => {
                                this.deleteMessage(obj);
                            }
                        }]
                    }]
                }
            };
        }
        else {
            this.option = {
                serverUrl: 'auth/MessageController/selectRecieveByEssenceTablePage.do',
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
                        }
                    }, {
                        label: "信息类型",
                        colName: "n_type",
                        visible: false,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            value: this.selectedType + '',
                            type: "string",
                            compare: "="
                        }
                    }, {
                        label: "主题",
                        colName: "c_subject",
                        visible: this.selectedNavi == 'email',
                        order: true,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.c_subject ? obj.c_subject : '/';
                        }
                    }, {
                        label: "内容",
                        visible: this.selectedNavi != 'email',
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.c_info ? (obj.c_info.length > 20 ? obj.c_info.substr(0, 20) + '...' : obj.c_info.substr(0, 20)) : '/';
                        }
                    }, {
                        label: "时间",
                        colName: "d_time",
                        visible: true,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: true,
                            type: "string",
                            compare: "like"
                        },
                        render: (obj) => {
                            return obj.d_time ? Sys.dateFormat(obj.d_time, 'yyyy/MM/dd hh:mm:ss') : '/';
                        }
                    }, {
                        label: "操作",
                        colName: null,
                        visible: true,
                        order: false,
                        width: null,
                        cls: "text-center",
                        style: null,
                        ellipsis: false,
                        filterProp: {
                            enabled: false
                        },
                        render: [{
                            text: '详情',
                            type: 'button',
                            cls: 'btn-xs btn-success',
                            event: (obj) => {
                                this.viewMessage(obj);
                            }
                        }, {
                            text: '删除',
                            type: 'button',
                            cls: 'btn-xs btn-danger',
                            event: (obj) => {
                                this.deleteMessage(obj);
                            }
                        }]
                    }]
                }
            };
        }
    }

    deleteMessage (obj: any) {
        Sys.sysConfirm('确定删除该条信息？', () => {
            this.noticeManageService.deleteMessageById(obj.c_id).subscribe((data: ServerData) => {
                if (data.code == 'ok') {
                    this.noticeTable.refresh();
                    Sys.sysAlert('删除成功！', '温馨提示');
                }
            });
        });
    }

    viewMessage (obj: any) {
        this.modalTitle = this.selectedNaviText + '详情';
        this.isEdit = false;
        this.showConfirm = false;
        this.messageData = obj;
        this.sendModal.open();
    }

    /**
     * 打开发送窗口
     */
    openSendForm () {
        this.modalTitle = '发送' + this.selectedNaviText;
        this.isEdit = true;
        this.showConfirm = true;
        this.sendModal.open();
    }

    /**
     * 短信弹框确定按钮点击事件
     * @param $event
     */
    onConfirm ($event) {
        this.noticeManageService.sendMessage($event).subscribe((res) => {
            if (res.code === 'ok') {
                this.sendModal.close();
                Sys.sysAlert('发送成功！');
                this.noticeTable.refresh();
            } else {
                Sys.sysAlert('发送失败！');
            }
        });
    }

    /**
     * 短信弹框取消按钮点击事件
     */
    onCancle () {
        this.sendModal.close();
    }
}
