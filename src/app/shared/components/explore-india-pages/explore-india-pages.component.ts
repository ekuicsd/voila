import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../service/home-page.service';

@Component({
  selector: 'app-explore-india-pages',
  templateUrl: './explore-india-pages.component.html',
  styleUrls: ['./explore-india-pages.component.scss']
})
export class ExploreIndiaPagesComponent implements OnInit {
  public state;
  public stateData;

  constructor(private route: ActivatedRoute,
     private homeService: HomeService) { }

  ngOnInit() {
    this.route.url.subscribe( res => {
      this.state = this.route.snapshot.params.state;
      // console.log(this.state);
      if(this.state) {
        this.getData();
      }
    });
  }

  getData() {
    this.homeService.getExplarePageData(this.state).subscribe( res => {
      // console.log(res);
      this.stateData = res.state;
    })
  }

}
