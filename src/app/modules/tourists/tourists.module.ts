import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  // {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent}
]; 

@NgModule({
  declarations: [

  RegisterComponent],
  imports: [
      // BrowserModule,
      CommonModule,
      RouterModule.forChild(routes)
  ],
  exports: [
      
  ]
}) 

export class TouristsModule {

}