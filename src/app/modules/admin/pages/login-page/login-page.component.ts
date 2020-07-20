import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  submitLogin() {
    if(this.loginForm.valid) {
      this.userService.AttemptAdminLogin(this.loginForm.value).subscribe(res => {
        if(res.success) {
          this.toastr.success("Logged in successfully!");
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.toastr.error(res.message);
        }
      })
    } else {
      this.toastr.error("Invalid Credentials!");
    }
  }

}
