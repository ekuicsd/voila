import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public mapDataList: any[] = [];
  public selectedState; // default- delhi

  constructor(private homeService: HomeService,
     private router: Router) { }

  ngOnInit() {
    this.homeService.getMapInfo().subscribe( res => {
      if(res.success) {
        this.mapDataList = res.data;
        this.getDataByState('Delhi');
        console.log(res);
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
    console.log(state);
    this.getDataByState(state);
  }

  exploreState() {
    this.router.navigateByUrl('/exploreIndia/' + this.selectedState.state);
  }

  // imageFormation(state) : string {
  //   if(state.split(' ')) {
  //     return state.split(' ').join('+');
  //   }
  //   return state;
  // }

}


