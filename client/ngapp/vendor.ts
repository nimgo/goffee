import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
//import { Routes, RouterModule } from "@angular/router";
//import { HttpModule } from "@angular/http";
//import { MomentModule } from 'angular2-moment';
//import { AlertModule, DatepickerModule } from 'ngx-bootstrap';

// TODO: Vendoring specific modules does not seem to work for the ones below
import "@angular/router";
import "@angular/http";
import 'angular2-moment';
import 'ngx-bootstrap';


// Commonly used libraries
import "jquery/src/jquery";
import "bootstrap/dist/js/bootstrap";