import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
}) 

export class SharedModule {

}