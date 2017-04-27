/**
 * Created by Hllinc on 2016-11-14 14:55.
 */
import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {IActionMapping, TREE_ACTIONS, KEYS, TreeNode} from "angular-tree-component";
import {ITreeNode} from "angular-tree-component/dist/defs/api";
import * as _ from 'lodash';

import {ResourceService} from "../../resource.service";
import {Sys} from "../../../../../../../utils/sys";
import {Resource} from "../../../../models/resource";
import {ServerData} from "../../../../models/server-data";

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
    selector: 'resource-tree',
    templateUrl: './resource-tree.template.html',
    styleUrls: ['./resource-tree.style.scss']
})
export class ResourceTreeComponent implements OnInit {
    @Output('selectResource')
    selectResource: EventEmitter<Object> = new EventEmitter<Object>();
    @Output('checkResource')
    checkResource: EventEmitter<Object> = new EventEmitter<Object>();
    @Input('selectable') selectable: boolean = false;

    @Input()
    set checkIds (checkIds: Array<string>) {
        this._checkIds = checkIds || [];
        if (this.tree) {
            this.changeCheckResources(this.tree.treeModel.roots[0]);
            this.updateTree();
        }
    }

    get name () {
        return this._checkIds;
    }

    private _checkIds: Array<string> = [];
    tree: any = null;
    resources: any[] = null;
    selectedNode: TreeNode = null;
    allowDrag: boolean = true;
    treeOptions = {
        isExpandedField: 'expanded',
        idField: 'c_id',
        actionMapping,
        allowDrag: this.allowDrag
    };

    constructor (private resourceService: ResourceService) {}

    ngOnInit (): void {
        this.getResources();
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
    getResources (): void {
        this.resourceService.getResources().subscribe(
            (serverData: ServerData) => {
                if (serverData.code === "ok") {
                    this.resources = <Resource[]>serverData.result;
                    this.selectable && this.updateTree();
                } else {
                    Sys.sysAlert(serverData.info);
                }
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }

    /**
     * 根据checkIds改变页面节点复选框状态
     * @param node 当前节点
     */
    changeCheckResources (node: ITreeNode): any {
        let children: Array<Object> = node.children,
            resource = node.data;

        resource.c_checked = 0;
        for (let i = 0; i < this._checkIds.length; i++) {
            let id = this._checkIds[i];
            if (resource.c_id === id) {
                resource.c_checked = 2;
                break;
            }
        }
        if (children.length > 0) {
            children.forEach((child: ITreeNode) => {
                // 递归
                this.changeCheckResources(child);
            });
        } else {
            this.checkParentState(node);
        }
    }

    /**
     * 添加资源
     */
    addResource (): void {
        let newResource: Resource = new Resource('新资源', '#', this.selectedNode.data.c_id, '', '', this.selectedNode.children ? this.selectedNode.children.length : 0, 0, []);
        this.resourceService.addResource(newResource).subscribe(
            (serverData: ServerData) => {
                if (serverData.code == 'ok') {
                    newResource.c_id = serverData.result.toString();
                    this.selectedNode.data.children.push(newResource);
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
     * 删除资源
     */
    deleteResource (): void {
        Sys.sysConfirm(`确定删除 【${this.selectedNode.data.c_name}】？`, ()=> {
            let pid: string = this.selectedNode.data.c_parent_id;
            this.resourceService.deleteResource(this.selectedNode.data).subscribe(
                (serverData: ServerData) => {
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
     * 节点复选框点击事件
     * @param $event
     * @param node 当前节点
     */
    checkResourceFn ($event: any, node: ITreeNode): void {
        let checkbox: HTMLInputElement = $event.target,
            isChecked: boolean = checkbox.checked;

        // 使用树根节点的id来初始化_checkIds
        if (this._checkIds.length <= 0) {
            this._checkIds.push(this.tree.treeModel.roots[0].data.c_id);
        }

        // 改变当前结点的选中状态
        this.changeCheckIds(isChecked, node);

        // 改变当前节点的父辈节点的选中状态
        this.checkParentState(node);

        // _checkIds长度为1时即只有一个根节点id则置空
        if (this._checkIds.length <= 1) {
            this._checkIds = [];
        }

        // 更新树
        this.updateTree();

        // 发送checkResource事件
        this.checkResource.emit(this._checkIds);
    }

    /**
     * 根据当前节点选中状态来设置子代节点的选中状态以及修改_checkIds的值
     * @param isChecked 当前节点的选中状态
     * @param node 当前节点
     */
    changeCheckIds (isChecked: boolean, node: ITreeNode): any {
        let resource: Resource = node.data,
            children: Array<Object> = node.children;
        if (isChecked) {
            if (this._checkIds.indexOf(resource.c_id) < 0) {
                this._checkIds.push(resource.c_id);
            }
            resource.c_checked = 2;
        } else {
            if (this._checkIds.indexOf(resource.c_id) >= 0) {
                this._checkIds.splice(this._checkIds.indexOf(resource.c_id), 1);
            }
            resource.c_checked = 0;
        }
        if (children.length > 0) {
            children.forEach((child: ITreeNode) => {
                // 递归
                this.changeCheckIds(isChecked, child);
            });
        }
    }

    /**
     * 根据子节点的选中状态设置父辈节点的选中状态以及修改_checkIds的值
     * @param node 当前节点
     */
    checkParentState (node: ITreeNode) : any {
        let parent_node = node.parent;
        if (parent_node) {
            let resource: Resource = parent_node.data,
                states: Array<number> = checkChildrenState(parent_node),
                flag: number = 1, // parent_node的选中状态
                f0: number = 0, // 状态0出现的次数
                f2: number = 0; // 状态2出现的次数

            states.forEach((state: number) => {
                if (state === 0) {
                    f0++;
                } else if (state === 2) {
                    f2++;
                }
            });
            if (f0 === states.length) {
                flag = 0;
            } else if (f2 === states.length) {
                flag = 2;
            }

            if (flag === 0) {
                if (typeof resource.c_id === 'string' && this._checkIds.indexOf(resource.c_id) >= 0) {
                    this._checkIds.splice(this._checkIds.indexOf(resource.c_id), 1);
                }
            } else {
                if (typeof resource.c_id === 'string' && this._checkIds.indexOf(resource.c_id) < 0) {
                    this._checkIds.push(resource.c_id);
                }
            }
            resource.c_checked = flag;

            // 递归
            this.checkParentState(parent_node);
        }

        // 返回所有的子代节点的选中状态
        function checkChildrenState (node: ITreeNode) : Array<number> {
            let parent_children: Array<Object> = node.children,
                states: Array<number> = [];

            parent_children.forEach((child: ITreeNode) => {
                let resource: Resource = child.data;
                states.push(resource.c_checked);
            });
            return states;
        }
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
            this.selectResource.emit(this.selectedNode.data);
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
        this.resourceService.updateParent({
            c_id: currentNodeData.c_id,
            c_parent_id: parentNodeData.c_id
        }).subscribe(
            (serverData: ServerData) => {
                if (serverData.code == 'ok') {
                    currentNodeData.c_parent_id = parentNodeData.c_id;
                    for (let i = 0; i < parentNodeData.children.length; i++) {
                        parentNodeData.children[i].n_order = i;
                    }
                    this.resourceService.updateBatch(parentNodeData.children).subscribe(
                        (serverData: ServerData) => {
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
