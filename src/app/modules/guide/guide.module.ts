import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuideHomeComponent } from './pages/guide-home/guide-home.component';

const routes: Routes = [
    // {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: GuideHomeComponent}
]; 

@NgModule({
  declarations: [
    RegisterComponent,
    GuideHomeComponent
    ],
  imports: [
    //   BrowserModule,
      CommonModule,
      RouterModule.forChild(routes)
  ],
  exports: [
      
  ]
}) 

export class GuideModule {

}