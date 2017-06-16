import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./main.component";
import { ViewComponent } from "./view.component";
import { GpviewComponent } from "./gpview.component";

export const routes: Routes = [
    {
        path: "view/:id", component: ViewComponent
    },
    {
        path: "gpview/:gref", component: GpviewComponent
    },
    {
        path: "", component: MainComponent
    },
    {
        path: "**", redirectTo: "", pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutesModule { }