/**
 * Created by Hllinc on 2016-12-19 0019 17:28.
 */

import {Component, EventEmitter, Output, Input} from "@angular/core";
import {Notice} from "../../models/notice";
import {Sys} from "../../../../../../../../../utils/sys";
import {User} from "../../../../../../../sys/models/user";
import {ServerData} from "../../../../../../../sys/models/server-data";
import {OrgService} from "../../../../../../../sys/pages/org/org.service";
import {NoticeManageService} from "../../notice-manage.service";
import {Org} from "../../../../../../../sys/models/org";
import {EssenceNg2EditorComponent} from 'essence-ng2-editor';

@Component({
    selector: 'message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.scss']
})

export class MessageFormComponent {

    notice: Notice = new Notice('', [], [], 0, '');
    showLinkMan: boolean = false;
    selectedOrg: Org = null;
    orgUsers: User[];
    linkMans: any[] = [];
    checkManText: string;
    essenceEditor: EssenceNg2EditorComponent;
    requestType: any = {
        sms: 2,
        email: 1,
        system: 0
    };

    // 表单数据
    @Input()
    set data (value: any) {
        if (value) {
            this.notice = value;
            let userArr: string[] = [];

            this.essenceEditor.setContent(this.notice.c_info);
            this.notice.recieveUser.forEach((user: any) => {
                userArr.push(user.c_name);
            });
            this.checkManText = userArr.join(',');
        }
    }

    // 是否显示取消按钮
    @Input() showCancle: boolean = true;

    // 是否显示确定按钮
    @Input() showConfirm: boolean = true;

    // 取消按钮文本
    @Input() cancleText: string = '取消';

    // 确定按钮文本
    @Input() confirmText: string = '确定';

    // 是否可编辑
    @Input() isEdit: boolean = true;

    // 消息类型，有 'sms'，'email'，'system'
    @Input() messageType: string = 'sms';

    // 提交事件
    @Output() confirm: EventEmitter<any> = new EventEmitter<any>(false);

    // 取消事件
    @Output() cancle: EventEmitter<any> = new EventEmitter<any>(false);

    constructor (private orgService: OrgService, private noticeManageService: NoticeManageService) {}

    ngOnInit () {
        this.showLinkMan = false;
    }

    /**
     * 选择联系人按钮点击事件
     */
    selectLinkMan () {
        this.showLinkMan = true;
    }

    /**
     * 树节点选择事件
     * @param $event
     */
    treeClick ($event: Org) {
        this.selectedOrg = $event;
        this.orgService.getUserDetailByOrgId(this.selectedOrg.c_id).subscribe((serverData: ServerData) => {
            if (serverData.code == 'ok') {
                this.orgUsers = <User[]> serverData.result;
                this.orgUsers.forEach((user: User) => {
                    user.orgDetail = this.selectedOrg;
                });
            } else {
                Sys.sysAlert(serverData.info, '系统提示您');
            }
        });
    }

    /**
     * 选中某个联系人
     */
    selectMan (man: any) {
        let flag: boolean = this.linkMans.some((m: any) => {
            return m.c_id == man.c_id;
        });
        if (flag) {
            return;
        }
        this.linkMans.push(man);

        let mArr: string[] = [];
        this.linkMans.forEach((m: any) => {
            mArr.push(m.c_name);
        });
        this.checkManText = mArr.join(',');
    }

    clearMen () {
        this.linkMans = [];
        this.checkManText = '';
    }

    /**
     * 发送按钮点击事件
     */
    send () {
        let noticeObj: Notice = new Notice();
        noticeObj.info = this.notice.c_info;
        this.linkMans.forEach((man: any) => {
            noticeObj.recipients.push(man.c_id);
            if (this.messageType == 'sms') {
                noticeObj.nos.push(man.c_telphone);
                noticeObj.info = this.essenceEditor.getContentTxt();
            } else if (this.messageType == 'email') {
                noticeObj.nos.push(man.c_email);
            } else {
                noticeObj.nos = null;
            }
        });
        noticeObj.subject = this.notice.c_subject;
        noticeObj.type = this.requestType[this.messageType];
        this.confirm.emit(JSON.parse(JSON.stringify(noticeObj)));

        // 变量初始化
        this.notice = new Notice();
        this.essenceEditor.setContent('');
        this.orgUsers = this.linkMans = [];
        this.checkManText = '';
    }

    cancleSend () {
        this.cancle.emit();
    }

    onEditorReady (editor: EssenceNg2EditorComponent) {
        this.essenceEditor = editor;
        this.essenceEditor.setHeight(200);
    }
}
