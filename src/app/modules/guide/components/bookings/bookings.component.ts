import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingsComponent implements OnInit {
  public bookingsList: Booking[] = [];
  public selectedBooking: Booking;

  constructor(private guideService: GuideService,
    config: NgbModalConfig, private modalService: NgbModal,
     private router: Router) { }

  ngOnInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.guideService.getAllBookingsByStatus('APPROVED').subscribe(
      res => {
        if(res.length > 0) {
          this.bookingsList = res;
        } else {
          this.bookingsList = undefined;
        }
        console.log(this.bookingsList);
      }, error => {
        console.log(error);
      }
    )
  }

  contactTourist(content, email) {
    console.log(email);
    this.router.navigateByUrl('/guide/guidehome/messages/chats/tourist/' + email);
    this.modalService.dismissAll(content);
  }

  open(content, data) {
    console.log(data);
    this.selectedBooking = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }
}
