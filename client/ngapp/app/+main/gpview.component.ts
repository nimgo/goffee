import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HSGroup, HSTrigger, HSTriggerActioner, User, Format, Status, Priority } from './../../data/model.interface';
import { MeService, HSTriggerService } from './../_services/index';

declare let $: any;

@Component({
    selector: "gpview-issue",
    templateUrl: "gpview.component.html"
})

export class GpviewComponent {

    Status: typeof Status = Status;
    Priority: typeof Priority = Priority;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private triggerService: HSTriggerService,
        private meService: MeService
    ) { }

    group: HSGroup;
    me: User;
    canAction: boolean;

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                return this.triggerService.getGroup(params['gref']);
            })
            .subscribe((group: HSGroup) => {
                this.group = group;
                this.canAction = this.isActionable(this.group, this.me);
            });

        this.meService.getMe()
            .then((me: User) => {
                this.me = me;
                this.canAction = this.isActionable(this.group, this.me);
            });
    }

    isActionable(group: HSGroup, me: User): boolean {
        if (!group || !me) return false;
        return group.triggers[0].actioners.some((a: HSTriggerActioner) => {
            return a.actioner_id === me.id;
        });
    }

    toText(tt: string, val: number) {
        switch (tt) {
            case 'status': return Status.toText(val);
            case 'priority': return Priority.toText(val);
        }
        return "";
    }


    /*
     * Handling checkboxes using jquery instead of ngmodel (which can be expensive)
     */
    checked: any[] = [];
    isChecked = (hash: string | number): boolean => {
        return $('#' + hash).is(":checked");
    }
    onBoxChange(hash: string | number) {
        if (this.isChecked(hash)) {
            this.checked.push(hash);
        } else {
            let idx = this.checked.indexOf(hash);
            this.checked.splice(idx, 1);
        }
        $('#cball').prop("checked", this.checked.length === this.group.triggers.length);
    }
    onBulkChange() {
        if (this.isChecked("cball")) {
            this.checked = [];
            this.group.triggers.forEach(tt => {
                $('#' + tt.id).prop("checked", true);
                this.checked.push(tt.id);
            });
        } else {
            this.group.triggers.forEach(tt => {
                $('#' + tt.id).prop("checked", false);
            });
            this.checked = [];
        }
    }

}