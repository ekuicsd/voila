import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuideProfileComponent } from './pages/guide-profile/guide-profile.component';
import { AdminGuardService } from './services/admin.auth.guard';
import { AdminHomeGuardService } from 'src/app/shared/service/admin.guard';
import { EmergencyPageComponent } from './pages/emergency-page/emergency-page.component';

const routes: Routes = [
    { 
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginPageComponent,
        canActivate: [AdminHomeGuardService]
    },
    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AdminGuardService]
    },
    {
        path: 'guideProfile/:guideId', component: GuideProfileComponent,
        canActivate: [AdminGuardService]
    },
    {
      path: 'emergency', component: EmergencyPageComponent,
      canActivate: [AdminGuardService]
    }
 
];

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardComponent,
    GuideProfileComponent,
    EmergencyPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  exports: [
  ]
})

export class AdminModule {

}
