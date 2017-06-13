import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import { HSTrigger, HSFlow, HSGroup } from "./../../data/model.interface";

@Injectable()
export class HSTriggerService {
    private headers: Headers = new Headers(
        {
            "Content-Type": "application/json",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        }
    );

    readonly baseUri: string = "api/v1";  // url to web api

    constructor(private http: Http) { }

    makeRekiUri(): string {
        return this.makeUri("reki", "me");
    }
    makeUri(pid: string, uid: string): string {
        return `${this.baseUri}/platforms/${pid}/users/${uid}/triggers`;
    }

    getGroups(): Promise<HSGroup[]> {
        return this.getTriggers()
            .then((triggers) => this.groupsByRef(triggers))
            .catch(this.handleError);
    }

    getGroup(gref: string): Promise<HSGroup> {
        const url: string = `${this.makeRekiUri()}/group/${gref}`;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(response => this.groupByRef(response.json().data as HSTrigger[]))
            .catch(this.handleError);
    }

    // todo: HACK: Conversion of triggers to HSGroup
    // need to optimize? (maybe hashmaps?)
    groupsByRef(triggers: HSTrigger[]): HSGroup[] {
        let groups: HSGroup[] = [];
        let ggrp: HSGroup = {
            gp_ref: "",
            first_dt: new Date(),
            first_flow: new HSFlow(),
            triggers: []
        };

        // assume the ordering is already by group_ref
        for (let c: number = 0; c < triggers.length; c++) {
            let trigger: HSTrigger = triggers[c];

            if (ggrp.gp_ref !== trigger.flow.group_ref) {
                let gg: HSGroup = {
                    gp_ref: trigger.flow.group_ref,
                    first_dt: trigger.flow.created_dt,
                    first_flow: trigger.flow,
                    triggers: []
                };
                gg.triggers.push(trigger);
                ggrp = gg;

                groups.push(gg);
            } else {
                ggrp.triggers.push(trigger);
            }
        }

        return groups;
    }

    // todo: HACK: Conversion of triggers to one HSGroup
    groupByRef(triggers: HSTrigger[]): HSGroup | void {
        if (triggers) {
            return {
                gp_ref: triggers[0].flow.group_ref,
                first_dt: triggers[0].flow.created_dt,
                first_flow: triggers[0].flow,
                triggers: triggers
            };
        }
    }

    getTriggers(): Promise<HSTrigger[]> {
        return this.http.get(this.makeRekiUri(), { headers: this.headers })
            .toPromise()
            .then((response) => response.json().data as HSTrigger[])
            .catch(this.handleError);
    }

    get(id: number): Promise<HSTrigger> {
        const url: string = `${this.makeRekiUri()}/${id}`;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json().data as HSTrigger)
            .catch(this.handleError);
    }

    delete(id: number): Promise<null> {
        const url: string = `${this.makeRekiUri()}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(issue: HSTrigger): Promise<HSTrigger> {
        return this.http
            .post(this.makeRekiUri(), JSON.stringify(issue), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HSTrigger)
            .catch(this.handleError);
    }

    patch(issue: HSTrigger): Promise<HSTrigger> {
        const url: string = `${this.makeRekiUri()}/${issue.id}`;
        return this.http
            .patch(url, JSON.stringify(issue), { headers: this.headers })
            .toPromise()
            .then(() => issue)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("Error connecting to the server. Please try it again or contact IT support. ", error);
        return Promise.reject(error.message || error);
    }
}