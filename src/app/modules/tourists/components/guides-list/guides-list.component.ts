import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit {
  // public guidesList: any[];

 @ViewChild('personalTour', { static: false}) modal: MDBModalService;
 public guide;

  constructor(public searchService: SearchService,
    private userService: UserService,
     private router: Router) { }

  ngOnInit() {
    // this.guidesList = this.searchService.guidesList;
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
    this.modal.show(content);
    } else {
    this.router.navigateByUrl('/login');
    }
  }

}
