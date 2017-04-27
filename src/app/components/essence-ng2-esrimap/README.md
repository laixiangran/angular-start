# essence-ng2-esrimap v1.0.0

This is a EsriMap component for Angular.

## 依赖
```json
{
  "typescript": ">=2.0.3",
  "angular2": ">=2.2.1",
  "font-awesome": "^4.7.0",
  "ArcGIS API for JavaScript": "3.14"
}
```

[ArcGIS API for JavaScript : https://developers.arcgis.com/javascript/3/](https://developers.arcgis.com/javascript/3/)

## 用法

### index.html引入esri.css及font-awesome.css
```html
<link rel="stylesheet" href="http://js.arcgis.com/3.14/esri/css/esri.css">
<link rel="stylesheet" href="./font-awesome/css/font-awesome.min.css">
```

### app.module中导入
```typescript
import {EssenceNg2EsriMapService} from "./components/essence-ng2-esrimap/essence-ng2-esrimap.service";
import {EsriLoaderService} from 'angular2-esri-loader';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
		EsriLoaderService,
		EssenceNg2EsriMapService
	],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

### module中导入
```typescript
import {EssenceNg2EsriMapModule} from "../components/essence-ng2-esrimap";
@NgModule({
    imports: [
        EssenceNg2EsriMapModule
    ]
})
```

### template中使用
```html
<essence-ng2-esrimap
        (mapReady)="onMapReady($event)"
        (exentChange)="onExentChange($event)"
        [mapType]="'tdt'"
        [mapUrl]="['vec_c', 'cva_c']"
        [initExtent]="initExtent">
</essence-ng2-esrimap>
```

### 对应的component
```typescript
esriMapComponent: any;
map: any;
SimpleMarkerSymbol: any;
SimpleLineSymbol: any;
SimpleFillSymbol: any;
Graphic: any;
initExtent: any = {
    xmax: 116.67873622141019,
    xmin: 115.921366226293,
    ymax: 40.22002421468856,
    ymin: 39.85060893148543
};

onMapReady (event: any) {
    this.esriMapComponent = event;
    this.map = this.esriMapComponent.map;
    this.esriMapComponent.loadEsriModules([
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/graphic"
    ]).then(([
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Graphic
    ]) => {
        // 模块初始化
        this.SimpleMarkerSymbol = SimpleMarkerSymbol;
        this.SimpleLineSymbol = SimpleLineSymbol;
        this.SimpleFillSymbol = SimpleFillSymbol;
        this.Graphic = Graphic;
    });
}

onExentChange (event: any) {
    console.log(event);
}
```

## API说明

### 输入属性

- `mapType`（`string?='tdt'`） - 基础底图类型，`tdt`：天地图，`esri`：esri地图服务

- `mapUrl`（`string[] | string`） - 基础底图路径

- `initExtent`（`Object`） - 初始地图范围，`{xmax, xmin, ymax, ymin}`

### 实例属性

- `map`（`any`） - 当前地图对象

### 实例方法

- `loadEsriModules`（`string[]`）return `Promise<any>` - 加载ArcGIS API for JavaScript的模块，如：`['esri/map']`

### 事件

- `mapReady`：地图初始化完成后会触发该事件，参数$event为当前component实例对象

- `exentChange`：地图范围改变触发该事件，参数$event为当前地图范围对象
