import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {DocumentManageService} from "./document-manage.service";
import {Sys} from "../../../../../../../utils/sys";
import {DataService} from "../../../../../../../services/data.service";
@Component({
    templateUrl: './document-manage.component.html',
    styleUrls: ['./document-manage.component.scss'],
    providers: [DocumentManageService]
})
export class DocumentManageComponent implements OnInit {
    @ViewChild('docTypeModal') docTypeModal: ModalComponent;
    @ViewChild('docModal') docModal: ModalComponent;
    docTypeList: any;
    docList: any;
    selectedType: any;
    typeTitle: string = '';
    showModal: boolean = false;

    constructor (private documentManageService: DocumentManageService, private dataService: DataService) { }

    ngOnInit () {
        this.getData();
    }

    /**
     * 获取数据
     */
    getData () {
        this.documentManageService.getDocTypeData().subscribe(
            (res) => {
                if (res.code === 'ok') {
                    this.docTypeList = res.result;
                } else {
                    this.docTypeList = [];
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        )
    }

    /**
     *添加文档类型弹框取消按钮点击操作后的反应
     */
    onTypeCancle () {
        this.docTypeModal.close();
    }

    /**
     *添加文档类型弹框确定按钮点击操作后的相应处理
     */
    onTypeConfirm ($event) {
        this.documentManageService.addDocType($event).subscribe(
            (res) => {
                if (res.code === 'ok') {
                    this.docTypeModal.close();
                    this.getData();
                } else {
                    Sys.sysAlert('添加失败！');
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        )
    }

    /**
     * 删除文档类型
     * @param obj
     */
    deleteDocType (obj) {
        Sys.sysConfirm('确定要删除该' + obj.c_info + '文档类型吗？', () => {
            this.documentManageService.deleteDocType({c_id: obj.c_id}).subscribe(
                (res) => {
                    if (res.code === 'ok') {
                        this.getData();
                        this.typeTitle = '';
                        this.docList = [];
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

    /**
     * 添加文档按钮点击事件
     */
    addDoc () {
        if (this.selectedType) {
            this.docModal.open();
            this.showModal = true;
        } else {
            Sys.sysAlert('请先选择文档类型再上传文档！');
        }
    }

    /**
     * 取消添加文档按钮点击事件
     */
    onDocCancle () {
        this.docModal.close();
    }

    /**
     * 选中某个文档类型
     */
    onSelect (docType): void {
        this.typeTitle = docType.c_info;
        this.selectedType = docType.c_id;
        this.getDocByType();
    }

    /**
     * 获取某个类型下面的所有文档
     */
    getDocByType () {
        this.documentManageService.getDocDataByType({c_id: this.selectedType}).subscribe(
            (res) => {
                if (res.code === 'ok') {
                    this.docList = res.result;
                } else {
                    this.docList = [];
                }
            },
            (error) => {
                Sys.sysAlert(error);
            }
        )
    }

    /**
     * 添加文档确定按钮点击事件
     */
    onDocConfirm () {
        this.docModal.close();
        this.getData();
        this.getDocByType();
    }

    /**
     * 删除某个文档
     * @param doc
     */
    deleteDocById (doc) {
        Sys.sysConfirm('确定要删除该文档吗？', () => {
            this.documentManageService.deleteDoc({c_id: doc.c_id}).subscribe(
                (res) => {
                    if (res.code === 'ok') {
                        this.getDocByType();
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

}
