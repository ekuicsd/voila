import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TouristsHomeComponent } from './pages/tourists-home/tourists-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HistoriesComponent } from './components/histories/histories.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeModule } from '../home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestsComponent } from './components/requests/requests.component';

const routes: Routes = [
  // {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'touristshome', component: TouristsHomeComponent, children: [
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
  // {path: 'guide', children: [
    {
      path: 'dashboard', component: DashboardComponent
    },
    {
      path: 'editProfile', component: EditProfileComponent
    },
    {
      path: 'favourites', component: FavouritesComponent
    },
    {
      path: 'histories', component: HistoriesComponent
    },
    {
      path: 'messages', component: MessagesComponent
    },
    {
      path: 'bookings', component: BookingsComponent
    },
    {
      path: 'requests', component: RequestsComponent
    }
  ]},
]; 

@NgModule({
  declarations: [
    RegisterComponent,
    TouristsHomeComponent,
    DashboardComponent,
    MessagesComponent,
    HistoriesComponent,
    EditProfileComponent,
    FavouritesComponent,
    BookingsComponent,
    RequestsComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    HomeModule,
    // BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [
      
  ]
}) 

export class TouristsModule {

}