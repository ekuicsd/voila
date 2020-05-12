import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';
import { JwtService } from '../../service/jwt.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  msgNumber = 0;
  public user: any;
  socket:any;
  public chatList = [];
  
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private msgService: MessageService,
    private userService: UserService) {
      this.socket = io(environment.baseUrl);
     }

  ngOnInit() {
    if(this.jwtService.getToken()) {
      this.getUser();
      this.socket.on('refreshPage', () => {
        this.getUser();
      })
    }
  }

  getUser() {
    const role = this.userService.getRole();
    console.log(role);
    this.user = JSON.parse(this.userService.getUser(role));
    if(this.user) {
      console.log(this.user);
      this.chatList = this.user.chatList;
      console.log(this.chatList);
      // this.checkIfRead(this.chatList);
    }
  }

  logout() {
    this.userService.logout('tourist');
  }

  // checkIfRead(arr) {
  //   const checkArr = [];
  //   for(let i=0; i<arr.length; i++) {
  //     const reciever = arr[i].msgId.message[arr[i].msgId.message.length - 1]; //incomplete
  //     console.log(reciever);
  //     if(this.router.url !== '') { //incomplete
  //       if(reciever.isRead == false && reciever.receivername === 'this.user.name') { 
  //         checkArr.push(1);
  //         this.msgNumber = checkArr.length;
  //         console.log(this.msgNumber);
  //       }
  //     }
  //   }
  // }

}
