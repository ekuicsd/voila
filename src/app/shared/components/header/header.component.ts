import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDirective} from 'node_modules/angular-bootstrap-md';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild("frame", {static: false}) modal: ModalDirective;
  public token: string = '';
  loginForm: FormGroup;

  constructor(
    private jwtService: JwtService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.createLoginGForm();
    this.token = this.jwtService.getToken();
    console.log(this.token);

  }

  createLoginGForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
  });

  }

  submitLogin() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      // if(this.loginForm.value.email === 'icsd@gmail.com' && this.loginForm.value.password === 'icsd') {
      if(this.loginForm.value.email === '1' && this.loginForm.value.password === '1') {
        console.log("correct!");
        this.modal.hide();
        this.router.navigateByUrl('guide/guidehome');
        // this.router.navigateByUrl('tourists/touristshome');
      }
    } else {
      this.toastr.error("Error! Invalid email or password.")
    }
  }

}
