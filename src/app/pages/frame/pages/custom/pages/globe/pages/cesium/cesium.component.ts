import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	templateUrl: './cesium.component.html',
	styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit {
	@ViewChild('cesiumContainer') cesiumContainerRef: ElementRef;
	cesiumContainer: HTMLDivElement;
	viewer: any;

	constructor() {
		window['CESIUM_BASE_URL'] = '/assets/scripts/cesium'; // 设置cesium的请求基础路径，默认是'/'
	}

	ngOnInit() {
		this.cesiumContainer = this.cesiumContainerRef.nativeElement;
		this.initViewer();
	}

	/**
	 * 初始化视图
	 */
	initViewer() {
		this.viewer = new Cesium.Viewer(this.cesiumContainer, {
			fullscreenElement: this.cesiumContainer // 设置全屏的元素
		});
	}

}
