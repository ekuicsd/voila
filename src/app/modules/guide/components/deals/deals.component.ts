import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import csc from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validators/custom';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  createDeal: boolean = false;
  dealForm: FormGroup;
  //india country id is 101;
  public stateList: any;
  public cityList: any;
  // public locationsList: string[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllState('101');
    this.createForm();
  }

  // addToLocationsList() {
  //   console.log(this.dealForm.value.city);
  //   this.locationsList.push(this.dealForm.value.places);
  // }

  addLocations() {
    const control = new FormControl("", Validators.required);
    (<FormArray>this.dealForm.get('places')).push(control);
  }

  create() {
    this.createDeal = true;
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

  removeLocation(i) {
    (<FormArray>this.dealForm.get('places')).removeAt(i);
  }

  submitDeal() {
    if(this.dealForm.valid) {
      console.log(this.dealForm.value);
      this.createForm();
      this.toastr.success("Deal craeted successfully!");
      this.createDeal = false;
    } else {
      this.toastr.error("Invalid Details!");
    }

  }

  createForm() {
    this.dealForm = new FormGroup({
      city : new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, CustomValidators.compondValueValidate]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      peopleLimit: new FormControl("", [Validators.required]),
      places: new FormArray([new FormControl("", [Validators.required])])
      // places: new FormControl("", [Validators.required])
    });
  }

}
