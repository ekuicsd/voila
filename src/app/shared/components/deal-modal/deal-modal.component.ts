import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
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
import { StaticDataService } from '../../service/static-data.service';
import * as L from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as key from '../../rzrpay.json';
import { WindowRef } from '../../winref';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-deal-modal',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealModalComponent implements OnInit, OnChanges {

  
  @ViewChild('dealTour2', {static: false}) modal2: MDBModalService;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() deal;
  @Input() role;
  public dealForm: FormGroup;
  agree: boolean = false;
  totalPrice: number = 0;
  peopleLimit = true;
  public user;
  public  mbUrl;
  public options;
  rzp1: any;
  public content;

  constructor(private toastr: ToastrService,
    private touristService: TouristsService,
    public userService: UserService,
    private modalService: NgbModal,
    private jwtService: JwtService,
    private guideService: GuideService,
    private winRef: WindowRef,
    public staticDataService: StaticDataService,
    private router: Router
    ) { }

    ngOnChanges() {
      if(this.deal) {
        console.log(this.deal);
        console.log(this.deal.placeCoordinates);
        var cities = L.layerGroup();
        for(let ele of this.deal.placeCoordinates) {
          console.log(ele);
          L.marker([this.deal.placeCoordinates[0]['lat']['$numberDecimal'], this.deal.placeCoordinates[0]['lng']['$numberDecimal']]).bindPopup('TourPlace').addTo(cities)
        }
        //  this.deal.placeCoordinates.forEach(ele => {
        //   });
        this.mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

      var grayscale   = L.tileLayer(this.mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1})
          	var map = L.map('map', {
        // center: [20.5937, 78.9629],
        center: [this.deal.placeCoordinates[0]['lat']['$numberDecimal'], this.deal.placeCoordinates[0]['lng']['$numberDecimal']],
        zoom: 10,
        layers: [grayscale, cities]
      });
      
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      }
    }

  ngOnInit() {
    this.createForm();
    if(this.jwtService.getToken()) {
      this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
    } 
    this.loadScript('https://checkout.razorpay.com/v1/checkout.js');

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

  submitDealForm(content) {
    this.modalService.open(content, {centered: true, scrollable: true});
  }

  submitDeal(content) {
    if(this.dealForm.valid) {
      this.content = content;
      this.touristService.BookingDeal(this.deal._id, this.dealForm.value).subscribe( res => {
        if(res.success) {
          this.toastr.success("Booked successfully!!");
          this.createForm();
          this.modalService.dismissAll(content);
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

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
    body.appendChild(script);
    console.log(script);
  }

 

  public async initPay() {
    let request = {
      amount : this.totalPrice,
      currency: this.staticDataService.currency.name,
      receipt: this.user.email
    }
    this.touristService.initPay(request, this.deal._id, this.user._id).subscribe( res => {
      console.log(res);
      if(res.success) {
        //something here!
        // if(this.dealForm.valid) {
          // this.content = content;
          this.touristService.BookingDeal(this.deal._id, this.dealForm.value).subscribe( res => {
            if(res.success) {
              // this.toastr.success("Booked successfully!!");
              this.createForm();
              this.modalService.dismissAll(this.content);
              this.modal2.hide(0);
              // this.router.navigateByUrl('/tourists/touristshome/bookings/now');
            } else {
              this.toastr.error(res.msg);
            }
          });
        // } else {
        //   this.toastr.error("Invalid Details!");
        // }
      } else {
        this.toastr.error(res.message);
      }
    });
      this.options = {
          'key': key.test, // Enter the Key ID generated from the Dashboard
          'amount': this.totalPrice*100, // Amount is in currency subunits. Default currency is INR.
          'currency': this.staticDataService.currency.name,
          // 'name': this.productData.productFrontData.productInfo[0].product_name,
          // 'description': this.productData.productFrontData.productInfo[0].productDescription,
          // 'image': '',
          // 'order_id': this.razorpayOrderId,
          'handler': function (response) {
              console.log('razor pay response ', response);
              const resEvent = new CustomEvent('resp', {
                  bubbles: true,
                  detail: { resp: response }
              });

              // alert(response.razorpay_payment_id);
              window.dispatchEvent(resEvent);
          },
          'prefill': {
              'name': this.user.name,
              'email': this.user.email,
              'contact': this.user.phoneNumber
          },
          // 'notes': {
          //     'address': this.address + ',' + this.state
          // },
          'theme': {
              'color': '#F37254'
          }
      }
      this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
      // console.log(this.rzp1);
      this.rzp1.open();
      console.log(this.rzp1);
      // this.submitDeal(this.content);

  }

  // public async postPayment(id) {
  //   this.submitDeal(this.content);
  // }


  // async responseEvent(event) {
  //   await this.postPayment(event.detail.resp.razorpay_payment_id)
  //   // redirect to the order placed page
  // }

  
}
