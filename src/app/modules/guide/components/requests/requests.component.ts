import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: any[] = [];
  public selectedRequest: any[]

  constructor(private guideService: GuideService,
    config: NgbModalConfig, private modalService: NgbModal,
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
        console.log(res);
      }, error => {
        console.log(error);
      }
    )
  }

  acceptRequest(content, id) {
    console.log(id);
    this.guideService.reponseToTouristRequest(id, 'APPROVED').subscribe(
      res => {
        console.log(res);
        this.getAllRequests();
      }, error => {
        console.log(error);
      }
    );
    this.modalService.dismissAll(content);
  }

  rejectRequest(content, id) {
    console.log(id);
    this.guideService.reponseToTouristRequest(id, 'REJECTED').subscribe(
      res => {
        console.log(res);
        this.getAllRequests();
      }, error => {
        console.log(error);
      }
    );
    this.modalService.dismissAll(content);
  }

  open(content, data) {
    console.log(data);
    this.selectedRequest = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }

}
