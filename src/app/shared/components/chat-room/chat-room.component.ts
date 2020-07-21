import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  public message: string = '';
  public user;
  public roomId;
  socket = io(environment.baseUrl);

  constructor(private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
    ) {
     }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
    this.route.url.subscribe( res => {
      this.roomId = this.route.snapshot.params.roomId;
      console.log(this.roomId);
      if(this.roomId) {
        this.socket.emit('joinRoom', {roomId: this.roomId});
        // this.socket.on('message', (msg) => {
        //   console.log(msg);
        // });
      }
    });
  }

  sendMessage() {
    if(this.message !== '') {
      this.socket.emit('message', {
        roomId: this.roomId,
        senderId: this.user._id,
        message: this.message
      });
      console.log(this.message);
      // this.message = '';
    } else {
      this.toastr.error("pls enter any message!");
    }
  }

}
