import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { UserService } from 'src/app/shared/service/user.service';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import languages from 'country-language';
import csc from 'country-state-city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editpersonal', { static: false}) modal1: MDBModalService
  @ViewChild('addintrest', { static: false}) modal3: MDBModalService;
  @ViewChild('addlanguage', { static: false}) modal4: MDBModalService;
  public interestList: string[];
  public userData: any = {};
  interestsDetails: FormGroup;
  personalDetails: FormGroup;
  languagesDetails: FormGroup;
  languageList: any[] = [];
  countryList: any[] = [];

  constructor(private staticDataService: StaticDataService,
    private userService: UserService,
    private router: Router,
    private touristService: TouristsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getUser();
    this.createPersonalDetailsForm();
    this.createInterestsForm();
    this.createLanguagesForm();
    this.interestList = this.staticDataService.getAllInterestList();
    this.languageList = languages.getLanguages().map(ele => ele.name[0]);
    this.countryList = csc.getAllCountries();
  }

  getUser() {
    this.userData = JSON.parse(this.userService.getUser('tourist'));
    console.log(this.userData);
  }

  createPersonalDetailsForm() {
    this.personalDetails = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      age: new FormControl(this.userData.age, [Validators.required]),
      email: new FormControl(this.userData.email, [Validators.required]),
      phoneNumber: new FormControl(this.userData.phoneNumber, [Validators.required]),
      nationality: new FormControl(this.userData.nationality, [Validators.required]),
      // language: new FormControl(this.userData.languages[0], [Validators.required]),
    })
  }

  createInterestsForm() {
    this.interestsDetails = new FormGroup({
      interest: new FormControl('', [Validators.required])
    })
  }

  createLanguagesForm() {
    this.languagesDetails = new FormGroup({
      language: new FormControl('', [Validators.required])
    })
  }

  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      this.userData.gender = this.personalDetails.value.gender;
      this.userData.name = this.personalDetails.value.name;
      this.userData.age = this.personalDetails.value.age;
      this.userData.nationality = this.personalDetails.value.nationality;
      // this.userData.languages[0] = this.personalDetails.value.language;
      this.userData.phoneNumber = this.personalDetails.value.phoneNumber;
      console.log(this.userData);
      // this.touristService.updateUserDetails(this.userData).subscribe( res => {
      //   console.log(res);
      //   this.userService.saveUser(res.profile, 'tourist');
      //   this.getUser();
        this.modal1.hide(0);
      //   this.toastr.success("Personal Details Updated Successfully!");
      // });
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
        // this.touristService.updateUserDetails(this.userData).subscribe( res => {
        //   console.log(res);
        //   this.userService.saveUser(res.profile, 'tourist');
        //   this.getUser();
          this.modal3.hide(0);
        //   this.createInterestsForm();
        //   this.toastr.success("Interest Added Successfully!");
        // });
      }
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
            this.modal4.hide(0);
        } else {
          this.userData.languages.push(this.languagesDetails.value.language);
          this.modal4.hide(0);
        }
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeInterests(item) {
    let index = this.userData.interests.indexOf(item);
    this.userData.interests.splice(index, 1);
    // this.touristService.updateUserDetails(this.userData).subscribe( res => {
    //   console.log(res);
    //   this.userService.saveUser(res.profile, 'tourist');
    //   this.getUser();
    //   this.toastr.success("Interest Removed Successfully!");
    // });
  }

  removeLanguage(item) {
    let index = this.userData.languages.indexOf(item);
    this.userData.languages.splice(index, 1);
  }

  saveProfile() {
    this.touristService.updateUserDetails(this.userData).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.profile, 'tourist');
      this.getUser();
      this.router.navigateByUrl('/tourists/touristshome/dashboard');
      // this.modal1.hide(0);
      this.toastr.success("Personal Details Updated Successfully!");
    });
  }



}
