/**
 * Created by Hllinc on 2016-11-14 14:55.
 */
import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {ResourceService} from '../../resource.service';
import {Resource} from '../../../../models/resource';
import {IActionMapping, KEYS, TREE_ACTIONS, TreeNode} from 'angular-tree-component';
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import { Subscription } from 'rxjs/Subscription';
import { ServerData } from '../../../../../../../../models/server-data.model';
import { ConfirmationService } from 'primeng/primeng';

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
	_checkIds: Array<string> = [];
	tree: any = null;
	resources: any[] = null;
	selectedNode: TreeNode = null;
	allowDrag: boolean = true;
	treeOptions = {
		isExpandedField: 'expanded',
		idField: 'id',
		actionMapping,
		allowDrag: this.allowDrag,
		animateExpand: true
	};
	@Output('selectResource')
	selectResource: EventEmitter<Object> = new EventEmitter<Object>();
	@Output('checkResource')
	checkResource: EventEmitter<Object> = new EventEmitter<Object>();
	@Input('selectable') selectable: boolean = false;

	@Input()
	set checkIds(checkIds: Array<string>) {
		this._checkIds = checkIds || [];
		if (this.tree) {
			if (this.tree.treeModel.nodes) {
				this.changeCheckResources(this.tree.treeModel.roots[0]);
				this.updateTree();
			}
		}
	}

	get name() {
		return this._checkIds;
	}


	constructor(private resourceService: ResourceService, private confirmationService: ConfirmationService) {
	}

	ngOnInit(): void {
		this.getResources();
	}

	/**
	 * 更新树
	 */
	updateTree() {
		if (this.tree) {
			this.tree.treeModel.update();
		}
	}

	/**
	 * 获取资源列表
	 */
	getResources(): void {
		const sub: Subscription = this.resourceService.getResources().subscribe(
			(serverData: ServerData) => {
				sub.unsubscribe();
				this.resources = [serverData];
				this.formatTreeData(this.resources);
			});
	}

	/**
	 * 格式化树数据
	 * @param treeData
	 */
	formatTreeData(treeData: any) {
		if (Array.isArray(treeData)) {
			treeData.forEach((data: any) => {
				this.formatTreeData(data);
			});
		} else {
			treeData.expanded = true;
			if (treeData.children) {
				this.formatTreeData(treeData.children);
			} else {
				treeData.children = [];
			}
		}
	}

	/**
	 * 根据checkIds改变页面节点复选框状态
	 * @param node 当前节点
	 */
	changeCheckResources(node: ITreeNode): any {
		if (node) {
			const children: Array<Object> = node.children ? node.children : [],
				resource = node.data;
			resource.c_checked = 0;
			for (let i = 0; i < this._checkIds.length; i++) {
				const id = this._checkIds[i];
				if (resource.id === id) {
					resource.c_checked = 2;
					break;
				}
			}
			// 如果子集还有children着继续调用调用
			if (children.length > 0) {
				children.forEach((child: ITreeNode) => {
					// 递归
					this.changeCheckResources(child);
				});
			} else {
				this.checkParentState(node);
			}
		}
	}

	/**
	 * 添加资源
	 */
	addResource(): void {
		const newResource: Resource = new Resource('新资源', '#', this.selectedNode.data.data.id, '', '', '', 'menu');
		const sub: Subscription = this.resourceService.addResource(newResource).subscribe(
			(serverData: ServerData) => {
				sub.unsubscribe();
				newResource.id = serverData.result.id.toString();
				const obj = {
					a_attr: {
						describe: serverData.result.describe,
						icon: serverData.result.icon,
						sn: serverData.result.sn,
						type: serverData.result.type,
						url: serverData.result.url
					},
					children: [],
					data: serverData.result
				};
				this.selectedNode.data.children.push(obj);
				this.tree.treeModel.update();
			});
	}

	/**
	 * 删除资源
	 */
	deleteResource(): void {
		this.confirmationService.confirm({
			header: '系统提示',
			message: `确定删除 【${this.selectedNode.data.data.name}】吗？`,
			acceptVisible: true,
			accept: () => {
				const pid: string = this.selectedNode.data.data.parentId;
				const sub: Subscription = this.resourceService.deleteResource({id: this.selectedNode.data.id}).subscribe((serverData: ServerData) => {
					sub.unsubscribe();
					if (serverData.code === 'ok') {
						this.removeNode(this.selectedNode);
						this.activateNode(pid);
					}
				});
			},
			rejectVisible: true,
			reject: () => {}
		});
	}

	/**
	 * 节点复选框点击事件
	 * @param $event
	 * @param node 当前节点
	 */
	checkResourceFn($event: any, node: ITreeNode): void {

		const checkbox: HTMLInputElement = $event.target, isChecked: boolean = checkbox.checked;
		// 使用树根节点的id来初始化_checkIds

		if (this._checkIds.length <= 0) {
			this._checkIds.push(this.tree.treeModel.roots[0].data.id);
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
	changeCheckIds(isChecked: boolean, node: ITreeNode): any {
		// this._checkIds选中的资源列表id[]
		const resource: Resource = node.data, // resource当前结点
			children: Array<Object> = node.children ? node.children : []; // children子节点集合
		if (isChecked) { // 选中之后
			// 如果checkbox的id不在_checkIds这个数组中则push
			if (this._checkIds.indexOf(resource.id) < 0) {
				this._checkIds.push(resource.id); // 将当前结点的id添加到_checkIds数组中
			}
			resource.c_checked = 2;
		} else { // 取消选中,将_checkIds中对应的id splice(index,1)
			if (this._checkIds.indexOf(resource.id) >= 0) {
				this._checkIds.splice(this._checkIds.indexOf(resource.id), 1); // 删除对应的id
			}
			resource.c_checked = 0;
		}
		if (children.length > 0) { // 如果还有子集则
			// 将遍历的child作为参数node传入 最终获得当前及所有子集的id,依次push到_checkIds数组中
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
	checkParentState(node: ITreeNode): any {
		const parent_node = node.parent;
		if (parent_node) {
			const resource: Resource = parent_node.data,
				states: Array<number> = checkChildrenState(parent_node);
			let flag: number = 1, // parent_node的选中状态
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
				if (typeof resource.id === 'string' && this._checkIds.indexOf(resource.id) >= 0) {
					this._checkIds.splice(this._checkIds.indexOf(resource.id), 1);
				}
			} else {
				if (typeof resource.id === 'string' && this._checkIds.indexOf(resource.id) < 0) {
					this._checkIds.push(resource.id);
				}
			}
			resource.c_checked = flag;

			// 递归
			this.checkParentState(parent_node);
		}

		// 返回所有的子代节点的选中状态
		function checkChildrenState(node2: ITreeNode): Array<number> {
			const parent_children: Array<Object> = node2.children,
				states: Array<number> = [];

			parent_children.forEach((child: ITreeNode) => {
				const resource: Resource = child.data;
				states.push(resource.c_checked);
			});
			return states;
		}
	}

	/**
	 * 删除节点
	 * @param node
	 */
	removeNode(node: TreeNode): void {
		_.remove(node.parent.data.children, node.data);
		this.tree.treeModel.update();
	}

	/**
	 * 激活节点
	 * @param id
	 */
	activateNode(id: string) {
		this.tree.treeModel.getNodeById(id)
			.setActiveAndVisible();
	}

	/**
	 * 子节点总数
	 * @param node
	 * @returns {string}
	 */
	childrenCount(node: TreeNode): string {
		return node && node.children && node.children.length > 0 ? `(${node.children.length})` : '';
	}

	/**
	 * 节点过滤
	 * @param text
	 * @param tree
	 */
	filterNodes(text: any, tree: any): void {
		tree.treeModel.filterNodes(text, true);
	}

	/**
	 * 节点激活事件
	 * @param $event
	 */
	onActivate($event: any): void {
		const eventName: string = $event.eventName;
		if (eventName === 'onActivate') {
			this.selectedNode = $event.node;
			this.selectResource.emit(this.selectedNode.data);

		}
	}

	/**
	 * 数初始化完成事件
	 * @param tree
	 */
	onInitialized(tree: any): void {
		this.tree = tree;
		this.changeCheckResources(this.tree.treeModel.roots[0]);
		this.updateTree();
	}

	/**
	 * 节点拖动事件
	 * @param $event
	 */
	onMoveNode($event: any): void {
		const parentNodeData = $event.to.parent,
			currentNodeData = $event.node.data,
			currentPosition = $event.to.index;
		const sub: Subscription = this.resourceService.updateParent({
			now: parentNodeData.id,
			id: currentNodeData.id,
			position: currentPosition
		}).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				currentNodeData.c_parent_id = parentNodeData.id;
				for (let i = 0; i < parentNodeData.children.length; i++) {
					parentNodeData.children[i].n_order = i;
				}
			}
		});
	}
}
