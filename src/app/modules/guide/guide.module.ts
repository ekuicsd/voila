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
import { DealsComponent } from './components/deals/deals.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestsComponent } from './components/requests/requests.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowRegisterComponent } from './pages/show-register/show-register.component';
import { GuideGuardService } from 'src/app/shared/service/guide-guard.service';
import { GuideChangePwdComponent } from './components/guide-change-pwd/guide-change-pwd.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BussinessDetailsComponent } from './components/bussiness-details/bussiness-details.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';



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
        path: 'messages', component: MessagesComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'chats/:role/:email', component: MessagesComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'changepassword', component: GuideChangePwdComponent,
        canActivate: [GuideGuardService]
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
    DealsComponent,
    BookingsComponent,
    ShowRegisterComponent,
    RequestsComponent,
    GuideChangePwdComponent,
    PersonalDetailsComponent,
    BussinessDetailsComponent,
    QuestionDetailsComponent,
    TermsConditionsComponent
    ],
  imports: [
    //   BrowserModule,
      CommonModule,
      RouterModule.forChild(routes),
      NgbModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      ArchwizardModule,
      SharedModule
  ],
  exports: [

  ]
})

export class GuideModule {

}
