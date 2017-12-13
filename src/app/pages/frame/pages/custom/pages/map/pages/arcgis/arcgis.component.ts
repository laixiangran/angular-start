import { Component, OnInit } from '@angular/core';
import { ENgxEsriMapComponent } from 'e-ngx-esrimap';
import { environment } from '../../../../../../../../../environments/environment';

@Component({
	templateUrl: './arcgis.component.html',
	styleUrls: ['./arcgis.component.scss']
})
export class ArcGISComponent implements OnInit {
	esriMap: ENgxEsriMapComponent;
	initExtent: any;
	isProxy: boolean = false;
	proxy: string = environment.proxy;

	constructor() {
		this.isProxy = !!this.proxy;
		this.initExtent = {
			xmax: 172.68611447428455,
			xmin: 32.06111447428455,
			ymax: 70.08480747618302,
			ymin: -5.764801898816984
		};
	}

	ngOnInit() {
	}

	onMapReady($event: ENgxEsriMapComponent) {
		this.esriMap = $event;
	}
}

