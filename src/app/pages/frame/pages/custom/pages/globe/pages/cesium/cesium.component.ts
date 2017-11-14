import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Viewer = Cesium.Viewer;
import ViewerOptions = Cesium.ViewerOptions;

@Component({
	templateUrl: './cesium.component.html',
	styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit {
	@ViewChild('cesiumContainer') cesiumContainerRef: ElementRef;
	cesiumContainer: HTMLDivElement;
	viewer: Viewer;

	constructor() {
	}

	ngOnInit() {
		this.cesiumContainer = this.cesiumContainerRef.nativeElement;
		this.initViewer();
	}

	/**
	 * 初始化视图
	 */
	initViewer() {
		const options: ViewerOptions = {
			fullscreenElement: this.cesiumContainer // 设置全屏的元素
		};
		this.viewer = new Cesium.Viewer(this.cesiumContainer, options);
	}
}
