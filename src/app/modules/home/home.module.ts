import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MapComponent } from './map/map.component';
import { TopCitiesComponent } from './top-cities/top-cities.component';

const routes: Routes = [
    {path: 'home', component: FrontpageComponent}
];

@NgModule({
  declarations: [
    FrontpageComponent,
    FilterFormComponent,
    MapComponent,
    TopCitiesComponent
  ],
  imports: [
      BrowserModule,
      RouterModule.forChild(routes)
  ],
  exports: [
  ]
}) 

export class HomeModule {

}