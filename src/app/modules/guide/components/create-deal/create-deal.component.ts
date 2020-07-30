import { Component, OnInit } from '@angular/core';
import csc from 'country-state-city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { ToastrService } from 'ngx-toastr';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.scss'],
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
    this.stateList = csc.getStatesOfCountry(countryId);
  }

  getAllCity(statename) {
    let stateId = this.stateList.filter(ele => {
      if(ele.name === statename) {
        return ele;
      }
    })[0].id;
    this.cityList = csc.getCitiesOfState(stateId);
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
    Swal.fire({
      text: "Are you sure to create deal?",
      showCancelButton: true,
      confirmButtonColor: '#553d67',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        if(this.dealForm.valid && this.placesList.length > 0) {
          this.deal = this.dealForm.value;
          this.deal['places'] = this.placesList;
          this.guideService.createDeal(this.deal).subscribe( res=> {
            console.log(res);
              if(res.success) {
                this.guideService.createGroupChatRoom(this.user._id, res.deal._id, this.dealForm.value.groupName).subscribe( res => {
                  this.toastr.success("Deal created successfully!");
                  this.router.navigateByUrl('/guide/guidehome/deals');
                });
              } else {
                this.toastr.error(res.message);
              }
            }, error => {
          });
        } else {
          this.toastr.error("Invalid Details!");
        }
      }
    }); 

  }

}

interface Places {
  place: string;
  date: Date;
}
