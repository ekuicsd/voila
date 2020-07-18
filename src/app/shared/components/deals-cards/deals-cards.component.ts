import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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
export class DealsCardsComponent implements OnInit {
  
  @Input() dealsList : any[] = [];
  @Input() role: string; //guide or tourist
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
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
      this.modal1.show(content, {ignoreBackdropClick: true});
      this.selectedDeal = deal;
    } else {
      this.router.navigateByUrl('/login');
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
