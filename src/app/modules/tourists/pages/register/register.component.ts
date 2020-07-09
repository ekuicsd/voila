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
      this.touristsService.touristsSignup(this.detailsForm.value).subscribe( res => {
        console.log(res);
        if(res.success) {
          this.toastr.success("Registered Successfully!");
        } else {
          this.toastr.error(res.message);
        }
        this.router.navigateByUrl('/login/tourist');
      })

    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}
