import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  public bookingsList: any[] = [];
  public selectedBooking: any;
  public ongoingList = [];

  constructor(private guideService: GuideService,
    private modalService: NgbModal,
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
      }, error => {
      }
    )
  }

  contactTourist(content, email, name) {
    this.router.navigateByUrl('/guide/guidehome/messages/chats/tourist/' + email + '/' + name);
    this.modalService.dismissAll(content);
  }

  open(content, data) {
    this.selectedBooking = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }

  contactTouristRoom(content, roomId) {
    this.router.navigateByUrl('/guide/guidehome/message/chatRooms/' + roomId);
    this.modalService.dismissAll(content);
  }


}
