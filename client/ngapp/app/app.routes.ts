import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadChildren: "./+main/main.module#MainModule"
    },
    {
        path: "admin",
        loadChildren: "./+admin/admin.module#AdminModule"
    },
    { path: "", redirectTo: "/", pathMatch: "full" },
    { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutesModule { }