import { Component, Input } from "@angular/core";
import { HSLayout } from "./../../data/model.interface";

@Component({
    selector: "hx-layout",
    templateUrl: "layout.component.html"
})

export class LayoutComponent {

    @Input()
    set blobber(input: HSLayout) {
        this.layouts = input ? JSON.parse(input.blob) : {};
    }

    layouts: Layout[];
}

interface Layout {
    layout: string,
    data: string
}