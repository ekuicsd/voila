 import { Component } from '@angular/core';
import {Router , NavigationCancel,NavigationEnd,NavigationError,NavigationStart, Event} from '@angular/router';
import { JwtService } from './shared/service/jwt.service';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ShowLoadingIndicator = true;

 constructor(private router : Router,
    public userService: UserService,
    public jwtService: JwtService,

  ){ 
    this.router.events.subscribe((routerEvent :Event) =>
    {
      if(routerEvent instanceof NavigationStart){
          this.ShowLoadingIndicator = true;
      }
      if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError){
            this.ShowLoadingIndicator = false;
      }
    });

   }


}
