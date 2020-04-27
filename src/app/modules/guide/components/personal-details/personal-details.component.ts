import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import csc from 'country-state-city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  // public countryCode: string = '101';
  @Output() personalData: EventEmitter<any> = new EventEmitter<any>();
  stateList: any[];
  cityList: any[];
  public personalDetails: FormGroup;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.getAllState('101');

  }

  createForm() {
    this.personalDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      aadhaarNumber: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    })
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

  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      let selectedState = csc.getStateById(this.personalDetails.value.state);
      console.log(selectedState);
      this.personalDetails.patchValue({
        state: selectedState.name
      })
      console.log(this.personalDetails.value);
      this.personalData.emit(this.personalDetails.value);
    } else {
      this.toastr.error("Invalid details!");
    }
  }

}
