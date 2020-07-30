import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  public message: string = '';
  public user;
  public roomId;
  public roomName;
  socket = io(environment.baseUrl);
  public messageList: any[];

  constructor(private toastr: ToastrService,
    public userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
    this.route.url.subscribe( res => {
      this.roomId = this.route.snapshot.params.roomId;
      if(this.roomId) {
        this.socket.emit('joinRoom', {roomId: this.roomId});
        this.getAllMessages();
        this.socket.on('emitMessage', () => {
          this.getAllMessages();
        });
      }
    });
  }

  
  back() {
    this.location.back();
  }

  getAllMessages() {
    this.messageService.getAllChatRoomMsg(this.roomId).subscribe( res => {
      this.messageList = res.newRoom.chatList;
      this.roomName = res.newRoom.name;
    });
  }

  sendMessage() {
    if(this.message !== '') {
      this.socket.emit('message', {
        roomId: this.roomId,
        senderId: this.user._id,
        message: this.message
      });
      this.message = '';
    } else {
      this.toastr.error("pls enter any message!");
    }
  }

}
