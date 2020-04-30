import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../service/search.service';
import { StaticDataService } from '../../service/static-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Booking } from '../../models/booking.model';
import { MDBModalService } from 'angular-bootstrap-md';
import { UserService } from '../../service/user.service';
import { TouristsService } from '../../service/tourists.service';
@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.scss']
})
export class GuideProfileComponent implements OnInit {

  // public myDatePickerOptions: IMyDpOptions = {
  //   // other options...
  //   dateFormat: 'dd.mm.yyyy',
  // };

 // Initialized to specific date (09.10.2018).
 // public model: any = { date: { year: 2018, month: 10, day: 9 } };
 @ViewChild('personalTour', { static: false}) modal: MDBModalService
  fromDate: NgbDate | null;  //ngb
  toDate: NgbDate | null;  //ngb
  hoveredDate: NgbDate | null = null; //ngb
  public guideId: any;
  public guide: any;
  public dealList: any[];
  groupTypesList: string[];
  public personalBooking: FormGroup;
  public request: Booking = {};

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private touristService: TouristsService,
              private router:Router,
              private staticDataService: StaticDataService,
              private toastr: ToastrService,
              private calendar: NgbCalendar, 
              public formatter: NgbDateParserFormatter,
              private searchService: SearchService)
      { 
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 4);
     }

  ngOnInit() {
    this.createForm();
    this.guideId = this.route.snapshot.params.id;
    console.log(this.guideId);
    this.groupTypesList = this.staticDataService.getAllGroupTypes(); 
    if(this.guideId) {
      this.searchService.getGuideById(this.guideId).subscribe( res => {
        this.guide = res.guide;
        this.dealList = res.guide.deals;
        console.log(res);
      });
    }
  }

  createForm() {
    this.personalBooking = new FormGroup({
    bookingDate: new FormControl(this.formatter.format(this.fromDate)),
    price: new FormControl(0.0),
    noOfPeople: new FormControl('', [Validators.required]),
    startDate: new FormControl(this.formatter.format(this.fromDate), [Validators.required]),
    endDate: new FormControl(this.formatter.format(this.toDate), [Validators.required]),
    groupType: new FormControl('', [Validators.required]),
    status: new FormControl('REQUESTED'),
    tourType: new FormControl('Personalized'),
    });
  }

  openModal(content) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
    this.modal.show(content);
    } else {
    this.router.navigateByUrl('/login');
    }
  }

  submitPersonalBooking() {
    
    if(this.personalBooking.valid) {
      let days = this.getNoOfDays();
      console.log(days);
      this.personalBooking.value.startDate = this.formatter.format(this.fromDate);
      this.personalBooking.value.endDate = this.formatter.format(this.toDate);
      console.log(this.personalBooking.value);
      if(this.personalBooking.value.noOfPeople <= this.guide.peopleLimit) {
        this.personalBooking.value.price = Number(this.personalBooking.value.noOfPeople) * Number(this.guide.perHeadCharge) * days;
      } else {
        this.personalBooking.value.price = Number(this.guide.perDayCharge) * days;
      }
      const isAccept = confirm("Your Total is "+ this.personalBooking.value.price);
      if(isAccept) {
        console.log("accepted!!!");
        this.request = this.personalBooking.value;
        this.request.places = [];
        console.log(this.request);
        this.touristService.bookForPersonalTour(this.guide._id, this.request).subscribe( res => {
          this.toastr.success("Requested For Personalized Tour!");
          this.modal.hide(0);
        });
      } else {
        console.log("Oops not accepted!!!");
        this.toastr.error("Your Requested has been cancelled!");
      }
    } else {
      this.toastr.error("Invalid Detalis!");
    }
  }


  getNoOfDays(): number {
    let days = 1;
      if(this.fromDate.month == this.toDate.month) {
        return days = this.toDate.day - this.fromDate.day
      } else {
        let month = this.fromDate.month;
        let monthDays;
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          monthDays = 31;
        } else if(month == 4 || month == 6 || month == 9 || month == 11 ) {
          monthDays = 30;
        } else if(month ==2) {
          if(this.fromDate.year % 400 == 0) {
            monthDays = 29;
          } else {
            monthDays = 28;
          }
        }
        let diff = this.fromDate.day - this.toDate.day;
        return days = monthDays-diff+1;
      }
  }


  ///////////////////////////////////////////////////////////////////
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}
