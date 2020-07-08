import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home-page.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public mapDataList: any[] = [];
  public selectedState; // default- delhi

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getMapInfo().subscribe( res => {
      if(res.success) {
        this.mapDataList = res.data;
        this.getDataByState('Delhi');
        // console.log(res);
      }
    })
  }

  getDataByState(state) {
    this.selectedState = this.mapDataList.filter( ele => {
      if(ele.state === state) {
        return ele;
      }
    })[0];
  }
  

  getStateData(state) {
    this.getDataByState(state);
  }

}


