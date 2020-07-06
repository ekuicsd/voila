import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MapComponent } from './map/map.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './features/features.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TopDealsComponent } from './top-deals/top-deals.component';
import { MyDatePickerModule } from 'mydatepicker';
// import { NgbInputDatepicker } from  '@ng-bootstrap/ng-bootstrap';
import {NgbModule, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
// import { NavbarModule, WavesModule, ModalModule, ButtonsModule } from 'angular-bootstrap-md';
// import { DropdownModule } from 'angular-bootstrap-md';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
    TopDealsComponent,
    HomeCarouselComponent,

  ],
  imports: [
      // BrowserModule,
      CommonModule,
      ReactiveFormsModule,
      CarouselModule,
      // BrowserAnimationsModule,
      // NoopAnimationsModule,
      MDBBootstrapModule.forRoot(),
      NgbModule,
      MyDatePickerModule,
      SlickCarouselModule,
      // NgbDate,
      RouterModule.forChild(routes),
  ],
  exports: [
    FilterFormComponent,
    MapComponent,
    TopCitiesComponent,
  ]
})

export class HomeModule {

}
