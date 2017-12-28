import { Component } from '@angular/core';
import Viewer = Cesium.Viewer;
import ViewerOptions = Cesium.ViewerOptions;
import { TiandituImageryProvider, TiandituMapsStyle } from 'e-ngx-cesium';
import ImageryProvider = Cesium.ImageryProvider;
import Globe = Cesium.Globe;
import Scene = Cesium.Scene;

@Component({
	templateUrl: './cesium.component.html',
	styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent {
	viewerOptions: ViewerOptions;
	viewer: Viewer;
	scene: Scene;
	globe: Globe;
	contrastImageryProviders: ImageryProvider[] = [];
	enableRollerShutters: boolean = true;

	constructor() {
		this.viewerOptions = {
			vrButton: true // 启用VR模式
		};
		this.contrastImageryProviders = [
			new TiandituImageryProvider(TiandituMapsStyle.VEC_C),
			new TiandituImageryProvider(TiandituMapsStyle.TER_C),
			new TiandituImageryProvider(TiandituMapsStyle.CVA_C),
			new TiandituImageryProvider(TiandituMapsStyle.CTA_C)
		];
	}

	onViewerReady(evt: any) {
		this.viewer = evt.viewer;
		this.scene = evt.scene;
		this.globe = evt.globe;
	}

	onSliderChange(evt: any) {
		console.log(evt);
	}
}

