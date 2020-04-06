import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../modules/home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { GuideProfileComponent } from './components/guide-profile/guide-profile.component';

// import { NavbarModule, WavesModule, PopoverModule, IconsModule,
//      DropdownModule , ButtonsModule, ModalModule, TooltipModule, } from 'angular-bootstrap-md'

const routes: Routes = [
    // {path: 'login', component: LoginComponent},
    {
        path: 'touristsRegister', redirectTo: 'tourists/register', pathMatch: 'full'
    },
    {path: 'tourists', 
        loadChildren: () => import('../modules/tourists/tourists.module').then(module => module.TouristsModule)
    },
    {
        path: 'guideRegister', redirectTo: 'guide/register', pathMatch: 'full'
    },
    {path: 'guide', 
        loadChildren: () => import('../modules/guide/guide.module').then(module => module.GuideModule)
    },
    {
        path: 'guideprofile', component: GuideProfileComponent
    }
    
    
];
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        GuideProfileComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HomeModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),

        // NavbarModule,
        // WavesModule, 
        // ButtonsModule,
        // ModalModule.forRoot(),
        // PopoverModule, 
        // TooltipModule,
        // IconsModule,
        // DropdownModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
}) 

export class SharedModule {

}