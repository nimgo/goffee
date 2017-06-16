import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MainRoutesModule } from "./main.routes";
import { MomentModule } from 'angular2-moment';
import { AlertModule, DatepickerModule } from 'ngx-bootstrap';

import { MainComponent } from "./main.component";

@NgModule({
    imports: [
        CommonModule,
        MainRoutesModule,
        FormsModule,
        MomentModule,

        AlertModule.forRoot(),
        DatepickerModule.forRoot()
    ],
    declarations: [
        MainComponent
    ],
    providers: [
        
    ],
    bootstrap: [
        MainComponent
    ]
})

export class MainModule { }