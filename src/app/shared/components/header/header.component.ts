import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';
import { JwtService } from '../../service/jwt.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { NavbarComponent } from 'angular-bootstrap-md';
// import { NavbarComponent as navmdb } from '../../../node_modules/ng-uikit-pro-standard/lib/free/navbars/navbar.component';
// import { NavbarComponent as navmdb } from '../../../node_modules/angular-bootstrap-md/navbars/navbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{

  @ViewChild('navbarid', {static: false}) navbaridRef: NavbarComponent;
  @Input() loggingIn;
  msgNumber = 0;
  public user: any;
  public recieverRole;
  public userRole;
  // socket:any;
  public chatList = [];
  
  constructor(
    private router: Router,
    public jwtService: JwtService,
    private msgService: MessageService,
    private location: Location,
    public userService: UserService) {
      // this.socket = io(environment.baseUrl);
     }

  ngOnInit() {
    // if(this.jwtService.getToken()) {
    //   this.userRole = this.userService.getRole();
    //   console.log(this.userRole);
    //   if(this.userRole === 'tourist') {
    //     this.recieverRole = 'guide';
    //   } else {
    //     this.recieverRole = 'tourist';
    //   }
    //   this.getUser();
    //   this.socket.on('refreshPage', () => {
    //     this.getUser();
    //   })
    // }
  }

  onLinkClick() {
    this.navbaridRef.toggle(); //Hide the collapse menu after click
   }

  // navigateToBackLocation() {
  //   this.location.back();
  // }

  ngOnChanges() {
  //   if(this.jwtService.getToken()) {
  //   this.getUser();
  // }
  }

  // getUser() {
  //   this.userService.getProfile(this.userRole).subscribe( res => {
  //     this.user = res;
  //     if(this.user) {
  //       console.log(this.user);
  //       this.chatList = this.user.chatList;
  //       console.log(this.chatList);
  //       this.checkIfRead(this.chatList);
  //       console.log(this.msgNumber);
  //     }
  //   })
  // }

  logout(role) {
    if(role === 'guide') {
      this.userService.logout('guide');
    } else {
    this.userService.logout('tourist');
    }
  }

  // checkIfRead(arr) {
  //   const checkArr = [];
  //   for(let i=0; i<arr.length; i++) {
  //     const reciever = arr[i].msgId.message[arr[i].msgId.message.length - 1];
  //     console.log(reciever);
  //     if(this.router.url !== `/chats/${this.recieverRole}/${reciever.sendername}`) {
  //         if(reciever.isRead === false && reciever.receivername === this.user.name) { 
  //         checkArr.push(1);
  //         this.msgNumber = checkArr.length;
  //         console.log(this.msgNumber);
  //       }
  //     }
  //   }
  // }

}
