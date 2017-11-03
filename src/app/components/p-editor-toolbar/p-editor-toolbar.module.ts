import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PEditorToolbarComponent } from './p-editor-toolbar.component';
import { SharedModule } from 'primeng/primeng';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		PEditorToolbarComponent
	],
	exports: [
		PEditorToolbarComponent
	]
})
export class PEditorToolbarModule {
}
