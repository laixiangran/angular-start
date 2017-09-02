/**
 * Created by Hllinc on 2016-10-25 11:56.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { RequestService } from './services/request.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FrameModule } from './pages/frame/frame.module';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/404/page-not-found.component';
import { LoginService } from './pages/login/login.service';
import { EDatePipe } from './pipes/eDate.pipe';
import { ETimePipe } from './pipes/eTime.pipe';
import { InputTextModule } from 'primeng/primeng';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		FrameModule,
		AppRoutingModule,
		InputTextModule
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
		LoginService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
