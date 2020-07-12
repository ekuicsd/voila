import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
    public bookingsList: Booking[];

  constructor(private touristService: TouristsService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getAllBookingsList();
  }

  getAllBookingsList() {
    this.touristService.getAllBookingsByStatus('APPROVED').subscribe( res => {
      console.log(res);
      this.bookingsList = res;
    })
  }

  contactGuide(email) {
    this.router.navigateByUrl('/tourists/touristshome/messages/chats/guide/' + email);
  }

}
