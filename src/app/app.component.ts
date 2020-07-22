 import { Component, ViewChild } from '@angular/core';
import {Router , NavigationCancel,NavigationEnd,NavigationError,NavigationStart, Event} from '@angular/router';
import { JwtService } from './shared/service/jwt.service';
import { UserService } from './shared/service/user.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { GuideService } from './shared/service/guide.service';
import { TouristsService } from './shared/service/tourists.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('basicModal', { static: false}) modal1: MDBModalService;
  ShowLoadingIndicator = true;
  public onGoingEvents: any[] = [];

 constructor(private loadRouter : Router,
    public userService: UserService,
    public jwtService: JwtService,
    private modalService: NgbModal,
    private guideService: GuideService,
    private toastr: ToastrService,
    private touristService: TouristsService,
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

 open(content) {
  this.modalService.open(content);
  }

  getEndDate(data) {
    if(data) {
      let today = new Date();
      let end = new Date(data.endDate);
      let diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
      if(diff >= 0) {
        return true;
      }
    }
    return false;
  }
    
   

}
