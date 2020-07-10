import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  @Output() ouputInterestsList : EventEmitter<any> = new EventEmitter<any>();
  public gradientList: string[] = [];
  public interestsList: any;
  public selectedInterestsList = [];
  // public status;

  constructor(private staticDataService: StaticDataService,
    private toastr: ToastrService,
     ) { }

  ngOnInit() {
    this.gradientList = this.staticDataService.getGradientClassesList();
    this.interestsList = this.staticDataService.getAllInterestList();
  }

  getGradientClass(index) {
    return this.gradientList[index%10];
  }

  isSelected(item) : boolean {
    let list = this.selectedInterestsList.filter(ele => {
      if(ele === item) {
        return true;
      }
    });
    if(list.length > 0) {
      return true;
    }
    return false;
  }

  addToSelectedIntList(item) {
    let flag = this.isSelected(item);
    if(flag) {
      this.selectedInterestsList.splice(this.selectedInterestsList.indexOf(item), 1);
    } else {
      this.selectedInterestsList.push(item);
    }
  }

  removeFromSelectedList(item) {
    this.selectedInterestsList.splice(this.selectedInterestsList.indexOf(item), 1);
  }

  outputInterests() {
    if(this.selectedInterestsList.length > 0) {
      console.log(this.selectedInterestsList);
      this.ouputInterestsList.emit(this.selectedInterestsList);
    } else {
      this.toastr.warning("Please Select AtLeast one Interest!");
    }
  }


}
