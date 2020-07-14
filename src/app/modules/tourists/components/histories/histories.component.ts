import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/models/booking.model';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {
  val: number = 3;
  public previousList: Booking[];

  constructor(private touristService: TouristsService,config: NgbModalConfig, private modalService: NgbModal)
   {
    config.backdrop = 'static';
    config.keyboard = false;
    }

    open(content) {
      this.modalService.open(content);
    }
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
