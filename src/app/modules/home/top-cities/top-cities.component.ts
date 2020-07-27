import { Component, OnInit} from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { TopDestination } from 'src/app/shared/models/topDestinations.model';
import { MbscScrollViewOptions } from '@mobiscroll/angular';
@Component({
  selector: 'app-top-cities',
  templateUrl: './top-cities.component.html',
  styleUrls: ['./top-cities.component.scss']
})
export class TopCitiesComponent implements OnInit {

  fixedSettings: MbscScrollViewOptions = {
    theme: 'ios',
    themeVariant: 'light',
    layout: 'fixed',
    itemWidth: 80
};

  public topCitiesList: TopDestination[] = [];

  constructor(private staticService: StaticDataService) { 
  }

  ngOnInit() {
      this.topCitiesList = this.staticService.getTopDestinations();
      console.log(this.topCitiesList);
  }

}
