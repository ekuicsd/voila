import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit {
  // public guidesList: any[];

 @ViewChild('personalTour', { static: false}) modal: MDBModalService;
 public guide;
 public selectedGuide;

  constructor(public searchService: SearchService,
    private userService: UserService,
    private toastr: ToastrService,
     private router: Router) { }

  ngOnInit() {
    // this.guidesList = this.searchService.guidesList;
    // window.scrollTo(0, 0);
    console.log(this.searchService.guidesList);
  }

  navigateToGuideProfile(id) {
    this.router.navigateByUrl('/tourists/touristshome/guideProfile/' + id);
  }

  getDealsList(guide) {
    return this.searchService.dealsList.filter( ele => {
      if(guide.email === ele.guideId.email) {
        return ele;
      }
    });
  }

  openModal(content, guide) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
    this.guide = guide;
    this.modal.show(content, { scrollable: true, centered: true});
    } else {
      this.router.navigateByUrl('/login/tourist');
      // this.toastr.warning("please login as tourist!");
    }
  }

  setSelectedGuide(guide) {
    if(this.selectedGuide == guide) {
      this.selectedGuide = undefined;
    } else {
      this.selectedGuide = guide;
    }
  }

  getRating(guide) : any {
    let rating = 0;
    guide.reviewAndRating.filter( ele => {
      if(ele.rating) {
        rating = rating + ele.rating;
        return ele;
      }
    });
    rating = Math.floor(+rating / guide.reviewAndRating.length );
    let arr = [];
    for(let i= 0; i< rating; i++) {
      arr.push(i);
    }
    return arr;
  }

}
