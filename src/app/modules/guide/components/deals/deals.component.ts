import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/shared/service/guide.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  public DealsList: any[];

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
