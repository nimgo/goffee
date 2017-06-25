import { Component, OnInit, NgZone } from "@angular/core";

@Component({
    selector: "main-component",
    templateUrl: "main.component.html"
})

export class MainComponent implements OnInit {

    constructor(private zone: NgZone) { }

    ngOnInit() {
        this.zone.run(() => {
            console.log("initialize");
        });
    }
}