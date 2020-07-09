import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit {
 addClass() {
      document.body.classList.add("sent");
    }

  constructor() { }

  ngOnInit() {


  }

}
