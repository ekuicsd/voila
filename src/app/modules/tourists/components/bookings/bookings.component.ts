import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class BookingsComponent implements OnInit {
    public bookingsList: any[] = [];
    public selectedBooking: any = {};
    public cancelReason: string = '';
    public isData = false;

  constructor(private touristService: TouristsService,
    private toastr: ToastrService,
    private staticDataService: StaticDataService, 
    private router: Router, config: NgbModalConfig, private modalService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit() {
    this.getAllBookingsList();
  }

  getAllBookingsList() {
    this.touristService.getAllBookingsByStatus('APPROVED').subscribe( res => {
        this.bookingsList = res;
        this.isData = true;
    });
  }

  disableStart(data) {
    let today = new Date();
    let start = new Date(data.startDate);
    let diff = (start.getTime() - today.getTime()) / (1000 * 3600 * 24);
    if(diff >= 0) {
      return true;
    }
    return false;
  }

  contactGuide(content, email, name) {
    this.modalService.dismissAll(content);
    this.router.navigateByUrl('/tourists/touristshome/messages/chats/guide/' + email  + '/' + name);
  }

  openCancelRequest(content) {
    this.cancelReason = '';
    this.modalService.open(content, {scrollable: true, centered: true});
  }

  open(content, data) {
    this.selectedBooking = data;
    this.modalService.open(content, {scrollable: true,centered: true});
  }

  cancelBooking(content, cancel) {
    let request = {cancelReason: this.cancelReason };
    this.touristService.cancelrequest(this.selectedBooking._id, 'CANCELLED', request).subscribe( res => {
      this.toastr.success("Request Cancelled successfully!");
      this.cancelReason = '';
      this.modalService.dismissAll(content);
      this.modalService.dismissAll(cancel);
      this.getAllBookingsList();
    })
  }

  startTour(data) {
    Swal.fire({
      text: "Are you want to start the tour?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Start'
    }).then((result) => {
      if (result.value) {
        this.touristService.cancelrequest(data._id, 'ONGOING', {}).subscribe( res => {
        this.getAllBookingsList();
        });
      }
    });
  }

  contactTouristRoom(content, roomId) {
    this.router.navigateByUrl('/tourists/touristshome/message/chatRooms/' + roomId);
    this.modalService.dismissAll(content);
  }


}
