import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import languages from 'country-language';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Output() ouputLanguagesList : EventEmitter<any> = new EventEmitter<any>();
  public gradientList: string[] = [];
  public languageList: any;
  public selectedLanguageList = [];
  public langSearch: string = '';

  constructor(private staticDataService: StaticDataService,
    private toastr: ToastrService,
     ) { }

  ngOnInit() {
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

  outputLanguages() {
    if(this.selectedLanguageList.length > 0) {
      console.log(this.selectedLanguageList);
      this.ouputLanguagesList.emit(this.selectedLanguageList);
    } else {
      this.toastr.warning("Please select atleast one language!");
    }
  }
}
