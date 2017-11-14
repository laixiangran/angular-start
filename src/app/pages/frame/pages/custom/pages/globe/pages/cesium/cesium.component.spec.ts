import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumComponent } from './cesium.component';

describe('CesiumComponent', () => {
	let component: CesiumComponent;
	let fixture: ComponentFixture<CesiumComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CesiumComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CesiumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
