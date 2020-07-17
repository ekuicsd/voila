import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaticDataService } from '../../service/static-data.service';

@Component({
  selector: 'app-deals-cards',
  templateUrl: './deals-cards.component.html',
  styleUrls: ['./deals-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealsCardsComponent implements OnInit, OnChanges {
  
  @Input() dealsList : any[] = [];
  @Input() role: string; //guide or tourist
  @ViewChild('dealTour', {static: false}) modal1: MDBModalService;
  @ViewChild('dealTour2', {static: false}) modal2: MDBModalService;
  isValid: boolean;
  public userId: any;
  public dealForm: FormGroup;
  public groupTypesList: string[];
  public selectedDeal: any;


  constructor(private userService: UserService,
    private touristService: TouristsService,
    private toastr: ToastrService,
    private staticDataService: StaticDataService,
     private router: Router) { }

  ngOnInit() {
    // this.getDealsFavourite();
    this.groupTypesList = this.staticDataService.getAllGroupTypes();
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.userId = JSON.parse(this.userService.getUser('tourist'))._id;
    }
    console.log(this.userId);
    this.createForm();
  }

  ngOnChanges() {
    // this.getDealsFavourite();
    
  }

  createForm() {
    this.dealForm = new FormGroup({
      groupType: new FormControl('',[Validators.required]),
      noOfPeople: new FormControl('', [Validators.required])
    })
  }

  openModal1(content, deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.modal1.show(content);
      this.selectedDeal = deal;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  openModal2(content) {
    this.modal1.hide(0);
    this.modal2.show(content);
  }

  submitDealForm() {
    if(this.dealForm.valid) {
      console.log(this.dealForm.value);
      this.touristService.BookingDeal(this.selectedDeal._id, this.dealForm.value).subscribe( res => {
        console.log(res);
        this.toastr.success("Booked successfully!!");
        this.modal2.hide(0);
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }


  addToFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
    // console.log(this.isValid);
      this.touristService.addToFavourite(deal._id).subscribe( res => {
        this.toastr.success("added to favourites!");
        console.log(res);
      })
    } else {
      this.toastr.warning("Please Login First!");
      // this.router.navigateByUrl('/login');
    }
  }

  removeFromFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      console.log("removed");
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  // getDealsFavourite() {
  //   if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
  //     if(this.dealsList) {
  //       this.dealsList.filter(deal => {
  //       if(deal.favorites.length > 0) {
  //         deal.favorites.filter( ele => {
  //           if(ele._id == this.userId) {
  //             deal.isFavourite = true;
  //             return;
  //           } else {
  //             deal.isFavourite = false;
  //           }
  //       })
  //     } else {
  //       deal.isFavourite = false;
  //     }
  //     })
  //     }
  //   } else {
  //     if(this.dealsList) {
  //       this.dealsList.filter( deal => {
  //         deal.isFavourite = false;
  //       })
  //     }
  //   }
  // }

  isFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      let list = deal.favorites.filter(ele => {
        if(ele == this.userId) {
          return ele;
        }
      });
      if(list.length > 0) {
        return true;
      }
      return false;
    }
    return false;
  }


}
