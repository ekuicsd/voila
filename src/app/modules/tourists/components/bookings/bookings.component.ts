import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class BookingsComponent implements OnInit {
    public bookingsList: any[] = [];
    public selectedBooking: any = {};
    public cancelReason: string = '';

  constructor(private touristService: TouristsService,
    private toastr: ToastrService,
    private router: Router, config: NgbModalConfig, private modalService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit() {
    this.getAllBookingsList();
  }

  getAllBookingsList() {
    this.touristService.getAllBookingsByStatus('APPROVED').subscribe( res => {
      console.log(res);
      if(res.length > 0) {
        this.bookingsList = res;
      } else {
        this.bookingsList = undefined;
      }
    });
  }

  disableStart(data) {
    let today = new Date();
    let start = new Date(data.startDate);
    let diff = (start.getTime() - today.getTime()) / (1000 * 3600 * 24);
    if(diff >= 0) {
      return true;
    }
    return false;
  }

  contactGuide(content, email, name) {
    this.modalService.dismissAll(content);
    this.router.navigateByUrl('/tourists/touristshome/messages/chats/guide/' + email  + '/' + name);
  }

  openCancelRequest(content) {
    this.modalService.open(content, {centered: true});
  }

  open(content, data) {
    this.selectedBooking = data;
    this.modalService.open(content, {scrollable: true,centered: true});
  }

  cancelBooking(content, cancel) {
    let request = {cancelReason: this.cancelReason };
    this.touristService.cancelrequest(this.selectedBooking._id, 'CANCELLED', request).subscribe( res => {
      console.log(res);
      this.toastr.success("Request Cancelled successfully!");
      this.modalService.dismissAll(content);
      this.modalService.dismissAll(cancel);
      this.getAllBookingsList();
    })
  }

  startTour(data) {
    this.touristService.cancelrequest(data._id, 'ONGOING', {}).subscribe( res => {
      console.log(res);
      this.getAllBookingsList();
    });
  }

  contactTouristRoom(content, roomId) {
    this.router.navigateByUrl('/tourists/touristshome/message/chatRooms/' + roomId);
    this.modalService.dismissAll(content);
  }


}
