import { Component } from '@angular/core';
import{ Router ,Event, NavigationStart,NavigationEnd, NavigationError,NavigationCancel } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ShowLoadingIndicator = true;
 constructor( private loadRouter : Router){
this.loadRouter.events.subscribe((routerEvent : Event) =>{
  if(routerEvent instanceof NavigationStart){
    this.ShowLoadingIndicator = true;
  }
  if(routerEvent instanceof NavigationEnd){
    this.ShowLoadingIndicator = false;
  }
});
 }
}
