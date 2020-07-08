import { NgModule } from '@angular/core';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MapComponent } from './map/map.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features/features.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TopDealsComponent } from './top-deals/top-deals.component';
import { MyDatePickerModule } from 'mydatepicker';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { SharedModule } from 'src/app/shared/shared.module';

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
      CommonModule,
      ReactiveFormsModule,
      AngularMyDatePickerModule,
      SharedModule,
      MDBBootstrapModule.forRoot(),
      NgbModule,
      MyDatePickerModule,
      FormsModule,
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
