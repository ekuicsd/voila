import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-deal-modal',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss']
})
export class DealModalComponent implements OnInit {

  
  @ViewChild('dealTour2', {static: false}) modal2: MDBModalService;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() deal;
  @Input() role;
  public dealForm: FormGroup;
  agree: boolean = false;
  totalPrice: number = 0;

  constructor(private toastr: ToastrService,
    private touristService: TouristsService,
    public userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

    createForm() {
    this.dealForm = new FormGroup({
      noOfPeople: new FormControl('', [Validators.required, CustomValidators.noOfPeopleValidation])
    });
  }

  emitClose() {
    this.agree = false;
    this.close.emit();
  }

  
  openModal2(content) {
    if(this.userService.getRole() === 'tourist') {
      this.modal2.show(content, {ignoreBackdropClick: true});
    } else {
      this.router.navigateByUrl('/login/tourist');
    }
  }

  calculatePrice(data) {
    this.totalPrice = this.dealForm.value.noOfPeople * Number(this.deal.price);
  }

  submitDealForm() {
    if(this.dealForm.valid) {
      this.touristService.BookingDeal(this.deal._id, this.dealForm.value).subscribe( res => {
        if(res.success) {
          this.toastr.success("Booked successfully!!");
          this.modal2.hide(0);
          this.router.navigateByUrl('/tourists/touristshome/bookings/now');
        } else {
          this.toastr.error(res.msg);
        }
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}
