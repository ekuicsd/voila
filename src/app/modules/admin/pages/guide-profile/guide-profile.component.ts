import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Guide } from 'src/app/shared/models/guide.model';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.scss']
})
export class GuideProfileComponent implements OnInit {

  public userData: Guide;
  
  constructor(private route: ActivatedRoute,
    // private userService: UserService,
    private adminService: AdminService
    ) { }
  

  ngOnInit() {
    // this.getUser();
  }

  // getUser() {
  //   this.userData = JSON.parse(this.userService.getUser('guide'));
  //   console.log(this.userData);
  // }

}
