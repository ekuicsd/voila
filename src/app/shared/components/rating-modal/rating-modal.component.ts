import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TouristsService } from '../../service/tourists.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent implements OnInit {

  @Input() bookingId;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  public reviews: string = '';
  public rating: number = 0;

  constructor(private touristService: TouristsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  completeTour(content) {
      let request = {
        rating: this.rating,
        review: this.reviews
      };
      this.touristService.cancelrequest(this.bookingId, 'COMPLETED', request).subscribe( res => {
      this.toastr.success("rated successfully!");
    });
    this.reviews = '';
    this.rating = 0;
    this.close.emit();
 }

 changeRating(data) {
   this.rating = +data.target.value;
 }

 changeText(data) {
   this.reviews = data.target.value;
 }

}
