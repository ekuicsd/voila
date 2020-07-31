import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { JwtService } from '../../service/jwt.service';
import { NavbarComponent, MDBModalService } from 'angular-bootstrap-md';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideService } from '../../service/guide.service';
import { TouristsService } from '../../service/tourists.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @ViewChild('basicModal', { static: false}) modal1: MDBModalService;
  @ViewChild('navbarid', {static: false}) navbaridRef: NavbarComponent;
  @Input() loggingIn;
  msgNumber = 0;
  public user: any;
  public recieverRole;
  public userRole;
  public onGoingEvents: any[] = [];
  public chatList = [];
  
  constructor(
    public jwtService: JwtService,
    private modalService: NgbModal,
    private guideService: GuideService,
    private touristService: TouristsService,
    public userService: UserService) {
    }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
  }

  onLinkClick() {
    this.navbaridRef.toggle(); //Hide the collapse menu after click
   }

  logout(role: string) {
      this.userService.logout(role);
  }

  getOngoingEvents(basicModal) {
    if(this.userService.getRole() === 'guide') {
     this.guideService.getAllBookingsByStatus('ONGOING').subscribe( res => {
       this.onGoingEvents = res;
       console.log(res);
       if(res.length <= 0) {
         this.onGoingEvents = undefined;
       }
       this.modal1.show(basicModal);
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
   this.modalService.open(content, {scrollable: true, centered: true});
  }
 
  open(content) {
   this.modalService.open(content, {scrollable: true, centered: true});
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
