import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./main.component";

export const routes: Routes = [
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