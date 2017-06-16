import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MainRoutesModule } from "./main.routes";
import { MomentModule } from 'angular2-moment';
import { AlertModule, DatepickerModule } from 'ngx-bootstrap';

import { MainComponent } from "./main.component";
import { ViewComponent } from "./view.component";
import { GpviewComponent } from "./gpview.component";
import { LayoutComponent } from "./layout.component";

import { HSTriggerService } from './../_services/index';

import { TruncatePipe } from './../_pipes/truncate.pipe';
import { LinkifyPipe } from './../_pipes/linkify.pipe';

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
        MainComponent,
        ViewComponent,
        GpviewComponent,
        LayoutComponent,

        TruncatePipe,
        LinkifyPipe
    ],
    providers: [
        HSTriggerService
    ],
    bootstrap: [
        MainComponent
    ]
})

export class MainModule { }