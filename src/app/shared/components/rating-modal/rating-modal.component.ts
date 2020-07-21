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
    // if(this.ratingReviews.valid) {
      let request = {
        rating: this.rating,
        review: this.reviews
      };
      this.touristService.cancelrequest(this.bookingId, 'COMPLETED', request).subscribe( res => {
      console.log(res);
      this.toastr.success("rated successfully!");
    });
    this.close.emit();
    // this.modalService.dismissAll(content);
    // } else {
      // this.toastr.error("Invalid"); 
    // }
 }

 changeRating(data) {
   console.log(data.target.value);
   this.rating = +data.target.value;
 }

 changeText(data) {
   this.reviews = data.target.value;
   console.log(data.target.value);
 }

}
