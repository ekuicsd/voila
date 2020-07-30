import { Component, OnInit } from '@angular/core';
import {Router , NavigationCancel,NavigationEnd,NavigationError,NavigationStart, Event} from '@angular/router';

@Component({
  selector: 'app-tourists-home',
  templateUrl: './tourists-home.component.html',
  styleUrls: ['./tourists-home.component.scss']
})
export class TouristsHomeComponent implements OnInit {
  ShowLoadingIndicator = true;

  constructor(private loadRouter : Router,
    ){
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
    });
  }

  ngOnInit() {


    }
  }

