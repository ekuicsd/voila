import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requestList: any;

  constructor(private guideService: GuideService) { }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.guideService.getAllBookingsByStatus('PENDING').subscribe(
      res => {
        this.requestList = res;
        console.log(res);
      }, error => {
        console.log(error);
      }
    )
  }

  acceptRequest(id) {
    console.log(id);
    this.guideService.reponseToTouristRequest(id, 'APPROVED').subscribe(
      res => {
        console.log(res);
        this.getAllRequests();
      }, error => {
        console.log(error);
      }
    )
  }

  rejectRequest(id) {
    console.log(id);
    this.guideService.reponseToTouristRequest(id, 'REJECTED').subscribe(
      res => {
        console.log(res);
        this.getAllRequests();
      }, error => {
        console.log(error);
      }
    )
  }

}
