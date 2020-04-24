import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../modules/home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './components/deals/deals.component';
import { GuideProfileComponent } from './components/guide-profile/guide-profile.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyDatePickerModule } from 'mydatepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

// import { NavbarModule, WavesModule, PopoverModule, IconsModule,
//      DropdownModule , ButtonsModule, ModalModule, TooltipModule, } from 'angular-bootstrap-md'

const routes: Routes = [
    
    {
        path: 'touristsRegister', redirectTo: 'tourists/register', pathMatch: 'full'
    },
    {path: 'tourists', 
        loadChildren: () => import('../modules/tourists/tourists.module').then(module => module.TouristsModule)
    },
    {
        path: 'guideRegister', redirectTo: 'guide/show-register', pathMatch: 'full'
    },
    {path: 'guide', 
        loadChildren: () => import('../modules/guide/guide.module').then(module => module.GuideModule)
    },
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'guideprofile', component: GuideProfileComponent
    }
    
    
];
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        DealsComponent,
        GuideProfileComponent,
        LoginPageComponent,
        ChangePasswordComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HomeModule,
        ReactiveFormsModule,
        MyDatePickerModule,
        NgbModule,
        MDBBootstrapModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LoginPageComponent
    ]
}) 

export class SharedModule {

}