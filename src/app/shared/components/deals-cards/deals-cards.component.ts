import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TouristsService } from '../../service/tourists.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { StaticDataService } from '../../service/static-data.service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-deals-cards',
  templateUrl: './deals-cards.component.html',
  styleUrls: ['./deals-cards.component.scss'],
})
export class DealsCardsComponent implements OnInit {
  
  @Input() dealsList : any[] = [];
  @Input() role: string; //guide or tourist
  @Input() isFav = '';
  @ViewChild('dealTour', {static: false}) modal1: MDBModalService;

  isValid: boolean;
  public user: any;
  public groupTypesList: string[];
  public selectedDeal: any;


  constructor(private userService: UserService,
    private touristService: TouristsService,
    public jwtService: JwtService,
    private toastr: ToastrService,
    private staticDataService: StaticDataService,
     private router: Router) { }

  ngOnInit() {
    this.groupTypesList = this.staticDataService.getAllGroupTypes();
    // this.groupTypesList = this.staticDataService.getAllGroupTypes();
    if(this.jwtService.getToken()) {
      this.user = JSON.parse(this.userService.getUser(this.userService.getRole()));
    }
  }

  openModal1(content, deal) {
      this.modal1.show(content, {ignoreBackdropClick: true});
      this.selectedDeal = deal;
  }


  addToFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.touristService.addToFavourite(deal._id).subscribe( res => {
       if(res.success) {
        this.toastr.success("added to favourites!");
        deal.favorites.push(this.user._id);
       } else {
        this.toastr.warning(res.message);
       }
      });
    } else {
      this.router.navigateByUrl('/login/tourist');
    }
  }

  removeFromFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.touristService.removeFromFavourite(deal._id).subscribe( res => {
        if(res.success) {
          this.toastr.success("removed from favourites!");
          let index = deal.favorites.indexOf(this.user._id);
          if(index !== -1) {
            deal.favorites.splice(index, 1);
          }
          if(this.isFav !== '') {
            let index2 = this.dealsList.indexOf(deal);
            if(index2 !== -1) {
            this.dealsList.splice(index2, 1);
          }
          }
        } else {
          this.toastr.warning(res.message);
        }
      });
    } else {
      this.router.navigateByUrl('/login/tourist');
    }
  }


  isFavourite(deal) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      let list = deal.favorites.filter(ele => {
        if(ele == this.user._id) {
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
