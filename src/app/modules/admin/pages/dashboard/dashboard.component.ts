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

  public guideList: any[] = [];

  constructor(private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getGuideList();
  }

  getGuideList() {
    this.adminService.getAllGuides().subscribe(res => {
      console.log(res);
      if(res.success) {
        this.guideList = res.guides;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  navigateToGuideProfile(guide) {
    console.log(guide);
    this.adminService.selectedGuide = guide;
    this.router.navigateByUrl('/admin/guideProfile/' + guide._id);
  }

}
