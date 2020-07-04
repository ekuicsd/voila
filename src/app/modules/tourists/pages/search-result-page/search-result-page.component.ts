import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {

  public interestList: string[]; 

  constructor( private staticDataService: StaticDataService) { }

  ngOnInit() {
    this.interestList = this.staticDataService.getAllInterestList();
  }

}
