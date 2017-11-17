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
		// Loading Imagery 加载影像
		//////////////////////////////////////////////////////////////////////////

		// Add Bing imagery
		Cesium.BingMapsApi.defaultKey = 'AihaXS6TtE_olKOVdtkMenAMq1L5nDlnU69mRtNisz1vZavr1HhdqGRNkB2Bcqvs'; // For use with this application only
		viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
			url: 'https://dev.virtualearth.net',
			mapStyle: Cesium.BingMapsStyle.AERIAL
		}));

		//////////////////////////////////////////////////////////////////////////
		// Loading Terrain 加载高程
		//////////////////////////////////////////////////////////////////////////

		// Load STK World Terrain
		viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
			url: 'https://assets.agi.com/stk-terrain/world',
			requestWaterMask: true,
			requestVertexNormals: true
		});
		// 确保地形背后的物体被正确地遮挡。只有最前面的对象才可见。
		viewer.scene.globe.depthTestAgainstTerrain = true;

		//////////////////////////////////////////////////////////////////////////
		// Configuring the Scene 场景设置
		//////////////////////////////////////////////////////////////////////////

		// 基于太阳/月球位置的照明
		viewer.scene.globe.enableLighting = true;

		// Create an initial camera view
		const initialPosition = Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
		const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
		const homeCameraView = {
			destination: initialPosition,
			orientation: {
				heading: initialOrientation.heading,
				pitch: initialOrientation.pitch,
				roll: initialOrientation.roll
			}
		};
		// Set the initial view
		viewer.scene.camera.setView(homeCameraView);

		// Add some camera flight animation options
		homeCameraView['duration'] = 2.0;
		homeCameraView['maximumHeight'] = 2000;
		homeCameraView['pitchAdjustHeight'] = 2000;
		homeCameraView['endTransform'] = Cesium.Matrix4.IDENTITY;
		// Override the default home button
		viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
			e.cancel = true;
			viewer.scene.camera.flyTo(homeCameraView);
		});

		// Set up clock and timeline.
		viewer.clock.shouldAnimate = true; // default
		viewer.clock.startTime = Cesium.JulianDate.fromIso8601('2017-07-11T16:00:00Z');
		viewer.clock.stopTime = Cesium.JulianDate.fromIso8601('2017-07-11T16:20:00Z');
		viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2017-07-11T16:00:00Z');
		viewer.clock.multiplier = 2; // sets a speedup
		viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
		viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
		viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // set visible range
	}
}

