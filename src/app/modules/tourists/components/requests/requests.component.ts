import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: any[] = [];
  public selectedRequest: any;
  public cancelReason: string = 'cancel request';
  public isData = false;

  constructor(private touristService: TouristsService, 
    config: NgbModalConfig, private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllRequestsList();
  }
  
  open(content, data) {
    this.selectedRequest = data;
    this.modalService.open(content, {scrollable: true, centered: true});
  } 

  getAllRequestsList() {
    this.touristService.getAllBookingsByStatus('PENDING').subscribe( res => {
        this.requestList = res;
        this.isData = true;
    })
  }

  cancelRequest() {
    let request = {cancelReason: this.cancelReason };
    this.touristService.cancelrequest(this.selectedRequest._id, 'CANCELLED', request).subscribe( res => {
      this.toastr.success("Request Cancelled successfully!");
      this.getAllRequestsList();
    })
  }

}
