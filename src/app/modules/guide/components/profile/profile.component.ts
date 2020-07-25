import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { Guide, Experience } from 'src/app/shared/models/guide.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { GuideService } from 'src/app/shared/service/guide.service';
import { ToastrService } from 'ngx-toastr';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import csc from 'country-state-city';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import languages from 'country-language';
import { CustomValidators } from 'src/app/validators/custom';

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
  public languageList: any[] = [];
  public expVariable: string = '';
  public stateList: any[];
  public cityList: any[];
  public myFiles: string[] = [];
  urlArray:any=[];


  constructor(private userService: UserService, 
    private guideService: GuideService,
    config: NgbModalConfig, private modalService: NgbModal,
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
    this.getAllState('101');
    this.createPersonalDetailsForm();
    this.createBusinessDetails();
    this.createExperienceDetailsForm();
    this.createLanguagesForm();
    this.createInterestsForm();
    this.interestList = this.staticDataService.getAllInterestList();
    this.languageList = languages.getLanguages().map(ele => ele.name[0]);

  }

  getUser() {
    this.userData = JSON.parse(this.userService.getUser('guide'));
    console.log(this.userData);
  }

  convertDateToString(strdate) : string {
    let date = new Date(strdate);
    return date.toJSON().slice(0, 10);
  }

  createPersonalDetailsForm() {
    this.getAllCity(this.userData.state);
    this.personalDetails = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required, Validators.minLength(3)]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      dob: new FormControl(this.convertDateToString(this.userData.dob), [Validators.required]),
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      aadhaarNumber: new FormControl(this.userData.aadhaarNumber, [Validators.required, CustomValidators.compondValueValidate]),
      phoneNumber: new FormControl(this.userData.phoneNumber, [Validators.required, CustomValidators.contactNumber]),
      state: new FormControl(this.userData.state, [Validators.required]),
      city: new FormControl(this.userData.city, [Validators.required]),
      address: new FormControl(this.userData.address, [Validators.required, Validators.minLength(3)])
    });
  }

  createBusinessDetails() {
    this.businessDetails = new FormGroup({
      peopleLimit: new FormControl(this.userData.peopleLimit, [Validators.required, CustomValidators.compondValueValidate]),
      perHeadCharge: new FormControl(this.userData.perHeadCharge, [Validators.required, CustomValidators.compondValueValidate]),
      perDayCharge: new FormControl(this.userData.perDayCharge, [Validators.required, CustomValidators.compondValueValidate])
    })
  }

  createExperienceDetailsForm() {
    this.experienceDetails = new FormGroup({
      work: new FormControl('', [Validators.required, Validators.minLength(3)]),
      startYear: new FormControl('', [Validators.required, CustomValidators.compondValueValidate, Validators.minLength(4), Validators.maxLength(4)]),
      duration: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      profile: new FormControl('', [Validators.required, Validators.minLength(3)])
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
    this.expVariable = 'Update Experience';
    this.selectedExp = data;
    console.log(this.selectedExp);
    this.experienceDetails.patchValue(data);
    this.modal.show(content);
  }

  addExpShow(content) {
    this.editExp = false;
    this.expVariable = 'Add Experience';
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
      this.modal.hide(0);
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeExperience(item) {
    let index = this.userData.experience.indexOf(item);
    this.userData.experience.splice(index, 1);
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


  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      this.userData.gender = this.personalDetails.value.gender;
      this.userData.name = this.personalDetails.value.name;
      this.userData.address = this.personalDetails.value.address;
      this.userData.city = this.personalDetails.value.city;
      this.userData.state = this.personalDetails.value.state;
      this.userData.phoneNumber = this.personalDetails.value.phoneNumber;
        this.modal1.hide(0);
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  
  submitBusinessDetails() {
    if(this.businessDetails.valid) {
      this.userData.peopleLimit = this.businessDetails.value.peopleLimit;
      this.userData.perDayCharge = this.businessDetails.value.perDayCharge;
      this.userData.perHeadCharge = this.businessDetails.value.perHeadCharge;
        this.modal4.hide(0);
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  addExperience() {
    if(this.experienceDetails.valid) {
      this.userData.experience.push(this.experienceDetails.value);
        this.modal.hide(0);
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  addLanguage() {
    if(this.languagesDetails.valid) {
        let language = this.userData.languages.filter( ele => {
          if(ele === this.languagesDetails.value.language) {
            return ele;
          }
        });
        console.log(language);
        if(language.length >= 1) {
            this.toastr.warning("Already Added!"); 
            this.modal2.hide(0);
        } else {
          this.userData.languages.push(this.languagesDetails.value.language);
          this.modal2.hide(0);
        }
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
        this.modal3.hide(0);
      }
    } else {
      this.toastr.error("Invalid Details!");
    }

  }

  removeLanguage(item) {
    let index = this.userData.languages.indexOf(item);
    this.userData.languages.splice(index, 1);
  }
  
  removeInterests(item) {
    let index = this.userData.interests.indexOf(item);
    this.userData.interests.splice(index, 1);
  }

  onSelectFile(event) {
    this.myFiles = [];
    console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
      this.urlArray.push(reader.result);
      }
    }
    console.log(this.urlArray);
  }


  saveRecord() {
    console.log(this.userData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(this.userData));
    console.log(formData);
    if(this.myFiles.length > 0) {
      for (var i = 0; i < this.myFiles.length; i++) { 
        // console.log("in for loop");
        formData.append("profilePic", this.myFiles[i]);
      }
    }
    console.log(formData);
    this.guideService.updateUserDetails(formData).subscribe( res => {
        console.log(res);
        this.userService.saveUser(res.profile, 'guide');
        this.getUser();
        this.toastr.success("Profile Updated Successfully!");
      });
  }


}
