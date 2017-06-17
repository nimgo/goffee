import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { AppRoutesModule } from "./app.routes";
import { AppComponent } from "./app.component";


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,

        AppRoutesModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }