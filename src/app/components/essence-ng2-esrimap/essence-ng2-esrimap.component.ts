import {Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

import {EssenceNg2EsriMapService} from "./essence-ng2-esrimap.service";
import {AsyncGetResultParam} from "./models";

@Component({
    selector: 'essence-ng2-esrimap',
    templateUrl: './essence-ng2-esrimap.component.html',
    styleUrls: ['./essence-ng2-esrimap.component.scss']
})
export class EssenceNg2EsriMapComponent implements OnInit {

    // esri modules
    Map: any;
    Extent: any;
    TileInfo: any;
    Geoprocessor: any;
    ArcGISTiledMapServiceLayer: any;
    GraphicsLayer: any;
    Point: any;
    PictureMarkerSymbol: any;
    Graphic: any;
    ProjectParameters: any;
    SpatialReference: any;
    geometryService: any;
    FeatureSet: any;
    SimpleMarkerSymbol: any;
    SimpleLineSymbol: any;
    SimpleFillSymbol: any;

    // map
    map: any;

    @ViewChild('map') mapEle: ElementRef;

    private timeOutId: number;
    private locationLayer: any; // 定位图层
    isMax: boolean = false; // 比例是否最大
    isMin: boolean = false; // 比例是否最小

    // 底图路径
    @Input() mapUrl: string[] | string;

    // 底图类型
    @Input() mapType: string;

    // 地图初始范围
    @Input() initExtent: any;

    // 地图初始化完成之后触发该事件
    @Output()
    mapReady: EventEmitter<any> = new EventEmitter<any>(false);

    // 地图范围改变触发该事件
    @Output()
    exentChange: EventEmitter<any> = new EventEmitter<any>(false);

    constructor (private esriService: EssenceNg2EsriMapService) {}

    ngOnInit () {
        if (this.map) {
            return;
        }

        if (!this.esriService.isLoad) {
            this.loadEsriApi().then(() => {
                this.initMap();
            });
        } else {
            this.initMap();
        }
    }

    /**
     * 加载esri api
     * @returns {any}
     */
    private loadEsriApi (): any {
        return this.esriService.loadEsriApi();
    }

    /**
     * 初始化地图
     */
    private initMap (): void {
        this.loadEsriModules([
            "esri/map",
            "esri/graphic",
            "esri/SpatialReference",
            "esri/tasks/Geoprocessor",
            "esri/tasks/ProjectParameters",
            "esri/tasks/GeometryService",
            "esri/tasks/FeatureSet",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/GraphicsLayer",
            "esri/geometry/Point",
            "esri/geometry/Extent",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol"
        ]).then(([
                     Map,
                     Graphic,
                     SpatialReference,
                     Geoprocessor,
                     ProjectParameters,
                     GeometryService,
                     FeatureSet,
                     ArcGISTiledMapServiceLayer,
                     GraphicsLayer,
                     Point,
                     Extent,
                     PictureMarkerSymbol,
                     SimpleMarkerSymbol,
                     SimpleLineSymbol,
                     SimpleFillSymbol
                 ]) => {
            // 模块
            this.Map = Map;
            this.Extent = Extent;
            this.Geoprocessor = Geoprocessor;
            this.ProjectParameters = ProjectParameters;
            this.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
            this.GraphicsLayer = GraphicsLayer;
            this.Point = Point;
            this.PictureMarkerSymbol = PictureMarkerSymbol;
            this.Graphic = Graphic;
            this.SpatialReference = SpatialReference;
            this.geometryService = new GeometryService('http://192.168.0.109:8399/arcgis/rest/services/Geometry/GeometryServer');
            this.FeatureSet = FeatureSet;
            this.SimpleMarkerSymbol = SimpleMarkerSymbol;
            this.SimpleLineSymbol = SimpleLineSymbol;
            this.SimpleFillSymbol = SimpleFillSymbol;

            // 初始化地图
            this.map = new Map(this.mapEle.nativeElement, {
                logo: false,
                slider: false
            });

            // 加载底图
            if (this.mapType === 'tdt') {
                this.getTdtLayer(Array.isArray(this.mapUrl) ? this.mapUrl : [this.mapUrl]).then((layers: any[]) => {
                    layers.forEach((layer: any) => {
                        this.map.addLayer(layer);
                    });
                });
            } else if (this.mapType === 'esri') {
                this.map.addLayer(new this.ArcGISTiledMapServiceLayer(this.mapUrl));
            } else {
                throw '请指定输入属性 mapType 的值！';
            }

            // 注册地图相关事件
            this.addMapEvent();
        });
    }

    /**
     * 加载arcgis api for javascript的模块
     * @param modules
     * @returns {Promise<any>}
     */
    private loadEsriModules (modules: string[]): Promise<any> {
        return this.esriService.loadEsriModules(modules);
    }

    /**
     * 获取天地图图层
     * @param layers 图层的代码
     * @returns {Promise<T>}
     */
    private getTdtLayer (layers: string[]): Promise<any> {
        return new Promise((resolve) => {
            this.loadEsriModules([
                "esri/layers/TileInfo",
                "esri/layers/WebTiledLayer"])
                .then(([
                           TileInfo,
                           WebTiledLayer
                       ]) => {
                    this.TileInfo = TileInfo;
                    let tileInfo: any = new TileInfo({
                        rows: 256,
                        cols: 256,
                        compressionQuality: 0,
                        origin: {
                            x: -180,
                            y: 90
                        },
                        spatialReference: {
                            wkid: 4326
                        },
                        lods: [
                            {"level": 2, "resolution": 0.3515625, "scale": 147748796.52937502},
                            {"level": 3, "resolution": 0.17578125, "scale": 73874398.264687508},
                            {"level": 4, "resolution": 0.087890625, "scale": 36937199.132343754},
                            {"level": 5, "resolution": 0.0439453125, "scale": 18468599.566171877},
                            {"level": 6, "resolution": 0.02197265625, "scale": 9234299.7830859385},
                            {"level": 7, "resolution": 0.010986328125, "scale": 4617149.8915429693},
                            {"level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846},
                            {"level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423},
                            {"level": 10, "resolution": 0.001373291015625, "scale": 577143.73644287116},
                            {"level": 11, "resolution": 0.0006866455078125, "scale": 288571.86822143558},
                            {"level": 12, "resolution": 0.00034332275390625, "scale": 144285.93411071779},
                            {"level": 13, "resolution": 0.000171661376953125, "scale": 72142.967055358895},
                            {"level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447},
                            {"level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724},
                            {"level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619},
                            {"level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309},
                            {"level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655}
                        ]
                    });
                    let subDomains: string[] = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
                    let tdtLayers: any[] = [];
                    layers.forEach((type) => {
                        let templateUrl: string = 'http://${subDomain}.tianditu.com/DataServer?T=' + type + '&X=${col}&Y=${row}&L=${level}';
                        let tdtLayer: any = new WebTiledLayer(templateUrl, {
                            id: "tdt_" + type,
                            subDomains: subDomains,
                            tileInfo: tileInfo
                        });
                        tdtLayers.push(tdtLayer);
                    });
                    resolve(tdtLayers);
                });
        });
    }

    zoomIn () {
        this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
        if (!this.isMax) {
            this.map.setZoom(this.map.getZoom() + 1);
        }
    }

    zoomOut () {
        this.isMin = this.map.getZoom() <= this.map.getMinZoom();
        if (!this.isMin) {
            this.map.setZoom(this.map.getZoom() - 1);
        }
    }

    private requestFullScreen (element: HTMLElement) {
        let requestMethod = element.requestFullscreen || //W3C
            element.webkitRequestFullScreen;    //Chrome等

        if (requestMethod) {
            requestMethod.call(element);
        } else {
            console.error('当前浏览器不支持全屏！');
        }
    }

    /**
     * 退出全屏
     */
    private exitFullScreen () {
        let exitMethod = document.exitFullscreen || //W3C
            document.webkitExitFullscreen;    //Chrome等

        if (exitMethod) {
            exitMethod.call(document);
        } else {
            console.error('当前浏览器不支持退出全屏！');
        }
    }

    fullMap () {
        this.map.setExtent(new this.Extent(this.initExtent));
    }

    /**
     * 地图注册事件
     */
    addMapEvent () {
        this.map.on("load", () => {
            if (this.initExtent) {
                this.initExtent.spatialReference = this.map.spatialReference;
                this.map.setExtent(new this.Extent(this.initExtent));
            }
            this.mapReady.emit(this);
        });

        this.map.on("extent-change", (event) => {
            this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
            this.isMin = this.map.getZoom() <= this.map.getMinZoom();
            this.exentChange.emit(event);
        });
    }

    /**
     * GP服务获取数据（异步）
     * @param params
     */
    gpAsyncGetResultData (params: AsyncGetResultParam) {
        let gp = new this.Geoprocessor(params.url);
        gp.submitJob(params.inParamVal, (jobInfo: any) => {
            gp.getResultData(jobInfo.jobId, params.outParamName, (result: any) => {
                params.success(result);
            }, (error: any) => {
                params.error(error);
            });
        }, (jobInfo: any) => {
            params.status && params.status(jobInfo);
        }, (error: any) => {
            params.error(error);
        });
    }

    /**
     * 点定位
     * @param point
     */
    locationPoint (point: any) {
        this.locationLayer || (this.locationLayer = new this.GraphicsLayer());
        let mp = new this.Point({
                x: point.x || point.X,
                y: point.y || point.Y,
                spatialReference: this.map.spatialReference
            }),
            mpSymbol = new this.PictureMarkerSymbol({
                url: "assets/images/map/location.gif",
                height: 40,
                width: 40
            }),
            gra = new this.Graphic(mp, mpSymbol);

        this.locationLayer.clear();
        this.locationLayer.add(gra);
        this.map.addLayer(this.locationLayer, 0);
        this.map.centerAt(mp);

        // 清除定时器
        this.timeOutId && window.clearTimeout(this.timeOutId);

        // 10s之后清除定位动画gif
        this.timeOutId = window.setTimeout(() => {
            window.clearTimeout(this.timeOutId);
            this.locationLayer.clear();
        }, 10000);
    }

    /**
     * 显示地图信息窗口
     * @param params 信息窗口参数，属性如下：
     * title {String} 信息窗口标题
     * content {String} 信息窗口内容，支持html
     * location {Point} 信息窗口位置
     * placement {String} 信息窗口方位
     * width {Number} 信息窗口宽度
     * height {Number} 信息窗口高度
     */
    showMapInfoWindow (params: any) {
        this.map.infoWindow.setTitle(params.title);
        this.map.infoWindow.setContent(params.content);
        this.map.infoWindow.resize(params.width || 200, params.height || 300);
        this.map.infoWindow.show(params.location, this.map.getInfoWindowAnchor(this.map.toScreen(params.location)));
    }

    /**
     * 隐藏地图信息窗口
     */
    hideMapInfoWindow () {
        this.map.infoWindow.hide();
    }

    /**
     *
     * @param fs 转换的要素集
     * @param wkid 转换的坐标编码
     * @returns {Observable<any>}
     */
    exactProject (fs: any, wkid: any): Observable<any> {
        return new Observable<any>((subscriber: Subscriber<any>) => {
            let geometries = [],
                attrs = [],
                len = fs.features.length,
                ps = new this.ProjectParameters(),
                sr = new this.SpatialReference(wkid);
            for (let i = 0; i < len; i++) {
                let gra = fs.features[i];
                geometries.push(gra.geometry);
                attrs.push(gra.attributes);
            }
            ps.geometries = geometries;
            ps.outSR = sr;
            this.geometryService.project(ps, (gs: any) => {
                let f = new this.FeatureSet({
                        features: [],
                        spatialReference: sr
                    }),
                    len = gs.length;

                for (let j = 0; j < len; j++) {
                    let geo = gs[j],
                        attr = attrs[j],
                        pt = new this.Point(geo.x, geo.y, sr),
                        gra = new this.Graphic(pt, null, attr);

                    f.features.push(gra);
                }
                subscriber.next({
                    code: 'success',
                    data: f
                });
                subscriber.complete();
            }, (error: any) => {
                subscriber.next({
                    code: 'failed',
                    data: error
                });
                subscriber.complete();
            });
        });
    };

    /**
     * 将坐标由度分秒表示转为十进制表示
     * @param dfm 度分秒表示-180°0′0″
     * @returns {number} 十进制
     */
    latToDec (dfm: string): number {
        let lod = Number(dfm.split("°")[0]),
            lom = Number(dfm.split("°")[1].split("′")[0]),
            los = Number(dfm.split("°")[1].split("′")[1].split("″")[0]);

        return lod + lom / 60 + los / 3600;
    };

    /**
     * 将坐标由十进制表示转为度分秒表示
     * @param sjz 十进制表示-180.00
     * @returns {string} 度分秒表示-180°0′0″
     */
    decToLat (sjz: number): string {
        let d = String(sjz).split("."),
            f = String(Number("0." + d[1]) * 60).split(".");

        return d[0] + "°" + f[0] + "′" + (Number("0." + f[1]) * 60).toFixed(2) + "″";
    };
}
