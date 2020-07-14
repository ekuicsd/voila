import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: Booking[] = [];
  public selectedRequest: any;

  constructor(private touristService: TouristsService, 
    config: NgbModalConfig, private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllRequestsList();
  }
  
  open(content, data) {
    this.selectedRequest = data;
    this.modalService.open(content);
  } 

  getAllRequestsList() {
    this.touristService.getAllBookingsByStatus('PENDING').subscribe( res => {
      console.log(res);
      if(res.length > 0) {
        this.requestList = res;
      } else {
        this.requestList = undefined;
      }
    })
  }

  cancelRequest() {
    this.touristService.cancelrequest(this.selectedRequest._id, 'CANCEL').subscribe( res => {
      console.log(res);
      this.toastr.success("Request Cancelled successfully!");
      this.getAllRequestsList();
    })
  }

}
