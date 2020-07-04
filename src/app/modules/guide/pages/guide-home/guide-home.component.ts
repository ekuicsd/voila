import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-guide-home',
  templateUrl: './guide-home.component.html',
  styleUrls: ['./guide-home.component.scss']
})
export class GuideHomeComponent implements OnInit {

  public user;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser('guide'));
  }

  logout() {
    this.userService.logout('guide');
  }

}
