/**
 * Created by Hllinc on 2016-11-29 0029 17:05.
 */
import {Component, Input} from "@angular/core";
import {Datadict} from "../../../../models/datadict";
import {DatadictService} from "../../datadict.service";
import {Sys} from "../../../../../../../utils/sys";

@Component({
    selector: 'datadict-form',
    templateUrl: './datadict-form.template.html',
    styleUrls: ['./datadict-form.style.scss']
})

export class DatadictFormComponent{
    @Input() datadict: Datadict;

    constructor(private datadictService: DatadictService){

    }

    onSubmit(){
        this.datadictService.updateDatadict(this.datadict).subscribe(
            (serverData) => {
                Sys.sysAlert(serverData.info);
            },
            (error) => {
                Sys.sysAlert(error);
            });
    }
}