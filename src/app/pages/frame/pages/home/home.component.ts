import {
	Component, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewChild,
	ViewContainerRef
} from '@angular/core';
import { HomeService } from "./home.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HomeService]
})

export class HomeComponent implements OnInit, OnDestroy {
	myContext: any = {$implicit: 'word', localSk: 'Svet2'};
	view: EmbeddedViewRef<any>;
	view2: EmbeddedViewRef<any>;
	view3: EmbeddedViewRef<any>;
	@ViewChild('greet') templateRef_greet: TemplateRef<any>;
	@ViewChild('eng') templateRef_eng: TemplateRef<any>;
	@ViewChild('svk') templateRef_svk: TemplateRef<any>;

    constructor(public viewContainer: ViewContainerRef) {
	}

	ngOnInit() {
		this.view = this.viewContainer.createEmbeddedView(this.templateRef_greet, {
			$implicit: 'greet'
		});
		this.view2 = this.viewContainer.createEmbeddedView(this.templateRef_eng, {
			$implicit: 'eng'
		});
		this.view3 = this.viewContainer.createEmbeddedView(this.templateRef_svk, {
			$implicit: 'svk',
			localSk: 'Svet'
		});
	}

	ngOnDestroy() {
		this.view.destroy();
	}

	changeView() {
    	this.viewContainer.insert(this.view3, 1);
	}
}
