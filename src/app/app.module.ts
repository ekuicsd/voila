import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { TouristsModule } from '../app/modules/tourists/tourists.module';
import { HomeModule } from '../app/modules/home/home.module';
import { RouterModule, Routes } from '@angular/router';

import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)

  },


];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TouristsModule,
    HomeModule,
    RouterModule.forRoot(routes),
    NgbAlertModule,
    // MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
