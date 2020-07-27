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
    });
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

  saveInterests() {
    this.touristSerice.updateInterestAndLang( { interests: this.selectedInterestsList}).subscribe( res => {
      if(res.success) {
        this.router.navigateByUrl('/tourists/touristshome/dashboard');
      } else {
        this.toastr.error(res.message);
      }
    });
  }

}
