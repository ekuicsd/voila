import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  public previousBookingsList: any[] = [];
  public selectedPreviousBookings: any;

  constructor(private guideService: GuideService,
    config: NgbModalConfig, private modalService: NgbModal,

    ) { }

  ngOnInit() {
    this.getAllPreviousBookings();
  }

  getAllPreviousBookings() {
    this.guideService.getAllBookingsByStatus('COMPLETE').subscribe(
      res => {
        if(res.length > 0) {
          this.previousBookingsList = res;
        } else {
          this.previousBookingsList = undefined;
        }
        console.log(res);
      }, error => {
        console.log(error);
      }
    )
  }

  open(content, data) {
    console.log(data);
    this.selectedPreviousBookings = data;
    this.modalService.open(content, { centered: true, scrollable: true});
  }
}
