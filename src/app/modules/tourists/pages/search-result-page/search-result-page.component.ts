import { Component, OnInit, ViewChild } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import {MatSidenav} from '@angular/material/sidenav';
import { Options} from 'ng5-slider';
import * as $ from 'jquery';



@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  // slider 
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '₹' + value;
    }
  };

  public interestList: string[]; 

  constructor( private staticDataService: StaticDataService) { }


  
  ngOnInit() {
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
      // "left": activeItem.position.left + "px", 
      "width": activeWidth + "px"
    });
    
    $(".tabs").on("click","a",function(e){
      e.preventDefault();
      $('.tabs a').removeClass("active");
      $(this).addClass('active');
      var activeWidth = $(this).innerWidth();
      var itemPos = $(this).position();
      $(".selector").css({
        "left":itemPos.left + "px", 
        "width": activeWidth + "px"
      });
    });
    this.interestList = this.staticDataService.getAllInterestList();
  }

}
