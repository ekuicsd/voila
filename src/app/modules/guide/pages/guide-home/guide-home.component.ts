import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import {Router , NavigationCancel,NavigationEnd,NavigationError,NavigationStart, Event} from '@angular/router';
@Component({
  selector: 'app-guide-home',
  templateUrl: './guide-home.component.html',
  styleUrls: ['./guide-home.component.scss']
})
export class GuideHomeComponent implements OnInit {
  ShowLoadingIndicator = true;

  public user;
  constructor(private userService: UserService ,private loadRouter : Router) {
  this.loadRouter.events.subscribe((routerEvent :Event) =>
  {
    if(routerEvent instanceof NavigationStart){
      this.ShowLoadingIndicator = true;
    }
    if(routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError){
     this.ShowLoadingIndicator = false;
   }
  });}
  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser('guide'));
  }

  logout() {
    this.userService.logout('guide');
  }

}
