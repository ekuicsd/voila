import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from 'src/app/shared/service/tourists.service';

@Component({
  selector: 'app-tourist-change-pwd',
  templateUrl: './tourist-change-pwd.component.html',
  styleUrls: ['./tourist-change-pwd.component.scss']
})
export class TouristChangePwdComponent implements OnInit {

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private touristService: TouristsService) { }

  ngOnInit() {
  }

  getChangePwdData(data) {
    console.log(data);
    this.touristService.changePwd(data.newPassword).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.user, 'tourist');
      this.toastr.success("Password changed successfully!");
    })
  }

}
