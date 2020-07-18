import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';
import { JwtService } from '../../service/jwt.service';
import { Location } from '@angular/common';
import { NavbarComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @ViewChild('navbarid', {static: false}) navbaridRef: NavbarComponent;
  @Input() loggingIn;
  msgNumber = 0;
  public user: any;
  public recieverRole;
  public userRole;
  public chatList = [];
  
  constructor(
    private router: Router,
    public jwtService: JwtService,
    private msgService: MessageService,
    private location: Location,
    public userService: UserService) {
    }

  ngOnInit() {
  }

  onLinkClick() {
    this.navbaridRef.toggle(); //Hide the collapse menu after click
   }

  ngOnChanges() {
  }

  logout(role: string) {
      this.userService.logout(role);
  }

}
