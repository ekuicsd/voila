import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.scss']
})
export class GuidesListComponent implements OnInit {
  // public guidesList: any[];

  constructor(public searchService: SearchService, private router: Router) { }

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

}
