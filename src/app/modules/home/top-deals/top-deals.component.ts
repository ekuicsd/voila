import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/service/home-page.service';

@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.scss']
})
export class TopDealsComponent implements OnInit {

  public hotDealsList: any[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getHotDeals().subscribe( res => {
      if(res.success) {
        this.hotDealsList = res.data;
        console.log(res.data);
      }
    });
    
  }

  
}
