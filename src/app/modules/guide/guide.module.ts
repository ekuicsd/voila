import { NgModule } from '@angular/core';
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
import { RequestsComponent } from './components/requests/requests.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    // {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'guidehome', component: GuideHomeComponent, children: [
      {
        path: '', redirectTo: 'bookings', pathMatch: 'full'
      },
    // {path: 'guide', children: [
      {
        path: 'bookings', component: BookingsComponent
      },
      {
        path: 'requests', component: RequestsComponent
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
    RequestsComponent
    ],
  imports: [
    //   BrowserModule,
      CommonModule,
      RouterModule.forChild(routes),
      NgbModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      ArchwizardModule,
  ],
  exports: [
      
  ]
}) 

export class GuideModule {

}