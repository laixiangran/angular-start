import { Component, OnInit } from '@angular/core';
import Viewer = Cesium.Viewer;
import ViewerOptions = Cesium.ViewerOptions;

@Component({
	templateUrl: './cesium.component.html',
	styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit {
	viewerOptions: ViewerOptions;
	viewer: Viewer;

	constructor() {
	}

	ngOnInit() {
	}

	onViewerReady($event: Viewer) {
		this.viewer = $event;
		console.log(this.viewer);
	}
}

