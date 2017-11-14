import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeComponent } from './globe.component';

describe('GlobeComponent', () => {
	let component: GlobeComponent;
	let fixture: ComponentFixture<GlobeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GlobeComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GlobeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
