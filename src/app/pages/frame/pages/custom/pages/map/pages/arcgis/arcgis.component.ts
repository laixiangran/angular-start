import { Component, OnInit } from '@angular/core';
import { EssenceNg2EsriMapComponent } from 'essence-ng2-esrimap';

@Component({
	templateUrl: './arcgis.component.html',
	styleUrls: ['./arcgis.component.scss']
})
export class ArcGISComponent implements OnInit {
	esriMap: EssenceNg2EsriMapComponent;
	initExtent: any;

	constructor() {
		this.initExtent = {
			xmax: 172.68611447428455,
			xmin: 32.06111447428455,
			ymax: 70.08480747618302,
			ymin: -5.764801898816984
		};
	}

	ngOnInit() {
	}

	onMapReady($event: EssenceNg2EsriMapComponent) {
		this.esriMap = $event;
	}
}

