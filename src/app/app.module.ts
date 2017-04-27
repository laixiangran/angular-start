/**
 * Created by Hllinc on 2016-10-25 11:56.
 */
import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {HttpModule,JsonpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {EsriLoaderService} from "angular2-esri-loader";
import {EssenceNg2EsriMapService} from "./components/essence-ng2-esrimap/essence-ng2-esrimap.service";
import {DataService} from "./services/data.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {FrameModule} from "./pages/frame/frame.module";
import {LoginComponent} from "./pages/login/login.component";
import {PageNotFoundComponent} from "./pages/404/page-not-found.component";
import {LoginService} from "./pages/login/login.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        FrameModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        DataService,
        LoginService,
        EsriLoaderService,
        EssenceNg2EsriMapService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
