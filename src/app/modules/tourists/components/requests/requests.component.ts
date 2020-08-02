import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { StaticDataService } from 'src/app/shared/service/static-data.service';

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
    private modalService: NgbModal,
    private staticDataService: StaticDataService,
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

  cancelRequest(content) {
    Swal.fire({
      text: "Are you sure to cancel the request?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        let request = {cancelReason: this.cancelReason };
        this.touristService.cancelrequest(this.selectedRequest._id, 'CANCELLED', request).subscribe( res => {
          this.toastr.success("Request Cancelled successfully!");
          this.modalService.dismissAll(content);
          this.getAllRequestsList();
        })
      }
    });
    
  }

}
