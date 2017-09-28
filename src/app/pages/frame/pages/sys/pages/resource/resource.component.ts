/**
 * Created by Hllinc on 2016-10-28 11:54.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Resource} from '../../models/resource';
import {ResourceTreeComponent} from './components/resource-tree/resource-tree.component';
import {IActionMapping, KEYS, TREE_ACTIONS} from 'angular-tree-component';

const actionMapping: IActionMapping = {
	mouse: {
		contextMenu: (tree, node, $event) => {
			$event.preventDefault();
			alert(`context menu for ${node.data.name}`);
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
	templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
	@ViewChild(ResourceTreeComponent)
	resourceTreeComponent: ResourceTreeComponent;
	errorMessage: string;
	resources: any[] = null;
	selectedResource: Resource = null;


	constructor() {
	}

	deleteResource() {
		this.resourceTreeComponent.deleteResource();
	}

	addResource() {
		this.resourceTreeComponent.addResource();
	}

	selectResource($event: any) {
		this.selectedResource = $event;
	}

	ngOnInit(): void {
	}
}
