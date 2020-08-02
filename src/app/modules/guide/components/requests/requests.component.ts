import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: any[] = [];
  public selectedRequest: any[];
  public isData = false;

  constructor(private guideService: GuideService,
     private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.guideService.getAllBookingsByStatus('PENDING').subscribe(
      res => {
          this.requestList = res;
          this.isData = true;
      }, error => {
      }
    )
  }

  acceptRequest(content, id) {
    Swal.fire({
      text: "Are you sure to accept the request?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Accept'
    }).then((result) => {
      if (result.value) {
        this.guideService.reponseToTouristRequest(id, 'APPROVED').subscribe(
          res => {
            this.getAllRequests();
          }, error => {
          }
        );
        this.modalService.dismissAll(content);
      }
    }); 
  }

  rejectRequest(content, id) {
    Swal.fire({
      text: "Are you sure to cancel the request?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        this.guideService.reponseToTouristRequest(id, 'REJECTED').subscribe(
          res => {
            this.getAllRequests();
          }, error => {
          }
        );
        this.modalService.dismissAll(content);
      }
    }); 
  }

  open(content, data) {
    this.selectedRequest = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }

}
