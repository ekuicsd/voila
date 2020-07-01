import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import csc from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validators/custom';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Deals } from 'src/app/shared/models/deals.model';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  createDeal: boolean = false;
  dealForm: FormGroup;
  //india country id is '101';
  public stateList: any;
  public cityList: any;
  public DealsList: Deals[];

  constructor(
    private toastr: ToastrService, 
    private guideService: GuideService
    ) { }

  ngOnInit() {
    this.getAllState('101');
    this.createForm();
    this.getAllDeals();
  }

  getAllDeals() {
    this.guideService.getAllDeals().subscribe(res => {
      this.DealsList = res;
      console.log(this.DealsList);
    }, error => {
      console.log(error);
    })
  }

  createForm() {
    this.dealForm = new FormGroup({
      state: new FormControl("", [Validators.required]),
      city : new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, CustomValidators.compondValueValidate]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      peopleLimit: new FormControl("", [Validators.required]),
      places: new FormArray([new FormControl("", [Validators.required])])
    });
  }

  addLocations() {
    const control = new FormControl("", Validators.required);
    (<FormArray>this.dealForm.get('places')).push(control);
  }

  removeLocation(i) {
    (<FormArray>this.dealForm.get('places')).removeAt(i);
  }

  getAllState(countryId: string) {
    console.log(countryId);
    this.stateList = csc.getStatesOfCountry(countryId);
    console.log(this.stateList);
  }

  getAllCity(stateId) {
    this.cityList = csc.getCitiesOfState(stateId);
    console.log(this.cityList);
  }

  submitDeal() {
    if(this.dealForm.valid) {
      //getStateName
      let selectedState = csc.getStateById(this.dealForm.value.state);
      console.log(selectedState);
      this.dealForm.patchValue({
        state: selectedState.name
      })
      //----------------------
      console.log(this.dealForm.value);
      this.guideService.createDeal(this.dealForm.value).subscribe( res=> {
        console.log(res);
        this.createForm();
        this.toastr.success("Deal created successfully!");
        this.createDeal = false;
      }, error => {
        console.log(error)
      })
      
    } else {
      this.toastr.error("Invalid Details!");
    }

  }
  
}
