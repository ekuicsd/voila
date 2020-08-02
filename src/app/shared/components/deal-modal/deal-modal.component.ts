import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { GuideService } from '../../service/guide.service';
import { JwtService } from '../../service/jwt.service';

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
  peopleLimit = true;
  public user;

  constructor(private toastr: ToastrService,
    private touristService: TouristsService,
    public userService: UserService,
    private jwtService: JwtService,
    private guideService: GuideService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
    if(this.jwtService.getToken()) {
      this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
    } 
  }

    createForm() {
    this.dealForm = new FormGroup({
      noOfPeople: new FormControl('', [Validators.required, CustomValidators.noOfPeopleValidation])
    });
  }

  deleteDeal() {
    Swal.fire({
      text: "Are you sure to delete deal?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        if(this.deal.peopleLimit === this.deal.peopleLimit) {
          //api for delete deal
          this.guideService.deleteDeal(this.deal._id).subscribe( res => {
            // console.log(res);
            if(res.success) {
              this.toastr.success(res.message);
              this.emitClose();
            } else {
              this.toastr.error(res.message);
            }
          });
        } else {
          this.toastr.error("This deal can't be deleted!");
        }
      }
    }); 
  }

  emitClose() {
    this.totalPrice = 0;
    this.agree = false;
    this.createForm();
    this.close.emit();
  }

  
  openModal2(content) {
    if(this.userService.getRole() === 'tourist') {
      this.totalPrice = 0;
      this.createForm();
      this.modal2.show(content, {ignoreBackdropClick: true});
    } else {
      this.router.navigateByUrl('/login/tourist');
    }
  }

  calculatePrice(data) {
    if(this.dealForm.value.noOfPeople > this.deal.peopleLeft) {
      this.peopleLimit = false;
    } else {
      this.peopleLimit = true;
      this.totalPrice = this.dealForm.value.noOfPeople * Number(this.deal.price);
    }
  }

  submitDealForm() {
    Swal.fire({
      text: "Are you sure to book deal?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        if(this.dealForm.valid) {
          this.touristService.BookingDeal(this.deal._id, this.dealForm.value).subscribe( res => {
            if(res.success) {
              this.toastr.success("Booked successfully!!");
              this.createForm();
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
    }); 
  }

}
