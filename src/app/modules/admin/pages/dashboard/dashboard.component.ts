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
  public activeTab: string = 'new';

  constructor(private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getNewGuideList();
    this.getContactedGuideList();
  }

  getNewGuideList() {
    this.adminService.getAllGuides('PENDING').subscribe(res => {
      if(res.success) {
        this.newGuideList = res.guides;
        console.log(res.guides);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getContactedGuideList() {
    this.adminService.getAllGuides('CONTACTED').subscribe(res => {
      if(res.success) {
        this.contactedGuideList = res.guides;
        console.log(res.guides);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  navigateToGuideProfile(guide) {
    this.adminService.selectedGuide = guide;
    this.router.navigateByUrl('/admin/guideProfile/' + guide._id);
  }

}
