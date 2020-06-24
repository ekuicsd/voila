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
  @ViewChild('editbusiness', { static: false}) modal4: MDBModalService;
  
  public editExp : boolean = false;
  public userData: Guide;
  public interestList: string[];
  public selectedExp: Experience;
  // public stateList: any[];
  // public cityList: any[]; 
  // public selectedStateId: any; 

  constructor(private userService: UserService, 
    private guideService: GuideService,
    private staticDataService: StaticDataService,
    private toastr: ToastrService
    ) {  }

  personalDetails: FormGroup;
  businessDetails: FormGroup;
  experienceDetails: FormGroup;
  languagesDetails: FormGroup;
  interestsDetails: FormGroup;

  ngOnInit() {  
    this.getUser();
    // this.getAllState('101');
    this.createPersonalDetailsForm();
    this.createBusinessDetails();
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

  createBusinessDetails() {
    this.businessDetails = new FormGroup({
      peopleLimit: new FormControl(this.userData.peopleLimit, [Validators.required]),
      perHeadCharge: new FormControl(this.userData.perHeadCharge, [Validators.required]),
      perDayCharge: new FormControl(this.userData.perDayCharge, [Validators.required])
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
    this.selectedExp = data;
    console.log(this.selectedExp);
    this.experienceDetails.patchValue(data);
    this.modal.show(content);
  }

  addExpShow(content) {
    this.editExp = false;
    this.createExperienceDetailsForm();
    this.modal.show(content);
  }

  updateExperience() {
    if(this.experienceDetails.valid) {
      let index = this.userData.experience.indexOf(this.selectedExp);
      this.userData.experience[index].duration = this.experienceDetails.value.duration;
      this.userData.experience[index].profile = this.experienceDetails.value.profile;
      this.userData.experience[index].startYear = this.experienceDetails.value.startYear;
      this.userData.experience[index].work = this.experienceDetails.value.work;
      console.log(this.userData);
      this.guideService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
        this.modal.hide(0);
        this.toastr.success("Experience Updated Successfully!");
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeExperience(item) {
    let index = this.userData.experience.indexOf(item);
    this.userData.experience.splice(index, 1);
    this.guideService.updateUserDetails(this.userData).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.profile, 'guide');
      this.getUser();
      this.toastr.success("Experience Removed Successfully!");
    });
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
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
        this.modal1.hide(0);
        this.toastr.success("Personal Details Updated Successfully!");
      });
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  submitBusinessDetails() {
    if(this.businessDetails.valid) {
      this.userData.peopleLimit = this.businessDetails.value.peopleLimit;
      this.userData.perDayCharge = this.businessDetails.value.perDayCharge;
      this.userData.perHeadCharge = this.businessDetails.value.perHeadCharge;
      this.guideService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
        this.modal4.hide(0);
        this.toastr.success("Business Details Updated Successfully!");
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
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
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
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
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
          this.userService.saveUser(res.profile, 'guide');
          this.getUser();
          this.modal3.hide(0);
          this.createInterestsForm();
          this.toastr.success("Language Added Successfully!");
        });
      }
    } else {
      this.toastr.error("Invalid Details!");
    }

  }

  removeLanguage(item) {
    let index = this.userData.languages.indexOf(item);
    this.userData.languages.splice(index, 1);
    this.guideService.updateUserDetails(this.userData).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.profile, 'guide');
      this.getUser();
      this.toastr.success("Language Removed Successfully!");
    });
  }
  
  removeInterests(item) {
    let index = this.userData.interests.indexOf(item);
    this.userData.interests.splice(index, 1);
    this.guideService.updateUserDetails(this.userData).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.profile, 'guide');
      this.getUser();
      this.toastr.success("Interest Removed Successfully!");
    });
  }
}
