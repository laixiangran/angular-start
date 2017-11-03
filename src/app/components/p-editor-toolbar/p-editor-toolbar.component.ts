import { Component, OnInit } from '@angular/core';

/**
 * 专为p-editor自定义的toolbar
 * usage
 * ```typescript
 * <p-editor>
 *    <p-header>
 *        <p-editor-toolbar></p-editor-toolbar>
 *    </p-header>
 * </p-editor>
 * ```
 */
@Component({
	selector: 'p-editor-toolbar',
	templateUrl: './p-editor-toolbar.component.html',
	styleUrls: ['./p-editor-toolbar.component.scss']
})
export class PEditorToolbarComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
