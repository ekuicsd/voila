import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public LoginForm: FormGroup;
  public role: string = 'tourist';
  public guideShow = false;
  public touristShow = false;
  public socket = io(environment.baseUrl);

  constructor(private userService: UserService,
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
            this.router.navigateByUrl('guide/guidehome');
            this.socket.emit('initial_connect', { userType: 'GUIDE', _id: res.guide._id});
           } else {
             this.toastr.error(res.message);
           }
          }, error => {
          }
        )
      } else {
        this.userService.AttemptTouristLogin(this.LoginForm.value).subscribe(
          res => {
            if(res.success) {
              if(!res.languages && !res.interests) {
                this.router.navigateByUrl('/tourists/touristshome/languagesInterests/languagesInterests');
              } else if(!res.languages) {
                this.router.navigateByUrl('/tourists/touristshome/languages/languages')
              } else if(!res.interests) {
                this.router.navigateByUrl('/tourists/touristshome/interests/interests')
              } else {
                this.router.navigateByUrl('/tourists/touristshome');
              }
              this.socket.emit('initial_connect', { userType: 'TOURISTS', _id: res.Tourist._id});
            } else {
              this.toastr.error(res.message);
            }
          }, error => {
          }
        )
      }
    } else {
      this.toastr.error("Please fill email and password!");
    }

  }

 
  showGuidePwd(data) {
    if(data.target.checked) {
      this.guideShow = true;
    } else {
      this.guideShow = false;
    }
  }

  showTouristPwd(data) {
    if(data.target.checked) {
      this.touristShow = true;
    } else {
      this.touristShow = false;
    }
  }

}
