import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-change-pwd',
  templateUrl: './tourist-change-pwd.component.html',
  styleUrls: ['./tourist-change-pwd.component.scss']
})
export class TouristChangePwdComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private touristService: TouristsService) { }

  ngOnInit() {
  }

  getChangePwdData(data) {
    this.touristService.changePwd(data.newPassword).subscribe( res => {
      this.userService.saveUser(res.user, 'tourist');
      this.router.navigateByUrl('/tourists/touristshome/dashboard');
      this.toastr.success("Password changed successfully!");
    });
  }

}
