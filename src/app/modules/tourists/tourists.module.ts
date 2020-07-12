import { NgModule } from '@angular/core';
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
import { RequestsComponent } from './components/requests/requests.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { AllBookingsComponent } from './pages/all-bookings/all-bookings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TouristChangePwdComponent } from './components/tourist-change-pwd/tourist-change-pwd.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TouristGuardService } from 'src/app/shared/service/tourist-guard.service';
import { GuidesListComponent } from './components/guides-list/guides-list.component';
import { DealsListComponent } from './components/deals-list/deals-list.component';
import { GuideProfileComponent } from 'src/app/shared/components/guide-profile/guide-profile.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { InterestsComponent } from './pages/interests/interests.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import {InputTextModule} from 'primeng/inputtext';
import { ChatHistoryListComponent } from 'src/app/shared/components/chat-history-list/chat-history-list.component';
import { ChatsComponent } from 'src/app/shared/components/chats/chats.component';
import { Ng5SliderModule } from 'ng5-slider';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'touristshome', component: TouristsHomeComponent, children: [
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
      path: 'dashboard', component: DashboardComponent,
      canActivate: [TouristGuardService]
    },
    {
      path: 'changePassword', component: TouristChangePwdComponent,
      canActivate: [TouristGuardService]
    },
    {
      path: 'editProfile', component: EditProfileComponent,
      canActivate: [TouristGuardService]
    },
    {
      path: 'favourites', component: FavouritesComponent,
      canActivate: [TouristGuardService]
    },
    {
      path: 'messages', component: MessagesComponent, canActivate: [TouristGuardService], children: [
        {
          path: '', redirectTo: 'chatList', pathMatch: 'full'
        },
        {
          path: 'chatList', component: ChatHistoryListComponent
        }, 
        {
          path: 'chats/:role/:email', component: ChatsComponent,
        }
      ]
      
    },
    // {
    //   path: 'chats/:role/:email', component: MessagesComponent,
    //   canActivate: [TouristGuardService]
    // },
    {
      path: 'bookings', component: AllBookingsComponent, children: [
        {
          path: '', redirectTo: 'now', pathMatch: 'full'
        },
        {
          path:'now', component: BookingsComponent,
          canActivate: [TouristGuardService]
        },
        {
          path:'requests', component: RequestsComponent,
          canActivate: [TouristGuardService]
        },
        {
          path: 'histories', component: HistoriesComponent,
          canActivate: [TouristGuardService]
        }
      ]
    },
    {
      path: 'searchResult', component: SearchResultPageComponent, children: [
        {
          path: '', redirectTo: 'guidesList', pathMatch: 'full'
        },
        {
          path: 'guidesList', component: GuidesListComponent
        },
        {
          path: 'dealsList', component: DealsListComponent
        }
      ]
    },
    {
      path: 'guideProfile/:id', component: GuideProfileComponent
    },
    {
      path: 'languagesInterests/:status', component: LanguagesComponent, //languageInterest
      canActivate: [TouristGuardService]
    },
    {
      path: 'interests/:status', component: InterestsComponent, //interests
       canActivate: [TouristGuardService]
    },
    {
      path: 'languages/:status', component: LanguagesComponent, //languages
      canActivate: [TouristGuardService]
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
    RequestsComponent,
    AllBookingsComponent,
    SearchResultPageComponent,
    TouristChangePwdComponent,
    GuidesListComponent,
    DealsListComponent,
    InterestsComponent,
    LanguagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    Ng5SliderModule,
  ],
  exports: [

  ]
})

export class TouristsModule {

}
