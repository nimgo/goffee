import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HSTrigger, HSTriggerActioner, User, Format, Status, Priority } from './../../data/model.interface';
import { MeService, HSTriggerService } from './../_services/index';

@Component({
    selector: "view-issue",
    templateUrl: "view.component.html"
})

export class ViewComponent {

    Status: typeof Status = Status;
    Priority: typeof Priority = Priority;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private triggerService: HSTriggerService,
        private meService: MeService
    ) { }

    trigger: HSTrigger;
    me: User;
    canAction: boolean;

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                return this.triggerService.get(+params['id']);
            })
            .subscribe((trigger: HSTrigger) => {
                this.trigger = trigger;
                this.canAction = this.isActionable(this.trigger, this.me);
            });

        this.meService.getMe()
            .then((me: User) => {
                this.me = me;
                this.canAction = this.isActionable(this.trigger, this.me);
            });
    }

    isActionable(trigger: HSTrigger, me: User): boolean {
        if (!trigger || !me) return false;
        return trigger.actioners.some((a: HSTriggerActioner) => {
            return a.actioner_id === me.id;
        });
    }

    //splitTags(tags: string): string[] {
    //    return Format.splitTags(tags);
    //}

    toText(tt: string, val: number) {
        switch (tt) {
            case 'status': return Status.toText(val);
            case 'priority': return Priority.toText(val);
        }
        return "";
    }

}