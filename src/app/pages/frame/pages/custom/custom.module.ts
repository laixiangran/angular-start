import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomRoutingModule } from './custom.routes';
import { CustomComponent } from './custom.component';
import { HomeComponent } from './pages/home/home.component';
import { TransformService } from '../../../../services/transform.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CustomRoutingModule
	],
	declarations: [
		CustomComponent,
		HomeComponent
	],
	providers: [TransformService]
})
export class CustomModule {
}
