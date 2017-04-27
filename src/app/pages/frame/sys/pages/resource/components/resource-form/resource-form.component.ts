/**
 * Created by Hllinc on 2016-11-14 09:44.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ResourceService} from "../../resource.service";
import {ServerData} from "../../../../models/server-data";
import {Resource} from "../../../../models/resource";
import {Sys} from "../../../../../../../utils/sys";

@Component({
    selector: 'resource-form',
    templateUrl: './resource-form.template.html',
    styleUrls: ['./resource-form.style.scss']
})

export class ResourceFormComponent{
    @Input() resource: Resource;

    constructor(private resourceService: ResourceService){

    }

    onSubmit(){
        this.resourceService.updateResource(this.resource).subscribe(
            (serverData: ServerData) => {
                Sys.sysAlert(serverData.info);
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }
}
