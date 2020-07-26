import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/models/booking.model';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {
  val: number = 3;
  public previousList: Booking[] = [];
  public selectedPrevious: any;
  public review: string = '';

  constructor(private touristService: TouristsService,
    private toastr: ToastrService,
    config: NgbModalConfig, private modalService: NgbModal)
   {
    config.backdrop = 'static';
    config.keyboard = false;
    }

  ngOnInit() {
    this.getAllPreviousList();
  }

  open(content, data) {
    this.selectedPrevious = data;
    this.modalService.open(content);
  }

  getAllPreviousList() {
    this.touristService.getAllBookingsByStatus('COMPLETED').subscribe( res => {
      if(res.length > 0) {
        this.previousList = res;
      } else {
        this.previousList = undefined;
      }
    });
  }

  openRating(content) {
    this.modalService.open(content);
  }

  
}
