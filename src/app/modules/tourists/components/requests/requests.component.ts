import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: Booking[];

  constructor(private touristService: TouristsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllRequestsList();
  }

  getAllRequestsList() {
    this.touristService.getAllBookingsByStatus('PENDING').subscribe( res => {
      console.log(res);
      this.requestList = res;
    })
  }

  cancelRequest(booking: Booking) {
    this.touristService.cancelrequest(booking._id, 'CANCEL').subscribe( res => {
      console.log(res);
      this.toastr.success("Request Cancelled successfully!");
      this.getAllRequestsList();
    })
  }

}
