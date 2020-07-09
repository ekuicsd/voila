import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public LoginForm: FormGroup;
  public role: string = 'tourist';

  constructor(private userService: UserService,
              private location: Location,
              private toastr: ToastrService,
              private route: ActivatedRoute,
               private router: Router) {  }

  ngOnInit() {
    $('#signup').click(function() {
      $('.pinkbox').css('transform', 'translateX(80%)');
      $('.signin').addClass('nodisplay');
      $('.signup').removeClass('nodisplay');
    });

    $('#signin').click(function() {
      $('.pinkbox').css('transform', 'translateX(0%)');
      $('.signup').addClass('nodisplay');
      $('.signin').removeClass('nodisplay');
    });
    this.createLoginForm();
    this.route.url.subscribe( s => {
      this.role = this.route.snapshot.params.role;
    });
  }

  createLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(role: string) {
    if(this.LoginForm.valid) {
      if(role === 'guide') {
        this.userService.AttemptGuideLogin(this.LoginForm.value).subscribe(
          res => {
           if(res.success) {
            console.log(res);
            this.router.navigateByUrl('guide/guidehome');
           } else {
             this.toastr.error(res.message);
           }
          }, error => {
            console.log(error);
          }
        )
      } else {
        this.userService.AttemptTouristLogin(this.LoginForm.value).subscribe(
          res => {
            if(res.success) {
              console.log(res);
              if(!res.languages && !res.interests) {
                this.router.navigateByUrl('/tourists/touristshome/languagesInterests/languagesInterests');
              } else if(!res.languages) {
                this.router.navigateByUrl('/tourists/touristshome/languages/languages')
              } else if(!res.interests) {
                this.router.navigateByUrl('/tourists/touristshome/interests/interests')
              } else {
                this.router.navigateByUrl('/tourists/touristshome');
              }
            } else {
              this.toastr.error(res.message);
            }
          }, error => {
            console.log(error);
          }
        )
      }
    } else {
      this.toastr.error("Please fill email and password!");
    }

  }

  get f() {
    return this.LoginForm.controls;
  }

}
