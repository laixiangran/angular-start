import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/404/page-not-found.component';
import { EDatePipe } from './pipes/eDate.pipe';
import { ETimePipe } from './pipes/eTime.pipe';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { EventsService } from './services/events.service';
import { LoginService } from './pages/login/login.service';
import { DateTimeService } from './services/datetime.service';
import { FilePathService } from './services/filepath.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserModule,
				FormsModule,
				HttpClientModule,
				RouterTestingModule,
				BrowserAnimationsModule,
				AppRoutingModule,
				ConfirmDialogModule,
				GrowlModule
			],
			declarations: [
				AppComponent,
				LoginComponent,
				PageNotFoundComponent,
				EDatePipe,
				ETimePipe
			],
			providers: [
				AuthGuard,
				AuthService,
				RequestService,
				EventsService,
				LoginService,
				DateTimeService,
				FilePathService,
				ConfirmationService,
				MessageService,
				{provide: APP_BASE_HREF, useValue: '/'}
			],
		}).compileComponents();
	}));
	it('should create the AppComponent', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
