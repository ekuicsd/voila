import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent implements OnInit {

  public  bookingId;
  public data;

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
     private userService: UserService) { }

  ngOnInit() {
    this.route.url.subscribe( res=> {
      this.bookingId = this.route.snapshot.params.bookingId;
      this.userService.getBookingInfobyId(this.userService.getRole(), this.bookingId).subscribe( res => {
        if(res.success) {
          this.data = res.booking;
        } else {
          this.toastr.error(res.message);
        }
      });
    });
  }

  open(content) {
    this.modalService.open(content, {scrollable: true, centered: true});
  }

  getCheck(item) : boolean {
    let date = (new Date(item.date).getTime() / 86400000)+1;
    let today = (new Date().getTime() / 86400000)+1;
    if(date - today > -1) {
      return true;
    }
    return false;
  }

  getEndDate() {
    if(this.data) {
      let today = new Date();
      let end = new Date(this.data.endDate);
      let diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
      if(diff >= 0) {
        return true;
      }
    }
    return false;
  }

}
