import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { environment } from '../../../../../../../environments/environment';
import { EssenceNg2EsriMapComponent } from 'essence-ng2-esrimap';
import { AuthService } from '../../../../../../services/auth.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [HomeService]
})
export class HomeComponent implements OnInit {
	esriMap: EssenceNg2EsriMapComponent;
	mapUrl: string[] = ['vec', 'cva'];
	mapType: string = 'tdt';
	gisApiUrl: string = environment.gisApiUrl; // arcgis javascript API路径
	esriCSSUrl: string = environment.esriCSSUrl; // arcgis javascript API路径
	initExtent: any = {
		xmin: 34.62890274822709,
		ymin: 9.404300374910264,
		xmax: 174.3749964982271,
		ymax: 62.138675374910264
	};

	constructor(public authService: AuthService, public confirmationService: ConfirmationService) {
	}

	ngOnInit() {
	}

	onMapReady($event: EssenceNg2EsriMapComponent) {
		this.esriMap = $event;
	}

	/**
	 * 地图范围改变的事件
	 * @param $event
	 */
	onExentChange(event: any) {
		// console.log(event);
	}
}
