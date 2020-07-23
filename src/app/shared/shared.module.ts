import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './components/deals/deals.component';
import { GuideProfileComponent } from './components/guide-profile/guide-profile.component';
import { BookingProfileComponent } from './components/booking-profile/booking-profile.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DealsCardsComponent } from './components/deals-cards/deals-cards.component';
import { ChatsComponent } from './components/chats/chats.component';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { ChatHistoryListComponent } from './components/chat-history-list/chat-history-list.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { TruncateTextPipe } from './pipes/truncateText.pipe';
import { ShortTextPipe } from './pipes/shortText.pipe';
import { AgePipe } from './pipes/age.pipe';
import { PersonalModalComponent } from './components/personal-modal/personal-modal.component';
import { DealModalComponent } from './components/deal-modal/deal-modal.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
    {
        path: 'touristsRegister', redirectTo: 'tourists/register', pathMatch: 'full'
    },
    {
        path: 'tourists', 
        loadChildren: () => import('../modules/tourists/tourists.module').then(module => module.TouristsModule)
    },
    {
        path: 'guideRegister', redirectTo: 'guide/show-register', pathMatch: 'full'
    },
    {
        path: 'guide', 
        loadChildren: () => import('../modules/guide/guide.module').then(module => module.GuideModule)
    },
    {
        path:'admin',
        loadChildren: () => import('../modules/admin/admin.module').then(module => module.AdminModule)
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
        TruncateTextPipe,
        ShortTextPipe,
        AgePipe,
        PersonalModalComponent,
        DealModalComponent,
        RatingModalComponent,
        ChatRoomComponent
    ],
    imports: [
        CommonModule,
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
        TruncateTextPipe,
        ShortTextPipe,
        AgePipe,
        PersonalModalComponent,
        DealModalComponent,
        RatingModalComponent,
        ChatRoomComponent
    ]
}) 

export class SharedModule {

}