import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../modules/home/home.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './components/deals/deals.component';
import { GuideProfileComponent } from './components/guide-profile/guide-profile.component';
import { BookingProfileComponent } from './components/booking-profile/booking-profile.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyDatePickerModule } from 'mydatepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DealsCardsComponent } from './components/deals-cards/deals-cards.component';
import { ChatsComponent } from './components/chats/chats.component';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { ChatHistoryListComponent } from './components/chat-history-list/chat-history-list.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { TruncateTextPipe } from './pipes/truncateText.pipe';
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
        path: 'login/:role', component: LoginPageComponent
    },
    {
        path: 'guideprofile', component: GuideProfileComponent
    },
    {
        path: 'bookingprofile', component: BookingProfileComponent
    }, 
    {
        path: 'help', component: HelpPageComponent
    },
    {
        path: 'aboutUs', component: AboutComponent
    }, 
    {
        path: 'contact', component: ContactUsComponent
    }
    
    
];
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        DealsComponent,
        GuideProfileComponent,
        BookingProfileComponent,
        LoginPageComponent,
        ChangePasswordComponent,
        DealsCardsComponent,
        ChatsComponent,
        ChatHistoryListComponent,
        HelpPageComponent,
        ContactUsComponent,
        AboutComponent,
        TruncateTextPipe
    ],
    imports: [
        CommonModule,
        // HomeModule,
        ReactiveFormsModule,
        FormsModule,
        NgxAutoScrollModule,
        MyDatePickerModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LoginPageComponent,
        ChangePasswordComponent,
        GuideProfileComponent,
        DealsCardsComponent,
        ChatsComponent,
        ChatHistoryListComponent,
        TruncateTextPipe
    ]
}) 

export class SharedModule {

}