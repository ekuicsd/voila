import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class BookingsComponent implements OnInit {
    public bookingsList: any[] = [];
    public selectedBooking: any = {};

  constructor(private touristService: TouristsService,
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

  contactGuide(content, email) {
    this.modalService.dismissAll(content);
    this.router.navigateByUrl('/tourists/touristshome/messages/chats/guide/' + email);
  }

  openCancelRequest(content) {
    this.modalService.open(content, {centered: true});
  }

  open(content, data) {
    this.selectedBooking = data;
    this.modalService.open(content, {scrollable: true,centered: true});
  }

}
