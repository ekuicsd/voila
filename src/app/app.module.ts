import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { TouristsModule } from '../app/modules/tourists/tourists.module';
import { HomeModule } from '../app/modules/home/home.module';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { GuideModule } from '../app/modules/guide/guide.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './shared/service/http-interceptor.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)

  },
];


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    TouristsModule,
    HomeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    GuideModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: []
})
export class AppModule { }
