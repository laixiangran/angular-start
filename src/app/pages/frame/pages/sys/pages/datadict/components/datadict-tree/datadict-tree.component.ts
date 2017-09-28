/**
 * Created by Hllinc on 2016-11-29 0029 17:27.
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IActionMapping, TREE_ACTIONS, KEYS, TreeNode } from 'angular-tree-component';
import { DatadictService } from '../../datadict.service';
import { Subscription } from 'rxjs/Subscription';

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
	@Output()
	selectedValue: EventEmitter<any> = new EventEmitter<any>();
	tree: any = null;
	datadicts: any[] = null;
	selectedNode: TreeNode = null;
	datadictTreeOptions = {
		isExpandedField: 'expanded',
		idField: 'id',
		actionMapping,
		allowDrag: true,
		animateExpand: true,
	};
	defaultDatadictType: any;
	hasUpdate: boolean;
	hasTree: boolean = false;

	@Input()
	set datadictType(value: any) {
		if (value) {
			this.hasTree = false;
			this.defaultDatadictType = JSON.parse(JSON.stringify(value));
			this.postDatadicts();
		}
	}

	@Input()
	set isUpdate(value: string) {
		if (value) {
			if (value === '0') {
				this.hasUpdate = false;
			} else {
				this.hasUpdate = true
			}
		}
	}

	@Input()
	set isUpdateTree(value: any) {
		if (value) {
			this.postDatadicts();
		}
	}

	constructor(private datadictService: DatadictService) {
	}

	ngOnInit() {
	}

	/**
	 * 获取资源列表
	 */
	postDatadicts(): void {
		this.datadicts = null;
		const sub: Subscription = this.datadictService.postDatadicts(this.defaultDatadictType.type).subscribe((serverData) => {
			sub.unsubscribe();
			const data = [serverData];
			this.formatTreeData(data);
			this.datadicts = JSON.parse(JSON.stringify(data));
			this.hasTree = true;
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
	 * 子节点总数
	 * @param node
	 * @returns {string}
	 */
	childrenCount(node: TreeNode): string {
		return node && node.children && node.children.length > 0 ? `(${node.children.length})` : '';
	}

	/**
	 * 节点激活事件
	 * @param $event
	 */
	onActivate($event: any): void {
		const eventName: string = $event.eventName;
		if (eventName === 'onActivate') {
			this.selectedNode = $event.node;
			this.selectedValue.emit(this.selectedNode);
		}
	}

	/**
	 * 数初始化完成事件
	 * @param tree
	 */
	onInitialized(tree: any): void {
		this.tree = tree;
	}

	/**
	 * 节点拖动事件
	 * @param $event
	 */
	onMoveNode($event: any): void {
		const parentNodeData = $event.to.parent,
			currentNodeData = $event.node,
			currentPosition = $event.to.index;

		const sub: Subscription = this.datadictService.updateParent({
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
}
