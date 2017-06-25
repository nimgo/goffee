import { Component } from "@angular/core";
import { Globals } from './globals';
import { User } from './../data/model.interface';

import { MeService } from './_services/me.service';

@Component({
    selector: "app",
    templateUrl: "app.component.html"
})

export class AppComponent {
    constructor(private meService: MeService) { }

    me: User;

    ngOnInit(): void {
        this.meService.getMe()
            .then(user => this.me = user)
            .catch((e: Error) => console.log(e));
    }
}