import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { CustomValidators } from 'src/app/validators/custom';
import { StaticDataService } from '../../service/static-data.service';

@Component({
  selector: 'app-personal-modal',
  templateUrl: './personal-modal.component.html',
  styleUrls: ['./personal-modal.component.scss']
})
export class PersonalModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() guide;
  personalBooking;
  agree: boolean = false;
  // public guide: any;
  public groupTypesList;
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute,
    private touristService: TouristsService,
    private router:Router,
    private staticDataService: StaticDataService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.groupTypesList = this.staticDataService.getAllGroupTypes(); 
    this.createForm();
  }

  createForm() {
    this.personalBooking = new FormGroup({
    price: new FormControl(0),
    noOfPeople: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    groupType: new FormControl('', [Validators.required]),
    status: new FormControl('REQUESTED'),
    tourType: new FormControl('Personalized'),
    });
  }

  emitClose() {
    this.agree = false;
    this.close.emit();
  }

  calculatePrice(data) {
    let start = new Date(this.personalBooking.value.startDate);
    let end = new Date(this.personalBooking.value.endDate);
    let days = (end.getTime() - start.getTime())  / (1000 * 3600 * 24); 
    if(this.personalBooking.value.noOfPeople <= this.guide.peopleLimit) {
      this.totalPrice = Number(this.personalBooking.value.noOfPeople) * Number(this.guide.perHeadCharge) * days;
    } else {
      this.totalPrice = Number(this.guide.perDayCharge) * days;
    }
  }

  submitPersonalBooking() {
    if(this.personalBooking.valid) {
      console.log(this.personalBooking.value);
      this.personalBooking.value.price = this.totalPrice;
      this.touristService.bookForPersonalTour(this.guide._id, this.personalBooking.value).subscribe( res => {
      //  if(res.success) {
        this.toastr.success("Requested For Personalized Tour!");
        this.emitClose();
        this.router.navigateByUrl('/tourists/touristshome/bookings/requests');
      //  } else {

      //  }
      });
    } else {
      this.toastr.error("Invalid deatils!");
    }
  }

}
