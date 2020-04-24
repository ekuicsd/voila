import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  guideForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  createForm() {
    this.guideForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      gender : new FormControl('', [Validators.required]), 
      password : new FormControl('', [Validators.required]),
      dob : new FormControl('', [Validators.required]),
      phoneNumber : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      address : new FormControl('', [Validators.required]),
      experience : new FormControl('', [Validators.required]),
      peopleLimit : new FormControl('', [Validators.required]),
      perHeadCharge : new FormControl('', [Validators.required]),
      perDayCharge : new FormControl('', [Validators.required]),
      // picUrl : picUrl,
      aadhaarNumber : new FormControl('', [Validators.required]),
      interests : new FormControl('', [Validators.required]),
      languages : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      state : new FormControl('', [Validators.required])
    })
  }
}
