import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/models/booking.model';
import { TouristsService } from 'src/app/shared/service/tourists.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {
  public previousList: Booking[];

  constructor(private touristService: TouristsService) { }

  ngOnInit() {
    this.getAllPreviousList();
  }

  getAllPreviousList() {
    this.touristService.getAllBookingsByStatus('COMPLETE').subscribe( res => {
      console.log(res);
      this.previousList = res;
    })
  }

}
