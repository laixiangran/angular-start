import { Component, OnInit } from '@angular/core';
import Viewer = Cesium.Viewer;
import KmlDataSource = Cesium.KmlDataSource;
import Entity = Cesium.Entity;
import ViewerOptions = Cesium.ViewerOptions;
import Cartographic = Cesium.Cartographic;
import EntityCollection = Cesium.EntityCollection;
import CzmlDataSource = Cesium.CzmlDataSource;
import ModelGraphics = Cesium.ModelGraphics;
import Cesium3DTileStyle = Cesium.Cesium3DTileStyle;
import { SelectItem } from 'primeng/primeng';

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
	// Save an new entity collection of neighborhood data
	neighborhoods: EntityCollection;
	viewer: Viewer;
	city3DTileset: any;
	selectedStyleType: string = 'none';
	styleTypes: SelectItem[];
	drone: Entity;
	flyTypes: SelectItem[];
	selectedFlyType: string = 'none';
	homeCameraView: any;

	constructor() {
		this.styleTypes = [
			{label: '默认', value: 'none'},
			{label: '透明', value: 'transparent'},
			{label: '根据建筑高度设置', value: 'height'}
		];

		this.flyTypes = [
			{label: '自由模式', value: 'none'},
			{label: '跟踪模式', value: 'tracked'}
		];
	}

	ngOnInit() {
	}

	onViewerReady($event: Viewer) {
		this.viewer = $event;

		this.loadImagery();

		this.loadTerrain();

		this.configuringScene();

		// this.loadKMLData();

		this.loadCZMLAndGLTFData();

		this.load3DTileset();

		this.setTilesetStyle();
	}

	/**
	 * Loading Imagery 加载影像
	 * @constructor
	 */
	loadImagery() {
		// Add Bing imagery
		Cesium.BingMapsApi.defaultKey = 'AihaXS6TtE_olKOVdtkMenAMq1L5nDlnU69mRtNisz1vZavr1HhdqGRNkB2Bcqvs'; // For use with this application only
		this.viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
			url: 'https://dev.virtualearth.net',
			mapStyle: Cesium.BingMapsStyle.AERIAL
		}));
	}

	/**
	 * 加载地形数据
	 */
	loadTerrain() {
		// Load STK World Terrain
		this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
			url: 'https://assets.agi.com/stk-terrain/world',
			requestWaterMask: true,
			requestVertexNormals: true
		});
		// 确保地形背后的物体被正确地遮挡。只有最前面的对象才可见。
		this.viewer.scene.globe.depthTestAgainstTerrain = true;
	}

	/**
	 * Configuring the Scene 场景设置
	 */
	configuringScene() {
		const viewer: Viewer = this.viewer;
		// 基于太阳/月球位置的照明
		viewer.scene.globe.enableLighting = true;

		// Create an initial camera view
		const initialPosition = Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
		const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
		const homeCameraView: any = this.homeCameraView = {
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
		viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
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

	/**
	 * 加载KML数据
	 */
	loadKMLData() {
		const viewer: Viewer = this.viewer;
		const kmlOptions = {
			camera: viewer.scene.camera,
			canvas: viewer.scene.canvas,
			clampToGround: true
		};
		// Load geocache points of interest from a KML file
		// Data from : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
		const geocachePromise: Promise<KmlDataSource> = Cesium.KmlDataSource.load('./assets/sampleData/sampleGeocacheLocations.kml', kmlOptions);
		// Add geocache billboard entities to scene and style them
		geocachePromise.then((dataSource: KmlDataSource) => {
			// Add the new data as entities to the viewer
			viewer.dataSources.add(dataSource);

			// Get the array of entities
			const geocacheEntities: Entity[] = dataSource.entities.values;

			for (let i = 0; i < geocacheEntities.length; i++) {
				const entity: Entity = geocacheEntities[i];
				if (Cesium.defined(entity.billboard)) {
					// Entity styling code here
				}
				// Adjust the vertical origin so pins sit on terrain
				entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
				// Disable the labels to reduce clutter
				entity.label = undefined;
				// Add distance display condition
				entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20000.0);
				// Compute latitude and longitude in degrees
				const cartographicPosition: Cartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
				const latitude: number = Cesium.CesiumMath.toDegrees(cartographicPosition.latitude);
				const longitude: number = Cesium.CesiumMath.toDegrees(cartographicPosition.longitude);
				// Modify description
				let description: string = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>';
				description += '<tr><th>' + 'Latitude' + '</th><td>' + latitude + '</td></tr>';
				description += '<tr><th>' + 'Longitude' + '</th><td>' + longitude + '</td></tr>';
				description += '</tbody></table>';
				entity.description = description;
			}
		});
	}

	/**
	 * 加载CZML数据和gltf模型
	 */
	loadCZMLAndGLTFData() {
		const viewer: Viewer = this.viewer;
		// Load a drone flight path from a CZML file
		const dronePromise: Promise<CzmlDataSource> = Cesium.CzmlDataSource.load('./assets/sampleData/sampleFlight.czml');
		dronePromise.then((dataSource: CzmlDataSource) => {
			viewer.dataSources.add(dataSource);
			this.drone = dataSource.entities.values[0];
			// Attach a 3D model
			this.drone.model = new ModelGraphics({
				uri: './assets/sampleData/Models/CesiumDrone.gltf',
				minimumPixelSize: 128,
				maximumScale: 2000
			});
			// Add computed orientation based on sampled positions
			this.drone.orientation = new Cesium.VelocityOrientationProperty(this.drone.position);

			// Smooth path interpolation
			this.drone.position.setInterpolationOptions({
				interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
				interpolationDegree: 3
			});
			this.drone.viewFrom = new Cesium.Cartesian3(-30, 0, 0);
		});
	}

	/**
	 * 加载3d瓷片
	 */
	load3DTileset() {
		const viewer: Viewer = this.viewer;
		// Load the NYC buildings tileset
		this.city3DTileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
			url: 'https://beta.cesium.com/api/assets/1461?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWJmM2MzNS02OWM5LTQ3OWItYjEyYS0xZmNlODM5ZDNkMTYiLCJpZCI6NDQsImFzc2V0cyI6WzE0NjFdLCJpYXQiOjE0OTkyNjQ3NDN9.vuR75SqPDKcggvUrG_vpx0Av02jdiAxnnB1fNf-9f7s',
			maximumScreenSpaceError: 16 // default value
		}));

		// Adjust the tileset height so it's not floating above terrain
		// 调整模型的高度，这样就不会浮在地面上了
		const heightOffset: number = -32;
		this.city3DTileset.readyPromise.then((tileset: any) => {
			// Position tileset
			const boundingSphere = tileset.boundingSphere;
			const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
			const surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude);
			const offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
			const translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
			tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		});
	}

	/**
	 * 给3D Tileset设置样式
	 */
	setTilesetStyle() {
		let cityStyle: Cesium3DTileStyle;
		if (this.selectedStyleType === 'none') {
			// Define a white, opaque building style
			cityStyle = new Cesium.Cesium3DTileStyle({
				color: 'color(\'white\')',
				show: true
			});
		} else if (this.selectedStyleType === 'height') {
			// Define a style in which buildings are colored by height
			cityStyle = new Cesium.Cesium3DTileStyle({
				color: {
					conditions: [
						['${height} >= 300', 'rgba(45, 0, 75, 0.5)'],
						['${height} >= 200', 'rgb(102, 71, 151)'],
						['${height} >= 100', 'rgb(170, 162, 204)'],
						['${height} >= 50', 'rgb(224, 226, 238)'],
						['${height} >= 25', 'rgb(252, 230, 200)'],
						['${height} >= 10', 'rgb(248, 176, 87)'],
						['${height} >= 5', 'rgb(198, 106, 11)'],
						['true', 'rgb(127, 59, 8)']
					]
				}
			});
		} else if (this.selectedStyleType === 'transparent') {
			// Define a white, transparent building style
			cityStyle = new Cesium.Cesium3DTileStyle({
				color: 'color(\'white\', 0.3)',
				show: true
			});
		}
		this.city3DTileset.style = cityStyle;
	}

	setDoneFlyType() {
		if (this.selectedFlyType === 'none') {
			this.viewer.trackedEntity = undefined;
			this.viewer.scene.camera.flyTo(this.homeCameraView);
		} else if (this.selectedFlyType === 'tracked') {
			this.viewer.trackedEntity = this.drone;
		}
	}

	toggleEntityCollection() {
		this.neighborhoods.show = !this.neighborhoods.show;
	}
}

