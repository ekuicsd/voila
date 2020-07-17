import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MessageService } from '../../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-history-list',
  templateUrl: './chat-history-list.component.html',
  styleUrls: ['./chat-history-list.component.scss']
})
export class ChatHistoryListComponent implements OnInit {

  public messageList: any[] = [];
  public user;
  public role;

  constructor(private userService: UserService,
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit() {
    this.role = this.userService.getRole();
    this.user = JSON.parse(this.userService.getUser(this.role));
    if(this.role === 'guide') {
      this.getGuideMessageList();
    } else {
      this.getTouristMessageList();
    }
  }

  getGuideMessageList() {
    this.messageService.getGuideMessageList(this.user._id).subscribe( res => {
      if(res.glbl.length > 0) {
        this.messageList = res.glbl;
      } else {
        this.messageList = undefined;
      }
    });
  }

  getTouristMessageList() {
    this.messageService.getTouristMessageList(this.user._id).subscribe( res => {
      if(res.glbl.length > 0) {
        this.messageList = res.glbl;
      } else {
        this.messageList = undefined;
      }
    });
  }

  navigateToChat(email) {
    if(this.role === 'guide') {
      this.router.navigateByUrl('/guide/guidehome/messages/chats/tourist/' + email);
    } else {
      this.router.navigateByUrl('/tourist/guidehome/messages/chats/guide/' + email);
    }
  }

}
