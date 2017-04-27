import {Injectable} from '@angular/core';

import {EsriLoaderService} from 'angular2-esri-loader';

@Injectable()
export class EssenceNg2EsriMapService {

    isLoad: boolean = false;

    apiUrl: string = 'http://192.168.0.109/arcgis_api/3.14/init.js';

    esriLoader: EsriLoaderService;

    constructor(esriLoader: EsriLoaderService) {
        this.esriLoader = esriLoader;
    }

    loadEsriApi(): any {
        return this.esriLoader.load({url: this.apiUrl})['then'](() => {
            this.isLoad = true;
        });
    }

    loadEsriModules(modules: string[]): Promise<any> {
        return this.esriLoader.loadModules(modules);
    }
}
