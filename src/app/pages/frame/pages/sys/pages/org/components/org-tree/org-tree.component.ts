/**
 * Created by Hllinc on 2016-11-14 11:20.
 */
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Org } from '../../../../models/org';
import { IActionMapping, KEYS, TREE_ACTIONS, TreeNode } from 'angular-tree-component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs/Subscription';
import { OrgService } from '../../org.service';
import { ServerData } from '../../../../../../../../models/server-data.model';
import { ConfirmationService } from 'primeng/primeng';

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
	 */
	customTemplateStringOptions = {
		isExpandedField: 'expanded',
		idField: 'id',
		actionMapping,
		allowDrag: true,
		animateExpand: true,
	};

	@Input('allow-drag')
	set allowDrag(b: boolean) {
		this.customTemplateStringOptions.allowDrag = b;
	};

	@Output()
	output: EventEmitter<Object> = new EventEmitter<Object>();
	tree: any = null;
	orgs: any[] = null;
	selectedNode: any = null;

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

	ngOnInit(): void {
		this.getOrgs();
	}

	constructor(private orgService: OrgService, private confirmationService: ConfirmationService) {
	}

	opened() {
		this.updateName = this.selectedNode.data.name;
	}

	onSubmit() {
		const sub: Subscription = this.orgService.updateSysUnit({
			id: this.selectedNode.data.id,
			name: this.updateName
		}).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				this.selectedNode.data.name = this.updateName;
				this.tree.treeModel.update();
				this.modal.close();
			}
		});
	}

	/**
	 * 添加一个组织机构
	 */
	addOrg() {
		const newOrg: Org = new Org('新建组织机构', this.selectedNode.data.id, 0);
		const sub: Subscription = this.orgService.addSysUnit(newOrg).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
			if (serverData.code === 'ok') {
				const obj = {
					a_attr: {
						address: serverData.result.address,
						email: serverData.result.email,
						fax: serverData.result.fax,
						id: serverData.result.id,
						principal: serverData.result.principal,
						tel: serverData.result.tel,
						type: serverData.result.type
					},
					children: [],
					data: serverData.result,
					iconClass: 'type',
					id: serverData.result.id,
					leaf: true,
					text: serverData.result.name
				};
				this.selectedNode.data.children = this.selectedNode.data.children ? this.selectedNode.data.children : [];
				this.selectedNode.data.children.push(obj);
				this.tree.treeModel.update();
			}
		});
	}

	/**
	 * 移出节点
	 * @param node
	 */
	removeNode(node: TreeNode) {
		_.remove(node.parent.data.children, node.data);
		this.tree.treeModel.update();
	}

	/**
	 * 删除节点
	 */
	deleteOrg() {
		this.confirmationService.confirm({
			header: '系统提示',
			message: `确定删除 【${this.selectedNode.data.text}】吗？`,
			acceptVisible: true,
			accept: () => {
				const sub: Subscription = this.orgService.deleteSysUnit(this.selectedNode.data.id).subscribe((serverData: ServerData) => {
					sub.unsubscribe();
					if (serverData.code === 'ok') {
						// Sys.sysAlert('刪除成功！');
						this.removeNode(this.selectedNode);
					}
				});
			},
			rejectVisible: true,
			reject: () => {}
		});
	}

	/**
	 * 打开组织机构编辑窗口
	 */
	modifyOrg() {
		this.modal.open();
	}

	/**
	 * 计算子节点个数
	 * @param node
	 * @returns {string}
	 */
	childrenCount(node: TreeNode): string {
		return node && node.children && node.children.length > 0 ? `(${node.children.length})` : '';
	}

	/**
	 * 过滤节点
	 * @param text
	 * @param tree
	 */
	filterNodes(text: any, tree: any) {
		tree.treeModel.filterNodes(text, true);
	}

	/**
	 * 根据id选中节点
	 * @param id
	 */
	activateNode(id: string) {
		// tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
		this.tree.treeModel.getNodeById(id).setActiveAndVisible();
	}

	/**
	 * 所有事件
	 * @param $event
	 */
	onEvent($event: any) {
		// console.log($event.eventName);
	}

	/**
	 * 选中事件
	 * @param $event
	 */
	onActivate($event: any) {
		const eventName: string = $event.eventName;
		if (eventName === 'onActivate') {
			this.selectedNode = $event.node;
			this.output.emit(this.selectedNode);
		}
	}

	/**
	 * 拖动事件
	 * @param $event
	 */
	onMoveNode($event: any) {
		const parentNodeData = $event.to.parent;
		const currentNodeData = $event.node.data;
		const currentPosition = $event.to.index;
		const sub: Subscription = this.orgService.moveNode({
			now: parentNodeData.id,
			id: currentNodeData.id,
			position: currentPosition
		}).subscribe(
			(serverData) => {
				sub.unsubscribe();
				if (serverData.code === 'ok') {
					currentNodeData.c_parent_id = parentNodeData.id;
					for (let i = 0; i < parentNodeData.children.length; i++) {
						parentNodeData.children[i].n_order = i;
					}
				}
			});
	}

	/**
	 * 树初始化事件
	 * @param tree
	 */
	onInitialized(tree: any) {
		this.tree = tree;
	}

	go($event: any) {
		$event.stopPropagation();
		alert('this method is on the app component')
	}

	closeOrgForm(org: Org) {
		this.modal.close();
	}

	/**
	 * 获取组织机构
	 */
	getOrgs(): void {
		const sub: Subscription = this.orgService.getSysUnitListTree().subscribe(
			(serverData: ServerData) => {
				sub.unsubscribe();
				const arr = [];
				arr.push(serverData);
				this.formatTreeData(arr);
				this.orgs = arr;
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
}
