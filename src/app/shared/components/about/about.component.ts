import { Component, OnInit } from '@angular/core';
import { StaticDataService } from '../../service/static-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public developers: any[];

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit() {
    this.developers = this.staticDataService.getSiteDevelopers();
  }

}
