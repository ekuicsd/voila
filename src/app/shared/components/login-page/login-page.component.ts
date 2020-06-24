import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public LoginForm: FormGroup;

  constructor(private userService: UserService,
              private location: Location,
               private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  // login(role) {

  // }
  
  login(role: string) {
    // alert(role);
    if(role === 'guide') {
      this.userService.AttemptGuideLogin(this.LoginForm.value).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('guide/guidehome');
        }, error => {
          console.log(error);
        }
      )
    } else {
      this.userService.AttemptTouristLogin(this.LoginForm.value).subscribe(
        res => {
          console.log(res);
          // this.router.navigateByUrl('tourists/touristshome');
          this.location.back();
        }, error => {
          console.log(error);
        }
      )
    }

  }

  get f() {
    return this.LoginForm.controls;
  }

}
