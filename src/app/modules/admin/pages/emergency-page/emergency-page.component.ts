import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emergency-page',
  templateUrl: './emergency-page.component.html',
  styleUrls: ['./emergency-page.component.scss']
})
export class EmergencyPageComponent implements OnInit {

  public sosAlertList: any[] = [];
  public userData;
  public reportId;

  constructor(private adminService: AdminService,
    private modalService: NgbModal,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getAllSosAlerts();
  }

  openContent(content, reportId) {
    console.log(reportId);
    this.adminService.getUserReportById(reportId).subscribe( res => {
      if(res.success) {
        this.reportId = reportId;
        this.userData = res.user;
        this.modalService.open(content, {scrollable: true, centered: true});
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getAllSosAlerts() {
    this.adminService.getSosAlerts().subscribe( res => {
      if(res.success) {
        this.sosAlertList = res.reports;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  changeStatus(content) {
    this.adminService.changeStatusByreportId(this.reportId, 'RESOLVED').subscribe( res => {
      if(res.success) {
        this.toastr.success(res.message);
        this.modalService.dismissAll(content);
        this.getAllSosAlerts();
      } else {
        this.toastr.error(res.message);
      }
    })
  }


}
