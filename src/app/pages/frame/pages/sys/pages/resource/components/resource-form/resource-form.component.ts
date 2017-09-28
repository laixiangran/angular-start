/**
 * Created by Hllinc on 2016-11-14 09:44.
 */
import {Component, Input} from '@angular/core';
import {ResourceService} from '../../resource.service';
import {Resource} from '../../../../models/resource';
import { Subscription } from 'rxjs/Subscription';
import { ServerData } from '../../../../../../../../models/server-data.model';

@Component({
	selector: 'resource-form',
	templateUrl: './resource-form.template.html',
	styleUrls: ['./resource-form.style.scss']
})

export class ResourceFormComponent {
	@Input() resource: Resource;

	constructor(private resourceService: ResourceService) {

	}

	onSubmit() {
		const sub: Subscription = this.resourceService.updateResource(this.resource.data).subscribe((serverData: ServerData) => {
			sub.unsubscribe();
		});
	}
}
