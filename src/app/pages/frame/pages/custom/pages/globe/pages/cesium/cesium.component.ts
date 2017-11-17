import { Component, OnInit } from '@angular/core';
import ViewerOptions = Cesium.ViewerOptions;
import Viewer = Cesium.Viewer;

@Component({
	templateUrl: './cesium.component.html',
	styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit {
	viewerOptions: ViewerOptions = <ViewerOptions>{
		scene3DOnly: true,
		selectionIndicator: false,
		baseLayerPicker: false
	};

	constructor() {
	}

	ngOnInit() {
	}

	onViewerReady($event: Viewer) {
		const viewer: Viewer = $event;

		//////////////////////////////////////////////////////////////////////////
		// Loading Imagery
		//////////////////////////////////////////////////////////////////////////

		// Add Bing imagery
		Cesium.BingMapsApi.defaultKey = 'AihaXS6TtE_olKOVdtkMenAMq1L5nDlnU69mRtNisz1vZavr1HhdqGRNkB2Bcqvs'; // For use with this application only
		viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
			url: 'https://dev.virtualearth.net',
			mapStyle: Cesium.BingMapsStyle.AERIAL
		}));

		//////////////////////////////////////////////////////////////////////////
		// Loading Terrain
		//////////////////////////////////////////////////////////////////////////

		// Load STK World Terrain
		viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
			url: 'https://assets.agi.com/stk-terrain/world',
			requestWaterMask: true,
			requestVertexNormals: true
		});
		// Enable depth testing so things behind the terrain disappear.
		// 确保地形背后的物体被正确地遮挡。只有最前面的对象才可见。
		viewer.scene.globe.depthTestAgainstTerrain = true;
	}
}

