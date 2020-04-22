import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { Guide, Experience } from 'src/app/shared/models/guide.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { GuideService } from 'src/app/shared/service/guide.service';
import { ToastrService } from 'ngx-toastr';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
// import csc from 'country-state-city';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editexperience', {static: false}) modal: MDBModalService;
  @ViewChild('editpersonal', { static: false}) modal1: MDBModalService;
  @ViewChild('addlanguage', { static: false}) modal2: MDBModalService;
  @ViewChild('addintrest', { static: false}) modal3: MDBModalService;
  public editExp : boolean = false;
  public userData: Guide;
  public interestList: string[];
  // public stateList: any[];
  // public cityList: any[]; 
  // public selectedStateId: any; 

  constructor(private userService: UserService, 
    private guideService: GuideService,
    private staticDataService: StaticDataService,
    private toastr: ToastrService
    ) {  }

  personalDetails: FormGroup;
  experienceDetails: FormGroup;
  languagesDetails: FormGroup;
  interestsDetails: FormGroup;

  ngOnInit() {  
    this.getUser();
    // this.getAllState('101');
    this.createPersonalDetailsForm();
    this.createExperienceDetailsForm();
    this.createLanguagesForm();
    this.createInterestsForm();
    this.interestList = this.staticDataService.getAllInterestList();
  }

  getUser() {
    this.userData = JSON.parse(this.userService.getUser('guide'));
    console.log(this.userData);
  }

  createPersonalDetailsForm() {
    this.personalDetails = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      dob: new FormControl(this.userData.dob, [Validators.required]),
      email: new FormControl(this.userData.email, [Validators.required]),
      aadhaarNumber: new FormControl(this.userData.aadhaarNumber, [Validators.required]),
      phoneNumber: new FormControl(this.userData.phoneNumber, [Validators.required]),
      state: new FormControl(this.userData.state, [Validators.required]),
      city: new FormControl(this.userData.city, [Validators.required]),
      address: new FormControl(this.userData.address, [Validators.required])
    })
  }

  

  createExperienceDetailsForm() {
    this.experienceDetails = new FormGroup({
      work: new FormControl('', [Validators.required]),
      startYear: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required])
    })
  }

  createLanguagesForm() {
    this.languagesDetails = new FormGroup({
      language: new FormControl('', [Validators.required])
    })
  }

  createInterestsForm() {
    this.interestsDetails = new FormGroup({
      interest: new FormControl('', [Validators.required])
    })
  }

  editExpShow(content, data: Experience) {
    this.editExp = true;
    this.experienceDetails.patchValue(data);
    this.modal.show(content);
  }

  addExpShow(content) {
    this.editExp = false;
    this.createExperienceDetailsForm();
    this.modal.show(content);
  }

  // getAllState(countryId: string) {
  //   console.log(countryId);
  //   this.stateList = csc.getStatesOfCountry(countryId);
  //   console.log(this.stateList);
  // }

  // getAllCity(stateId) {
  //   this.cityList = csc.getCitiesOfState(stateId);
  //   console.log(this.cityList);
  // }


  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      //getStateName
      // let selectedState = csc.getStateById(this.personalDetails.value.state);
      // console.log(selectedState);
      // this.personalDetails.patchValue({
      //   state: selectedState.name
      // })
      //----------------------
      this.userData.gender = this.personalDetails.value.gender;
      this.userData.name = this.personalDetails.value.name;
      this.userData.address = this.personalDetails.value.address;
      this.userData.city = this.personalDetails.value.city;
      this.userData.state = this.personalDetails.value.state;
      this.userData.phoneNumber = this.personalDetails.value.phoneNumber;
      this.guideService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.modal1.hide(0);
        this.toastr.success("Personal Details Updated Successfully!");
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  addExperience() {
    if(this.experienceDetails.valid) {
      this.userData.experience.push(this.experienceDetails.value);
      this.guideService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.modal.hide(0);
        this.toastr.success("Experience Added Successfully!");
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  addLanguage() {
    if(this.languagesDetails.valid) {
      this.userData.languages.push(this.languagesDetails.value.language);
      this.guideService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.modal2.hide(0);
        this.createLanguagesForm();
        this.toastr.success("Language Added Successfully!");
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  addInterest() {
    if(this.interestsDetails.valid) {
      // if(this.interestsDetails.value.interest)
      let interest = this.userData.interests.filter( ele => {
        if(ele === this.interestsDetails.value.interest) {
          return ele;
        }
      });
      console.log(interest);
      if(interest.length >= 1) {
          this.toastr.warning("Already Added!"); 
          this.modal3.hide(0);
      } else {
        this.userData.interests.push(this.interestsDetails.value.interest);
        this.guideService.updateUserDetails(this.userData).subscribe( res => {
          console.log(res);
          this.modal3.hide(0);
          this.createInterestsForm();
          this.toastr.success("Language Added Successfully!");
        });
      }
    } else {
      this.toastr.error("Invalid Details!");
    }

  }
}
