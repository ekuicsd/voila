import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Deals } from 'src/app/shared/models/deals.model';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  public DealsList: Deals[];

  constructor(
    private guideService: GuideService
    ) { }

  ngOnInit() {
    this.getAllDeals();
  }

  getAllDeals() {
    this.guideService.getAllDeals().subscribe(res => {
      this.DealsList = res;
    }, error => {
    })
  }

}
