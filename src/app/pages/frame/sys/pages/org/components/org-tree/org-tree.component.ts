/**
 * Created by Hllinc on 2016-11-14 11:20.
 */
import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';

import {IActionMapping, TREE_ACTIONS, KEYS, TreeNode} from "angular-tree-component";

import * as _ from 'lodash';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {DataService} from "../../../../../../../services/data.service";
import {Sys} from "../../../../../../../utils/sys";
import {Org} from "../../../../models/org";

const actionMapping: IActionMapping = {
    mouse: {
        contextMenu: (tree, node, $event) => {
            $event.preventDefault();
            // alert(`context menu for ${node.data.name}`);
        },
        dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        click: (tree, node, $event) => {
            TREE_ACTIONS.SELECT(tree, node, $event)
            // $event.shiftKey
            //     ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
            //     : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
        }
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
};

@Component({
    selector: 'org-tree',
    templateUrl: './org-tree.component.html',
    styleUrls: ['./org-tree.component.scss']
})
export class OrgTreeComponent implements OnInit {
    /**
     * 树属性配置参数
     * @type {{isExpandedField: string; idField: string; getChildren: any; actionMapping: IActionMapping; allowDrag: boolean}}
     */
    customTemplateStringOptions = {
        isExpandedField: 'expanded',
        idField: 'c_id',
        actionMapping,
        allowDrag: true
    };

    @Input('allow-drag')
    set allowDrag (b: boolean) {
        this.customTemplateStringOptions.allowDrag = b;
    };

    @Output()
    output: EventEmitter<Object> = new EventEmitter<Object>();
    tree: any = null;
    orgs: any[] = null;
    selectedNode: TreeNode = null;

    @ViewChild('orgFormModal')
    modal: ModalComponent;
    selected: string;
    index: number = 0;
    cssClass: string = '';

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    css: boolean = false;

    updateName: string = '';

    constructor (private dataService: DataService) { }

    asyncChildren = [
        {
            c_name: 'child2.1',
            c_comment: 'new and improved'
        }, {
            c_name: 'child2.2',
            c_comment: 'new and improved2'
        }
    ];

    opened () {
        this.updateName = this.selectedNode.data.c_name;
    }

    onSubmit () {
        this.dataService.postData('auth/org/updateName.do', {
            c_id: this.selectedNode.data.c_id,
            c_name: this.updateName
        }).subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    this.selectedNode.data.c_name = this.updateName;
                    this.tree.treeModel.update();
                    this.modal.close();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    addOrg () {
        let newOrg: Org = new Org(this.selectedNode.data.c_id, '新建组织机构',  this.selectedNode.children ? this.selectedNode.children.length : 0, []);
        this.dataService.postData('auth/org/add.do', newOrg).subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    newOrg.c_id = serverData.result.toString();
                    this.selectedNode.data.children.push(newOrg);
                    this.tree.treeModel.update();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    removeNode (node: TreeNode) {
        _.remove(node.parent.data.children, node.data);
        this.tree.treeModel.update();
    }

    deleteOrg () {
        Sys.sysConfirm('确定删除[' + this.selectedNode.data.c_name + ']', ()=> {
            let pid: string = this.selectedNode.data.c_parent_id;
            this.dataService.postData('auth/org/deleteById.do', this.selectedNode.data).subscribe(
                (serverData) => {
                    if (serverData.code == 'ok') {
                        this.removeNode(this.selectedNode);
                        this.activateNode(pid);
                    } else {
                        Sys.sysAlert(serverData.info);
                    }
                },
                (error) => {
                    Sys.sysAlert(error);
                });
        });
    }

    /**
     * 打开组织机构编辑窗口
     */
    modifyOrg () {
        this.modal.open();
    }

    /**
     * 计算子节点个数
     * @param node
     * @returns {string}
     */
    childrenCount (node: TreeNode): string {
        return node && node.children && node.children.length > 0 ? `(${node.children.length})` : '';
    }

    /**
     * 过滤节点
     * @param text
     * @param tree
     */
    filterNodes (text: any, tree: any) {
        tree.treeModel.filterNodes(text, true);
    }

    /**
     * 根据id选中节点
     * @param id
     */
    activateNode (id: string) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        this.tree.treeModel.getNodeById(id)
            .setActiveAndVisible();
    }

    /**
     * 所有事件
     * @param $event
     */
    onEvent ($event: any) {
        //console.log($event.eventName);
    }

    /**
     * 选中事件
     * @param $event
     */
    onActivate ($event: any) {
        let eventName: string = $event.eventName;
        if (eventName == 'onActivate') {
            this.selectedNode = $event.node;
            this.output.emit(this.selectedNode.data);
        }
    }

    /**
     * 拖动事件
     * @param $event
     */
    onMoveNode ($event: any) {
        let currentNodeData = $event.node;
        let parentNodeData = $event.to.node.data;
        this.dataService.postData('auth/org/updateParent.do', {
            c_id: currentNodeData.c_id,
            c_parent_id: parentNodeData.c_id
        }).subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    currentNodeData.c_parent_id = parentNodeData.c_id;
                    for (let i = 0; i < parentNodeData.children.length; i++) {
                        parentNodeData.children[i].n_order = i;
                    }
                    this.dataService.postData('auth/org/updateBatch.do', parentNodeData.children).subscribe(
                        (serverData) => {
                            if (serverData.code == 'ok') {

                            } else {
                                Sys.sysAlert(serverData.info);
                            }
                        },
                        (error) => {
                            Sys.sysAlert(error);
                        });
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    /**
     * 树初始化事件
     * @param tree
     */
    onInitialized (tree: any) {
        this.tree = tree;
    }

    go ($event: any) {
        $event.stopPropagation();
        alert('this method is on the app component')
    }

    closeOrgForm(org:Org){
      this.modal.close();
    }

    /**
     * 获取组织机构
     */
    getOrgs (): void {
        this.dataService.getData('auth/org/selectAll.do').subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    this.orgs = <Org[]>serverData.result;
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    ngOnInit (): void {
        this.getOrgs();
    }
}
