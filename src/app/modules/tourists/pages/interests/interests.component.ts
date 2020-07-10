import { Component, OnInit } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  public gradientList: string[] = [];
  public interestsList: any;
  public selectedInterestsList = [];
  public status;

  constructor(private staticDataService: StaticDataService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
     private touristSerice: TouristsService) { }

  ngOnInit() {
    this.route.url.subscribe( s => {
      this.status = this.route.snapshot.params.status;
      console.log(this.status);
    });
    this.gradientList = this.staticDataService.getGradientClassesList();
    // console.log(this.gradientList);
    this.interestsList = this.staticDataService.getAllInterestList();
    // console.log(this.interestsList);
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
    // console.log(flag);
    // console.log(this.selectedInterestsList);
    if(flag) {
      this.selectedInterestsList.splice(this.selectedInterestsList.indexOf(item), 1);
    } else {
      this.selectedInterestsList.push(item);
    }
    // console.log(this.selectedInterestsList);
  }

  removeFromSelectedList(item) {
    this.selectedInterestsList.splice(this.selectedInterestsList.indexOf(item), 1);
  }

  saveInterests() {
    this.touristSerice.updateInterestAndLang( { interests: this.selectedInterestsList}).subscribe( res => {
      if(res.success) {
        console.log(res);
        this.router.navigateByUrl('/tourists/touristshome/dashboard');
      } else {
        this.toastr.error(res.message);
      }
    });
  }

}
