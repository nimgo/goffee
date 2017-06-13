import { Component } from "@angular/core";
import { HSTrigger, HSGroup, Format, Status, Priority } from './../../data/model.interface';
import { HarmonyAPI } from './../globals';
import { HSTriggerService } from './../_services/index';

@Component({
    selector: "main-component",
    templateUrl: "main.component.html"
})

export class MainComponent {
    Status: typeof Status = Status;
    Priority: typeof Priority = Priority;

    constructor(private triggerService: HSTriggerService) { }

    groups: HSGroup[];

    ngOnInit(): void {
        this.triggerService.getGroups()
            .then(groups => this.groups = groups)
            .catch((e: Error) => console.log(e));
    }

    toText(tt: string, val: number) {
        switch (tt) {
            case "status": return Status.toText(val);
            case "priority": return Priority.toText(val);
        }
        return "Error: Invalid Type";
    }

    layout(json: string): string {
        //console.log(json);
        return json;
    }


    ///*
    // * Handling checkboxes using jquery instead of ngmodel (which can be expensive)
    // */
    //checked: any[] = [];
    //isChecked = (hash: string | number): boolean => {
    //    return $('#' + hash).is(":checked");
    //}
    //onBoxChange(hash: string | number) {
    //    if (this.isChecked(hash)) {
    //        this.checked.push(hash);
    //    } else {
    //        let idx = this.checked.indexOf(hash);
    //        this.checked.splice(idx, 1);
    //    }
    //    $('#cball').prop("checked", this.checked.length === this.groups.length);
    //}
    //onBulkChange() {
    //    if (this.isChecked("cball")) {
    //        this.checked = [];
    //        this.groups.forEach(gg => {
    //            $('#' + gg.gp_ref).prop("checked", true);
    //            this.checked.push(gg.gp_ref);
    //        });
    //    } else {
    //        this.groups.forEach(gg => {
    //            $('#' + gg.gp_ref).prop("checked", false);
    //        });
    //        this.checked = [];
    //    }
    //}
}