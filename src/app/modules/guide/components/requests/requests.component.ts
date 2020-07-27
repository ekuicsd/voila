import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: any[] = [];
  public selectedRequest: any[]

  constructor(private guideService: GuideService,
     private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.guideService.getAllBookingsByStatus('PENDING').subscribe(
      res => {
        if(res.length > 0) {
          this.requestList = res;
        } else {
          this.requestList = undefined;
        }
      }, error => {
      }
    )
  }

  acceptRequest(content, id) {
    this.guideService.reponseToTouristRequest(id, 'APPROVED').subscribe(
      res => {
        this.getAllRequests();
      }, error => {
      }
    );
    this.modalService.dismissAll(content);
  }

  rejectRequest(content, id) {
    this.guideService.reponseToTouristRequest(id, 'REJECTED').subscribe(
      res => {
        this.getAllRequests();
      }, error => {
      }
    );
    this.modalService.dismissAll(content);
  }

  open(content, data) {
    this.selectedRequest = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }

}
