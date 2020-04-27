import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import csc from 'country-state-city';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public detailsForm: FormGroup;
  public countryList: any[];

  constructor(private toastr: ToastrService) { }

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
      console.log(this.detailsForm.value);
    } else {
      this.toastr.error("Invalid Deatils!");
    }
  }

}
