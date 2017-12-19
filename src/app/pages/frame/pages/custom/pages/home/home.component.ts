import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { TransformService } from '../../../../../../services/transform.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [HomeService]
})
export class HomeComponent implements OnInit {
	welcomeMessage: string = 'Welcome to Angular World!';
	inCoord: string;
	inCoordType: string = '1';
	inCoordUnit: string = '0';
	outCoord: string;
	outCoordType: string = '0';
	outCoordUnit: string = '0';

	constructor(public transformService: TransformService) {
	}

	ngOnInit() {
	}

	doConvert() {
		const inCoordX: number = this.inCoordUnit === '1' ? this.transformService.degree2Decimal(this.inCoord.split(',')[0]) : +this.inCoord.split(',')[0];
		const inCoordY: number = this.inCoordUnit === '1' ? this.transformService.degree2Decimal(this.inCoord.split(',')[1]) : +this.inCoord.split(',')[1];
		if (this.inCoordType === '1' && this.outCoordType === '0') {
			const outCoordObj: { lat: number; lng: number } = this.transformService.gcj2wgs(inCoordY, inCoordX);
			console.log(outCoordObj);
			const outCoordObjX: string = this.outCoordUnit === '1' ? this.transformService.decimal2Degree(outCoordObj.lng) : outCoordObj.lng.toFixed(6);
			const outCoordObjY: string = this.outCoordUnit === '1' ? this.transformService.decimal2Degree(outCoordObj.lat) : outCoordObj.lat.toFixed(6);
			this.outCoord = [outCoordObjX, outCoordObjY].join(',');
		}
	}
}
