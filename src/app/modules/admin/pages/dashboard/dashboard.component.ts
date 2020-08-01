import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newGuideList: any[] = [];
  public contactedGuideList: any[] = [];

  constructor(private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.newGuideList = this.getguideList('PENDING');
    this.contactedGuideList = this.getguideList('CONTACTED');
  }

  getguideList(status) : any {
    this.adminService.getAllGuides(status).subscribe(res => {
      if(res.success) {
        console.log(res);
        return  res.guides;
      } else {
        this.toastr.error(res.message);
        return []
      }
    });
  }

  navigateToGuideProfile(guide) {
    this.adminService.selectedGuide = guide;
    this.router.navigateByUrl('/admin/guideProfile/' + guide._id);
  }

}
