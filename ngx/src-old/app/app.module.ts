import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { AppRoutesModule } from "./app.routes";
import { AppComponent } from "./app.component";

import { MeService } from './_services/me.service';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,

        AppRoutesModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        MeService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }