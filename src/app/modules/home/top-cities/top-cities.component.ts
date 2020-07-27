import { Component, OnInit} from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { TopDestination } from 'src/app/shared/models/topDestinations.model';
@Component({
  selector: 'app-top-cities',
  templateUrl: './top-cities.component.html',
  styleUrls: ['./top-cities.component.scss']
})
export class TopCitiesComponent implements OnInit {

  public topCitiesList: TopDestination[] = [];

  constructor(private staticService: StaticDataService) { 
  }

  ngOnInit() {
      this.topCitiesList = this.staticService.getTopDestinations();
  }

}
