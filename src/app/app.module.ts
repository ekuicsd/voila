import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { HomeModule } from '../app/modules/home/home.module';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './shared/service/http-interceptor.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule),
    
  },
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    MDBBootstrapModule,
    RouterModule.forRoot(routes,  {
      scrollPositionRestoration: 'disabled', // Add options right here
    }),
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
  exports: [RouterModule]
})
export class AppModule { }
