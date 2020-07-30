import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home-page.service';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.scss']
})
export class TopDealsComponent implements OnInit {

  public hotDealsList: any[] = [];

  constructor(private homeService: HomeService,
    private searchService: SearchService,
    private router: Router
    ) { }

  ngOnInit() {
    this.homeService.getHotDeals().subscribe( res => {
      if(res.success) {
        console.log(res);
        this.hotDealsList = res.deals;
      }
    });
    
  }

  navigateToSearchResultPage(place) {
    this.searchService.state = place.state;
    this.router.navigateByUrl('/tourists/touristshome/searchResult/dealsList');
    this.searchService.getFilterData();
  }

  
}
