/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
	id: string;
}

// Cesium
declare var Cesium: CesiumObj;
interface CesiumObj {
	Viewer: any;
}

