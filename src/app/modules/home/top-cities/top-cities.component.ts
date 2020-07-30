import { Component, OnInit} from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { TopDestination } from 'src/app/shared/models/topDestinations.model';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-cities',
  templateUrl: './top-cities.component.html',
  styleUrls: ['./top-cities.component.scss']
})
export class TopCitiesComponent implements OnInit {

  public topCitiesList: TopDestination[] = [];

  constructor(private staticService: StaticDataService,
    private router: Router,
     private searchService: SearchService) { 
  }

  ngOnInit() {
      this.topCitiesList = this.staticService.getTopDestinations();
  }

  navigateToSearchResultPage(place) {
    this.searchService.state = place.state;
    this.router.navigateByUrl('/tourists/touristshome/searchResult/guidesList');
    this.searchService.getFilterData();
  }

}
