import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class HelpPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').delegate('.c-faq', 'click', function(){
      $('.c-faq').removeClass('c-faq--active');
      $(this).addClass('c-faq--active');
    });
  }

  addClass() {
    document.body.classList.add("sent");
  }

}
