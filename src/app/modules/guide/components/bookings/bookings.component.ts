import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Booking } from 'src/app/shared/models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  public bookingsList: Booking[];

  constructor(private guideService: GuideService, private router: Router) { }

  ngOnInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.guideService.getAllBookingsByStatus('APPROVED').subscribe(
      res => {
        this.bookingsList = res;
        console.log(this.bookingsList);
      }, error => {
        console.log(error);
      }
    )
  }

  // getDuration(startDate: Date, endDate: Date): string {
  //   console.log(startDate);
  //   console.log(startDate.getDate());
  //   console.log(startDate.getMonth());
  //   if(endDate.getMonth() - startDate.getMonth()){
      

  //   }else {
  //     let dayDiff = endDate.getDate() - startDate.getDate();
  //     // if(dayDiff) {
  //       return (dayDiff+1) + ' days';
  //     // }
  // }
  //   return '0';
  // }

  contactTourist(email) {
    console.log(email);
    //navigate too their chatbox
    this.router.navigateByUrl('/guide/guidehome/chats/tourist/' + email);
  }
}
