import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide-change-pwd',
  templateUrl: './guide-change-pwd.component.html',
  styleUrls: ['./guide-change-pwd.component.scss']
})
export class GuideChangePwdComponent implements OnInit {

  constructor(private guideService: GuideService,
    private userService: UserService,
    private router: Router,
     private toastr: ToastrService) { }

  ngOnInit() {
  }

  getChangePwdData(data) {
    this.guideService.changePwd(data.newPassword).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.user, 'guide');
      this.toastr.success("Password changed successfully!");
      this.router.navigateByUrl('/guide/guidehome/bookings');
    });
  }
}
