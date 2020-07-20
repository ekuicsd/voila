 import { Component, ViewChild } from '@angular/core';
import {Router , NavigationCancel,NavigationEnd,NavigationError,NavigationStart, Event} from '@angular/router';
import { JwtService } from './shared/service/jwt.service';
import { UserService } from './shared/service/user.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { GuideService } from './shared/service/guide.service';
import { TouristsService } from './shared/service/tourists.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('basicModal', { static: false}) modal1: MDBModalService;
  ShowLoadingIndicator = true;
  public onGoingEvents: any[] = [];
  selected = 0;
  hovered = 0;

 constructor(private loadRouter : Router,
    public userService: UserService,
    public jwtService: JwtService,
    private modalService: NgbModal,
    private guideService: GuideService,
    private touristService: TouristsService,
    config: NgbRatingConfig
  ){

    config.max = 5;
    config.readonly = true;

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

 getOngoingEvents(basicModal) {
   if(this.userService.getRole() === 'guide') {
    this.guideService.getAllBookingsByStatus('ONGOING').subscribe( res => {
      this.onGoingEvents = res;
      if(res.length <= 0) {
        this.onGoingEvents = undefined;
      }
      this.modal1.show(basicModal);
      console.log(res);
    });
   } else {
    this.touristService.getAllBookingsByStatus('ONGOING').subscribe( res => {
      this.onGoingEvents = res;
      if(res.length <= 0) {
        this.onGoingEvents = undefined;
      }
      console.log(res);
      this.modal1.show(basicModal);
    });
   }
 }

 openModal(content) {
  this.modalService.open(content);
 }

 completeTour(content) {
   let request = {
     rating: 5,
     reviews: ''
   };
    this.touristService.cancelrequest(this.onGoingEvents[0]._id, 'COMPLETED', request).subscribe( res => {
      console.log(res);
    });
 }

 open(content) {
  this.modalService.open(content);
}



}
