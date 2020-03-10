import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MapComponent } from './map/map.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './features/features.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { NavbarModule, WavesModule, ModalModule, ButtonsModule } from 'angular-bootstrap-md';
// import { DropdownModule } from 'angular-bootstrap-md';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: FrontpageComponent}
];

@NgModule({
  declarations: [
    FrontpageComponent,
    FilterFormComponent,
    MapComponent,
    TopCitiesComponent,
    FeaturesComponent,

  ],
  imports: [
      // BrowserModule,
      CommonModule,
      CarouselModule,
      BrowserAnimationsModule,
      MDBBootstrapModule.forRoot(),
      // NavbarModule,
      // WavesModule, 
      // ButtonsModule,
      // ModalModule,
      // DropdownModule,
      // IconsModule.forRoot(),
      RouterModule.forChild(routes),
  ],
  exports: [
  ]
}) 

export class HomeModule {

}