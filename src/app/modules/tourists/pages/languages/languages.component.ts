import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import languages from 'country-language';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public gradientList: string[] = [];
  public languageList: any;
  public selectedLanguageList = [];
  public status;
  public langSearch: string = '';

  constructor(private staticDataService: StaticDataService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
     private touristSerice: TouristsService) { }

  ngOnInit() {
    this.route.url.subscribe( s => {
      this.status = this.route.snapshot.params.status;
    });
    this.gradientList = this.staticDataService.getGradientClassesList();
    this.languageList = languages.getLanguages().map(ele => ele.name[0]);
  }

  getGradientClass(index) {
    return this.gradientList[index%10];
  }

  isSelected(item) : boolean {
    let list = this.selectedLanguageList.filter(ele => {
      if(ele === item) {
        return true;
      }
    });
    if(list.length > 0) {
      return true;
    }
    return false;
  }

  addToSelectedLangList(item) {
    let flag = this.isSelected(item);
    if(flag) {
      this.selectedLanguageList.splice(this.selectedLanguageList.indexOf(item), 1);
    } else {
      this.selectedLanguageList.push(item);
    }
  }

  removeFromSelectedList(item) {
    this.selectedLanguageList.splice(this.selectedLanguageList.indexOf(item), 1);
  }

  saveLanguages() {
    this.touristSerice.updateInterestAndLang( { languages: this.selectedLanguageList}).subscribe( res => {
      if(res.success) {
        this.navigateToRoute();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  navigateToRoute() {
    if(this.status === 'languagesInterests') {
      this.router.navigateByUrl('/tourists/touristshome/interests/interests');
    } else {
      this.router.navigateByUrl('/tourists/touristshome/dashboard');
    }
  }

}
