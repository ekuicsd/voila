import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import csc from 'country-state-city';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validators/custom';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  @Output() personalData: EventEmitter<any> = new EventEmitter<any>();
  @Output() profileData: EventEmitter<any> = new EventEmitter<any>();
  stateList: any[];
  cityList: any[];
  public personalDetails: FormGroup;
  public myFiles: string[] = [];
  urlArray:any=[];

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.getAllState('101');
  }

  createForm() {
    this.personalDetails = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, CustomValidators.passwordConfirming]),
      dob: new FormControl('', [Validators.required, CustomValidators.dobValidation]),
      phoneNumber: new FormControl('', [Validators.required, CustomValidators.contactNumber]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      aadhaarNumber: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      statusCurrent: new FormControl('PENDING')
    });
  }

  getAllState(countryId: string) {
    this.stateList = csc.getStatesOfCountry(countryId);
  }

  // getAllCity(stateId) {
  //   this.cityList = csc.getCitiesOfState(stateId);
  // }
  getAllCity(statename) {
    let stateId = this.stateList.filter(ele => {
      if(ele.name === statename) {
        return ele;
      }
    })[0].id;
    this.cityList = csc.getCitiesOfState(stateId);
  }

  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      // let selectedState = csc.getStateById(this.personalDetails.value.state);
      // this.personalDetails.patchValue({
      //   state: selectedState.name
      // })
      this.profileData.emit(this.myFiles);
      this.personalData.emit(this.personalDetails.value);
    } else {
      this.toastr.error("Invalid details!");
    }
  }

  onSelectFile(event) {
    this.myFiles=[];
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlArray.push(reader.result);
      }
    }
  }

}
