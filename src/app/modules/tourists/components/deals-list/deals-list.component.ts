import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/service/search.service';

@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss']
})
export class DealsListComponent implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit() {
  }

}
