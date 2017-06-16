import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutesModule } from "./admin.routes";
import { AdminComponent } from "./admin.component";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutesModule
    ],
    exports: [],
    declarations: [
        AdminComponent
    ],
    providers: [],
    bootstrap: [AdminComponent]
})

export class AdminModule { }