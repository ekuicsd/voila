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
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ShowRegisterComponent } from './pages/show-register/show-register.component';
import { GuideGuardService } from 'src/app/shared/service/guide-guard.service';



const routes: Routes = [
    // {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},

    {path: 'show-register', component: ShowRegisterComponent },
    
    {path: 'guidehome', component: GuideHomeComponent, children: [
      {
        path: '', redirectTo: 'bookings', pathMatch: 'full'
      },
    // {path: 'guide', children: [
      {
        path: 'bookings', component: BookingsComponent, 
        canActivate: [GuideGuardService]
      },
      {
        path: 'requests', component: RequestsComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'editProfile', component: ProfileComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'activities', component: ActivitiesComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'deals', component: DealsComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'interests', component: EditPreferencesComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'messages', component: MessagesComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'changepassword', component: ChangePasswordComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'bookings', component: BookingsComponent,
        canActivate: [GuideGuardService]
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
    RequestsComponent,
    ChangePasswordComponent,
    ShowRegisterComponent
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