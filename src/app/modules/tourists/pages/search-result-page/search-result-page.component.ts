import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {


  rangeValues: number[] = [20,80];

  public interestList: string[]; 

  constructor( private staticDataService: StaticDataService) { }


  
  ngOnInit() {
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
      "left": activeItem.position.left + "px", 
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
