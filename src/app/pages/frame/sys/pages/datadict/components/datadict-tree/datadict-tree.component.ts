/**
 * Created by Hllinc on 2016-11-29 0029 17:27.
 */
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {IActionMapping, TREE_ACTIONS, KEYS, TreeNode} from "angular-tree-component";
import * as _ from 'lodash';

import {DatadictService} from "../../datadict.service";
import {Datadict} from "../../../../models/datadict";
import {Sys} from "../../../../../../../utils/sys";

const actionMapping: IActionMapping = {
    mouse: {
        contextMenu: (tree, node, $event) => {
            $event.preventDefault();
        },
        dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        click: (tree, node, $event) => {
            TREE_ACTIONS.SELECT(tree, node, $event);
        }
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) => console.log(`This is ${node.data.name}`)
    }
};

@Component({
    selector: 'datadict-tree',
    templateUrl: './datadict-tree.template.html',
    styleUrls: ['./datadict-tree.style.scss']
})
export class DatadictTreeComponent implements OnInit {
    @Output('selectDatadict')
    selectDatadict: EventEmitter<Object> = new EventEmitter<Object>();
    tree: any = null;
    datadicts: any[] = null;
    selectedNode: TreeNode = null;
    treeOptions = {
        isExpandedField: 'expanded',
        idField: 'c_id',
        actionMapping,
        allowDrag: true
    };

    constructor (private datadictService: DatadictService) {}

    ngOnInit (): void {
        this.getDatadicts();
    }

    /**
     * 更新树
     */
    updateTree () {
        this.tree && this.tree.treeModel.update();
    }

    /**
     * 获取资源列表
     */
    getDatadicts (): void {
        this.datadictService.getDatadicts().subscribe(
            (serverData) => {
                if (serverData.code === "ok") {
                    this.datadicts = <Datadict[]>serverData.result;
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    /**
     * 添加数据字典
     */
    addDatadict (): void {
        let newDatadict: Datadict = new Datadict('新枚举项', this.selectedNode.data.c_id, this.selectedNode.children ? this.selectedNode.children.length : 0, 1, '', []);
        this.datadictService.addDatadict(newDatadict).subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    newDatadict.c_id = serverData.result.toString();
                    this.selectedNode.data.children.push(newDatadict);
                    this.tree.treeModel.update();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    /**
     * 删除数据字典
     */
    deleteDatadict (): void {
        Sys.sysConfirm(`确定删除 【${this.selectedNode.data.c_name}】？`, ()=> {
            let pid: string = this.selectedNode.data.c_parent_id;
            this.datadictService.deleteDatadict(this.selectedNode.data).subscribe(
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
     * 删除节点
     * @param node
     */
    removeNode (node: TreeNode): void {
        _.remove(node.parent.data.children, node.data);
        this.tree.treeModel.update();
    }

    /**
     * 激活节点
     * @param id
     */
    activateNode (id: string) {
        this.tree.treeModel.getNodeById(id)
            .setActiveAndVisible();
    }

    /**
     * 子节点总数
     * @param node
     * @returns {string}
     */
    childrenCount (node: TreeNode): string {
        return node && node.children && node.children.length > 0 ? `(${node.children.length})` : '';
    }

    /**
     * 节点过滤
     * @param text
     * @param tree
     */
    filterNodes (text: any, tree: any): void {
        tree.treeModel.filterNodes(text, true);
    }

    /**
     * 节点激活事件
     * @param $event
     */
    onActivate ($event: any): void {
        let eventName: string = $event.eventName;
        if (eventName == 'onActivate') {
            this.selectedNode = $event.node;
            this.selectDatadict.emit(this.selectedNode.data);
        }
    }

    /**
     * 数初始化完成事件
     * @param tree
     */
    onInitialized (tree: any): void {
        this.tree = tree;
    }

    /**
     * 节点拖动事件
     * @param $event
     */
    onMoveNode ($event: any): void {
        let currentNodeData = $event.node;
        let parentNodeData = $event.to.node.data;
        this.datadictService.updateParent({
            c_id: currentNodeData.c_id,
            c_parent_id: parentNodeData.c_id
        }).subscribe(
            (serverData) => {
                if (serverData.code == 'ok') {
                    currentNodeData.c_parent_id = parentNodeData.c_id;
                    for (let i = 0; i < parentNodeData.children.length; i++) {
                        parentNodeData.children[i].n_order = i;
                    }
                    this.datadictService.updateBatch(parentNodeData.children).subscribe(
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
}