import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomeComponent
			]
		}).compileComponents();
	}));
	it('should create the HomeComponent', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		const homeComponent = fixture.debugElement.componentInstance;
		expect(homeComponent).toBeTruthy();
	}));
	it('"welcomeMessage" equal "欢迎来到Angular的世界！"', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		const homeComponent = fixture.debugElement.componentInstance;
		homeComponent.welcomeMessage = '欢迎来到Angular的世界！';
		expect(homeComponent.welcomeMessage).toEqual('欢迎来到Angular的世界！');
	}));
});
