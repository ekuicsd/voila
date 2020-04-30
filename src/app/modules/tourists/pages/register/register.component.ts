import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import csc from 'country-state-city';
import { Tourists } from 'src/app/shared/models/tourists.model';
import { TouristsService } from 'src/app/shared/service/tourists.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public detailsForm: FormGroup;
  public countryList: any[];
  public tourists: Tourists = {};

  constructor(private toastr: ToastrService, private touristsService: TouristsService) { }

  ngOnInit() {
    this.createform();
    this.countryList = csc.getAllCountries();
    console.log(this.countryList);
  }

  createform() {
    this.detailsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),     
      languages: new FormControl('', [Validators.required]),
    })
  }

  submitForm() {
    if(this.detailsForm.valid) {
      this.tourists.dob = this.detailsForm.value.dob;
      this.tourists.email = this.detailsForm.value.email;
      this.tourists.gender = this.detailsForm.value.gender;
      this.tourists.name = this.detailsForm.value.name;
      this.tourists.nationality = this.detailsForm.value.nationality;
      this.tourists.password = this.detailsForm.value.password;
      this.tourists.phoneNumber = this.detailsForm.value.phoneNumber;
      this.tourists.languages =[];
      this.tourists.languages.push(this.detailsForm.value.languages);
      console.log(this.detailsForm.value);
      console.log(this.tourists);

      /////////api//////
      this.touristsService.touristsSignup(this.tourists).subscribe( res => {
        console.log(res);
        this.toastr.success("Created Successfully!");
        this.createform();  
      })

    } else {
      this.toastr.error("Invalid Deatils!");
    }
  }

}
