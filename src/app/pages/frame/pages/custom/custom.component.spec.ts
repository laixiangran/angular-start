import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomRoutingModule } from './custom.routes';
import { CustomComponent } from './custom.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				FormsModule,
				CustomRoutingModule,
				RouterTestingModule
			],
			declarations: [
				CustomComponent,
				HomeComponent
			]
		}).compileComponents();
	}));
	it('should create the CustomComponent', async(() => {
		const fixture = TestBed.createComponent(CustomComponent);
		const customComponent = fixture.debugElement.componentInstance;
		expect(customComponent).toBeTruthy();
	}));
});
