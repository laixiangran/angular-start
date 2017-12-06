import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArcGISComponent } from './arcgis.component';

describe('ArcGISComponent', () => {
	let component: ArcGISComponent;
	let fixture: ComponentFixture<ArcGISComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ArcGISComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArcGISComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
