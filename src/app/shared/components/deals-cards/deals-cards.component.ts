import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { StaticDataService } from '../../service/static-data.service';

@Component({
  selector: 'app-deals-cards',
  templateUrl: './deals-cards.component.html',
  styleUrls: ['./deals-cards.component.scss'],
})
export class DealsCardsComponent implements OnInit {
  
  @Input() dealsList : any[];
  @Input() role: string; //guide or tourist
  @Input() isFav = '';
  @ViewChild('dealTour', {static: false}) modal1: MDBModalService;

  isValid: boolean;
  public userId: any;
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
    // this.createForm();
  }

  openModal1(content, deal) {
    // if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.modal1.show(content, {ignoreBackdropClick: true});
      this.selectedDeal = deal;
    // } else {
    //   this.toastr.warning("Please login as tourist!");
    //   // this.router.navigateByUrl('/login/tourist');
    // }
  }


  addToFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.touristService.addToFavourite(deal._id).subscribe( res => {
       if(res.success) {
        this.toastr.success("added to favourites!");
        deal.favorites.push(this.userId);
        console.log(res);
       } else {
        this.toastr.warning(res.message);
       }
      });
    } else {
      this.router.navigateByUrl('/login/tourist');
      // this.toastr.warning("Please Login First!");
    }
    console.log(this.dealsList);
  }

  removeFromFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.touristService.removeFromFavourite(deal._id).subscribe( res => {
        if(res.success) {
          this.toastr.success("removed from favourites!");
          let index = deal.favorites.indexOf(this.userId);
          if(index !== -1) {
            deal.favorites.splice(index, 1);
          }
          if(this.isFav !== '') {
            let index2 = this.dealsList.indexOf(deal);
            if(index2 !== -1) {
            this.dealsList.splice(index2, 1);
          }
          }
          console.log(res);
        } else {
          this.toastr.warning(res.message);
        }
      });
      console.log("removed");
    } else {
      this.router.navigateByUrl('/login/tourist');
    }
    console.log(this.dealsList);
  }


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
