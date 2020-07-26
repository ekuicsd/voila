import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.scss']
})
export class GuideProfileComponent implements OnInit {

  public userData: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
    ) { }
  

  ngOnInit() {
    if(this.adminService.selectedGuide) {
      this.userData = this.adminService.selectedGuide;
    } else {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  acceptRejectGuide(status: string) {
    this.adminService.approvedrejectGuide(this.userData._id, status).subscribe(res => {
      this.router.navigateByUrl('/admin/dashboard');
    })
  }


}
