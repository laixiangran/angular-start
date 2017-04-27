/**
 * Created by Hllinc on 2016-10-28 11:54.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Resource} from "../../models/resource";
import {DataService} from "../../../../../services/data.service";
import {ResourceTreeComponent} from "./components/resource-tree/resource-tree.component";

@Component({
    templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
    @ViewChild(ResourceTreeComponent)
    resourceTreeComponent: ResourceTreeComponent;
    errorMessage: string;
    resources: any[] = null;
    selectedResource: Resource = null;


    constructor (private dataService: DataService) {
    }

    deleteResource () {
        this.resourceTreeComponent.deleteResource();
    }

    addResource (tree: any) {
        this.resourceTreeComponent.addResource();
    }

    selectResource ($event: any) {
        this.selectedResource = $event;
    }

    ngOnInit (): void {
    }
}
