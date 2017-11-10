import { TestBed, async } from '@angular/core/testing';
import { FrameComponent } from './frame.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrameRoutingModule } from './frame.routes';
import { QRCodeModule } from 'angular2-qrcode';
import { ButtonModule, ConfirmationService, DialogModule, TieredMenuModule } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../login/login.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { RequestService } from '../../services/request.service';
import { HttpClientModule } from '@angular/common/http';

describe('FrameComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				FormsModule,
				HttpClientModule,
				RouterTestingModule,
				FrameRoutingModule,
				QRCodeModule,
				DialogModule,
				TieredMenuModule,
				ButtonModule
			],
			declarations: [
				FrameComponent
			],
			providers: [
				AuthService,
				LoginService,
				RequestService,
				ConfirmationService,
				MessageService
			]
		}).compileComponents();
	}));
	it('should create the FrameComponent', async(() => {
		const fixture = TestBed.createComponent(FrameComponent);
		const frameComponent = fixture.debugElement.componentInstance;
		expect(frameComponent).toBeTruthy();
	}));
});
