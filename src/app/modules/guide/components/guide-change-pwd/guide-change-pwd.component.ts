import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guide-change-pwd',
  templateUrl: './guide-change-pwd.component.html',
  styleUrls: ['./guide-change-pwd.component.scss']
})
export class GuideChangePwdComponent implements OnInit {

  constructor(private guideService: GuideService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  getChangePwdData(data) {
    this.guideService.changePwd(data.newPassword).subscribe( res => {
      console.log(res);
      this.toastr.success("Password changed successfully!");
    })
  }
}
