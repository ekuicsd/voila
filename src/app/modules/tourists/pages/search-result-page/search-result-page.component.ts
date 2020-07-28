import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { Options} from 'ng5-slider';
import * as $ from 'jquery';
import languages from 'country-language';
import { SearchService } from 'src/app/shared/service/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit, OnDestroy {

  // slider 
  public minPrice: number = 100;
  public maxPrice: number = 2000;
  options: Options = {
    floor: 100,
    ceil: 10000,
    translate: (value: number): string => {
      return '₹' + value;
    }
  };
  public interestList: string[]; 
  public languageList: string[];
  public langMore: boolean = true;
  public cityMore: boolean = true;
  public langSearch: string = '';
  public citySearch: string = '';
  routerSubscription: Subscription;
  
  constructor( private staticDataService: StaticDataService,
    private router: Router,
     public searchService: SearchService) { 

     }
  
  ngOnInit() {
   
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
      // "left": activeItem.position.left + "px", 
      // "left":itemPos.left + "px", 
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
    this.languageList = languages.getLanguages().map(ele => ele.name[0]);
    this.interestList = this.staticDataService.getAllInterestList();
    this.searchService.getFilterData();
    if(this.router.url === '/tourists/touristshome/searchResult/dealsList') {
      this.router.navigateByUrl('/tourists/touristshome/searchResult/guidesList');
    }
    this.routerSubscription = this.router.events
      .subscribe(event => {
          document.body.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
}


  changePrice($event) {
    this.searchService.getFilterData();
  }

  moreLess() {
    this.langMore = !this.langMore;
  }

  moreLessCity() {
    this.cityMore = !this.cityMore;
  }

  changeRating(data) {
    this.searchService.getFilterData();
  }

  changeInterest(data) {
    if(data.checked) {
      this.searchService.extra_filter.interests.push(data.element.value)
    } else {
      let index = this.searchService.extra_filter.interests.indexOf(data.element.value);
      this.searchService.extra_filter.interests.splice(index, 1);
    }
    this.searchService.getFilterData();
  }

  changeCity(data) {
    if(data.checked) {
      this.searchService.extra_filter.city.push(data.element.value)
    } else {
      let index = this.searchService.extra_filter.city.indexOf(data.element.value);
      this.searchService.extra_filter.city.splice(index, 1);
    }
    this.searchService.getFilterData();
  }

  changeLangauge(data) {
    if(data.checked) {
      this.searchService.extra_filter.languages.push(data.element.value)
    } else {
      let index = this.searchService.extra_filter.languages.indexOf(data.element.value);
      this.searchService.extra_filter.languages.splice(index, 1);
    }
    this.searchService.getFilterData();
  }

  getLanguage(language) : boolean {
    let index = this.searchService.extra_filter.languages.indexOf(language);
    if(index !== -1) {
      return true;
    }
    return false;
  }

  getInterest(interest) {
    let index = this.searchService.extra_filter.interests.indexOf(interest);
    if(index !== -1) {
      return true;
    }
    return false;
  }

  getCities(city) {
    let index = this.searchService.extra_filter.city.indexOf(city);
    if(index !== -1) {
      return true;
    }
    return false;
  }

  resetAll() {
    this.searchService.extra_filter = {
      minPrice: 100,
      maxPrice: 2000,
      rating: null,
      languages: [],
      interests: [],
      city: []
    };
  }

}
