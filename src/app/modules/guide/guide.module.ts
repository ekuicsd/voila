import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuideHomeComponent } from './pages/guide-home/guide-home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { EditPreferencesComponent } from './components/edit-preferences/edit-preferences.component';
import { DealsComponent } from './components/deals/deals.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ArchwizardModule } from 'ng2-archwizard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShowRegisterComponent } from './pages/show-register/show-register.component';


const routes: Routes = [
    // {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'guidehome', component: GuideHomeComponent, children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
    // {path: 'guide', children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'editProfile', component: ProfileComponent
      },
      {
        path: 'activities', component: ActivitiesComponent
      },
      {
        path: 'deals', component: DealsComponent
      },
      {
        path: 'interests', component: EditPreferencesComponent
      },
      {
        path: 'messages', component: MessagesComponent
      },
      {
        path: 'bookings', component: BookingsComponent
      },
      {
         path: 'show-register', component: ShowRegisterComponent
      }
    ]},
    // ]},
    
]; 

@NgModule({
  declarations: [
    RegisterComponent,
    GuideHomeComponent,
    DashboardComponent,
    ProfileComponent,
    MessagesComponent,
    ActivitiesComponent,
    EditPreferencesComponent,
    DealsComponent,
    BookingsComponent,
    ShowRegisterComponent
    ],
  imports: [
    //   BrowserModule,
      CommonModule,
      RouterModule.forChild(routes),
      NgbModule,
      MDBBootstrapModule.forRoot(),
      ArchwizardModule,
  ],
  exports: [
      
  ]
}) 

export class GuideModule {

}