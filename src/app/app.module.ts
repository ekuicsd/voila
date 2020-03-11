import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { TouristsModule } from '../app/modules/tourists/tourists.module';
import { HomeModule } from '../app/modules/home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { GuideModule } from '../app/modules/guide/guide.module';
// import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MDBBootstrapModule } from 'mdbootstrap/';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { ArchwizardModule } from 'ng2-archwizard/dist';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)

  },


];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    TouristsModule,
    HomeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    // NgbAlertModule,
    GuideModule,
    ToastrModule.forRoot(),
    // MDBBootstrapModule.forRoot()
    // ArchwizardModule,
    // CarouselModule,
    // MDBBootstrapModule.forRoot()
    // MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: []
})
export class AppModule { }
