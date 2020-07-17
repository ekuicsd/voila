import { Component, OnInit, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ChatsComponent implements OnInit {
  public receiverRole: string;
  public senderRole: string = '';
  public email: string;
  public sender: any;
  public reciever: any;
  public message: string = '';
  public messageArray = [];
  socket : any;
  params: any;

  constructor(private msgService: MessageService,
    private userService: UserService,
    private route: ActivatedRoute) {
      this.socket = io(environment.baseUrl);
    }

  ngOnInit() {
    this.route.url.subscribe( res => {
      this.email = this.route.snapshot.params.email;
      this.receiverRole = this.route.snapshot.params.role;
      // console.log(this.receiverRole);
      if(this.receiverRole === 'guide') {
        this.senderRole = 'tourist';
        // console.log(this.senderRole);
        this.sender = JSON.parse(this.userService.getUser('tourist'));
      }
      if(this.receiverRole === 'tourist') {
        this.senderRole = 'guide';
        this.sender = JSON.parse(this.userService.getUser('guide'));
        // console.log(this.senderRole);
      }
      // console.log("sender" ,this.sender);
      // console.log(this.reciever);
      this.getUserByEmail(this.email, this.receiverRole);


      this.socket.on('refreshPage', () => {
        this.getUserByEmail(this.email, this.receiverRole);
      });
    });

  }


  getUserByEmail(email, receiverRole) {
    this.userService.getUserByEmail(email, receiverRole)
    .subscribe( res => {
      console.log("receiver",res);
      this.reciever = res;
      this.getAllMessages(this.senderRole, this.sender._id, this.reciever._id);
      // this.markMessages(this.sender.email, this.reciever.name);
      this.params = {
        room1: this.sender._id,
        room2 : this.reciever._id
      };
      this.socket.emit('join chat', this.params);
    });
  }

  getAllMessages(role, senderId, receiverId ) {
    this.msgService.getAllMessage(role, senderId, receiverId).subscribe( res => {
      console.log(res);
      this.messageArray = res.msg.message;
    })
  }

  // markMessages(sender, receiver) {
  //   this.msgService.markMessages(sender, receiver).subscribe( res => {
  //     console.log(res);
  //     this.socket.emit('refresh', {});
  //   })
  // }

  sendMessage() {
    if(this.message) {
      this.msgService.sendMessage(this.sender._id, this.reciever._id,
        this.reciever.name, this.message, this.senderRole)
        .subscribe(res => {
        // console.log(res);
        this.socket.emit('refresh', {
          data: "connected with socket"
        })
        this.message = '';
      })
    }
  }

}
