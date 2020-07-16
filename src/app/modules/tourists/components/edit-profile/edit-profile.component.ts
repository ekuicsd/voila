import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { Tourists } from '../../../../shared/models/tourists.model';
import { UserService } from 'src/app/shared/service/user.service';
import { TouristsService } from 'src/app/shared/service/tourists.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editpersonal', { static: false}) modal1: MDBModalService
  @ViewChild('addintrest', { static: false}) modal3: MDBModalService;
  public interestList: string[];
  public userData: Tourists;
  interestsDetails: FormGroup;
  personalDetails: FormGroup;

  constructor(private staticDataService: StaticDataService,
    private userService: UserService,
    private touristService: TouristsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getUser();
    this.createPersonalDetailsForm();
    this.createInterestsForm();
    this.interestList = this.staticDataService.getAllInterestList();
  }

  getUser() {
    this.userData = JSON.parse(this.userService.getUser('tourist'));
    console.log(this.userData);
  }

  createPersonalDetailsForm() {
    this.personalDetails = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      gender: new FormControl(this.userData.gender, [Validators.required]),
      // dob: new FormControl(this.userData.dob, [Validators.required]),
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

  submitPersonalDetails() {
    if(this.personalDetails.valid) {
      this.userData.gender = this.personalDetails.value.gender;
      this.userData.name = this.personalDetails.value.name;
      this.userData.nationality = this.personalDetails.value.nationality;
      // this.userData.languages[0] = this.personalDetails.value.language;
      this.userData.phoneNumber = this.personalDetails.value.phoneNumber;
      console.log(this.userData);
      this.touristService.updateUserDetails(this.userData).subscribe( res => {
        console.log(res);
        this.userService.saveUser(res.profile, 'tourist');
        this.getUser();
        this.modal1.hide(0);
        this.toastr.success("Personal Details Updated Successfully!");
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
        this.touristService.updateUserDetails(this.userData).subscribe( res => {
          console.log(res);
          this.userService.saveUser(res.profile, 'tourist');
          this.getUser();
          this.modal3.hide(0);
          this.createInterestsForm();
          this.toastr.success("Interest Added Successfully!");
        });
      }
    } else {
      this.toastr.error("Invalid Details!");
    }

  }

  removeInterests(item) {
    let index = this.userData.interests.indexOf(item);
    this.userData.interests.splice(index, 1);
    this.touristService.updateUserDetails(this.userData).subscribe( res => {
      console.log(res);
      this.userService.saveUser(res.profile, 'tourist');
      this.getUser();
      this.toastr.success("Interest Removed Successfully!");
    });
  }

  saveProfile() {
    
  }



}
