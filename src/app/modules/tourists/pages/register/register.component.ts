import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import csc from 'country-state-city';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { CustomValidators } from 'src/app/validators/custom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public detailsForm: FormGroup;
  public countryList: any[];

  constructor(private toastr: ToastrService,
      private router: Router,
     private touristsService: TouristsService) { }

  ngOnInit() {
    this.createform();
    this.countryList = csc.getAllCountries();
    // console.log(this.countryList);
  }

  createform() {
    this.detailsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      gender: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, CustomValidators.contactNumber]),
      email: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      confirmPassword: new FormControl('', [Validators.required, CustomValidators.passwordConfirming]),
    })
  }

  submitForm() {
    if(this.detailsForm.valid) {
      console.log(this.detailsForm.value);
      // this.tourists.dob = this.detailsForm.value.dob;
      // this.tourists.email = this.detailsForm.value.email;
      // this.tourists.gender = this.detailsForm.value.gender;
      // this.tourists.name = this.detailsForm.value.name;
      // this.tourists.nationality = this.detailsForm.value.nationality;
      // this.tourists.password = this.detailsForm.value.password;
      // this.tourists.phoneNumber = this.detailsForm.value.phoneNumber;
      // this.tourists.languages =[];
      // this.tourists.languages.push(this.detailsForm.value.languages);
      // console.log(this.detailsForm.value);
      // console.log(this.tourists);

      /////////api//////
      this.touristsService.touristsSignup(this.detailsForm.value).subscribe( res => {
        console.log(res);
        if(res.success) {
          this.toastr.success("Registered Successfully!");
          // this.createform();
          this.router.navigateByUrl('/login/tourist');
        } else {
          this.toastr.error(res.msg);
        }
      })

    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}
