import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuideHomeComponent } from './pages/guide-home/guide-home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { DealsComponent } from './components/deals/deals.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestsComponent } from './components/requests/requests.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowRegisterComponent } from './pages/show-register/show-register.component';
import { GuideGuardService } from 'src/app/shared/service/guide-guard.service';
import { GuideChangePwdComponent } from './components/guide-change-pwd/guide-change-pwd.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BussinessDetailsComponent } from './components/bussiness-details/bussiness-details.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { BlogComponent } from './components/blog/blog.component';
import { ChatHistoryListComponent } from 'src/app/shared/components/chat-history-list/chat-history-list.component';
import { ChatsComponent } from 'src/app/shared/components/chats/chats.component';
import { CreateDealComponent } from './components/create-deal/create-deal.component';
import { ChatRoomComponent } from 'src/app/shared/components/chat-room/chat-room.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    {path: 'register', component: RegisterComponent},

    {path: 'show-register', component: ShowRegisterComponent },

    {path: 'guidehome', component: GuideHomeComponent, children: [
      {
        path: '', redirectTo: 'bookings', pathMatch: 'full'
      },
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
        path: 'createDeal', component: CreateDealComponent,
        canActivate: [GuideGuardService]
      },
      {
        path: 'message/chatRooms/:roomId', component: ChatRoomComponent
      },
      {
        path: 'messages', component: MessagesComponent, canActivate: [GuideGuardService], children: [
          {
            path: '', redirectTo: 'chatList', pathMatch: 'full'
          },
          {
            path: 'chatList', component: ChatHistoryListComponent
          }, 
          {
            path: 'chats/:role/:email/:name', component: ChatsComponent,
          }
        ]  
      },
      {
        path: 'changepassword', component: GuideChangePwdComponent,
        canActivate: [GuideGuardService]
      },
      // {
      //    path: 'show-register', component: ShowRegisterComponent
      // }
    ]},
    {
      path: '404', component: PageNotFoundComponent
    },
    {
        path: '**', redirectTo: '/404'
    }
];

@NgModule({
  declarations: [
    RegisterComponent,
    GuideHomeComponent,
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
    TermsConditionsComponent,
    LanguagesComponent,
    InterestsComponent,
    BlogComponent,
    CreateDealComponent
    ],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      ArchwizardModule,
      SharedModule
  ],
  exports: []
})

export class GuideModule {

}
