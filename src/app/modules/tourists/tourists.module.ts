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
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';

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
      path: 'chats/:role/:email', component: MessagesComponent,
      canActivate: [TouristGuardService]
    },
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
      path: 'languages', component: LanguagesComponent, 
      // canActivate: [TouristGuardService]
    },
    {
      path: 'interests', component: InterestsComponent,
      //  canActivate: [TouristGuardService]
    },
    {
      path: 'languagesInterests', component:LanguagesComponent
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
    SliderModule,
    InputTextModule,
    FormsModule
  ],
  exports: [

  ]
})

export class TouristsModule {

}
