import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  public previousBookingsList: any[];

  constructor(private guideService: GuideService) { }

  ngOnInit() {
    this.getAllPreviousBookings();
  }

  getAllPreviousBookings() {
    this.guideService.getAllBookingsByStatus('COMPLETE').subscribe(
      res => {
        // this.previousBookingsList = res;
        console.log(res);
      }, error => {
        console.log(error);
      }
    )
  }
}
