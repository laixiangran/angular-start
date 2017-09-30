import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomRoutingModule } from './custom.routes';
import { CustomComponent } from './custom.component';
import { HomeComponent } from './pages/home/home.component';
import { EssenceNg2EsriMapModule } from 'essence-ng2-esrimap';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CustomRoutingModule,
		EssenceNg2EsriMapModule,
		ConfirmDialogModule
	],
	declarations: [
		CustomComponent,
		HomeComponent
	],
	providers: [ConfirmationService]
})
export class CustomModule {
}
