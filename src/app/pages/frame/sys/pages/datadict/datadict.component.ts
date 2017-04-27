/**
 * Created by Hllinc on 2016-11-01 21:01.
 */
import {Component, ViewChild} from '@angular/core';
import {DatadictTreeComponent} from "./components/datadict-tree/datadict-tree.component";
import {Datadict} from "../../models/datadict";

@Component({
    templateUrl:'./datadict.component.html'
})

export class DatadictComponent{
    @ViewChild(DatadictTreeComponent)
    datadictTreeComponent: DatadictTreeComponent;
    errorMessage: string;
    datadicts: any[] = null;
    selectedDatadict: Datadict = null;


    constructor () {}

    deleteDatadict () {
        this.datadictTreeComponent.deleteDatadict();
    }

    addDatadict (tree: any) {
        this.datadictTreeComponent.addDatadict();
    }

    selectDatadict ($event: any) {
        this.selectedDatadict = $event;
    }

    ngOnInit (): void {
    }
}
