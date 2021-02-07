
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MainInterceptorService } from './main-interceptor.service';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule,ToastService } from 'ng-uikit-pro-standard';

import { PersonsComponent } from './persons/persons.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


const routes: Routes = [
  {path : '', component : AssignmentsComponent},
  {path : 'vehicles', component : VehiclesComponent},
  {path : 'persons', component : PersonsComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    PersonsComponent,
    VehiclesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptorService, multi: true },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
