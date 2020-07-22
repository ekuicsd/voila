import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import csc from 'country-state-city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { ToastrService } from 'ngx-toastr';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CreateDealComponent implements OnInit {

  public stateList: any[];
  public cityList: any[];
  public placesList: Places[] = [];
  public dealForm: FormGroup;
  public deal: any = {};
  public groupType;
  public user;
  public today = new Date();

  //ngModel
  public place: string = '';
  public date: Date;

  constructor(private staticDataService: StaticDataService,
    private guideService: GuideService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser('guide'));
    this.groupType = this.staticDataService.getAllGroupTypes();
    this.getAllState('101');
    this.getAllCity(this.user.state);
    this.createDealForm();
    console.log(this.today);
  }

  createDealForm() {
    this.dealForm = new FormGroup({
      price: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      startDate: new FormControl('', [Validators.required, CustomValidators.fromDateValidation]),
      endDate: new FormControl('', [Validators.required, CustomValidators.fromToDateValidation]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl(this.user.state, [Validators.required]),
      peopleLimit: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      groupType: new FormControl('', [Validators.required]),
      groupName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  getAllState(countryId: string) {
    console.log(countryId);
    this.stateList = csc.getStatesOfCountry(countryId);
    console.log(this.stateList);
  }

  getAllCity(statename) {
    let stateId = this.stateList.filter(ele => {
      if(ele.name === statename) {
        return ele;
      }
    })[0].id;
    console.log(stateId);
    this.cityList = csc.getCitiesOfState(stateId);
    console.log(this.cityList);
  }

  addToPlacesList() {
    let from = new Date(this.dealForm.value.startDate);
    let to = new Date(this.dealForm.value.endDate);
    let date = new Date(this.date);
    if(date.getTime() - from.getTime() < 0 || date.getTime() - to.getTime() > 0 ) {
      this.toastr.warning("please enter date between to and from date");
      return;
    } else if(this.place === '' || this.date === undefined) {
      this.toastr.error("Data Invalid!");
      return;
    } else {
      this.placesList.push({
        place: this.place,
        date: this.date
      });
      this.place = '';
      this.date = undefined;
    }
  }

  editPlace(item) {
    this.removePlace(item);
    this.place = item.place;
    this.date = item.date;
  }

  removePlace(item) {
    let index = this.placesList.indexOf(item);
    if(index !== -1) {
      this.placesList.splice(index, 1);
    }
  }

  saveDeal() {
    if(this.dealForm.valid && this.placesList.length > 0) {
      console.log(this.dealForm.value);
      this.deal = this.dealForm.value;
      this.deal['places'] = this.placesList;
      console.log(this.deal);
      this.guideService.createDeal(this.deal).subscribe( res=> {
          console.log(res);
          this.guideService.createGroupChatRoom(this.user._id, res.body.deal._id, this.dealForm.value.groupName).subscribe( res => {
            console.log(res);
            this.toastr.success("Deal created successfully!");
            this.router.navigateByUrl('/guide/guidehome/deals');
          });
        }, error => {
        console.log(error)
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}

interface Places {
  place: string;
  date: Date;
}
